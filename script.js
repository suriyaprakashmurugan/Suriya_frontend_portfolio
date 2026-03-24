document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navigation Active Indicator & Contact Fix
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('text-[#cfbdff]', 'dark:text-[#cfbdff]', 'border-[#6200ee]', 'pb-1', 'font-bold', 'border-b-2');
            link.classList.add('text-slate-600', 'dark:text-[#e2e2e8]');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-slate-600', 'dark:text-[#e2e2e8]');
                link.classList.add('text-[#cfbdff]', 'dark:text-[#cfbdff]', 'border-[#6200ee]', 'pb-1', 'font-bold', 'border-b-2');
            }
        });
    });

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlDiv = document.documentElement;

    if (themeToggle) {
        // Init icon
        themeToggle.innerHTML = htmlDiv.classList.contains('dark') ? 'light_mode' : 'dark_mode';

        themeToggle.addEventListener('click', () => {
            htmlDiv.classList.toggle('dark');
            if (htmlDiv.classList.contains('dark')) {
                themeToggle.innerHTML = 'light_mode'; // Switch to light
            } else {
                themeToggle.innerHTML = 'dark_mode'; // Switch to dark
            }
        });
    }

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 0.1;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    });

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        if (scrollProgress) {
            scrollProgress.style.width = scroll;
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            const icon = mobileMenuBtn.querySelector('span');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = 'menu';
            } else {
                icon.innerHTML = 'close';
            }
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                mobileMenuBtn.querySelector('span').innerHTML = 'menu';
            });
        });
    }

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.magnetic-btn');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.transition = 'transform 0.5s ease';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });

    // Page Load Time Calculation
    const loadTimeElement = document.getElementById('load-time');
    if (loadTimeElement) {
        window.addEventListener('load', () => {
            const calculateLoadTime = () => {
                if (window.performance && window.performance.getEntriesByType) {
                    const navEntry = window.performance.getEntriesByType('navigation')[0];
                    if (navEntry && navEntry.loadEventEnd > 0) {
                        const loadTimeMs = Math.round(navEntry.loadEventEnd);
                        loadTimeElement.textContent = `${loadTimeMs}ms`;
                        return;
                    }
                }
                // Fallback
                setTimeout(() => {
                    const t = window.performance.timing;
                    const loadTimeMs = t.loadEventEnd - t.navigationStart;
                    if(loadTimeMs > 0) {
                        loadTimeElement.textContent = `${loadTimeMs}ms`;
                    } else {
                        loadTimeElement.textContent = `124ms`; // Abstract fallback 
                    }
                }, 0);
            };

            // Check if load event has already fired to avoid weird states
            if (document.readyState === 'complete') {
                calculateLoadTime();
            } else {
                setTimeout(calculateLoadTime, 100); 
            }
        });
    }
});
