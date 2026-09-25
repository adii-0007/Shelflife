// ShelfLife - products page filters + sorting
(function () {
    const grid = document.querySelector('.grid');
    if (!grid) return; // sirf products.html par chalega

    const cards = Array.from(grid.querySelectorAll('article'));
    const originalOrder = cards.slice(); // "Most Popular" = original order

    const checkboxes = document.querySelectorAll('#sidebar input[name="category"]');
    const minInput = document.getElementById('min');
    const maxInput = document.getElementById('max');
    const sortSelect = document.getElementById('sort-by');
    const countEl = document.getElementById('deal-count');
    const noResults = document.getElementById('no-results');

    function applyFilters() {
        const selected = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
        const min = minInput.value === '' ? 0 : Number(minInput.value);
        const max = maxInput.value === '' ? Infinity : Number(maxInput.value);

        // 1. filter
        let visible = 0;
        cards.forEach(card => {
            const days = Number(card.dataset.days);
            const okCategory = selected.length === 0 || selected.includes(card.dataset.category);
            const okDays = days >= min && days <= max;
            const show = okCategory && okDays;
            card.hidden = !show;
            if (show) visible++;
        });

        // 2. sort
        const sorted = originalOrder.slice();
        switch (sortSelect.value) {
            case 'expiring':
                sorted.sort((a, b) => a.dataset.days - b.dataset.days);
                break;
            case 'price-asc':
                sorted.sort((a, b) => a.dataset.price - b.dataset.price);
                break;
            case 'discount-desc':
                sorted.sort((a, b) => b.dataset.discount - a.dataset.discount);
                break;
            // 'popular' -> original order
        }
        sorted.forEach(card => grid.appendChild(card));

        // 3. count + empty message
        countEl.textContent = visible;
        noResults.hidden = visible !== 0;
    }

    function clearFilters() {
        checkboxes.forEach(c => (c.checked = false));
        minInput.value = '';
        maxInput.value = '';
        sortSelect.value = 'popular';
        applyFilters();
    }

    document.getElementById('apply-filter').addEventListener('click', applyFilters);
    document.getElementById('clear-filter').addEventListener('click', clearFilters);

    // live update jab user kuch bhi change kare
    checkboxes.forEach(c => c.addEventListener('change', applyFilters));
    sortSelect.addEventListener('change', applyFilters);
    minInput.addEventListener('input', applyFilters);
    maxInput.addEventListener('input', applyFilters);
})();