document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            const targetId = this.getAttribute('href');
            if(targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // offset for 90px header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100; // Trigger distance

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    // Run reveal on load and scroll
    window.addEventListener('scroll', reveal);
    reveal(); // Trigger once on load

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

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
});
document.addEventListener('DOMContentLoaded', () => {
    // Fade out hero footer on scroll
    const scrollContainer = document.querySelector('body.snap-page') || document.documentElement;
    const heroFooter = document.querySelector('.hero-footer');
    
    if (heroFooter) {
        // We add a transition in JS to ensure it's applied
        heroFooter.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
        
        scrollContainer.addEventListener('scroll', () => {
            if (scrollContainer.scrollTop > 50) {
                heroFooter.style.opacity = '0';
                heroFooter.style.visibility = 'hidden';
            } else {
                heroFooter.style.opacity = '1';
                heroFooter.style.visibility = 'visible';
            }
        });
        
        // Also listen to window scroll in case body isn't the scroll container on some browsers
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                heroFooter.style.opacity = '0';
                heroFooter.style.visibility = 'hidden';
            } else {
                heroFooter.style.opacity = '1';
                heroFooter.style.visibility = 'visible';
            }
        });
    }
});
