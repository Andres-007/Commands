/**
 * Card Glow — Vercel-style mouse-tracking spotlight.
 * Sets --mouse-x / --mouse-y CSS custom properties on cards.
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Delegate to the body so dynamically-added cards are covered
        document.body.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.command-card, .hub-folder-card');
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
})();
