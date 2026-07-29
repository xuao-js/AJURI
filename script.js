// Scroll progress bar
const progressEl = document.getElementById('progress');
function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    progressEl.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
    document.getElementById('backTop').classList.toggle('show', scrolled > 500);
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Back to top
document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
function setSidebar(open) {
    sidebar.classList.toggle('open', open);
    sidebarOverlay.classList.toggle('show', open);
}
menuToggle.addEventListener('click', () => setSidebar(!sidebar.classList.contains('open')));
sidebarOverlay.addEventListener('click', () => setSidebar(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setSidebar(false); });
document.querySelectorAll('nav.toc a').forEach(a => {
    a.addEventListener('click', () => setSidebar(false));
});

// Scrollspy
const sections = document.querySelectorAll('section.chapter');
const navLinks = document.querySelectorAll('nav.toc a');
const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
        }
    });
}, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
sections.forEach(s => spy.observe(s));

// Sidebar filter
const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('input', () => {
    const q = filterInput.value.trim().toLowerCase();
    navLinks.forEach(l => {
        const text = l.textContent.toLowerCase();
        l.style.display = text.includes(q) ? 'flex' : 'none';
    });
});