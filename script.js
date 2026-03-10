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

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        const isDark = body.classList.contains('dark-mode');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('hotel-theme', isDark ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('hotel-theme');
    if (savedTheme === 'light') {
        body.classList.replace('dark-mode', 'light-mode');
        icon.className = 'fas fa-moon';
    }
});