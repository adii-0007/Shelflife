// ShelfLife - product data + dynamic detail page
// Detail page URL: productdetail.html?id=<product id>
(function () {
    const IMG = {
        almond: 'images/almond-milk.jpg',
        bread: 'images/bread-loaf.jpg',
        olive: 'images/olive-oil.png',
        yogurt: 'images/yogurt-pack.png',
        face: 'images/face-wash.png',
        chocolate: 'images/chocolate.png',
        cereal: 'images/cereal.png',
        paneer: 'images/paneer.png'
    };

    // NOTE: sample data. id = product name ka slug (cart.js bhi yahi slug use karta hai)
    const PRODUCTS = [
        {
            id: 'organic-almond-milk-1l', name: 'Organic Almond Milk 1L', category: 'Groceries',
            price: 89, mrp: 149, days: 4, image: IMG.almond,
            seller: 'GreenLeaf Organics, Delhi', batch: 'GL-ALM-0819', storage: 'Refrigerate after opening',
            desc: 'Cold-pressed, unsweetened almond milk from GreenLeaf Organics. Sealed, fresh and safe to consume, just discounted to move fast.',
            details: [
                ['Category', 'Groceries — Beverages'], ['Pack Size', '1 Litre, Tetra Pack'],
                ['Ingredients', 'Water, Almonds (2%), Sea Salt'], ['Dietary Info', 'Vegan, Unsweetened, No Preservatives'],
                ['Storage', 'Store in a cool, dry place. Refrigerate after opening and consume within 3 days.'],
                ['Seller Location', 'Hauz Khas, New Delhi'], ['SKU', 'SL-ALM-1L-089']
            ],
            rating: 4.7, reviewCount: 132,
            reviews: [
                { name: 'Anjali T.', city: 'Delhi', stars: 5, ago: 2, text: 'Tasted completely fresh, no idea this was a near-expiry deal until I checked the date myself. Great way to save money without any compromise on quality.' },
                { name: 'Rohan D.', city: 'Gurugram', stars: 5, ago: 4, text: 'Love this concept. Ordered groceries at almost half price and it arrived the same day. Will keep checking ShelfLife before my regular grocery run now.' },
                { name: 'Meera P.', city: 'Noida', stars: 4, ago: 5, text: 'Good deal overall, packaging could be a bit sturdier. But the product itself was completely fine and well within date.' }
            ]
        },
        {
            id: 'whole-wheat-bread-loaf', name: 'Whole Wheat Bread Loaf', category: 'Bakery',
            price: 35, mrp: 70, days: 2, image: IMG.bread,
            seller: 'Golden Crust Bakery, Gurugram', batch: 'GC-WWB-0918', storage: 'Store in a cool, dry place',
            desc: 'Soft whole wheat sandwich loaf baked fresh by Golden Crust Bakery. Best eaten within the next couple of days, so it is priced to go.',
            details: [
                ['Category', 'Bakery — Bread'], ['Pack Size', '400 g loaf'],
                ['Ingredients', 'Whole wheat flour, water, yeast, salt, sugar'], ['Dietary Info', 'Vegetarian, No artificial colours'],
                ['Storage', 'Keep in a cool, dry place. Use within 2 days of opening.'],
                ['Seller Location', 'Sector 29, Gurugram'], ['SKU', 'SL-BRD-400-035']
            ],
            rating: 4.5, reviewCount: 88,
            reviews: [
                { name: 'Karan S.', city: 'Gurugram', stars: 5, ago: 1, text: 'Soft and fresh. Half the bakery price and made the same morning sandwiches I always do.' },
                { name: 'Priya N.', city: 'Delhi', stars: 4, ago: 3, text: 'Good bread, just plan to eat it quickly because of the expiry date. Worth it at this price.' }
            ]
        },
        {
            id: 'cold-pressed-olive-oil', name: 'Cold Pressed Olive Oil', category: 'Groceries',
            price: 349, mrp: 499, days: 9, image: IMG.olive,
            seller: 'Olive Grove Traders, Mumbai', batch: 'OG-COO-0731', storage: 'Store away from sunlight',
            desc: 'Extra virgin cold pressed olive oil, sealed in a dark glass bottle. Plenty of shelf life left for everyday cooking and dressings.',
            details: [
                ['Category', 'Groceries — Oils'], ['Pack Size', '500 ml, Glass bottle'],
                ['Ingredients', '100% cold pressed olive oil'], ['Dietary Info', 'Vegan, Gluten free'],
                ['Storage', 'Store in a cool place away from direct sunlight. Close the cap tightly after use.'],
                ['Seller Location', 'Andheri West, Mumbai'], ['SKU', 'SL-OIL-500-349']
            ],
            rating: 4.6, reviewCount: 64,
            reviews: [
                { name: 'Sneha R.', city: 'Mumbai', stars: 5, ago: 3, text: 'Same quality as the branded ones on the supermarket shelf, for far less. Sealed and well packed.' },
                { name: 'Vikram J.', city: 'Pune', stars: 4, ago: 6, text: 'Good oil and a genuine saving. Delivery took a day longer than I expected.' }
            ]
        },
        {
            id: 'assorted-dairy-yogurt-pack', name: 'Assorted Dairy Yogurt Pack', category: 'Dairy',
            price: 60, mrp: 120, days: 3, image: IMG.yogurt,
            seller: 'Fresh Fields Dairy, Noida', batch: 'FF-YGT-0917', storage: 'Keep refrigerated',
            desc: 'A pack of assorted flavoured yogurts from Fresh Fields Dairy. Cold-chain stored and sealed, priced low because the date is close.',
            details: [
                ['Category', 'Dairy — Yogurt'], ['Pack Size', '6 cups x 100 g'],
                ['Ingredients', 'Toned milk, live cultures, fruit preparation, sugar'], ['Dietary Info', 'Vegetarian, Contains milk'],
                ['Storage', 'Keep refrigerated at 2–4°C. Consume before the expiry date.'],
                ['Seller Location', 'Sector 62, Noida'], ['SKU', 'SL-YGT-6P-060']
            ],
            rating: 4.4, reviewCount: 97,
            reviews: [
                { name: 'Aditi M.', city: 'Noida', stars: 5, ago: 1, text: 'Arrived cold and sealed. Finished the pack in two days, no issues at all.' },
                { name: 'Sameer K.', city: 'Delhi', stars: 4, ago: 4, text: 'Great value. Flavours were a nice mix, though I would have liked more mango.' }
            ]
        },
        {
            id: 'herbal-face-wash-100ml', name: 'Herbal Face Wash 100ml', category: 'Personal Care',
            price: 129, mrp: 199, days: 6, image: IMG.face,
            seller: 'Naturals Corner, Delhi', batch: 'NC-HFW-0805', storage: 'Store in a cool, dry place',
            desc: 'Gentle herbal face wash with neem and aloe vera, sold sealed and unused. Discounted because of its shorter remaining shelf life.',
            details: [
                ['Category', 'Personal Care — Face care'], ['Pack Size', '100 ml tube'],
                ['Key ingredients', 'Neem, Aloe vera, Tulsi extract'], ['Skin type', 'Normal to oily'],
                ['Storage', 'Store below 30°C. Keep the cap closed.'],
                ['Seller Location', 'Lajpat Nagar, New Delhi'], ['SKU', 'SL-FW-100-129']
            ],
            rating: 4.3, reviewCount: 51,
            reviews: [
                { name: 'Neha G.', city: 'Delhi', stars: 4, ago: 2, text: 'Smells fresh and does not dry out my skin. Cheaper than the same tube at the pharmacy.' },
                { name: 'Arjun B.', city: 'Faridabad', stars: 4, ago: 7, text: 'Genuine product, sealed. Will use it up well before the date.' }
            ]
        },
        {
            id: 'dark-chocolate-almond', name: 'Dark Chocolate with Almond', category: 'Snacks',
            price: 89, mrp: 149, days: 10, image: IMG.chocolate,
            seller: 'Merdas Chocolate, Mumbai', batch: 'MD-DCA-0905', storage: 'Store in a cool, dry place',
            desc: 'Rich dark chocolate bar studded with whole almonds, sealed and unopened. Discounted as it is a slower-moving batch close to its best-before window.',
            details: [
                ['Category', 'Snacks — Chocolate'], ['Pack Size', '90 g bar'],
                ['Ingredients', 'Cocoa solids, sugar, cocoa butter, almonds, emulsifier'], ['Dietary Info', 'Vegetarian, Contains nuts'],
                ['Storage', 'Store below 24°C, away from direct sunlight.'],
                ['Seller Location', 'Andheri East, Mumbai'], ['SKU', 'SL-CHC-90-089']
            ],
            rating: 4.6, reviewCount: 58,
            reviews: [
                { name: 'Tanvi S.', city: 'Mumbai', stars: 5, ago: 2, text: 'Rich and not overly sweet. Sealed pack, tasted completely fresh.' },
                { name: 'Yash P.', city: 'Pune', stars: 4, ago: 6, text: 'Good bar for the price. Almonds were generous. Would buy again if listed.' }
            ]
        },
        {
            id: 'multigrain-breakfast-cereal', name: 'Multigrain Breakfast Cereal', category: 'Groceries',
            price: 99, mrp: 179, days: 8, image: IMG.cereal,
            seller: 'Harvest Pantry, Delhi', batch: 'HP-MBC-0810', storage: 'Store in an airtight container',
            desc: 'Crunchy multigrain flakes with oats and millets, sealed in the original box. A quick, filling breakfast at almost half price.',
            details: [
                ['Category', 'Groceries — Breakfast'], ['Pack Size', '500 g box'],
                ['Ingredients', 'Oats, wheat, ragi, rice, jaggery, salt'], ['Dietary Info', 'Vegetarian, No artificial colours'],
                ['Storage', 'Transfer to an airtight container after opening.'],
                ['Seller Location', 'Rajouri Garden, New Delhi'], ['SKU', 'SL-CER-500-099']
            ],
            rating: 4.4, reviewCount: 73,
            reviews: [
                { name: 'Ritu A.', city: 'Delhi', stars: 5, ago: 2, text: 'Crisp and fresh, not stale at all. Kids finished the box in a week.' },
                { name: 'Faisal H.', city: 'Noida', stars: 4, ago: 6, text: 'Good cereal for the price. A bit less sweet than the usual brands, which I liked.' }
            ]
        },
        {
            id: 'paneer-block-200g', name: 'Paneer Block 200g', category: 'Dairy',
            price: 45, mrp: 90, days: 2, image: IMG.paneer,
            seller: 'Fresh Fields Dairy, Noida', batch: 'FF-PNR-0919', storage: 'Keep refrigerated',
            desc: 'Fresh, soft paneer block made from full cream milk. Vacuum packed and chilled, best used within a day or two.',
            details: [
                ['Category', 'Dairy — Paneer'], ['Pack Size', '200 g vacuum pack'],
                ['Ingredients', 'Full cream milk, citric acid'], ['Dietary Info', 'Vegetarian, Contains milk'],
                ['Storage', 'Keep refrigerated at 2–4°C. Use within 24 hours of opening.'],
                ['Seller Location', 'Sector 62, Noida'], ['SKU', 'SL-PNR-200-045']
            ],
            rating: 4.6, reviewCount: 110,
            reviews: [
                { name: 'Pooja V.', city: 'Delhi', stars: 5, ago: 1, text: 'Soft and fresh, made great palak paneer the same night. Half the usual price.' },
                { name: 'Deepak C.', city: 'Gurugram', stars: 4, ago: 3, text: 'Good paneer. Use it the day it arrives, since the expiry is close.' }
            ]
        }
    ];

    /* ---------- helpers ---------- */
    const $ = id => document.getElementById(id);
    const money = n => '₹ ' + Number(n).toLocaleString('en-IN');
    const plural = n => n + ' ' + (n === 1 ? 'day' : 'days');
    const discount = p => Math.round((p.mrp - p.price) / p.mrp * 100);
    function dateFromToday(offset) {
        const d = new Date();
        d.setDate(d.getDate() + offset);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

    function cardHTML(p) {
        return `
            <article data-category="${p.category.toLowerCase().replace(/ /g, '-')}" data-days="${p.days}" data-price="${p.price}" data-discount="${discount(p)}">
                <figure>
                    <img src="${p.image}" alt="${p.name}">
                    <figcaption>${p.name}</figcaption>
                </figure>
                <h3>${p.name}</h3>
                <p>Category: ${p.category} · Expires in ${plural(p.days)}</p>
                <p>Price:<strong>${money(p.price)}</strong> <s>${money(p.mrp)}</s></p>
                <p><mark>${discount(p)}% OFF</mark></p>
                <a href="productdetail.html?id=${p.id}">View detail</a>
                <button type="button">Add to Cart</button>
            </article>`;
    }

    /* ---------- shared rendering (index + products pages) ---------- */
    // image load na ho (link band / internet nahi) to placeholder dikhao
    document.addEventListener('error', function (e) {
        const img = e.target;
        if (!img || img.tagName !== 'IMG' || img.dataset.fallback) return;
        img.dataset.fallback = '1';
        const label = (img.alt || 'Image unavailable').replace(/[&<>"']/g, '');
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500">' +
            '<rect width="400" height="500" fill="#1e212f"/>' +
            '<text x="200" y="250" fill="#9fa6b2" font-family="sans-serif" font-size="20" text-anchor="middle">' + label + '</text></svg>';
        img.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    }, true);

    // index.html: "Ending Soon" (7 din ke andar wale, sabse jaldi wale pehle)
    const ending = $('ending-soon');
    if (ending) {
        ending.innerHTML = PRODUCTS.filter(p => p.days <= 7).sort((a, b) => a.days - b.days).slice(0, 4).map(cardHTML).join('');
    }

    // index.html: "Today's Top Deals" table (rank order yahan set hai)
    const TOP_DEALS = ['whole-wheat-bread-loaf', 'assorted-dairy-yogurt-pack', 'organic-almond-milk-1l', 'herbal-face-wash-100ml', 'cold-pressed-olive-oil'];
    const topRows = $('top-deals-rows');
    if (topRows) {
        topRows.innerHTML = TOP_DEALS.map(function (pid, i) {
            const p = PRODUCTS.find(x => x.id === pid);
            return '<tr><td>' + (i + 1) + '</td><td>' + p.name + '</td><td>' + p.category + '</td><td>' + money(p.price) + '</td><td>' + plural(p.days) + '</td></tr>';
        }).join('');
    }

    // products.html: saare deals (script.js filters isi ke baad chalte hain)
    const dealGrid = $('deal-grid');
    if (dealGrid) {
        dealGrid.innerHTML = PRODUCTS.map(cardHTML).join('');
        if ($('deal-count')) $('deal-count').textContent = PRODUCTS.length;
    }

    /* ---------- render detail page ---------- */
    if (!$('detail-name')) return; // detail page nahi hai


    const id = new URLSearchParams(window.location.search).get('id');
    const p = id ? PRODUCTS.find(x => x.id === id) : PRODUCTS[0];

    if (!p) {
        document.querySelectorAll('.detail-section').forEach(s => (s.hidden = true));
        $('not-found').hidden = false;
        document.title = 'ShelfLife - Deal not found';
        return;
    }

    document.title = 'ShelfLife - ' + p.name;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = p.name + ' for ' + money(p.price) + ' (was ' + money(p.mrp) + '). Expires in ' + plural(p.days) + '. Sold by ' + p.seller + '.';
    $('crumb-name').textContent = p.name;
    $('detail-img').src = p.image;
    $('detail-img').alt = p.name;
    $('detail-cap').textContent = p.name;
    $('detail-name').textContent = p.name;
    $('detail-desc').innerHTML = '';
    $('detail-desc').append(p.desc + ' Listed by ' + p.seller + ' with ' + plural(p.days) + ' left before expiry.');
    $('detail-price').textContent = money(p.price);
    $('detail-mrp').textContent = money(p.mrp);
    $('detail-off').textContent = discount(p) + '% OFF';
    $('detail-note').textContent = 'Inclusive of all taxes. Free delivery above ₹ 199. Expires: ' + dateFromToday(p.days) + '.';

    $('why-text').innerHTML = 'This item still has <strong>' + plural(p.days) + ' of shelf life left.</strong> The seller listed it early so it sells before it expires, instead of going to waste. Nothing here is expired — every listing is checked before it goes live.';
    $('t-title').textContent = p.name + ' — Details';
    $('t-expiry').textContent = dateFromToday(p.days);
    $('t-days').textContent = plural(p.days);
    $('t-storage').textContent = p.storage;
    $('t-seller').textContent = p.seller;
    $('t-batch').textContent = p.batch;

    const dl = $('detail-list');
    p.details.forEach(function (pair) {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = pair[0];
        dd.textContent = pair[1];
        dl.append(dt, dd);
    });

    $('rating-avg').textContent = p.rating.toFixed(1) + ' / 5';
    $('rating-stars').textContent = stars(Math.round(p.rating));
    $('rating-count').textContent = p.reviewCount;

    const list = $('reviews-list');
    p.reviews.forEach(function (r) {
        const box = document.createElement('div');
        box.className = 'review';
        const h = document.createElement('h4');
        h.textContent = r.name + ' — ' + r.city;
        const s = document.createElement('p');
        s.className = 'stars';
        s.textContent = stars(r.stars);
        const t = document.createElement('p');
        t.textContent = r.text;
        const d = document.createElement('small');
        d.textContent = 'Purchased: ' + dateFromToday(-r.ago);
        box.append(h, s, t, d);
        list.append(box);
    });

    // "Other deals": 3 soonest-expiring products, current wala chhod ke
    const others = PRODUCTS.filter(x => x.id !== p.id).sort((a, b) => a.days - b.days).slice(0, 3);
    $('other-deals').innerHTML = others.map(cardHTML).join('');
})();