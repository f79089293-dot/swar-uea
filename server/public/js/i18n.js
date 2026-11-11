// ===== Internationalization (i18n) System =====

// Translations
const translations = {
    ar: {
        // Header
        pageTitle: "فزعة - التسجيل",
        brandName: "فزعة",
        
        // Page Title
        pageTitleOrder: "كن عضواً",
        pageTitlePayment: "الدفع",
        pageTitleVerification: "التحقق",
        pageTitleSuccess: "تم بنجاح",
        pageTitleHome: "فزعة - Fazaa",
        
        // Order Page
        stepPersonal: "معلومات شخصية",
        stepAddress: "معلومات العنوان",
        stepSubscribe: "اشترك",
        enterInfo: "يرجى إدخال معلوماتك بشكل صحيح",
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "يرجى إدخال اسمك",
        phoneNumber: "رقم الهاتف",
        phonePrefix: "971+",
        phonePlaceholder: "5xxxxxxxx",
        nationalId: "رقم الهوية",
        nationalIdPlaceholder: "15 رقم",
        city: "المنطقة",
        selectCity: "اختر المنطقة",
        dubai: "دبي",
        abuDhabi: "أبوظبي",
        sharjah: "الشارقة",
        ajman: "عجمان",
        fujairah: "الفجيرة",
        rasAlKhaimah: "رأس الخيمة",
        ummAlQuwain: "أم القيوين",
        street1: "عنوان الشارع",
        street1Placeholder: "يرجى إدخال عنوان الشارع",
        street2: "الحي (اختياري)",
        street2Placeholder: "يرجى إدخال الحي",
        deliveryDate: "موعد الاستلام",
        backHome: "الرئيسية",
        next: "المتابعة",
        confirmOrder: "تأكيد الطلب",
        
        // Summary
        invoiceTitle: "الفاتورة وطريقة الدفع",
        orderSummary: "ملخص الطلب",
        name: "الاسم",
        phone: "رقم الهاتف",
        region: "المنطقة",
        address: "العنوان",
        package: "الباقة",
        registrationFee: "رسوم التسجيل",
        free: "مجاناً",
        duration: "المدة",
        oneYear: "سنة واحدة",
        totalAmount: "المبلغ الإجمالي",
        aed: "درهم",
        perYear: "/ سنة",
        
        // Payment Page
        cardHolder: "اسم حامل البطاقة",
        cardHolderPlaceholder: "كما هو مدون على البطاقة",
        cardNumber: "رقم البطاقة",
        cardNumberPlaceholder: "xxxx xxxx xxxx xxxx",
        expiryDate: "تاريخ الانتهاء",
        expiryPlaceholder: "MM/YY",
        cvv: "رمز الأمان (CVV)",
        cvvPlaceholder: "***",
        secureNotice: "معلوماتك محمية ومشفرة",
        completePayment: "إتمام الدفع",
        cardDeclined: "تم رفض البطاقة",
        useAnotherCard: "يرجى استخدام بطاقة أخرى",
        invalidCard: "يرجى إدخال رقم بطاقة صحيح",
        connectionError: "حدث خطأ في الاتصال",
        
        // Verification Page
        secureAuth: "المصادقة الثنائية الآمنة",
        authDesc: "ستتلقى رمزاً سرياً لمرة واحدة (OTP) لتأكيد عملية الدفع عبر رسالة نصية أو تطبيق البنك.",
        enterOtp: "يرجى إدخال رمز التحقق (OTP):",
        otpSent: "الرمز مرسل الآن إلى رقم الهاتف المرتبط بالبطاقة",
        last4: "••••",
        enterCode: "أدخل الرمز هنا:",
        codePlaceholder: "• • • • • •",
        confirm: "تأكيد",
        timerText: "ستنتهي صلاحية هذه الصفحة بعد",
        seconds: "ثانية",
        needHelp: "هل تحتاج للمساعدة؟",
        verifying: "جاري التحقق من المعلومات، يرجى الانتظار...",
        contactUs: "تواصل معنا",
        
        // Success Page
        congratulations: "🎉 تهانينا!",
        successMessage: "لقد تم التسجيل في عضوية فزعة بنجاح.\nستتلقى رسالة تأكيد على هاتفك خلال دقائق.",
        orderDetails: "تفاصيل الطلب",
        orderNumber: "رقم الطلب",
        packageType: "نوع الباقة",
        startDate: "تاريخ البدء",
        backToHome: "العودة للرئيسية",
        
        // Tier Names
        platinum: "البلاتينية",
        gold: "الذهبية",
        silver: "الفضية",
        fazaa: "خصومات فزعة",
        
        // Tier Descriptions
        platinumDesc: "أوسع مزايا وعروض حصرية",
        goldDesc: "عروض وخصومات مميزة",
        silverDesc: "خصومات وخدمات أساسية",
        fazaaDiscountDesc: "خصومات مختارة يومياً",
        
        // Prices
        pricePlatinum: "299",
        priceGold: "199",
        priceSilver: "99",
        priceFazaa: "49",
        currency: "درهم",
        
        // Errors
        requiredField: "هذا الحقل مطلوب",
        phoneError: "رقم الهاتف يجب أن يبدأ بـ 5 ويتكون من 9 أرقام",
        nationalIdError: "رقم الهوية يجب أن يكون 15 رقم",
        otpError: "رمز التحقق غير صحيح",
        
        // Footer
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        support: "الدعم",
        faq: "الأسئلة الشائعة",
        rights: "جميع الحقوق محفوظة.",
        
        // Modals & Alerts
        alertTitle: "تنبيه",
        errorSelectPackage: "يرجى اختيار الباقة أولاً ثم إكمال طلبك",
        completeOrderFirst: "يرجى إكمال بيانات الطلب أولاً",
        completePaymentFirst: "يرجى إتمام الدفع أولاً",
        okButton: "حسناً",
        
        // Features
        membershipBenefits: "مزايا العضوية",
        mostPopular: "الأكثر طلباً",
        orderNow: "أطلب الآن",
        showMore: "عرض المزيد",
        showLess: "عرض أقل",
        feat1: "عروض البلاتينية الحصرية",
        feat2: "العروض والخصومات",
        feat3: "فنادق وباقات للسفر",
        feat4: "متاجر فزعة",
        feat5: "فزعة أماكن",
        feat6: "خدمة إيجار السيارات",
        feat7: "فزعة هيلث",
        feat8: "إيجار السيارات طويل الأمد",
        feat9: "فزعة للسيارات المستعملة",
        feat10: "التعويض عن الحوادث الشخصية",
        year: "سنة",

        // ===== SmartRing Homepage =====
        srPageTitle: "SmartRing UAE | مستقبل الدفع بين يديك",
        srCatalogTitle: "مجموعة الخواتم والساعات الذكية",
        srCatalogSubtitle: "هذه المنتجات — الساعة الذكية والخاتم الذكي — يمكنك ربطها مع أي بطاقة بنكية والدفع بها مباشرة عبر تقنية NFC.",
        srLimitedStock: "محدود الكمية",
        srProductDesc: "تصميم نقي وخالٍ من أي شعارات، مقاوم للماء.",
        srShowDetails: "عرض المزيد من التفاصيل",
        srHideDetails: "إخفاء التفاصيل",
        srDiscountInfo: "الخصم والمزايا",
        srFeaturesLabel: "المزايا والخصائص:",
        srValidity: "مدة صلاحية الخاتم: 2 سنة",
        srNoBattery: "يعمل بلا بطارية نهائياً.",
        srOrderNow: "طلب الآن",
        // ===== نافذة اختيار المقاس =====
        srSizeModalTitle: "اختر المقاس المناسب",
        srSizeModalSubtitle: "حدد المقاس المناسب لك لإتمام طلبك.",
        srRingSizesLabel: "مقاسات الخاتم المتوفرة:",
        srWatchSizesLabel: "مقاسات الساعة المتوفرة:",
        srSizeUnknown: "لا أعرف المقاس الدقيق",
        srSizeUnknownRing: "سيتم إرسال كمية من الخواتم بمقاسات مختلفة لتقوم باختيار الحجم المناسب.",
        srSizeUnknownWatch: "سيتم إرسال كمية من الساعات بمقاسات مختلفة لتقوم باختيار الحجم المناسب.",
        srConfirmOrder: "متابعة الطلب",
        srCancel: "إلغاء",
        srSizeRequired: "يرجى اختيار المقاس أو خيار «لا أعرف المقاس الدقيق».",
        srGoHomeTitle: "العودة إلى الرئيسية",
        srGoHomeMessage: "سيتم توجيهك إلى الصفحة الرئيسية ولن يتم حفظ اختياراتك الحالية.",
        srGoHomeYes: "نعم",
        srGoHomeNo: "إلغاء",
        srHowTitle: "كيف تبدأ باستخدام المنتج؟",
        srHowSubtitle: "ثلاث خطوات بسيطة: فعّل المنتج، اربط بطاقتك البنكية، وابدأ الدفع بلمسة واحدة.",
        srHowStep1Title: "1. فعّل المنتج",
        srHowStep1Desc: "افتح المغلف المُغلق، امسح رمز الاستجابة السريعة (QR)، وأدخل الرقم السري لتفعيل المنتج بأمان.",
        srHowStep2Title: "2. اربط بطاقتك البنكية",
        srHowStep2Desc: "من التطبيق اختر «ربط بطاقة جديدة»، وقرّب بطاقتك من المنتج عبر NFC أو أدخل بياناتها يدوياً.",
        srHowStep3Title: "3. ادفع بلمسة واحدة",
        srHowStep3Desc: "قرّب الخاتم أو الساعة من جهاز الدفع (POS) في أي متجر، دون الحاجة إلى هاتف أو محفظة.",
        srFaqTitle: "الأسئلة الشائعة",
        srFaqSubtitle: "كل ما ترغب بمعرفته حول الخواتم والساعات الذكية",
        srFaqQ1: "هل يعمل المنتج مع أي بطاقة بنكية؟",
        srFaqA1: "نعم، يمكنك ربط المنتج مع أي بطاقة بنكية تدعم الدفع اللاتلامسي من أي بنك في الإمارات، عبر تطبيق التفعيل.",
        srFaqQ2: "هل الدفع عبر المنتج آمن؟",
        srFaqA2: "نعم، لا يتم تخزين بيانات بطاقتك الفعلية؛ تُستبدل برمز مشفّر (Token) آمن، ويمكنك إيقاف الدفع من التطبيق بنقرة واحدة.",
        srFooterText: "جميع الحقوق محفوظة © 2026 SmartRing UAE - خواتم وساعات دفع ذكية مستقلة وخالية من الشعارات",

        // ===== صفحة كيفية الاستخدام والتفعيل =====
        srUsagePageTitle: "طريقة التفعيل والاستخدام | SmartRing UAE",
        srUsageHeading: "طريقة التفعيل والاستخدام",
        srUsageIntro: "خطوات بسيطة لتفعيل منتجك وربط بطاقتك البنكية والبدء بالدفع عبر الخاتم أو الساعة الذكية.",
        srUsageStep1Title: "الخطوة الأولى: التفعيل والأمان (استلام المنتج)",
        srUsageStep1Item1: "افتح المغلف المغلق: عند استلام طلبك، ستجد مغلفاً محكماً ومغلقاً داخل الصندوق.",
        srUsageStep1Item2: "امسح رمز الاستجابة السريعة (QR Code): افتح كاميرا هاتفك وامسح الرمز المرفق داخل المغلف لتحميل تطبيقنا الرسمي.",
        srUsageStep1Item3: "أدخل الرقم السري الفريد: افتح التطبيق وأدخل الرقم السري المطبوع داخل المغلف لتأكيد ملكيتك للمنتج وتفعيله بشكل آمن.",
        srUsageStep2Title: "الخطوة الثانية: ربط بطاقتك البنكية",
        srUsageStep2Item1: "من الشاشة الرئيسية للتطبيق، اختر «ربط بطاقة جديدة».",
        srUsageStep2Item2: "قرّب بطاقتك البنكية من الساعة أو الخاتم الذكي باستخدام تقنية NFC، أو أدخل بيانات البطاقة يدوياً داخل التطبيق لتشفيرها.",
        srUsageStep2Item3: "تم الربط بنجاح! أصبحت بطاقتك جاهزة للاستخدام عبر الجهاز القابل للارتداء.",
        srUsageStep3Title: "الخطوة الثالثة: انطلق وادفع بكل سهولة!",
        srUsageStep3Item1: "ادفع بلمسة واحدة: عند الشراء من أي متجر، قرّب الخاتم أو الساعة من جهاز الدفع الإلكتروني (POS)، تماماً كما تفعل عند استخدام بطاقتك البنكية.",
        srUsageStep3Item2: "دون هاتف أو محفظة: يمكنك ترك هاتفك ومحفظتك في المنزل أثناء ممارسة الرياضة أو التسوق، وإجراء عمليات الدفع مباشرة باستخدام الخاتم أو الساعة.",
        srUsageStep3Item3: "التحكم بالإشعارات حسب رغبتك: يمكنك تفعيل استقبال إشعارات نصية (SMS) فورية عند كل عملية خصم لمتابعة مصاريفك أولاً بأول، أو إيقاف الإشعارات من إعدادات التطبيق والاستمتاع بتجربة دفع سريعة دون إزعاج.",
        srUsageSecurityTitle: "هل الدفع عبر المنتج آمن؟",
        srUsageSecurityItem1: "تشفير عالمي: لا يتم تخزين بيانات بطاقتك البنكية الفعلية داخل المنتج، بل يتم استبدالها برمز مشفّر (Token) لا يمكن استخدامه للوصول إلى بيانات بطاقتك الأصلية.",
        srUsageSecurityItem2: "الحماية من السرقة: يضمن الرقم السري الموجود داخل المغلف عدم قدرة أي شخص آخر على تفعيل جهازك أثناء الشحن أو النقل.",
        srUsageSecurityItem3: "إيقاف الدفع بنقرة واحدة: في حال فقدان الخاتم أو الساعة، يمكنك إلغاء تفعيل خاصية الدفع فوراً من داخل التطبيق بنقرة واحدة.",
        srViewProducts: "عرض المنتجات",
        srBackHome: "الرجوع إلى الرئيسية",
        srUsageNote: "ملاحظة: زر «عرض المزيد من التفاصيل» في كل بطاقة ينقلك إلى هذه الصفحة لمعرفة طريقة الاستخدام والتفعيل.",
        srP1Name: "خاتم الدفع الذكي - ذهبي نقي",
        srP1Details: "مصنوع من السيراميك الفاخر المعالج بطبقة ذهبية. مقاوم للخدش، مقاوم للماء بعمق 50 متراً، ولا يحتاج لأي شحن كهربائي.",
        srP2Name: "خاتم الدفع الذكي - فضي نقي",
        srP2Details: "تصميم عصري من الفضة التكتيكية المطفأة. متوافق مع كافة أجهزة نقاط البيع في الإمارات، ويدعم التشفير الآمن للبطاقات.",
        srP3Name: "خاتم الدفع الذكي - أسود ملكي",
        srP3Details: "مظهر ملكي أنيق بلون أسود مطفي (Matte Black). خفيف الوزن للغاية، مريح للاستخدام اليومي وأثناء ممارسة الرياضة.",
        srP4Name: "خاتم الدفع الذكي - أزرق معدني",
        srP4Details: "لمسة عصرية بلون أزرق معدني لامع. سطح أملس مقاوم للخدش، ومتوافق مع جميع المحافظ الرقمية ونقاط البيع.",
        srP5Name: "خاتم الدفع الذكي - وردي معدني",
        srP5Details: "تصميم أنيق بلون وردي معدني لامع. خفيف ومريح، مثالي للاستخدام اليومي ويدعم الدفع اللاتلامسي بأمان.",
        // خصومات الخواتم حسب أهمية المنتج (الأعلى 15% والأدنى 5%)
        srP1Discount: "خصم 15%",
        srP5Discount: "خصم 15% - منتج نسائي ناعم",
        srP3Discount: "خصم 12%",
        srP4Discount: "خصم 8%",
        srP2Discount: "خصم 5%",
        // الساعات الذكية - جميعها تربط البطاقات البنكية وتدعم الدفع عبر NFC
        srWatchValidity: "مدة الضمان: 2 سنة",
        srWatchBattery: "بطارية تدوم حتى 7 أيام مع شحن مغناطيسي سريع.",
        srW1Name: "ساعة الدفع الذكي - وردي ناعم",
        srW1Details: "ساعة أنيقة بإطار وردي ناعم، تربط بطاقاتك البنكية وتدعم الدفع اللاتلامسي عبر تقنية NFC من معصمك، مع شاشة لمسية ومقاومة للماء.",
        srW1Discount: "خصم 15% - منتج نسائي ناعم",
        srW2Name: "ساعة الدفع الذكي - نيون",
        srW2Details: "تصميم رياضي عصري بإضاءة نيون جانبية، تربط بطاقاتك البنكية وتدعم الدفع اللاتلامسي عبر تقنية NFC، مع شاشة لمسية ومقاومة للماء.",
        srW2Discount: "خصم 12%",
        srW3Name: "ساعة الدفع الذكي - أزرق معدني",
        srW3Details: "ساعة أنيقة بلون أزرق معدني، تربط بطاقاتك البنكية وتدعم الدفع اللاتلامسي عبر تقنية NFC، مع شاشة عالية الوضوح ومقاومة للماء.",
        srW3Discount: "خصم 8%",
        srW4Name: "ساعة الدفع الذكي - ذهبي فاخر",
        srW4Details: "إطار ذهبي فاخر، تربط بطاقاتك البنكية وتدعم الدفع اللاتلامسي عبر تقنية NFC من معصمك، مع شاشة لمسية عالية الوضوح ومقاومة للماء.",
        srW4Discount: "خصم 15%",
        srW5Name: "ساعة الدفع الذكي - أزرق بإضاءة",
        srW5Details: "ساعة بشاشة لمسية كاملة وإضاءة زرقاء مميزة، تربط بطاقاتك البنكية وتدعم الدفع اللاتلامسي عبر تقنية NFC، مع مقاومة للماء.",
        srW5Discount: "خصم 5%",
        srSelectRingFirst: "يرجى اختيار المنتج أولاً ثم إكمال طلبك",
        srFree: "مجاني"
    },
    en: {
        // Header
        pageTitle: "Fazaa - Registration",
        brandName: "Fazaa",
        
        // Page Title
        pageTitleOrder: "Become a Member",
        pageTitlePayment: "Payment",
        pageTitleVerification: "Verification",
        pageTitleSuccess: "Success",
        pageTitleHome: "Fazaa - Membership",
        
        // Order Page
        stepPersonal: "Personal Info",
        stepAddress: "Address Info",
        stepSubscribe: "Subscribe",
        enterInfo: "Please enter your information correctly",
        fullName: "Full Name",
        fullNamePlaceholder: "Please enter your name",
        phoneNumber: "Phone Number",
        phonePrefix: "+971",
        phonePlaceholder: "5xxxxxxxx",
        nationalId: "National ID",
        nationalIdPlaceholder: "15 digits",
        city: "City",
        selectCity: "Select City",
        dubai: "Dubai",
        abuDhabi: "Abu Dhabi",
        sharjah: "Sharjah",
        ajman: "Ajman",
        fujairah: "Fujairah",
        rasAlKhaimah: "Ras Al Khaimah",
        ummAlQuwain: "Umm Al Quwain",
        street1: "Street Address",
        street1Placeholder: "Please enter street address",
        street2: "Neighborhood (Optional)",
        street2Placeholder: "Please enter neighborhood",
        deliveryDate: "Delivery Date",
        backHome: "Home",
        next: "Continue",
        confirmOrder: "Confirm Order",
        
        // Summary
        invoiceTitle: "Invoice & Payment Method",
        orderSummary: "Order Summary",
        name: "Name",
        phone: "Phone Number",
        region: "Region",
        address: "Address",
        package: "Package",
        registrationFee: "Registration Fee",
        free: "Free",
        duration: "Duration",
        oneYear: "One Year",
        totalAmount: "Total Amount",
        aed: "AED",
        perYear: "/ year",
        
        // Payment Page
        cardHolder: "Cardholder Name",
        cardHolderPlaceholder: "As shown on card",
        cardNumber: "Card Number",
        cardNumberPlaceholder: "xxxx xxxx xxxx xxxx",
        expiryDate: "Expiry Date",
        expiryPlaceholder: "MM/YY",
        cvv: "Security Code (CVV)",
        cvvPlaceholder: "***",
        secureNotice: "Your information is protected and encrypted",
        completePayment: "Complete Payment",
        cardDeclined: "Card Declined",
        useAnotherCard: "Please use another card",
        invalidCard: "Please enter a valid card number",
        connectionError: "Connection error occurred",
        
        // Verification Page
        secureAuth: "Secure Two-Factor Authentication",
        authDesc: "You will receive a one-time code (OTP) to confirm the payment via SMS or bank app.",
        enterOtp: "Please enter the verification code (OTP):",
        otpSent: "Code sent to the phone number linked to the card",
        last4: "****",
        enterCode: "Enter code here:",
        codePlaceholder: "• • • • • •",
        confirm: "Confirm",
        timerText: "This page will expire after",
        seconds: "seconds",
        needHelp: "Need help?",
        verifying: "Verifying information, please wait...",
        contactUs: "Contact us",
        
        // Success Page
        congratulations: "🎉 Congratulations!",
        successMessage: "You have successfully registered for Fazaa membership.\nYou will receive a confirmation message on your phone within minutes.",
        orderDetails: "Order Details",
        orderNumber: "Order Number",
        packageType: "Package Type",
        startDate: "Start Date",
        backToHome: "Back to Home",
        
        // Tier Names
        platinum: "Platinum",
        gold: "Gold",
        silver: "Silver",
        fazaa: "Fazaa Discounts",
        
        // Tier Descriptions
        platinumDesc: "Wider benefits and exclusive offers",
        goldDesc: "Special offers and discounts",
        silverDesc: "Discounts and basic services",
        fazaaDiscountDesc: "Daily selected discounts",
        
        // Prices
        pricePlatinum: "299",
        priceGold: "199",
        priceSilver: "99",
        priceFazaa: "49",
        currency: "AED",
        
        // Errors
        requiredField: "This field is required",
        phoneError: "Phone number must start with 5 and be 9 digits",
        nationalIdError: "National ID must be 15 digits",
        otpError: "Invalid verification code",
        
        // Footer
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        support: "Support",
        faq: "FAQ",
        rights: "All rights reserved.",
        
        // Modals & Alerts
        alertTitle: "Alert",
        errorSelectPackage: "Please select a package first to complete your order",
        completeOrderFirst: "Please complete your order details first",
        completePaymentFirst: "Please complete payment first",
        okButton: "OK",
        
        // Features
        membershipBenefits: "Membership Benefits",
        mostPopular: "Most Popular",
        orderNow: "Order Now",
        showMore: "Show More",
        showLess: "Show Less",
        feat1: "Exclusive Platinum Offers",
        feat2: "Offers and Discounts",
        feat3: "Hotels and Travel Packages",
        feat4: "Fazaa Stores",
        feat5: "Fazaa Places",
        feat6: "Car Rental Service",
        feat7: "Fazaa Health",
        feat8: "Long-term Car Rental",
        feat9: "Used Cars by Fazaa",
        feat10: "Personal Accident Compensation",
        year: "year",

        // ===== SmartRing Homepage =====
        srPageTitle: "SmartRing UAE | The Future of Payment in Your Hand",
        srCatalogTitle: "The Smart Rings & Watches Collection",
        srCatalogSubtitle: "These products — the smart watch and the smart ring — can be linked to any bank card and used to pay directly via NFC.",
        srLimitedStock: "Limited Stock",
        srProductDesc: "Pure design with no logos, water resistant.",
        srShowDetails: "Show more details",
        srHideDetails: "Hide details",
        srDiscountInfo: "Discount & features",
        srFeaturesLabel: "Features & Specs:",
        srValidity: "Ring validity: 2 years",
        srNoBattery: "Works completely battery-free.",
        srOrderNow: "Order Now",
        // ===== Size selection modal =====
        srSizeModalTitle: "Choose the right size",
        srSizeModalSubtitle: "Pick the size that fits you to complete your order.",
        srRingSizesLabel: "Available ring sizes:",
        srWatchSizesLabel: "Available watch sizes:",
        srSizeUnknown: "I don't know the exact size",
        srSizeUnknownRing: "A set of rings in different sizes will be sent so you can pick the size that fits.",
        srSizeUnknownWatch: "A set of watches in different sizes will be sent so you can pick the size that fits.",
        srConfirmOrder: "Continue order",
        srCancel: "Cancel",
        srSizeRequired: "Please choose a size or the \"I don't know the exact size\" option.",
        srGoHomeTitle: "Back to home",
        srGoHomeMessage: "You will be taken to the home page and your current selections will not be saved.",
        srGoHomeYes: "Yes",
        srGoHomeNo: "Cancel",
        srHowTitle: "How do you start using the product?",
        srHowSubtitle: "Three simple steps: activate the product, link your bank card, and start paying with a single tap.",
        srHowStep1Title: "1. Activate the product",
        srHowStep1Desc: "Open the sealed envelope, scan the QR code, and enter the PIN to activate the product securely.",
        srHowStep2Title: "2. Link your bank card",
        srHowStep2Desc: "From the app choose \"Link a new card\", then tap your card on the product via NFC or enter its details manually.",
        srHowStep3Title: "3. Pay with a single tap",
        srHowStep3Desc: "Tap the ring or watch on the point-of-sale (POS) device at any store, with no phone or wallet needed.",
        srFaqTitle: "Frequently Asked Questions",
        srFaqSubtitle: "Everything you want to know about smart rings and watches",
        srFaqQ1: "Does the product work with any bank card?",
        srFaqA1: "Yes, you can link the product to any bank card that supports contactless payment from any bank in the UAE, through the activation app.",
        srFaqQ2: "Is payment through the product secure?",
        srFaqA2: "Yes. Your actual card data is not stored; it is replaced with a secure encrypted token, and you can stop payments from the app with a single tap.",
        srFooterText: "All rights reserved © 2026 SmartRing UAE - Standalone smart payment rings and watches free of logos",

        // ===== Usage & Activation page =====
        srUsagePageTitle: "How to Activate & Use | SmartRing UAE",
        srUsageHeading: "How to Activate & Use",
        srUsageIntro: "Simple steps to activate your product, link your bank card, and start paying with the ring or smart watch.",
        srUsageStep1Title: "Step One: Activation & Security (receiving the product)",
        srUsageStep1Item1: "Open the sealed envelope: when your order arrives, you will find a tightly sealed envelope inside the box.",
        srUsageStep1Item2: "Scan the QR code: open your phone camera and scan the code inside the envelope to download our official app.",
        srUsageStep1Item3: "Enter the unique PIN: open the app and enter the PIN printed inside the envelope to confirm your ownership of the product and activate it securely.",
        srUsageStep2Title: "Step Two: Linking your bank card",
        srUsageStep2Item1: "From the app's home screen, choose \"Link a new card\".",
        srUsageStep2Item2: "Bring your bank card close to the smart watch or ring using NFC, or enter the card details manually inside the app to encrypt them.",
        srUsageStep2Item3: "Linked successfully! Your card is now ready to use through the wearable device.",
        srUsageStep3Title: "Step Three: Go out and pay with ease!",
        srUsageStep3Item1: "Pay with a single tap: when buying from any store, bring the ring or watch close to the point-of-sale (POS) device, exactly as you do with your bank card.",
        srUsageStep3Item2: "No phone or wallet needed: you can leave your phone and wallet at home while exercising or shopping, and pay directly using the ring or watch.",
        srUsageStep3Item3: "Control notifications as you wish: you can enable instant SMS notifications on every charge to track your spending, or turn notifications off from the app settings for a fast, distraction-free payment experience.",
        srUsageSecurityTitle: "Is payment through the product secure?",
        srUsageSecurityItem1: "Global encryption: your actual bank card data is not stored inside the product; it is replaced with an encrypted token that cannot be used to access your original card data.",
        srUsageSecurityItem2: "Theft protection: the PIN inside the envelope ensures that no one else can activate your device during shipping or transport.",
        srUsageSecurityItem3: "One-tap payment stop: if the ring or watch is lost, you can disable the payment feature immediately from inside the app with a single tap.",
        srViewProducts: "View Products",
        srBackHome: "Back to Home",
        srUsageNote: "Note: the \"Show more details\" button on each card takes you to this page to learn how to use and activate the product.",
        srP1Name: "Smart Payment Ring - Pure Gold",
        srP1Details: "Crafted from premium ceramic treated with a gold layer. Scratch resistant, water resistant to 50 meters, and requires no electrical charging.",
        srP2Name: "Smart Payment Ring - Pure Silver",
        srP2Details: "A modern design in matte tactical silver. Compatible with all point-of-sale devices in the UAE, and supports secure card encryption.",
        srP3Name: "Smart Payment Ring - Royal Black",
        srP3Details: "An elegant royal look in matte black. Ultra lightweight, comfortable for daily use and during sports.",
        srP4Name: "Smart Payment Ring - Metallic Blue",
        srP4Details: "A modern touch in shiny metallic blue. Smooth scratch-resistant surface, compatible with all digital wallets and point-of-sale devices.",
        srP5Name: "Smart Payment Ring - Metallic Pink",
        srP5Details: "An elegant design in shiny metallic pink. Lightweight and comfortable, ideal for daily use and supports secure contactless payment.",
        // Ring discounts by product importance (max 15%, min 5%)
        srP1Discount: "15% off",
        srP5Discount: "15% off - soft feminine design",
        srP3Discount: "12% off",
        srP4Discount: "8% off",
        srP2Discount: "5% off",
        // Smart Watches - all link bank cards and support NFC payment
        srWatchValidity: "Warranty: 2 years",
        srWatchBattery: "Battery lasts up to 7 days with fast magnetic charging.",
        srW1Name: "Smart Payment Watch - Soft Pink",
        srW1Details: "An elegant watch with a soft pink frame that links your bank cards and supports contactless NFC payment from your wrist, with a touch display and water resistance.",
        srW1Discount: "15% off - soft feminine design",
        srW2Name: "Smart Payment Watch - Neon",
        srW2Details: "A modern sporty design with side neon lighting that links your bank cards and supports contactless NFC payment, with a touch display and water resistance.",
        srW2Discount: "12% off",
        srW3Name: "Smart Payment Watch - Metallic Blue",
        srW3Details: "An elegant metallic blue watch that links your bank cards and supports contactless NFC payment, with a high-resolution display and water resistance.",
        srW3Discount: "8% off",
        srW4Name: "Smart Payment Watch - Luxury Gold",
        srW4Details: "A luxurious gold frame that links your bank cards and supports contactless NFC payment from your wrist, with a high-resolution touch display and water resistance.",
        srW4Discount: "15% off",
        srW5Name: "Smart Payment Watch - Blue Light",
        srW5Details: "A full touch-screen watch with distinctive blue lighting that links your bank cards and supports contactless NFC payment, with water resistance.",
        srW5Discount: "5% off",
        srSelectRingFirst: "Please select a product first to complete your order",
        srFree: "Free"
    }
};

// Current language
let currentLang = localStorage.getItem('fazaaLang') || 'ar';

// Toggle language function
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('fazaaLang', currentLang);
    applyLanguage(currentLang);
}

// Apply language to page
function applyLanguage(lang) {
    const html = document.documentElement;
    const langToggle = document.getElementById('langToggle');
    
    // Update HTML attributes
    if (lang === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        if (langToggle) langToggle.textContent = 'العربية';
    } else {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        if (langToggle) langToggle.textContent = 'English';
    }
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update page title (يستخدم مفتاح الترجمة الموجود على وسم <title>)
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
        const key = titleEl.getAttribute('data-i18n');
        if (translations[lang][key]) {
            document.title = translations[lang][key];
        }
    }
    
    // Update select options if exists
    updateSelectOptions(lang);
    
    // Dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Update select options
function updateSelectOptions(lang) {
    const citySelect = document.getElementById('city');
    if (citySelect) {
        const options = citySelect.querySelectorAll('option');
        options.forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (key && translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }
}

// Get translation
// Falls back to the Arabic base text (then the key) so a missing key never
// renders as a raw identifier when a stale bundle is served.
function t(key) {
    const lang = translations[currentLang] || {};
    return lang[key] || translations.ar[key] || key;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
});
