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

    // Intercept clicks on transition links to fade in before navigating
    const transitionLinks = document.querySelectorAll('.transition-link');
    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.href;

            if (overlay) {
                overlay.classList.remove('hidden');
                // Wait for the fade-in to finish before navigating
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); // Should match the CSS transition duration
            } else {
                window.location.href = targetUrl;
            }
        });
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
