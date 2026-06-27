/**
 * Hub category filter — segmented control with sliding indicator.
 * Unified grid: Linux distro cards are injected as flat command-cards
 * when "all" is active, and shown as folder-cards when "os" is active.
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const bar = document.getElementById('hub-filter-bar');
        if (!bar) return;

        const slider = document.getElementById('hub-filter-slider');
        const pills = bar.querySelectorAll('.hub-pill');
        const grid = document.querySelector('.cards-grid:not(.hub-folder-cards-grid)');
        if (!grid) return;

        /**
         * Position the slider behind the target button.
         */
        function moveSlider(btn) {
            if (!slider) return;
            const barRect = bar.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();
            const offsetLeft = btnRect.left - barRect.left;
            slider.style.width = btnRect.width + 'px';
            slider.style.transform = 'translateX(' + offsetLeft + 'px)';
        }

        /**
         * Get all filterable cards (static + injected).
         */
        function getAllCards() {
            return Array.from(grid.querySelectorAll('.command-card, .hub-folder-card'));
        }

        const searchInput = document.getElementById('hub-search-input');
        const searchClear = document.getElementById('hub-search-clear');
        let currentCategory = 'all';

        /**
         * Filter cards by category and search term, and animate the slider.
         */
        function filterCards(category, activePill) {
            // Update active pill class
            pills.forEach((p) => p.classList.toggle('active', p === activePill));

            // Move slider
            moveSlider(activePill);

            const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

            // Animate cards
            const cards = getAllCards();
            let visibleDelay = 0;
            cards.forEach((card) => {
                const cats = (card.dataset.category || '').split(/\s+/);
                const h2El = card.querySelector('h2');
                const titleText = h2El ? h2El.textContent.toLowerCase() : '';

                // Category filter check
                let show = category === 'all' || cats.includes(category);

                // Hide folder cards in 'all' view
                if (category === 'all' && card.classList.contains('hub-folder-card')) {
                    show = false;
                }

                // Search query match check
                const searchMatch = !searchTerm || titleText.includes(searchTerm);

                show = show && searchMatch;

                if (show) {
                    card.classList.remove('hidden');
                    card.classList.add('hub-card-visible');
                    card.style.transitionDelay = visibleDelay * 40 + 'ms';
                    visibleDelay++;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('hub-card-visible');
                    card.style.transitionDelay = '0ms';
                }
            });
        }

        // Bind click events
        pills.forEach((pill) => {
            pill.addEventListener('click', () => {
                currentCategory = pill.dataset.category;
                filterCards(currentCategory, pill);
            });
        });

        // Bind search input events
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const term = searchInput.value.trim();
                if (searchClear) {
                    searchClear.style.display = term ? 'block' : 'none';
                }
                const activePill = bar.querySelector('.hub-pill.active') || pills[0];
                filterCards(currentCategory, activePill);
            });
        }

        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.style.display = 'none';
                const activePill = bar.querySelector('.hub-pill.active') || pills[0];
                filterCards(currentCategory, activePill);
                searchInput.focus();
            });
        }

        // Initialize: filter cards for the default "all" view
        const activePill = bar.querySelector('.hub-pill.active');
        if (activePill) {
            requestAnimationFrame(() => {
                moveSlider(activePill);
                filterCards(currentCategory, activePill);
            });
        }

        // Recalculate slider on resize
        window.addEventListener('resize', () => {
            const current = bar.querySelector('.hub-pill.active');
            if (current) moveSlider(current);
        });
    });
})();
