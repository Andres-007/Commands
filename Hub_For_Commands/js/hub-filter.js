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

        const linuxRoot = document.getElementById('linux-folders-root');
        const folders = window.LINUX_HUB_FOLDERS || [];

        /* ---- Track injected linux cards so we can remove them ---- */
        let injectedLinuxCards = [];

        /**
         * Create a flat command-card for a single Linux distro.
         */
        function createLinuxCard(distro, familyTitle) {
            const card = document.createElement('div');
            card.className = 'command-card command-card--linux';
            card.dataset.category = 'os';
            card.dataset.linuxInjected = 'true';

            // Glyph / icon
            const glyph = document.createElement('div');
            glyph.className = 'linux-card-glyph';
            glyph.setAttribute('aria-hidden', 'true');
            if (distro.icon) {
                glyph.innerHTML = '<i class="' + distro.icon + ' card-icon"></i>';
            } else if (distro.imgIcon) {
                glyph.innerHTML = '<img src="' + distro.imgIcon + '" class="card-icon-img" alt="' + distro.title + '">';
            } else {
                glyph.textContent = distro.glyph || '🐧';
            }

            const h2 = document.createElement('h2');
            h2.textContent = distro.title;

            const p = document.createElement('p');
            p.textContent = distro.desc;

            const family = document.createElement('span');
            family.className = 'linux-card-family';
            family.textContent = familyTitle;

            const a = document.createElement('a');
            a.href = distro.href;
            a.className = 'nav-btn transition-link';
            a.textContent = 'Search commands';

            card.append(glyph, h2, p, family, a);
            return card;
        }

        /**
         * Inject all Linux distros as flat cards into the main grid.
         */
        function injectLinuxCards() {
            removeLinuxCards();
            folders.forEach((folder) => {
                folder.cards.forEach((distro) => {
                    // Skip placeholder cards (href = '#')
                    if (distro.href === '#') return;
                    const card = createLinuxCard(distro, folder.title);
                    grid.appendChild(card);
                    injectedLinuxCards.push(card);
                });
            });
        }

        /**
         * Remove injected flat Linux cards from the main grid.
         */
        function removeLinuxCards() {
            injectedLinuxCards.forEach((c) => c.remove());
            injectedLinuxCards = [];
        }

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

        /**
         * Filter cards by category and animate the slider.
         */
        function filterCards(category, activePill) {
            // Update active pill class
            pills.forEach((p) => p.classList.toggle('active', p === activePill));

            // Move slider
            moveSlider(activePill);

            // Handle Linux cards injection/removal
            if (category === 'all') {
                // Inject Linux distros as flat cards in the unified grid
                injectLinuxCards();
                if (linuxRoot) linuxRoot.style.display = 'none';
            } else if (category === 'os') {
                // Show traditional folder-card view
                removeLinuxCards();
                if (linuxRoot) {
                    linuxRoot.style.display = '';
                    // Ensure hub-folders.js has rendered into linuxRoot
                }
            } else {
                removeLinuxCards();
                if (linuxRoot) linuxRoot.style.display = 'none';
            }

            // Animate cards
            const cards = getAllCards();
            let visibleDelay = 0;
            cards.forEach((card) => {
                const cats = (card.dataset.category || '').split(/\s+/);
                let show = category === 'all' || cats.includes(category);

                // Hide folder cards in 'all' view because flat cards are injected
                if (category === 'all' && card.classList.contains('hub-folder-card')) {
                    show = false;
                }

                if (show) {
                    card.classList.remove('hub-card-hidden');
                    card.classList.add('hub-card-visible');
                    card.style.transitionDelay = visibleDelay * 40 + 'ms';
                    visibleDelay++;
                } else {
                    card.classList.add('hub-card-hidden');
                    card.classList.remove('hub-card-visible');
                    card.style.transitionDelay = '0ms';
                }
            });
        }

        // Bind click events
        pills.forEach((pill) => {
            pill.addEventListener('click', () => {
                filterCards(pill.dataset.category, pill);
            });
        });

        // Initialize: inject Linux cards for the default "all" view
        const activePill = bar.querySelector('.hub-pill.active');
        if (activePill) {
            requestAnimationFrame(() => {
                moveSlider(activePill);
                // If the default is "all", inject Linux cards now
                if (activePill.dataset.category === 'all') {
                    injectLinuxCards();
                }
            });
        }

        // Recalculate slider on resize
        window.addEventListener('resize', () => {
            const current = bar.querySelector('.hub-pill.active');
            if (current) moveSlider(current);
        });
    });
})();
