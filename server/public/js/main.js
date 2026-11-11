// ===== Fazaa App - Main JavaScript =====

// Current selected tier
let selectedTier = null;

// ============ Session Management ============

// Start new order. Order progress is kept in the browser (sessionStorage),
// so no server round-trip is needed before entering the flow.
function startOrder(tier) {
    selectedTier = tier;
    localStorage.setItem('fazaaTier', tier);
    // ابدأ طلباً نظيفاً: أزل أي تقدّم محفوظ من طلب سابق
    try {
        sessionStorage.removeItem('step1');
        sessionStorage.removeItem('step2');
        sessionStorage.removeItem('paymentDone');
        sessionStorage.removeItem('otpVerified');
    } catch (e) {}
    window.location.href = '/order?tier=' + tier;
}

// ============ Error Handling ============

function showError(message) {
    const modal = document.getElementById('errorModal');
    const messageEl = document.getElementById('errorMessage');
    
    if (modal && messageEl) {
        messageEl.textContent = message;
        modal.classList.add('show');
    }
}

function closeModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// ============ Brand / Home Confirmation ============

// Reads a translation key, falling back to the Arabic base then a default.
function trText(key, fallback) {
    if (typeof translations !== 'undefined') {
        const lang = translations[currentLang] || {};
        if (lang[key]) return lang[key];
        if (translations.ar && translations.ar[key]) return translations.ar[key];
    }
    return fallback;
}

// Asks the user to confirm leaving to the home page. Staying keeps the
// current form data untouched.
function confirmGoHome() {
    const existing = document.getElementById('goHomeModal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'goHomeModal';
    overlay.setAttribute('dir', document.documentElement.getAttribute('dir') || 'rtl');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:99999;padding:20px;';
    overlay.innerHTML = `
        <div style="background:#fff;border-radius:20px;padding:28px 24px;max-width:380px;width:100%;text-align:center;box-shadow:0 12px 36px rgba(0,0,0,0.25);">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(139,21,56,0.1);color:#8B1538;display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 16px;">
                <i class="fa-solid fa-house"></i>
            </div>
            <h3 style="font-size:1.2rem;font-weight:800;color:#1a1a2e;margin-bottom:10px;"></h3>
            <p style="font-size:0.95rem;color:#666;line-height:1.7;margin-bottom:22px;"></p>
            <div style="display:flex;gap:12px;">
                <button type="button" data-action="yes" style="flex:1;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#8B1538,#6B0F2A);color:#fff;font-size:1rem;font-weight:700;cursor:pointer;"></button>
                <button type="button" data-action="no" style="flex:1;padding:14px;border:1px solid #e0e0e0;border-radius:12px;background:#f5f5f5;color:#333;font-size:1rem;font-weight:700;cursor:pointer;"></button>
            </div>
        </div>
    `;

    const card = overlay.firstElementChild;
    card.querySelector('h3').textContent = trText('srGoHomeTitle', 'العودة إلى الرئيسية');
    card.querySelector('p').textContent = trText('srGoHomeMessage', 'سيتم توجيهك إلى الصفحة الرئيسية ولن يتم حفظ اختياراتك الحالية.');
    const yesBtn = card.querySelector('[data-action="yes"]');
    const noBtn = card.querySelector('[data-action="no"]');
    yesBtn.textContent = trText('srGoHomeYes', 'نعم');
    noBtn.textContent = trText('srGoHomeNo', 'إلغاء');

    yesBtn.addEventListener('click', () => { window.location.href = '/'; });
    noBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    document.body.appendChild(overlay);
}

// Check for URL error parameters
function checkUrlErrors() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');

    // استخدم الترجمة إن توفّرت، وإلا اعرض نصاً عربياً افتراضياً
    const msg = (key, fallback) => (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) || fallback;

    if (error === 'session_required') {
        showError(msg('errorSelectPackage', 'يرجى اختيار الباقة أولاً ثم إكمال طلبك'));
    } else if (error === 'complete_order_first') {
        showError(msg('completeOrderFirst', 'يرجى إكمال بيانات الطلب أولاً'));
    } else if (error === 'complete_payment_first') {
        showError(msg('completePaymentFirst', 'يرجى إتمام الدفع أولاً'));
    }

    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

// ============ Slider Functionality ============

class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        
        this.init();
    }
    
    init() {
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        // Remove active class
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update index
        this.currentSlide = index;
        if (this.currentSlide >= this.slides.length) this.currentSlide = 0;
        if (this.currentSlide < 0) this.currentSlide = this.slides.length - 1;
        
        // Add active class
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }
}

// ============ Initialize ============

document.addEventListener('DOMContentLoaded', () => {
    // Check for URL errors
    checkUrlErrors();
    
    // Initialize slider if exists
    if (document.querySelector('.slider-container')) {
        new Slider();
    }
    
    console.log('🚀 Fazaa App Initialized!');
});

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('errorModal');
    if (e.target === modal) {
        closeModal();
    }
});
