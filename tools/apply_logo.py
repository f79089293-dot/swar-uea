#!/usr/bin/env python3
"""Apply a bank logo onto the visible band of a ring product image.

The tool maps the ring's band to an ellipse, then warps the logo so it follows
the curvature of the band and blends it in with the ring's own lighting.

It ships with the First Abu Dhabi Bank (FAB) logo under tools/, but any logo
image or SVG can be passed with --logo.

Examples
--------
    python tools/apply_logo.py --all
    python tools/apply_logo.py server/public/images/products/*.png
    python tools/apply_logo.py ring.png --mode emblem --angle 210 --arc 0.6
"""

from __future__ import annotations

import argparse
import math
import os
import sys
from dataclasses import dataclass

import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_LOGO = os.path.join(HERE, "fab_logo.png")

# First Abu Dhabi Bank brand colours (used to tint the engraving per ring).
FAB_BLUE = (0x00, 0x46, 0x8C)


# --------------------------------------------------------------------------- #
# Geometry helpers
# --------------------------------------------------------------------------- #
def _ellipse_nr(x, y, cx, cy, rx, ry, ct, st):
    dx = x - cx
    dy = y - cy
    return np.sqrt(((dx * ct + dy * st) / max(rx, 1e-6)) ** 2 +
                   ((-dx * st + dy * ct) / max(ry, 1e-6)) ** 2)


def fit_ellipse(x: np.ndarray, y: np.ndarray) -> dict:
    """Robust geometric ellipse fit (cx, cy, rx, ry, theta) to boundary points."""
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    cx0 = (x.min() + x.max()) / 2.0
    cy0 = (y.min() + y.max()) / 2.0
    rx0 = max((x.max() - x.min()) / 2.0, 1.0)
    ry0 = max((y.max() - y.min()) / 2.0, 1.0)

    if x.size < 12:
        return {"cx": cx0, "cy": cy0, "rx": rx0, "ry": ry0, "theta": 0.0}

    # Subsample boundary points for speed.
    if x.size > 4000:
        idx = np.linspace(0, x.size - 1, 4000).astype(int)
        x, y = x[idx], y[idx]

    def resid(p):
        cx, cy, rx, ry, th = p
        ct, st = math.cos(th), math.sin(th)
        return _ellipse_nr(x, y, cx, cy, rx, ry, ct, st) - 1.0

    try:
        from scipy.optimize import least_squares
        res = least_squares(
            resid, [cx0, cy0, rx0, ry0, 0.0], method="trf",
            bounds=([-np.inf, -np.inf, 1.0, 1.0, -math.pi / 2],
                    [np.inf, np.inf, np.inf, np.inf, math.pi / 2]),
            max_nfev=4000)
        cx, cy, rx, ry, th = res.x
        return {"cx": float(cx), "cy": float(cy), "rx": float(rx),
                "ry": float(ry), "theta": float(th)}
    except Exception:
        return {"cx": cx0, "cy": cy0, "rx": rx0, "ry": ry0, "theta": 0.0}


