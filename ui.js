// ShelfLife - shared UI: mobile menu, active nav link, skip link, back to top, toast
(function () {
    const header = document.querySelector('header');
    const nav = header && header.querySelector('nav');
    const main = document.querySelector('main');

    /* ---------- skip link (keyboard users) ---------- */
    if (main) {
        if (!main.id) main.id = 'main-content';
        const skip = document.createElement('a');
        skip.className = 'skip-link';
        skip.href = '#' + main.id;
        skip.textContent = 'Skip to content';
        document.body.prepend(skip);
    }

    /* ---------- mobile menu + active link ---------- */
    if (header && nav) {
        nav.id = 'site-nav';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nav-toggle';
        btn.setAttribute('aria-controls', 'site-nav');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Toggle menu');
        btn.innerHTML = '<span></span><span></span><span></span>';
        header.insertBefore(btn, nav);
        header.classList.add('has-toggle');

        function setOpen(open) {
            nav.classList.toggle('open', open);
            btn.setAttribute('aria-expanded', String(open));
        }

        btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
        nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
        window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setOpen(false); });

        // jis page par ho uska link highlight
        const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        nav.querySelectorAll('a').forEach(a => {
            const href = (a.getAttribute('href') || '').split('?')[0].split('#')[0].toLowerCase();
            if (href && href === current) a.setAttribute('aria-current', 'page');
        });
    }

    /* ---------- back to top ---------- */
    const topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'back-to-top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.innerHTML = '&uarr;';
    document.body.append(topBtn);

    window.addEventListener('scroll', () => {
        topBtn.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- toast (cart.js isse call karta hai) ---------- */
    let toast, toastTimer;
    window.showToast = function (message, action) {
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.append(toast);
        }
        toast.textContent = message;
        if (action) {
            const a = document.createElement('a');
            a.href = action.href;
            a.textContent = action.label;
            toast.append(' ', a);
        }
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    };
})();