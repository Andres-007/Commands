/**
 * Global site behaviours — page transitions and card click delegation.
 * Search & debounce logic is centralised in terminal-engine.js.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Page Transitions ---
    const overlay = document.getElementById('transition-overlay');

    // Fade out overlay when page loads
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 50);
    }

    // Intercept clicks on transition links (delegation: works for dynamically added links)
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a.transition-link');
        if (!link) return;
        e.preventDefault();
        const targetUrl = link.href;

        if (overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        } else {
            window.location.href = targetUrl;
        }
    });

    // --- Make command cards clickable ---
    document.body.addEventListener('click', (e) => {
        // Ignore if clicking directly on a link (already handled)
        if (e.target.closest('a')) return;

        const card = e.target.closest('.command-card');
        if (card) {
            const link = card.querySelector('a.transition-link, a[href]');
            if (link) {
                link.click();
            }
        }
    });

    // --- Typewriter Effect ---
    const headerH1 = document.querySelector('header h1');
    if (headerH1) {
        // Find or create span for text
        let span = headerH1.querySelector('.typewriter');
        if (!span) {
            span = document.createElement('span');
            span.className = 'typewriter';
            span.innerHTML = headerH1.innerHTML;
            headerH1.innerHTML = '';
            headerH1.appendChild(span);
        }
        const text = span.textContent;
        span.innerHTML = '<span class="typewriter-cursor"></span>'; // Clear and add cursor with blinking style
        const cursor = span.querySelector('.typewriter-cursor');
        
        let i = 0;
        cursor.style.display = 'none'; // Ocultar el cursor durante la generación de las letras
        function typeWriter() {
            if (i < text.length) {
                const textNode = document.createTextNode(text.charAt(i));
                span.insertBefore(textNode, cursor);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                cursor.style.display = 'inline-block'; // Mostrar el cursor al finalizar la generación
            }
        }
        setTimeout(typeWriter, 300); // Small delay before typing
    }

    // --- Mouse Tracking Glow ---
    const grid = document.querySelector('.cards-grid');
    if (grid) {
        grid.addEventListener('mousemove', (e) => {
            const cards = grid.querySelectorAll('.command-card');
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    }
});
