// Typing Animation, Loading Screen, Scroll, Nav
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingText = document.querySelector('.loading-text');
    const mainContent = document.querySelector('.main-content');

    // Loading screen typing
    const loadText = "ROHIT VERMA";
    let li = 0;
    loadingText.textContent = '';

    function typeLoad() {
        if (li < loadText.length) {
            loadingText.textContent += loadText.charAt(li);
            li++;
            setTimeout(typeLoad, 120);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                mainContent.classList.remove('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    startHeroTyping();
                    initScrollAnimations();
                }, 500);
            }, 900);
        }
    }
    typeLoad();

    // Hero typing effect (simple)
    function startHeroTyping() {
        const typedEl = document.querySelector('.typed-text');
        if (!typedEl) return;

        const words = [
            'Tech Enthusiast',
            'Full-Stack Developer',
            'Web & Data Explorer'
        ];

        let wIndex = 0;
        let cIndex = 0;
        let deleting = false;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const typeDelay = prefersReduced ? 0 : 120;
        const deleteDelay = prefersReduced ? 0 : 60;
        const holdDelay = prefersReduced ? 800 : 1600;

        function tick() {
            const current = words[wIndex];
            if (!deleting) {
                cIndex++;
                typedEl.textContent = current.substring(0, cIndex);
            } else {
                cIndex--;
                typedEl.textContent = current.substring(0, cIndex);
            }

            let delay = deleting ? deleteDelay : typeDelay;

            if (!deleting && cIndex === current.length) {
                delay = holdDelay;
                deleting = true;
            } else if (deleting && cIndex === 0) {
                deleting = false;
                wIndex = (wIndex + 1) % words.length;
                delay = 500;
            }

            setTimeout(tick, delay);
        }

        tick();
    }

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu on nav link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Smooth scroll with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (!nav) return;
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 220) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // Scroll reveal animations
    function initScrollAnimations() {
        const reveals = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            reveals.forEach(el => el.classList.add('active'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(reveal => revealObserver.observe(reveal));
    }
});
