// ShelfLife - cart (saare pages par chalta hai)
(function () {
    const KEY = 'shelflife-cart';
    const FREE_DELIVERY_MIN = 199; // is amount ya usse upar delivery free
    const DELIVERY_FEE = 40;       // neeche ho to itna charge (yahan se badal sakte ho)
    const MAX_QTY = 10;

    /* ---------- storage ---------- */
    function load() {
        try {
            const data = JSON.parse(localStorage.getItem(KEY));
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return [];
        }
    }
    let cart = load();

    function save() {
        try {
            localStorage.setItem(KEY, JSON.stringify(cart));
        } catch (e) { /* storage blocked: cart is page tak memory mein rahega */ }
        updateBadge();
    }

    /* ---------- helpers ---------- */
    const money = n => '₹ ' + Number(n).toLocaleString('en-IN');
    const toNumber = text => Number(String(text).replace(/[^\d]/g, '')) || 0;
    const slug = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    function totalQty() {
        return cart.reduce((sum, i) => sum + i.qty, 0);
    }

    function updateBadge() {
        document.querySelectorAll('header nav a[href="cart.html"]').forEach(a => {
            a.textContent = 'Cart(' + totalQty() + ')';
        });
    }

    /* ---------- cart actions ---------- */
    function addItem(item, qty) {
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            existing.qty = Math.min(MAX_QTY, existing.qty + qty);
        } else {
            cart.push(Object.assign({}, item, { qty: Math.min(MAX_QTY, qty) }));
        }
        save();
    }

    function changeQty(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.max(1, Math.min(MAX_QTY, item.qty + delta));
        save();
        render();
    }

    function removeItem(id) {
        cart = cart.filter(i => i.id !== id);
        save();
        render();
    }

    function clearCart() {
        cart = [];
        save();
        render();
    }

    /* ---------- read product info from the page ---------- */
    function fromCard(card) {
        const name = card.querySelector('h3').textContent.trim();
        const mrp = card.querySelector('s');
        return {
            id: slug(name),
            name: name,
            price: toNumber(card.querySelector('strong').textContent),
            mrp: mrp ? toNumber(mrp.textContent) : 0,
            image: card.querySelector('img') ? card.querySelector('img').src : ''
        };
    }

    function fromDetail() {
        const info = document.querySelector('.detail-info');
        const name = info.querySelector('h1').textContent.trim();
        const mrp = info.querySelector('s');
        const img = document.querySelector('.detail-hero img');
        return {
            id: slug(name),
            name: name,
            price: toNumber(info.querySelector('.price-now').textContent),
            mrp: mrp ? toNumber(mrp.textContent) : 0,
            image: img ? img.src : ''
        };
    }

    function notify(name) {
        if (window.showToast) window.showToast(name + ' added to cart', { label: 'View cart', href: 'cart.html' });
    }

    function flash(btn, text) {
        if (btn.dataset.orig === undefined) btn.dataset.orig = btn.textContent;
        btn.textContent = text;
        clearTimeout(btn._t);
        btn._t = setTimeout(() => { btn.textContent = btn.dataset.orig; }, 1200);
    }

    /* ---------- cart page rendering ---------- */
    function render() {
        const list = document.getElementById('cart-items');
        if (!list) return; // cart page nahi hai

        const summary = document.getElementById('cart-summary');
        const empty = document.getElementById('cart-empty');
        const layout = document.getElementById('cart-layout');

        if (cart.length === 0) {
            layout.hidden = true;
            empty.hidden = false;
            return;
        }
        layout.hidden = false;
        empty.hidden = true;

        list.innerHTML = cart.map(i => `
            <div class="cart-item" data-id="${esc(i.id)}">
                <img src="${esc(i.image)}" alt="${esc(i.name)}">
                <div class="cart-item-info">
                    <h4>${esc(i.name)}</h4>
                    <p>${money(i.price)} ${i.mrp ? '<s>' + money(i.mrp) + '</s>' : ''}</p>
                    <div class="qty-controls">
                        <button type="button" data-cart="dec" aria-label="Decrease quantity">&minus;</button>
                        <span>${i.qty}</span>
                        <button type="button" data-cart="inc" aria-label="Increase quantity">+</button>
                    </div>
                </div>
                <div class="cart-item-side">
                    <strong>${money(i.price * i.qty)}</strong>
                    <button type="button" class="link-btn" data-cart="remove">Remove</button>
                </div>
            </div>`).join('');

        const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const savings = cart.reduce((s, i) => s + Math.max(0, i.mrp - i.price) * i.qty, 0);
        const delivery = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
        const hint = delivery
            ? `<p class="delivery-hint">Add ${money(FREE_DELIVERY_MIN - subtotal)} more for free delivery.</p>`
            : `<p class="delivery-hint ok">You get free delivery.</p>`;

        summary.innerHTML = `
            <h3>Order Summary</h3>
            <dl class="summary-rows">
                <dt>Items</dt><dd>${totalQty()}</dd>
                <dt>Subtotal</dt><dd>${money(subtotal)}</dd>
                <dt>You save</dt><dd class="save">${money(savings)}</dd>
                <dt>Delivery</dt><dd>${delivery ? money(delivery) : 'Free'}</dd>
                <dt class="total">Total</dt><dd class="total">${money(subtotal + delivery)}</dd>
            </dl>
            ${hint}
            <button type="button" class="btn-primary" data-cart="checkout">Place Order</button>
            <button type="button" class="btn-ghost" data-cart="clear">Clear cart</button>`;
    }

    function placeOrder() {
        const layout = document.getElementById('cart-layout');
        const done = document.getElementById('order-done');
        cart = [];
        save();
        layout.hidden = true;
        done.hidden = false;
    }

    /* ---------- one click handler for everything ---------- */
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // 1. cart page buttons
        const action = btn.dataset.cart;
        if (action) {
            const row = btn.closest('.cart-item');
            const id = row ? row.dataset.id : null;
            if (action === 'inc') changeQty(id, 1);
            else if (action === 'dec') changeQty(id, -1);
            else if (action === 'remove') removeItem(id);
            else if (action === 'clear') clearCart();
            else if (action === 'checkout') placeOrder();
            return;
        }

        // 2. product detail page: Add to Cart / Buy Now
        const detailAction = btn.dataset.action;
        if (detailAction) {
            const qtyInput = document.getElementById('quantity');
            const qty = Math.max(1, Math.min(MAX_QTY, parseInt(qtyInput && qtyInput.value, 10) || 1));
            const product = fromDetail();
            addItem(product, qty);
            if (detailAction === 'buy') {
                window.location.href = 'cart.html';
            } else {
                flash(btn, 'Added ✓');
                notify(product.name);
            }
            return;
        }

        // 3. product cards (index, products, detail "other deals")
        const card = btn.closest('article');
        if (card && btn.parentElement === card) {
            const product = fromCard(card);
            addItem(product, 1);
            flash(btn, 'Added ✓');
            notify(product.name);
        }
    });

    updateBadge();
    render();
})();