def _boundary_points(mask: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Outer contour points of a boolean mask (mask minus its erosion)."""
    try:
        from scipy import ndimage
        er = ndimage.binary_erosion(mask, iterations=2)
        edge = mask & ~er
    except Exception:
        edge = mask
    ys, xs = np.where(edge)
    return xs, ys


def ring_geometry(alpha: np.ndarray) -> dict:
    """Estimate the ring band ellipse and its inner/outer radius factors.

    alpha: 2-D float array in [0, 1]. Returns a dict with the ellipse
    (cx, cy, rx, ry, theta) plus band_in / band_out normalised radii.
    """
    mask = alpha > 0.15
    if not mask.any():
        raise ValueError("image has an empty alpha channel")

    xs, ys = _boundary_points(mask)
    ell = fit_ellipse(xs, ys)

    cx, cy, rx, ry, th = ell["cx"], ell["cy"], ell["rx"], ell["ry"], ell["theta"]
    ct, st = math.cos(th), math.sin(th)

    # Outer radius: the furthest opaque pixel from the fitted centre.
    oy, ox = np.where(mask)
    nr = _ellipse_nr(ox, oy, cx, cy, rx, ry, ct, st)
    band_out = float(np.percentile(nr, 99.0))

    # Inner radius: the ring's hole when one is visible.
    band_in = _detect_hole_ratio(mask, cx, cy, rx, ry, ct, st)
    if band_in is None or band_in > band_out - 0.08:
        # Solid ring (no visible hole): use the lower part of the silhouette.
        band_in = band_out * 0.62
    return {"cx": cx, "cy": cy, "rx": rx, "ry": ry, "theta": th,
            "band_in": band_in, "band_out": band_out}


def _detect_hole_ratio(mask, cx, cy, rx, ry, ct, st):
    """Return the normalised radius of the ring's hole, or None if it has none."""
    try:
        from scipy import ndimage
    except Exception:
        return None
    holes = ~mask
    lbl, n = ndimage.label(holes)
    if n == 0:
        return None
    best = None
    for i in range(1, n + 1):
        comp = lbl == i
        touches = comp[0, :].any() or comp[-1, :].any() or comp[:, 0].any() or comp[:, -1].any()
        if touches or comp.sum() < 0.005 * mask.size:
            continue
        oy, ox = np.where(comp)
        vals = _ellipse_nr(ox, oy, cx, cy, rx, ry, ct, st)
        if vals.min() > 0.2:
            cand = float(np.percentile(vals, 98))
            best = cand if best is None else max(best, cand)
    return best


# --------------------------------------------------------------------------- #
# Logo preparation
# --------------------------------------------------------------------------- #
def load_logo(path: str, prefer: str = "auto") -> Image.Image:
    """Load a logo as RGBA. SVG is rasterised with cairosvg when available."""
    ext = os.path.splitext(path)[1].lower()
    if ext == ".svg":
        try:
            import cairosvg
            import io
            png = cairosvg.svg2png(url=path, output_width=1400, background_color=None)
            return Image.open(io.BytesIO(png)).convert("RGBA")
        except Exception as exc:  # pragma: no cover - depends on optional dep
            raise SystemExit(
                f"cannot rasterise SVG ({exc}); install cairosvg or pass a PNG with --logo"
            )
    return Image.open(path).convert("RGBA")


def _split_wordmark_and_emblem(logo: Image.Image) -> tuple[Image.Image, Image.Image]:
    """Split a horizontal 'wordmark + emblem' logo into its two components.

    Uses the alpha content columns to find the widest horizontal gap.
    """
    a = np.asarray(logo)[:, :, 3]
    col = (a > 20).mean(axis=0)
    content = np.where(col > 0.02)[0]
    if content.size == 0:
        return logo, logo
    # Find gaps (runs of near-empty columns) inside the content span.
    gaps = []
    run_start = None
    for c in range(content.min(), content.max() + 1):
        if col[c] <= 0.02:
            if run_start is None:
                run_start = c
        else:
            if run_start is not None:
                gaps.append((run_start, c - 1))
                run_start = None
    if not gaps:
        return logo, logo
    g0, g1 = max(gaps, key=lambda g: g[1] - g[0])
    if (g1 - g0) < 2:
        return logo, logo
    left = trim_alpha(logo.crop((0, 0, g0, logo.height)))
    right = trim_alpha(logo.crop((g1 + 1, 0, logo.width, logo.height)))
    # The emblem is the narrower/taller component; the wordmark is the wide one.
    if left.width >= right.width:
        return left, right
    return right, left


def trim_alpha(img: Image.Image, pad: int = 6) -> Image.Image:
    a = np.asarray(img)[:, :, 3]
    ys, xs = np.where(a > 10)
    if xs.size == 0:
        return img
    box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0),
           min(xs.max() + pad + 1, img.width), min(ys.max() + pad + 1, img.height))
    return img.crop(box)


# --------------------------------------------------------------------------- #
# Warping the logo along the band
# --------------------------------------------------------------------------- #
@dataclass
class Placement:
    center_deg: float   # angle of the logo centre (image coords: 90 = bottom)
    arc_frac: float     # fraction of a full turn the logo spans
    band_in: float      # inner radius factor of the band (0..1)
    band_out: float     # outer radius factor of the band (0..1)


def _sample_bilinear(arr: np.ndarray, xs: np.ndarray, ys: np.ndarray) -> np.ndarray:
    """Bilinear sample of HxW(xC) arr at float coords xs, ys (clamped)."""
    h, w = arr.shape[:2]
    xs = np.clip(xs, 0, w - 1.001)
    ys = np.clip(ys, 0, h - 1.001)
    x0 = np.floor(xs).astype(int)
    y0 = np.floor(ys).astype(int)
    x1 = np.minimum(x0 + 1, w - 1)
    y1 = np.minimum(y0 + 1, h - 1)
    fx = (xs - x0)[..., None]
    fy = (ys - y0)[..., None]
    if arr.ndim == 2:
        arr = arr[..., None]
    top = arr[y0, x0] * (1 - fx) + arr[y0, x1] * fx
    bot = arr[y1, x0] * (1 - fx) + arr[y1, x1] * fx
    out = top * (1 - fy) + bot * fy
    return out if out.shape[-1] > 1 else out[..., 0]


