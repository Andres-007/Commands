/**
 * Global site behaviours — page transitions, typewriter, and dynamic grid rendering.
 */
document.addEventListener('DOMContentLoaded', () => {
    // ================================================================
    // PAGE TRANSITIONS & CARD CLICKS
    // ================================================================
    const overlay = document.getElementById('transition-overlay');

    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 50);
    }

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a.transition-link');
        if (link) {
            e.preventDefault();
            const targetUrl = link.href;
            if (overlay) {
                overlay.classList.remove('hidden');
                setTimeout(() => window.location.href = targetUrl, 500);
            } else {
                window.location.href = targetUrl;
            }
            return;
        }

        // Delegate command card clicks to their links
        const card = e.target.closest('.command-card');
        if (card && !e.target.closest('a')) {
            const cardLink = card.querySelector('a.transition-link, a[href]');
            if (cardLink) cardLink.click();
        }
    });

    // ================================================================
    // UNIVERSAL JS TYPEWRITER
    // ================================================================
    function applyTypewriter(elementSelector) {
        const el = document.querySelector(elementSelector);
        if (!el) return;

        const text = el.textContent.trim();
        // Build structure: text span + cursor span
        el.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor" aria-hidden="true">_</span>';
        const textSpan = el.querySelector('.typewriter-text');
        const cursor   = el.querySelector('.typewriter-cursor');

        // Cursor is completely hidden while text animates
        cursor.style.visibility = 'hidden';

        let i = 0;
        let lastTime = 0;
        const speed = 50;

        function typeChar(timestamp) {
            if (!lastTime) lastTime = timestamp;
            if (timestamp - lastTime >= speed) {
                textSpan.textContent += text.charAt(i);
                i++;
                lastTime = timestamp;
            }
            if (i < text.length) {
                requestAnimationFrame(typeChar);
            } else {
                // Animation complete — remove cursor entirely (no floating artifact)
                cursor.remove();
            }
        }

        requestAnimationFrame(typeChar);
    }

    applyTypewriter('header h1');
    applyTypewriter('.term-title');

    // ================================================================
    // PREMIUM MOUSE TRACKING GLOW
    // ================================================================
    function attachGlowEffect() {
        const glowTargets = document.querySelectorAll('.command-card, .hub-folder-card, .terminal-container, .workspace-canvas');
        
        document.body.addEventListener('mousemove', (e) => {
            glowTargets.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
    attachGlowEffect();

    // ================================================================
    // UNIFIED DYNAMIC GRID RENDERING (index.html only)
    // ================================================================
    const mainGrid = document.getElementById('main-grid');
    if (mainGrid) {
        const masterTopics = [
            { id: 'git', name: 'Git', category: 'cli devops', icon: 'devicon-git-plain colored' },
            { id: 'bash', name: 'Bash', category: 'cli os', icon: 'devicon-bash-plain', light: true },
            { id: 'windows', name: 'Windows', category: 'os', icon: 'devicon-windows8-original colored' },
            { id: 'docker', name: 'Docker', category: 'devops', icon: 'devicon-docker-plain colored' },
            { id: 'kuberenetes', name: 'Kubernetes', category: 'devops', icon: 'devicon-kubernetes-plain colored' },
            { id: 'powershell', name: 'PowerShell', category: 'cli os', icon: 'devicon-windows8-original colored' },
            { id: 'python', name: 'Python', category: 'backend', icon: 'devicon-python-plain colored' },
            { id: 'nodejs', name: 'Node.js', category: 'backend', icon: 'devicon-nodejs-plain colored' },
            { id: 'react', name: 'React', category: 'frontend', icon: 'devicon-react-original colored' },
            { id: 'angular', name: 'Angular', category: 'frontend', icon: 'devicon-angularjs-plain colored' },
            { id: 'vuejs', name: 'Vue.js', category: 'frontend', icon: 'devicon-vuejs-plain colored' },
            { id: 'svelte', name: 'Svelte', category: 'frontend', icon: 'devicon-svelte-plain colored' },
            { id: 'reactnative', name: 'React Native', category: 'frontend', icon: 'devicon-react-original colored' },
            { id: 'flutter', name: 'Flutter', category: 'frontend', icon: 'devicon-flutter-plain colored' },
            { id: 'javascript', name: 'JavaScript', category: 'frontend backend', icon: 'devicon-javascript-plain colored' },
            { id: 'typescript', name: 'TypeScript', category: 'frontend backend', icon: 'devicon-typescript-plain colored' },
            { id: 'html', name: 'HTML', category: 'frontend', icon: 'devicon-html5-plain colored' },
            { id: 'css', name: 'CSS', category: 'frontend', icon: 'devicon-css3-plain colored' },
            { id: 'jquery', name: 'jQuery', category: 'frontend', icon: 'devicon-jquery-plain colored' },
            { id: 'mysql', name: 'MySQL', category: 'databases', icon: 'devicon-mysql-plain colored' },
            { id: 'mongodb', name: 'MongoDB', category: 'databases', icon: 'devicon-mongodb-plain colored' },
            { id: 'postgresql', name: 'PostgreSQL', category: 'databases', icon: 'devicon-postgresql-plain colored' },
            { id: 'oracle', name: 'Oracle', category: 'databases', icon: 'devicon-oracle-original colored' },
            { id: 'sqlserver', name: 'SQL Server', category: 'databases', icon: 'devicon-microsoftsqlserver-plain colored' },
            { id: 'redis', name: 'Redis', category: 'databases', icon: 'devicon-redis-plain colored' },
            { id: 'firebase', name: 'Firebase', category: 'devops backend', icon: 'devicon-firebase-plain colored' },
            { id: 'apache', name: 'Apache', category: 'devops', icon: 'devicon-apache-plain colored' },
            { id: 'nginx', name: 'Nginx', category: 'devops', icon: 'devicon-nginx-original colored' },
            { id: 'cassandra', name: 'Cassandra', category: 'databases', imgIcon: 'https://cdn.simpleicons.org/apachecassandra/1287B1' },
            // Linux Distros
            { id: 'ubuntu', name: 'Ubuntu', category: 'os', icon: 'devicon-ubuntu-plain colored' },
            { id: 'debian', name: 'Debian', category: 'os', icon: 'devicon-debian-plain colored' },
            { id: 'centos', name: 'CentOS', category: 'os', icon: 'devicon-centos-plain colored' },
            { id: 'fedora', name: 'Fedora', category: 'os', icon: 'devicon-fedora-plain colored' }
        ];

        mainGrid.innerHTML = masterTopics.map(topic => {
            const iconHtml = topic.imgIcon 
                ? `<img src="${topic.imgIcon}" class="card-icon-img" alt="${topic.name}">`
                : `<i class="${topic.icon} card-icon ${topic.light ? 'card-icon--light' : ''}"></i>`;

            return `
                <div class="command-card" data-category="${topic.category}">
                    ${iconHtml}
                    <h2>${topic.name} Commands</h2>
                    <p>Find all ${topic.name} commands, explained with real use cases for beginner, mid, and advanced levels.</p>
                    <a href="Pages/${topic.id}.html" class="nav-btn transition-link">Search commands</a>
                </div>
            `;
        }).join('');

        attachGlowEffect();
    }

    // ================================================================
    // FILTERING LOGIC
    // ================================================================
    const filterBtns = document.querySelectorAll('.hub-pill');
    if (filterBtns.length > 0 && mainGrid) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.hub-pill.active')?.classList.remove('active');
                e.target.classList.add('active');
                
                const filter = e.target.getAttribute('data-category');
                const cards = mainGrid.querySelectorAll('.command-card');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});
