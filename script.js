document.addEventListener('DOMContentLoaded', () => {
    
    // Header & Scroll Indicator Effect
    const header = document.getElementById('header');
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    
    function handleScroll() {
        const scrollPos = window.scrollY || (document.body ? document.body.scrollTop : 0) || document.documentElement.scrollTop;
        if (scrollPos > 50) {
            if (header) header.classList.add('scrolled');
            scrollIndicators.forEach(indicator => indicator.style.opacity = '0');
        } else {
            if (header) header.classList.remove('scrolled');
            scrollIndicators.forEach(indicator => indicator.style.opacity = '0.9');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (document.body) {
        document.body.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Mobile Menu Toggle & Behavior
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    function closeMobileMenu() {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.classList.remove('fa-times');
                menuToggle.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }

    function openMobileMenu() {
        if (navLinks) {
            navLinks.classList.add('active');
            if (menuToggle) {
                menuToggle.classList.add('active');
                menuToggle.classList.remove('fa-bars');
                menuToggle.classList.add('fa-times');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when any nav link is tapped
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when tapping anywhere outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && header && !header.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Close menu if viewport resized to desktop width
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    // Smooth Scrolling for Navigation Links & Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                closeMobileMenu();

                const headerOffset = header ? header.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 80; // Trigger distance for mobile

        for (let i = 0; i < reveals.length; i++) {
            const elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal, { passive: true });
    if (document.body) {
        document.body.addEventListener('scroll', reveal, { passive: true });
    }
    reveal(); // Trigger once on load

    // Before & After Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });

    // Before & After Sliders
    const sliders = document.querySelectorAll('.before-after-slider');
    sliders.forEach(slider => {
        const range = slider.querySelector('.slider-range');
        const after = slider.querySelector('.after');
        const handle = slider.querySelector('.slider-handle');
        
        if (range && after && handle) {
            range.addEventListener('input', (e) => {
                const sliderPos = e.target.value;
                after.style.width = `${sliderPos}%`;
                handle.style.left = `${sliderPos}%`;
            });
        }
    });

    // Responsive Hero Footer Handling
    const heroFooters = document.querySelectorAll('.hero-footer');
    if (heroFooters.length > 0) {
        heroFooters.forEach(f => {
            f.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
        });

        function handleFooterVisibility() {
            // Keep footer stable on mobile screens
            if (window.innerWidth <= 768) {
                heroFooters.forEach(hf => {
                    hf.style.opacity = '1';
                    hf.style.visibility = 'visible';
                });
                return;
            }

            const scrollPos = window.scrollY || (document.body ? document.body.scrollTop : 0) || document.documentElement.scrollTop;
            heroFooters.forEach(hf => {
                if (scrollPos > 50) {
                    hf.style.opacity = '0';
                    hf.style.visibility = 'hidden';
                } else {
                    hf.style.opacity = '1';
                    hf.style.visibility = 'visible';
                }
            });
        }

        window.addEventListener('scroll', handleFooterVisibility, { passive: true });
        if (document.body) {
            document.body.addEventListener('scroll', handleFooterVisibility, { passive: true });
        }
    }
});