def warp_band(logo: Image.Image, canvas: tuple[int, int], ell: dict,
              placement: Placement, flip_vertical: bool = False) -> np.ndarray:
    """Warp `logo` onto the ellipse band. Returns a float RGBA array (canvas size).

    The logo's horizontal axis is mapped along the arc and its vertical axis
    across the band thickness, so the artwork follows the ring's curvature.
    """
    W, H = canvas
    logo_rgba = np.asarray(logo, dtype=float) / 255.0
    lh, lw = logo_rgba.shape[:2]
    if lw == 0 or lh == 0:
        return np.zeros((H, W, 4), dtype=float)

    cx, cy, rx, ry, th = ell["cx"], ell["cy"], ell["rx"], ell["ry"], ell["theta"]
    ct, st = math.cos(th), math.sin(th)

    yy, xx = np.mgrid[0:H, 0:W]
    dx = xx - cx
    dy = yy - cy
    # Express each pixel in the un-rotated ellipse frame.
    xr = dx * ct + dy * st
    yr = -dx * st + dy * ct
    nrx = xr / max(rx, 1e-6)
    nry = yr / max(ry, 1e-6)
    nr = np.sqrt(nrx * nrx + nry * nry)
    ang = np.arctan2(nry, nrx)

    band_in, band_out = placement.band_in, placement.band_out
    inside = (nr >= band_in) & (nr <= band_out)
    if not inside.any():
        return np.zeros((H, W, 4), dtype=float)

    half = math.radians(180.0 * placement.arc_frac)
    c = math.radians(placement.center_deg)
    # Signed angular distance to the logo centre, wrapped to (-pi, pi].
    delta = (ang - c + math.pi) % (2 * math.pi) - math.pi
    on_arc = np.abs(delta) <= half

    u = (delta + half) / (2 * half)          # 0 at left end, 1 at right end
    v = (nr - band_in) / max(band_out - band_in, 1e-6)
    if flip_vertical:
        v = 1.0 - v

    valid = inside & on_arc
    lx = np.clip(u, 0, 1) * (lw - 1)
    ly = np.clip(v, 0, 1) * (lh - 1)
    rgba = _sample_bilinear(logo_rgba, lx, ly)
    out = np.zeros((H, W, 4), dtype=float)
    out[valid] = rgba[valid]
    return out


# --------------------------------------------------------------------------- #
# Lighting + compositing
# --------------------------------------------------------------------------- #
def _ring_lighting(rgba: np.ndarray, radius: float = 2.0) -> np.ndarray:
    """Soft luminance (0..1) of the ring, used to modulate the logo brightness."""
    rgb = rgba[..., :3]
    lum = 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]
    img = Image.fromarray((np.clip(lum, 0, 1) * 255).astype(np.uint8))
    blur = img.filter(ImageFilter.GaussianBlur(radius))
    return np.asarray(blur, dtype=float) / 255.0


