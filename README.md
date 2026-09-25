🛒 ShelfLife — Don't Let It Expire. Sell It.

ShelfLife is a front-end e-commerce concept site that connects local stores carrying near-expiry stock with shoppers looking for a discount. Sellers list products expiring within 15 days, buyers grab them at a discount, and less good stock ends up in the bin.

Live site: https://adii-0007.github.io/Shellflife/

Features
Home page – hero section, "Ending Soon" deals, a top-deals table, and a newsletter signup
Deals page – full product catalogue with:
Category filters (Groceries, Bakery, Dairy, Personal Care, Snacks)
Days-left range filter
Sort by popularity, expiry, price, or discount
Deal detail page – dynamic per-product page (productdetail.html?id=...) with price, expiry countdown, seller info, product details, and customer reviews
Cart – add to cart from any product card or the detail page, adjust quantity, remove items, free-delivery threshold, and a checkout flow — all saved in the browser via localStorage
Sell With Us (contact) page – seller listing form with validation, an FAQ accordion, support hours, and contact details
Responsive design – works on desktop and mobile, with a mobile hamburger menu
Accessibility extras – skip-to-content link, visible focus states, aria-current on the active nav link
Small UI touches – toast notifications on "Add to Cart," a "back to top" button, and a dark, gradient-accented theme
Tech stack

Plain HTML, CSS, and JavaScript — no frameworks, no build step, no backend. Product data lives in one file (products.js) and is used to generate cards on every page, so adding a new product only means adding one entry.

Project structure
Shellflife/
├── index.html            Home page
├── products.html          Deals / catalogue page
├── productdetail.html     Dynamic product detail page
├── contact.html           Sell With Us / contact page
├── cart.html              Shopping cart page
├── style.css              All styling
├── products.js            Product data + card/detail rendering
├── cart.js                Cart logic (add/remove/qty, localStorage)
├── script.js               Filter + sort logic for the Deals page
├── forms.js                Newsletter + seller form handling
├── ui.js                   Mobile menu, active link, toast, back-to-top
├── favicon.svg
└── images/                Product photos
Running it locally

No build tools needed. Either:

Open index.html directly in a browser, or
Use a local server (recommended, so relative paths behave exactly like on GitHub Pages) — e.g. the VS Code "Live Server" extension, right-click index.html → Open with Live Server.
Notes / known limitations

This is a front-end demo built for learning purposes:

There is no backend or database — the cart is saved per-browser via localStorage, and form submissions (newsletter, seller listing) just show a confirmation message without sending any data anywhere.
Product, seller, and review data in products.js is sample data for demonstration.
Possible next steps
A real backend (e.g. Node/Express + a database) to persist listings, orders, and users
User accounts for buyers and sellers
Real payment integration
Search bar across the catalogue

Built as a mini project by Adersh Pandey.
