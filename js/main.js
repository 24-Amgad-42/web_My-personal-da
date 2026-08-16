/* ==========================================
   main.js - النسخة الاحترافية
   ========================================== */

// ============ الكائن الرئيسي للموقع ============
class WebsiteManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupSkillBars();
        this.setupForms();
        this.setupSmoothScroll();
        this.setupHoverEffects();
        this.logSystemStatus();
    }

    // ============ إعداد التنقل ============
    setupNavigation() {
        // تحديد الصفحة النشطة
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.includes(currentPage)) {
                link.classList.add('active');
            }
            
            // إضافة تأثير hover
            link.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0)';
            });
        });

        // تأثير الهيدر عند التمرير
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    // ============ تأثيرات التمرير ============
    setupScrollEffects() {
        // إظهار العناصر عند التمرير
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // مراقبة البطاقات والأقسام
        document.querySelectorAll('.card, section, .edu-card, .skill-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // ============ الأنيميشن ============
    setupAnimations() {
        // تأثير الكتابة التدريجية للعناوين الرئيسية
        const mainHeading = document.querySelector('h1');
        if (mainHeading) {
            mainHeading.style.opacity = '0';
            mainHeading.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                mainHeading.style.transition = 'all 1s ease-out';
                mainHeading.style.opacity = '1';
                mainHeading.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // ============ أشرطة المهارات ============
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.bar-fill');
        
        const animateBars = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                    
                    // إعادة تعيين العرض أولاً
                    bar.style.width = '0';
                    
                    // ثم تحريكه للعرض المطلوب
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                    
                    observer.unobserve(bar);
                }
            });
        };

        const barObserver = new IntersectionObserver(animateBars, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            // حفظ العرض الأصلي
            const width = bar.style.width;
            bar.setAttribute('data-width', width);
            
            // بدء المراقبة
            barObserver.observe(bar);
        });
    }

    // ============ النماذج ============
    setupForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"]');
                
                if (submitBtn) {
                    // تعطيل الزر أثناء الإرسال
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
                    
                    // إعادة تفعيل الزر بعد فترة
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'إرسال الرسالة <i class="fas fa-paper-plane"></i>';
                    }, 3000);
                }
            });
            
            // إضافة تأثيرات للـ inputs
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
            });
        });
    }

    // ============ التمرير السلس ============
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // ============ تأثيرات hover ============
    setupHoverEffects() {
        // تأثيرات للبطاقات
        document.querySelectorAll('.card, .edu-card, .social-box').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });

        // تأثير parallax بسيط للصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease';
                this.style.transform = 'scale(1.05)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // ============ تسجيل حالة النظام ============
    logSystemStatus() {
        console.log('%c🚀 System Initialized Successfully', 'color: #00adb5; font-size: 16px; font-weight: bold;');
        console.log('%c📱 Responsive Design: Active', 'color: #00adb5;');
        console.log('%c🎨 Theme: Dark Mode', 'color: #00adb5;');
        console.log('%c⚡ Performance: Optimized', 'color: #00adb5;');
    }
}

// ============ تهيئة الموقع عند التحميل ============
document.addEventListener('DOMContentLoaded', () => {
    // إنشاء نسخة من مدير الموقع
    const website = new WebsiteManager();
    
    // إضافة معالج للأخطاء
    window.addEventListener('error', (e) => {
        console.error('❌ Error detected:', e.message);
    });
    
    // إضافة دعم للتحميل الكسول للصور
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// ============ وظائف مساعدة ============
// تنسيق الوقت والتاريخ
function formatDate(date) {
    return new Intl.DateTimeFormat('ar-YE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// حفظ التفضيلات في localStorage
const StorageManager = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// تصدير الوظائف للاستخدام العام
window.WebsiteManager = WebsiteManager;
window.StorageManager = StorageManager;
window.formatDate = formatDate;
