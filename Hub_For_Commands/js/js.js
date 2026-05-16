document.addEventListener('DOMContentLoaded', () => {
    // --- Page Transitions ---
    const overlay = document.getElementById('transition-overlay');
    
    // Fade out overlay when page loads
    if (overlay) {
        // Small timeout ensures the CSS transition can trigger correctly
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
                // If it's a transition link, we can trigger a click on it
                link.click();
            }
        }
    });

    // --- Search Functionality (for command pages) ---
    const searchInput = document.getElementById('command-search');
    const commandList = document.getElementById('command-list');

    if (searchInput && commandList) {
        const listItems = commandList.getElementsByTagName('li');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            Array.from(listItems).forEach((item) => {
                const text = item.textContent || item.innerText;
                if (text.toLowerCase().includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});
