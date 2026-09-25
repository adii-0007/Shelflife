// ShelfLife - form handling (index newsletter + contact seller form)
(function () {
    function showMessage(form, text, ok) {
        let box = form.parentElement.querySelector('.form-msg');
        if (!box) {
            box = document.createElement('div');
            box.className = 'form-msg';
            box.setAttribute('role', 'status');
            form.insertAdjacentElement('afterend', box);
        }
        box.textContent = text;
        box.classList.toggle('error', !ok);
        box.classList.toggle('success', ok);
    }

    // ---- newsletter (index.html) ----
    const newsletter = document.getElementById('newsletter-form');
    if (newsletter) {
        newsletter.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = newsletter.querySelector('input[type="email"]').value.trim();
            showMessage(newsletter, 'Thanks! We will email ' + email + ' when new deals go live.', true);
            newsletter.reset();
        });
    }

    // ---- seller form (contact.html) ----
    const seller = document.getElementById('seller-form');
    if (seller) {
        const dateInput = document.getElementById('expiry-date');
        const today = new Date().toISOString().slice(0, 10);
        dateInput.min = today; // expire ho chuki date nahi chalegi

        seller.addEventListener('submit', function (e) {
            e.preventDefault();

            const file = document.getElementById('file').files[0];
            if (file && file.size > 5 * 1024 * 1024) {
                showMessage(seller, 'The photo is larger than 5MB. Please choose a smaller file.', false);
                return;
            }
            if (dateInput.value && dateInput.value < today) {
                showMessage(seller, 'The expiry date has already passed. We can only list products that are still in date.', false);
                return;
            }

            const store = document.getElementById('store-name').value.trim();
            showMessage(seller, 'Thanks, ' + store + '. We have received your listing and will reply within 24 hours.', true);
            seller.reset();
        });
    }
})();