/**
 * Card Glow — Highly Optimized Vercel-style mouse-tracking spotlight.
 *
 * This implementation achieves 60+ FPS scrolling and mouse movements by:
 *  1. Using "mouseover" delegation on document.body instead of continuous "mousemove" delegation.
 *  2. Attaching the actual "mousemove" listener ONLY dynamically when a target is hovered.
 *  3. Throttling calculations using "requestAnimationFrame" to eliminate layout reflow thrashing.
 *  4. Cleaning up listeners automatically on "mouseout".
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Targets to apply the premium mouse spotlight glow
        const GLOW_SELECTOR = '.command-card, .hub-folder-card, .terminal-container, .workspace-canvas';

        document.body.addEventListener('mouseover', (e) => {
            const card = e.target.closest(GLOW_SELECTOR);
            if (!card || card.dataset.glowInitialized === 'true') return;

            // Mark card as initialized so we don't bind the listener multiple times
            card.dataset.glowInitialized = 'true';

            let ticking = false;

            // Optimized local listener
            const onMouseMove = (moveEvent) => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        // Check if card is still in the DOM and visible
                        if (card.isConnected) {
                            const rect = card.getBoundingClientRect();
                            const x = moveEvent.clientX - rect.left;
                            const y = moveEvent.clientY - rect.top;
                            card.style.setProperty('--mouse-x', `${x}px`);
                            card.style.setProperty('--mouse-y', `${y}px`);
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            // Clean up when the mouse leaves this specific card
            const onMouseLeave = () => {
                card.removeEventListener('mousemove', onMouseMove);
                card.removeEventListener('mouseleave', onMouseLeave);
                card.dataset.glowInitialized = 'false';
            };

            card.addEventListener('mousemove', onMouseMove);
            card.addEventListener('mouseleave', onMouseLeave);

            // Execute once immediately upon entry to feel instant
            onMouseMove(e);
        });
    });
})();
