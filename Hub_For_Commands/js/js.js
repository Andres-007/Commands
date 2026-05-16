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

    // Debounce Utility
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    if (searchInput && commandList) {
        // Cache DOM elements for list items
        let listItemsArray = [];
        
        // Use MutationObserver or just fetch them on input if they are dynamic
        // Since command-hub.js populates this dynamically, we can fetch them once on first search
        // or just query them inside the debounced function for safety.

        const handleSearch = debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            const listItems = commandList.getElementsByTagName('li');

            // Optimize by avoiding array creation on every keystroke if possible,
            // but standard loop is fast enough if debounced.
            for (let i = 0; i < listItems.length; i++) {
                const item = listItems[i];
                const text = item.textContent || item.innerText;
                if (text.toLowerCase().includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }
        }, 150); // 150ms debounce

        searchInput.addEventListener('input', handleSearch);
    }
});