def composite(ring: Image.Image, warped: np.ndarray, *,
              engrave: bool, strength: float, tint: tuple[int, int, int] | None,
              specular: bool, logo_blur: float = 0.6) -> Image.Image:
    """Blend the warped logo into the ring image."""
    ring_rgba = np.asarray(ring.convert("RGBA"), dtype=float) / 255.0
    H, W = ring_rgba.shape[:2]

    logo_rgb = warped[..., :3].copy()
    logo_a = warped[..., 3].copy()
    if logo_blur > 0:
        for c in range(3):
            logo_rgb[..., c] = np.asarray(
                Image.fromarray((logo_rgb[..., c] * 255).astype(np.uint8))
                .filter(ImageFilter.GaussianBlur(logo_blur)), dtype=float) / 255.0
        logo_a = np.asarray(
            Image.fromarray((logo_a * 255).astype(np.uint8))
            .filter(ImageFilter.GaussianBlur(logo_blur)), dtype=float) / 255.0

    light = _ring_lighting(ring_rgba)
    base = ring_rgba[..., :3]
    alpha = logo_a * strength
    logo_lum = logo_rgb.mean(axis=2)

    if engrave:
        # Engraving depth follows the ring's own lighting and the logo's luminance.
        shade = 0.45 + 0.55 * light
        detail = 0.30 + 0.70 * logo_lum
        base_mod = base * (shade * detail)[..., None]
        if tint is not None:
            t = np.array(tint, dtype=float) / 255.0
            ink = t[None, None, :] * (0.35 + 0.45 * detail)[..., None] * shade[..., None]
            # Pull the engraving towards the brand tint so it reads on any ring colour.
            lit = base_mod * 0.4 + ink * 0.6
        else:
            lit = base_mod
        lit = np.clip(lit, 0, 1)
        rgb = base * (1 - alpha[..., None]) + lit * alpha[..., None]
        if specular:
            edges = np.abs(np.gradient(logo_a, axis=0)) + np.abs(np.gradient(logo_a, axis=1))
            sheen = np.clip(edges * 1.5, 0, 1) * alpha
            rgb = np.clip(rgb + sheen[..., None] * 0.5 * light[..., None], 0, 1)
    else:
        # Printed / filled logo: multiply blend so highlights remain.
        if tint is not None:
            t = np.array(tint, dtype=float) / 255.0
            lum = logo_rgb.mean(axis=2, keepdims=True)
            logo_rgb = logo_rgb * 0.3 + t[None, None, :] * (lum * 0.7 + 0.3)
        mult = base * logo_rgb
        rgb = base * (1 - alpha[..., None]) + mult * alpha[..., None]

    out = np.dstack([np.clip(rgb, 0, 1) * 255.0, ring_rgba[..., 3] * 255.0])
    return Image.fromarray(out.astype(np.uint8), "RGBA")


# --------------------------------------------------------------------------- #
# High level API
# --------------------------------------------------------------------------- #
def apply_logo(ring_path: str, out_path: str, *, logo_path: str = DEFAULT_LOGO,
               mode: str = "wordmark", surface: str = "outer",
               center: float | None = None, arc: float | None = None,
               height: float = 0.62, band_in: float | None = None,
               band_out: float | None = None, strength: float = 0.95,
               engrave: bool = True, tint: str = "brand", blur: float = 0.6,
               flip_vertical: bool = False, debug: bool = False) -> dict:
    """Apply the logo to one ring image and save the result.

    `surface` selects which face of the band the logo sits on:
      * "outer" - the visible outer face (default), centred at `center`.
      * "inner" - the inner wall seen through the opening; this face is visible
        at the far (top) side of the ring, so the centre defaults to the top.
    `height` is the logo height as a fraction of the band thickness. When `arc`
    is None the arc is derived from the logo aspect so it is not stretched.
    """
    ring = Image.open(ring_path).convert("RGBA")
    alpha = np.asarray(ring)[:, :, 3].astype(float) / 255.0
    ell = ring_geometry(alpha)

    logo = load_logo(logo_path)
    if mode == "emblem":
        _, emblem = _split_wordmark_and_emblem(logo)
        logo = trim_alpha(emblem)
    elif mode == "wordmark":
        word, _ = _split_wordmark_and_emblem(logo)
        logo = trim_alpha(word)
    else:
        logo = trim_alpha(logo)

    bi = ell["band_in"] if band_in is None else band_in
    bo = ell["band_out"] if band_out is None else band_out
    rmean = (ell["rx"] + ell["ry"]) / 2.0

    if surface == "inner":
        # Inner wall: from just inside the hole edge outward to the outer face.
        lo = bi * 1.04
        hi = min(bi * 1.35, bo * 0.97)
        if center is None:
            center = 270.0
    else:
        lo = bi
        hi = bo
        if center is None:
            center = 90.0

    # Vertical sub-band the logo occupies, centred within [lo, hi].
    mid = (lo + hi) / 2.0
    lo = mid - (height / 2.0) * (hi - lo)
    hi = mid + (height / 2.0) * (hi - lo)

    # Auto arc: keep the logo's aspect ratio by matching its width to the arc length.
    if arc is None:
        h_px = height * (hi - lo) * rmean
        w_px = h_px * (logo.width / max(logo.height, 1))
        arc = min(0.45, w_px / max(2 * math.pi * ((lo + hi) / 2.0) * rmean, 1.0))

    placement = Placement(center_deg=center, arc_frac=arc, band_in=lo, band_out=hi)
    warped = warp_band(logo, (ring.width, ring.height), ell, placement, flip_vertical)

    tint_rgb = FAB_BLUE if tint == "brand" else None
    result = composite(ring, warped, engrave=engrave, strength=strength,
                       tint=tint_rgb, specular=True, logo_blur=blur)

    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    result.save(out_path)

    if debug:
        _save_debug(ring, ell, placement, out_path)
    return {"ring": ring_path, "out": out_path, "ellipse": ell, "arc": arc,
            "center": center, "band": (lo, hi)}


