(function () {
    const canvas = document.getElementById('space-particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const mouseGlow = document.getElementById('space-mouse-glow');
    let w, h;
    const mouse = { x: null, y: null, radius: 220 };
    const particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', () => { resize(); initParticles(); });
    resize();

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (mouseGlow) {
            mouseGlow.style.left = `${mouse.x}px`;
            mouseGlow.style.top = `${mouse.y}px`;
        }
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
        if (mouseGlow) {
            mouseGlow.style.top = '-1000px';
            mouseGlow.style.left = '-1000px';
        }
    });

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.baseX = this.x;
            this.baseY = this.y;
            this.size = Math.random() * 1.6 + 0.7;
            this.speed = Math.random() * 1.4 + 0.6;
            const alpha = Math.random() * 0.45 + 0.25;
            this.color = `rgba(255, 220, 120, ${alpha})`;
            this.glowColor = `rgba(255, 220, 120, 0.06)`;
            this.angle = Math.random() * Math.PI * 2;
            this.angleSpeed = (Math.random() - 0.5) * 0.003;
            this.floatRadius = Math.random() * 12 + 3;
        }
        update() {
            this.angle += this.angleSpeed;
            let floatX = this.baseX + Math.cos(this.angle) * this.floatRadius;
            let floatY = this.baseY + Math.sin(this.angle) * this.floatRadius;

            if (mouse.x != null) {
                let dx = mouse.x - this.x, dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * this.speed * 1.2;
                    this.y += (dy / dist) * force * this.speed * 1.2;
                } else {
                    this.x += (floatX - this.x) * 0.03;
                    this.y += (floatY - this.y) * 0.03;
                }
            } else {
                this.x += (floatX - this.x) * 0.03;
                this.y += (floatY - this.y) * 0.03;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = this.glowColor;
            ctx.fill();
        }
    }

    function initParticles() {
        particles.length = 0;
        let count = Math.min(Math.floor((w * h) / 6000), 300);
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function drawCursorGlow() {
        if (mouse.x == null) return;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        grad.addColorStop(0, 'rgba(255, 220, 120, 0.14)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 220, 120, ${(1 - dist / 100) * 0.18})`;
                    ctx.lineWidth = 0.4;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        drawCursorGlow();
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    const topLinks = document.querySelectorAll('.top-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const allNavLinks = [...topLinks, ...mobileLinks];

    const sections = Array.from(topLinks)
        .map(link => {
            const target = link.getAttribute('href');
            return target.startsWith('#') && target.length > 1 ? document.querySelector(target) : null;
        })
        .filter(Boolean);

    function setActiveLink(targetId) {
        topLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`));
        mobileLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`));
    }

    // Smooth Scroll for Desktop Navigation Links
    topLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth' });
                setActiveLink(targetId);
            }
        });
    });

    // Mobile Navigation Controls
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');

    function openMobileMenu() {
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeMobileMenu() {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileNavOverlay) {
        // Close if click outside panel
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Mobile Links Click Handler
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSec = document.getElementById(targetId);
            closeMobileMenu();
            if (targetSec) {
                setTimeout(() => {
                    targetSec.scrollIntoView({ behavior: 'smooth' });
                    setActiveLink(targetId);
                }, 300); // Wait for transition out
            }
        });
    });

    // Mobile CTA click
    const mobileNavCta = document.querySelector('.mobile-nav-cta');
    if (mobileNavCta) {
        mobileNavCta.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            setTimeout(() => {
                const contactSec = document.getElementById('contact');
                if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    }

    function updateActiveOnScroll() {
        const scrollPosition = window.scrollY + 120;
        let currentId = sections[0]?.id || 'home';

        for (const section of sections) {
            if (section.offsetTop <= scrollPosition) {
                currentId = section.id;
            }
        }

        setActiveLink(currentId);
    }

    window.addEventListener('scroll', updateActiveOnScroll);
    window.addEventListener('resize', updateActiveOnScroll);
    updateActiveOnScroll();

    // ==================== COURSE SCROLL ANIMATION ====================
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
        coursesSection.classList.add('js-reveal');
        const sectionTitle = coursesSection.querySelector('.section-title');
        const sectionSubtitle = coursesSection.querySelector('.section-subtitle');
        const courseCards = coursesSection.querySelectorAll('.glass-container');

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (sectionTitle) {
                    sectionTitle.classList.add('visible');
                }
                if (sectionSubtitle) {
                    sectionSubtitle.classList.add('visible');
                }

                courseCards.forEach((card, index) => {
                    const delay = index * 100;
                    card.classList.add(index % 2 === 0 ? 'from-left' : 'from-right');
                    card.style.transitionDelay = `${delay}ms`;
                    requestAnimationFrame(() => card.classList.add('visible'));
                });

                observer.disconnect();
            });
        }, {
            threshold: 0.25
        });

        revealObserver.observe(coursesSection);
    }

    // ==================== BUTTON FUNCTIONALITY ====================
    
    // Course Details Modal
    const courseDetails = {
        'DCA': {
            duration: '6 months',
            price: 'Contact us',
            description: 'Diploma in Computer Applications - Master desktop publishing, database management, and web fundamentals.'
        },
        'ADCA': {
            duration: '12 months',
            price: 'Contact us',
            description: 'Advanced Diploma in Computer Applications - Deep technical expertise and systems administration skills.'
        },
        'CCC': {
            duration: '3 months',
            price: 'Contact us',
            description: 'Course on Computer Concepts - Build a strong foundation in computer fundamentals and digital literacy.'
        },
        'DTP': {
            duration: '2 months',
            price: 'Contact us',
            description: 'Desktop Publishing - Learn professional document design and layout using industry-standard tools.'
        },
        'Tally': {
            duration: '2 months',
            price: 'Contact us',
            description: 'Professional accounting software training with GST, inventory management, and financial reporting.'
        },
        'Basic': {
            duration: '1-2 months',
            price: 'Contact us',
            description: 'Foundational computer skills - Operating systems, office productivity, and digital literacy essentials.'
        },
        "'O' Level": {
            duration: '6 months',
            price: 'Contact us',
            description: 'Advanced computer certification - Intermediate level programming and advanced application software skills.'
        },
        'Office Automation': {
            duration: '2 months',
            price: 'Contact us',
            description: 'Master MS Office suite, spreadsheets, presentations, and document management for professional workplace efficiency.'
        },
        'Hindi/English Typing': {
            duration: '1-3 months',
            price: 'Contact us',
            description: 'Professional typing skills in both Hindi and English - Essential for secretarial and data entry positions.'
        }
    };

    // "Learn More" Button Handler - for course cards
    if (coursesSection) {
        const courseButtons = coursesSection.querySelectorAll('button');
        courseButtons.forEach(button => {
            if (button.textContent.includes('Learn More')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const courseTitle = this.closest('.glass-container').querySelector('h3').textContent;
                    const details = courseDetails[courseTitle];
                    if (details) {
                        alert(`${courseTitle}\n\n⏱️ Duration: ${details.duration}\n💰 Price: ${details.price}\n\n📝 ${details.description}\n\nRedirecting to enrollment...`);
                        console.log('Course enrollment initiated for:', courseTitle);
                    }
                });
            }
        });
    }

    // "Join Now" Button Handler
    const joinButton = document.querySelector('.top-cta');
    if (joinButton) {
        joinButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // "Explore Courses" - Already has href, but add smooth scroll enhancement
    const exploreCourses = document.querySelector('a[href="#courses"]');
    if (exploreCourses) {
        exploreCourses.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // "View Schedule" Button Handler
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const allButtons = heroSection.querySelectorAll('button');
        allButtons.forEach(btn => {
            if (btn.textContent.includes('View Schedule')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('📅 Schedule Coming Soon!\n\nWe\'re preparing our detailed course schedule. Subscribe to our newsletter to get notified when schedules are available!');
                });
            }
        });
    }

    // Contact Form Handler — WhatsApp Integration
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        const WHATSAPP_NUMBER = '918808774238'; // India country code + number

        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formError = document.getElementById('form-error');
            const formSuccess = document.getElementById('form-success');
            formError.classList.add('hidden');
            formSuccess.classList.add('hidden');

            const name = document.getElementById('inquiry-name').value.trim();
            const email = document.getElementById('inquiry-email').value.trim();
            const phone = document.getElementById('inquiry-phone').value.trim();
            const course = document.getElementById('inquiry-course').value;
            const message = document.getElementById('inquiry-message').value.trim();

            // Validation: Name is required
            if (!name) {
                formError.textContent = '❌ Please apna naam likhen!';
                formError.classList.remove('hidden');
                document.getElementById('inquiry-name').focus();
                return;
            }

            // Validation: At least one of email or phone required
            if (!email && !phone) {
                formError.textContent = '❌ Email ya Phone Number — kam se kam ek toh dena zaruri hai!';
                formError.classList.remove('hidden');
                document.getElementById('inquiry-email').focus();
                return;
            }

            // Validation: If email is provided, check format
            if (email && !email.includes('@')) {
                formError.textContent = '❌ Please sahi email address likhen!';
                formError.classList.remove('hidden');
                document.getElementById('inquiry-email').focus();
                return;
            }

            // Validation: If phone is provided, check minimum length
            if (phone && phone.replace(/\D/g, '').length < 10) {
                formError.textContent = '❌ Please sahi phone number likhen (kam se kam 10 digit)!';
                formError.classList.remove('hidden');
                document.getElementById('inquiry-phone').focus();
                return;
            }

            // Build WhatsApp message
            let waMsg = `🎓 *kTech Computer Centre — New Inquiry*\n\n`;
            waMsg += `👤 *Name:* ${name}\n`;
            if (email) waMsg += `📧 *Email:* ${email}\n`;
            if (phone) waMsg += `📱 *Phone:* ${phone}\n`;
            if (course) waMsg += `📚 *Interested Course:* ${course}\n`;
            if (message) waMsg += `💬 *Message:* ${message}\n`;
            waMsg += `\n📅 *Date:* ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`;

            // Encode and open WhatsApp
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

            // Show success message
            formSuccess.innerHTML = '✅ Inquiry taiyar hai! WhatsApp khul raha hai... <br><span class="text-xs text-on-surface-variant">Agar WhatsApp nahi khula toh <a href="' + waUrl + '" target="_blank" class="underline text-surface-tint">yahan click karein</a></span>';
            formSuccess.classList.remove('hidden');

            // Open WhatsApp in new tab
            window.open(waUrl, '_blank');

            // Clear form after short delay
            setTimeout(() => {
                inquiryForm.reset();
            }, 1500);

            console.log('Inquiry sent to WhatsApp:', { name, email, phone, course, message });
        });
    }

})();
