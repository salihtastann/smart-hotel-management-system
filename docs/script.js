function showPage(pageId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(`'${pageId}'`)) item.classList.add('active');
    });

    // Sayfa değiştirildiğinde en yukarı kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.history.pushState({}, '', `#${pageId}`);
    
    // Sayfa değiştiğinde sayaçları ve grafikleri yeniden başlat
    if (pageId === 'home') {
        startCounters();
    }
}

function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count) + (target === 99 ? '%' : '');
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (target === 99 ? '%' : '');
            }
        };
        updateCount();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash);

    // Mobil Menü Mantığı
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            if(navActions) navActions.classList.toggle('show');
            const btnIcon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                btnIcon.className = 'fas fa-times';
            } else {
                btnIcon.className = 'fas fa-bars';
            }
        });
    }

    // Herhangi bir menü öğesine tıklanınca mobil menüyü kapat
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                if(navActions) navActions.classList.remove('show');
                if(mobileBtn) mobileBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    });

    themeToggle.addEventListener('click', (e) => {
        const overlay = document.getElementById('theme-transition-overlay');
        const isCurrentlyDark = body.classList.contains('dark-mode');
        
        // Tıklanan yere overlayi taşı
        overlay.style.top = `${e.clientY}px`;
        overlay.style.left = `${e.clientX}px`;
        
        // Yeni temaya göre arkaplanı ayarla (Ne renge dönüşecek?)
        overlay.style.background = isCurrentlyDark ? '#f8fafc' : '#0f172a'; 
        
        // Animasyonu başlat
        overlay.classList.add('theme-transitioning');
        
        // Ekran kaplandığında asıl tema değişimini yap (0.4s sonra)
        setTimeout(() => {
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');
            const isDark = body.classList.contains('dark-mode');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('hotel-theme', isDark ? 'dark' : 'light');
        }, 400);

        // Animasyon bitince overlayi topla
        setTimeout(() => {
            overlay.classList.remove('theme-transitioning');
        }, 800);
    });

    const savedTheme = localStorage.getItem('hotel-theme');
    if (savedTheme === 'light') {
        body.classList.replace('dark-mode', 'light-mode');
    }
});

/* --- YENİ EKLENEN İŞLEVLER --- */

// Video Modal
function openVideoModal() {
    document.getElementById('video-modal').classList.add('active');
    document.getElementById('promo-video').play();
}

function closeVideoModal() {
    document.getElementById('video-modal').classList.remove('active');
    document.getElementById('promo-video').pause();
}

// Galeri Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.gallery-dots');

if (slides.length > 0) {
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });
}

function updateSlider() {
    const slider = document.querySelector('.gallery-slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.slide').forEach((s, index) => {
        s.classList.toggle('active', index === currentSlide);
    });
    document.querySelectorAll('.dot').forEach((d, index) => {
        d.classList.toggle('active', index === currentSlide);
    });
}

function prevSlide() {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    updateSlider();
}

// SSS (FAQ Akordeon)
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// Animasyonlu Donut Grafik (Sadece ilgili section veya sayfa göründüğünde)
function animateChart() {
    const chart = document.getElementById('dashboard-donut');
    if (!chart) return;
    
    const percentage = 85; 
    let current = 0;
    const interval = setInterval(() => {
        if (current >= percentage) {
            clearInterval(interval);
        } else {
            current += 1;
            chart.style.background = `conic-gradient(var(--primary) ${current}%, var(--glass-border) 0)`;
        }
    }, 20); // Animasyon hızı
}

// Intersect Observer ile element ekrana girince grafiği tetikletme
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChart();
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Mouse Takip (Glow Efekti)
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".glass-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

// Otomatik Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// Typewriter Log Efekti (Log Kısmı Ekrana Girince Tetiklenecek)
let typingStarted = false;
function typeLogLines() {
    if (typingStarted) return;
    typingStarted = true;
    
    const lines = document.querySelectorAll('.log-line');
    let delay = 0;
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            if (index > 0) {
                // Öncekini tamamladı olarak işaretle ki imleç kaybolsun
                lines[index-1].classList.remove('typed');
                lines[index-1].classList.add('finished');
            }
            line.classList.add('typed');
        }, delay);
        // Her satır 1.5 saniyede yazılsın, üzerine ekstra 0.5s bekleme
        delay += 1500;
    });
    
    // Sonuncuyu da sabitle
    setTimeout(() => {
        if(lines.length > 0) {
            lines[lines.length - 1].classList.remove('typed');
            lines[lines.length - 1].classList.add('finished');
        }
    }, delay);
}

const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            typeLogLines();
            typeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });


document.addEventListener('DOMContentLoaded', () => {
    const mockupDashboard = document.querySelector('.mockup-dashboard');
    if (mockupDashboard) observer.observe(mockupDashboard);
    
    const logPreview = document.querySelector('.log-preview');
    if (logPreview) typeObserver.observe(logPreview);

    // Tüm section başlıklarına, modül kartlarına ve FAQ öğelerine reveal classı ekle
    const elementsToReveal = document.querySelectorAll('.view-header, .module-card, .t-header, .faq-item');
    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal-item');
        // Gridlerde sırayla açılma hissi için gecikme ekleyelim
        if (el.classList.contains('module-card') || el.classList.contains('faq-item')) {
            const modIndex = (index % 4) + 1; // 1, 2, 3, 4 arası döner
            el.classList.add(`reveal-delay-${modIndex}`);
        }
        revealObserver.observe(el);
    });

    // Particle Ağ Arkaplanı
    initParticles();
});

/* --- YEPYENİ PREMIUM EFEKTLER --- */

// 1. 3D Eğim (Tilt) Efekti Kartlar İçin
const tiltElements = document.querySelectorAll('[data-tilt]');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; // Maks 15 derece eğim
        const rotateY = ((x - centerX) / centerX) * 15;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        el.style.transition = 'transform 0.1s ease';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        el.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    });
});

// 2. Scroll-to-Top Butonu Görünürlüğü
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
});

// 3. Particle (Parçacık ağı) Jeneratörü
function initParticles() {
    const canvas = document.getElementById('particle-network');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray;
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y;
            this.directionX = directionX; this.directionY = directionY;
            this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            
            // Çarpışma algılama, fareden kaçma
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }
    
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 12000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(99, 102, 241, 0.4)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                    let opacity = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth, innerHeight);
        particlesArray.forEach(p => p.update());
        connect();
    }
    
    init();
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });
}