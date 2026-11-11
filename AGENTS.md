# AGENTS.md

## Project

فزعة (Fazaa) membership app: an Express server (`server/index.js`) serving a static
frontend from `server/public/`. Request state lives in the browser (`sessionStorage`);
the only server integration is optional Telegram notifications.

## Run locally

```bash
npm install
PORT=12000 npm start      # Express; reads PORT from the env (default 10000)
```

Health check: `GET /api/health`. Preview hosts for this workspace map port 12000 to
`https://work-1-<id>.prod-runtime.all-hands.dev/`.

Static pages: `index.html`, `usage.html`, `order1..3.html`, `payment.html`,
`verification.html`, `success.html`. Product images live in
`server/public/images/products/`.

## Usage page

`usage.html` (served at `/usage`, public, no session) explains activation and use in the
homepage style. Each catalog card's "show more details" link points here. Its text lives
in `i18n.js` under the `srUsage*` keys, plus `srViewProducts` / `srBackHome` / `srUsageNote`.

## Product catalog

`server/public/index.html` holds a `products` array (rendered client-side into
`#products-grid`). Each entry has `id`, `nameKey`, `detailsKey`, `color`, `tier`, and
`image` (a filename in `server/public/images/products/`, URL-encoded at render time).
Entries may add `discountKey` (shown as a green line inside the collapsed "show more
details" panel, not on the default card face), `specKey`, and `powerKey` to override the
default warranty/battery lines.

Product text lives in `server/public/js/i18n.js` under both `ar` and `en`; every
`*Key` in the array must exist in both languages. Prices are shown as the Free label
(`srFree`); the limited-stock badge (`srLimitedStock`) shows on every card.

Discounts follow product importance, between 5% and 15%. Rings: gold 15%, pink 15%
(tagged as a soft feminine design), black 12%, blue 8%, silver 5%. Watches: gold 15%,
pink 15% (soft feminine design), neon 12%, blue 8%, blue-lit 5%.

All products (rings and watches) serve one purpose: linking bank cards and paying via
NFC. Keep product copy about bank-card linking and NFC payment; do not describe them as
fitness trackers (heart rate, sleep, steps).

## Size selection modal

"Order Now" opens a modal (`#sizeModal`) to pick a size before ordering. Each product has
a `type` (`ring` or `watch`); rings offer sizes `RING_SIZES` (16-22) and watches offer
`WATCH_SIZES` (S/M/L). An "I don't know the exact size" option shows a note that a set of
products in different sizes will be shipped. The choice is saved to `sessionStorage`
(`fazaaSize`) before continuing to `/order`.

## tools/apply_logo.py

Engraves a bank logo onto the visible band of a ring product image. The ring band is
found by fitting an ellipse to the silhouette (robust least-squares), the logo is warped
along the band's arc, then blended as an engraving tinted to the bank's brand colour.

```bash
python3 tools/apply_logo.py --all                          # outer face -> *_fab.png
python3 tools/apply_logo.py ring.png --surface inner       # inner coating -> *_fab.png
python3 tools/apply_logo.py ring.png --debug               # ellipse overlay for tuning
python3 tools/apply_logo.py ring.png --mode emblem --center 90 --height 0.7
```

Key options: `--mode {wordmark,emblem,full}`, `--surface {outer,inner}` (the visible
outer face, or the inner wall of the coating seen through the opening),
`--center` (degrees; 90 = bottom for outer, 270 = top for inner), `--height` (fraction of
the band thickness), `--arc` (auto from logo aspect when unset), `--print` (filled logo
instead of engraving), `--tint {brand,none}`, `--inplace`.

Defaults to `tools/fab_logo.png` (First Abu Dhabi Bank). Pass `--logo` for another
brand; SVG logos are rasterised when `cairosvg` is installed.

Requires: `pillow`, `numpy`, `scipy` (and `cairosvg` for SVG input).