def _save_debug(ring: Image.Image, ell: dict, placement: Placement, out_path: str) -> None:
    from PIL import ImageDraw
    dbg = ring.convert("RGB").copy()
    dr = ImageDraw.Draw(dbg)
    cx, cy, rx, ry = ell["cx"], ell["cy"], ell["rx"], ell["ry"]
    for scale, col in ((1.0, (255, 0, 0)),
                       (placement.band_in, (0, 160, 255)),
                       (placement.band_out, (0, 200, 0))):
        dr.ellipse([cx - rx * scale, cy - ry * scale, cx + rx * scale, cy + ry * scale],
                   outline=col, width=4)
    dbg.save(os.path.splitext(out_path)[0] + "_debug.png")


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
PRODUCT_DIR = os.path.join("server", "public", "images", "products")


def _default_targets() -> list[str]:
    if not os.path.isdir(PRODUCT_DIR):
        raise SystemExit(f"product directory not found: {PRODUCT_DIR}")
    names = sorted(n for n in os.listdir(PRODUCT_DIR) if n.lower().endswith(".png"))
    return [os.path.join(PRODUCT_DIR, n) for n in names]


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Engrave a bank logo onto ring images.")
    ap.add_argument("inputs", nargs="*", help="ring PNG files (default: all products)")
    ap.add_argument("--all", action="store_true", help="process every product PNG")
    ap.add_argument("--logo", default=DEFAULT_LOGO, help="logo image or SVG")
    ap.add_argument("--mode", choices=["wordmark", "emblem", "full"], default="wordmark")
    ap.add_argument("--surface", choices=["outer", "inner"], default="outer",
                    help="which face of the band: the visible outer face or the inner wall")
    ap.add_argument("--center", type=float, default=None,
                    help="angle of the logo centre in degrees (default: 90 outer, 270 inner)")
    ap.add_argument("--arc", type=float, default=None,
                    help="fraction of a full turn the logo spans (auto from aspect if unset)")
    ap.add_argument("--height", type=float, default=0.62,
                    help="logo height as a fraction of the band thickness")
    ap.add_argument("--band-in", type=float, default=None, help="inner radius factor (auto if unset)")
    ap.add_argument("--band-out", type=float, default=None, help="outer radius factor (auto if unset)")
    ap.add_argument("--strength", type=float, default=0.95)
    ap.add_argument("--print", dest="engrave", action="store_false",
                    help="filled/printed logo instead of engraving")
    ap.add_argument("--flip", action="store_true", help="flip the logo across the band")
    ap.add_argument("--tint", choices=["brand", "none"], default="brand")
    ap.add_argument("--blur", type=float, default=0.6)
    ap.add_argument("--suffix", default="_fab", help="appended before the extension")
    ap.add_argument("--inplace", action="store_true", help="overwrite the input files")
    ap.add_argument("--debug", action="store_true", help="save ellipse overlay images")
    args = ap.parse_args(argv)

    targets = args.inputs or (_default_targets() if (args.all or not args.inputs) else [])
    if not targets:
        ap.print_help()
        return 1

    for path in targets:
        if not os.path.isfile(path):
            print(f"  skip (not a file): {path}")
            continue
        base, ext = os.path.splitext(path)
        out = path if args.inplace else f"{base}{args.suffix}{ext}"
        info = apply_logo(path, out, logo_path=args.logo, mode=args.mode,
                          surface=args.surface, center=args.center, arc=args.arc,
                          height=args.height, band_in=args.band_in,
                          band_out=args.band_out, strength=args.strength,
                          engrave=args.engrave, tint=args.tint, blur=args.blur,
                          flip_vertical=args.flip, debug=args.debug)
        e = info["ellipse"]
        lo, hi = info["band"]
        print(f"  {os.path.basename(path)} -> {os.path.basename(out)}  "
              f"ellipse(cx={e['cx']:.0f}, cy={e['cy']:.0f}, rx={e['rx']:.0f}, ry={e['ry']:.0f}) "
              f"band=({lo:.2f}..{hi:.2f}) center={info['center']:.0f} arc={info['arc']:.3f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
