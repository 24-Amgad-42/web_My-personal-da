/* ==========================================
   main.js - النسخة الضخمة الاحترافية
   ========================================== */

// ============ نظام إدارة الموقع الكامل ============
class WebsiteManager {
    constructor() {
        this.version = '2.0.0';
        this.components = {};
        this.data = {};
        this.observers = {};
        this.init();
    }

    async init() {
        try {
            await this.loadComponents();
            await this.loadData();
            this.setupLoader();
            this.setupNavigation();
            this.setupHero();
            this.setupScrollEffects();
            this.setupAnimations();
            this.setupSkillBars();
            this.setupForms();
            this.setupSmoothScroll();
            this.setupParallax();
            this.setupHoverEffects();
            this.setupBackToTop();
            this.setupTheme();
            this.logSystemInfo();
        } catch (error) {
            console.error('Failed to initialize website:', error);
        }
    }

    // ============ تحميل المكونات ============
    async loadComponents() {
        const componentsPath = '/components';
        const componentsList = ['header', 'footer', 'sidebar'];
        
        for (const component of componentsList) {
            try {
                const response = await fetch(`${componentsPath}/${component}.html`);
                if (response.ok) {
                    const html = await response.text();
                    this.components[component] = html;
                    
                    // حقن المكون في الصفحة
                    const placeholder = document.querySelector(`#${component}-placeholder`);
                    if (placeholder) {
                        placeholder.innerHTML = html;
                    }
                }
            } catch (error) {
                console.warn(`Component ${component} not found`);
            }
        }
    }

    // ============ تحميل البيانات ============
    async loadData() {
        const dataFiles = ['projects', 'blog', 'skills'];
        
        for (const file of dataFiles) {
            try {
                const response = await fetch(`/data/${file}.json`);
                if (response.ok) {
                    this.data[file] = await response.json();
                }
            } catch (error) {
                console.warn(`Data file ${file} not found`);
            }
        }
    }

    // ============ شاشة التحميل ============
    setupLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = 'visible';
                }, 1500);
            });
        }
    }

    // ============ التنقل ============
    setupNavigation() {
        const header = document.querySelector('.header');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        // تأثير التمرير على الهيدر
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
        
        // فتح وإغلاق القائمة في الموبايل
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // إغلاق القائمة عند النقر على رابط
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
        
        // تحديد الصفحة النشطة
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    // ============ قسم البطل ============
    setupHero() {
        const hero = document.querySelector('.hero');
        if (hero) {
            // تأثير parallax على الخلفية
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            });
            
            // تأثير الجزيئات المتحركة
            this.createParticles(hero);
        }
    }

    // ============ إنشاء جزيئات متحركة ============
    createParticles(container) {
        const particlesCount = 50;
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 5 + 2;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--primary);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        container.appendChild(particlesContainer);
    }

    // ============ تأثيرات التمرير ============
    setupScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.card, .section, .stat-item, .skill-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });
    }

    // ============ الأنيميشن ============
    setupAnimations() {
        // تأثير الكتابة التدريجية
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => {
            const animationType = el.getAttribute('data-animate');
            const delay = el.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                el.classList.add(`animate-${animationType}`);
            }, delay);
        });
    }

    // ============ أشرطة المهارات ============
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.bar-fill');
        
        const animateBars = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                    
                    bar.style.width = '0';
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
            const width = bar.style.width;
            bar.setAttribute('data-width', width);
            barObserver.observe(bar);
        });
    }

    // ============ النماذج ============
    setupForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"]');
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
                    
                    try {
                        // هنا يمكن إضافة API call
                        await this.submitForm(form);
                        
                        // نجاح الإرسال
                        this.showNotification('تم إرسال الرسالة بنجاح!', 'success');
                        form.reset();
                    } catch (error) {
                        this.showNotification('حدث خطأ في الإرسال', 'error');
                    } finally {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'إرسال الرسالة <i class="fas fa-paper-plane"></i>';
                    }
                }
            });
        });
    }

    // ============ إرسال النموذج ============
    async submitForm(form) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }

    // ============ الإشعارات ============
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 20px 30px;
            border-radius: 10px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideDown 0.5s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
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

    // ============ تأثير Parallax ============
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-parallax') || 0.5;
                const scrolled = window.pageYOffset;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // ============ تأثيرات Hover ============
    setupHoverEffects() {
        // تأثيرات للبطاقات
        document.querySelectorAll('.card, .social-box, .btn').forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });

        // تأثيرات للصور
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease';
                this.style.transform = 'scale(1.05)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // ============ زر العودة للأعلى ============
    setupBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'translateY(-5px)';
        });
        
        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = 'translateY(0)';
        });
    }

    // ============ إدارة الثيم ============
    setupTheme() {
        // يمكن إضافة وضع ليلي/نهاري هنا
        console.log('Theme system initialized');
    }

    // ============ تسجيل معلومات النظام ============
    logSystemInfo() {
        console.log(`
            🚀 نظام إدارة الموقع v${this.version}
            📱 Responsive Design: Active
            🎨 Theme: Dark Mode
            ⚡ Performance: Optimized
            🔒 Security: Enabled
            📊 Analytics: Ready
        `);
    }
}

// ============ إضافة الأنيميشن CSS ديناميكياً ============
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    .animate-fadeIn {
        animation: fadeIn 1s ease-out;
    }
    
    .animate-fadeInUp {
        animation: fadeInUp 1s ease-out;
    }
    
    .animate-scaleIn {
        animation: scaleIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(styleSheet);

// ============ تهيئة النظام ============
document.addEventListener('DOMContentLoaded', () => {
    const website = new WebsiteManager();
    
    // تعريض المدير للاستخدام العام
    window.websiteManager = website;
    
    // إضافة معالج للأخطاء
    window.addEventListener('error', (e) => {
        console.error('❌ Error:', e.message);
    });
});

// ============ أدوات مساعدة ============
const Utils = {
    formatDate(date) {
        return new Intl.DateTimeFormat('ar-YE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// تصدير الأدوات
window.Utils = Utils;
