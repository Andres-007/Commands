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

    // (Note: The premium spotlight glow effect has been moved to card-glow.js using a highly optimized, throttled delegation strategy to prevent layout thrashing and keep 60+ FPS performance.)

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
            // Linux Distros — Debian/Ubuntu Family (APT-based)
            { id: 'ubuntu', name: 'Ubuntu', category: 'os', icon: 'devicon-ubuntu-plain colored', href: 'Pages/linux/ubuntu.html', desc: 'Find all Ubuntu desktop commands, explained with real use cases for all levels.' },
            { id: 'ubuntu-server', name: 'Ubuntu Server', category: 'os', icon: 'devicon-ubuntu-plain colored', href: 'Pages/linux/ubuntu.html', desc: 'Find all Ubuntu Server administration and system commands.' },
            { id: 'debian', name: 'Debian', category: 'os', icon: 'devicon-debian-plain colored', href: 'Pages/linux/apt-based.html', desc: 'Find all Debian commands, explained with real use cases for all levels.' },
            { id: 'mint', name: 'Linux Mint', category: 'os', imgIcon: 'https://cdn.simpleicons.org/linuxmint/87CF3E', href: 'Pages/linux/apt-based.html', desc: 'Find all Linux Mint and Cinnamon desktop commands.' },
            { id: 'popos', name: 'Pop!_OS', category: 'os', imgIcon: 'https://cdn.simpleicons.org/popos/48B9C7', href: 'Pages/linux/apt-based.html', desc: 'Find all Pop!_OS and COSMIC desktop commands.' },
            { id: 'zorin', name: 'Zorin OS', category: 'os', imgIcon: 'https://cdn.simpleicons.org/zorin/04A1EB', href: 'Pages/linux/apt-based.html', desc: 'Find Zorin OS configuration and customization commands.' },
            { id: 'elementary', name: 'elementary OS', category: 'os', imgIcon: 'https://cdn.simpleicons.org/elementary/64BAFE', href: 'Pages/linux/apt-based.html', desc: 'Find all elementary OS and Pantheon commands.' },
            { id: 'kali', name: 'Kali Linux', category: 'os', imgIcon: 'https://cdn.simpleicons.org/kalilinux/557C94', href: 'Pages/linux/apt-based.html', desc: 'Find Kali Linux cybersecurity, penetration testing, and security commands.' },
            { id: 'raspberrypi', name: 'Raspberry Pi OS', category: 'os', imgIcon: 'https://cdn.simpleicons.org/raspberrypi/C51A4A', href: 'Pages/linux/apt-based.html', desc: 'Find Raspberry Pi OS commands for hardware, pinouts and configuration.' },
            { id: 'lubuntu', name: 'Lubuntu', category: 'os', icon: 'devicon-ubuntu-plain colored', href: 'Pages/linux/apt-based.html', desc: 'Find Lubuntu light desktop and LXQt setup commands.' },
            { id: 'xubuntu', name: 'Xubuntu', category: 'os', icon: 'devicon-ubuntu-plain colored', href: 'Pages/linux/apt-based.html', desc: 'Find Xubuntu desktop commands and XFCE configurations.' },

            // Linux Distros — Fedora/RHEL Family (DNF-based)
            { id: 'fedora', name: 'Fedora', category: 'os', icon: 'devicon-fedora-plain colored', href: 'Pages/linux/dnf-based.html', desc: 'Find all Fedora commands, explained with real use cases.' },
            { id: 'rhel', name: 'Red Hat Enterprise Linux', category: 'os', icon: 'devicon-redhat-plain colored', href: 'Pages/linux/dnf-based.html', desc: 'Find Red Hat Enterprise Linux server and enterprise commands.' },
            { id: 'centos', name: 'CentOS Stream', category: 'os', icon: 'devicon-centos-plain colored', href: 'Pages/linux/dnf-based.html', desc: 'Find CentOS Stream server commands and DNF operations.' },
            { id: 'almalinux', name: 'AlmaLinux', category: 'os', icon: 'devicon-almalinux-plain colored', href: 'Pages/linux/dnf-based.html', desc: 'Find AlmaLinux enterprise server management commands.' },
            { id: 'rocky', name: 'Rocky Linux', category: 'os', imgIcon: 'https://cdn.simpleicons.org/rockylinux/10B981', href: 'Pages/linux/dnf-based.html', desc: 'Find Rocky Linux deployment and system administration commands.' },
            { id: 'oracle-linux', name: 'Oracle Linux', category: 'os', icon: 'devicon-oracle-original colored', href: 'Pages/linux/dnf-based.html', desc: 'Find Oracle Linux server, kernel, and enterprise commands.' },

            // Linux Distros — Arch Family (Pacman-based)
            { id: 'arch', name: 'Arch Linux', category: 'os', icon: 'devicon-archlinux-plain colored', href: 'Pages/linux/pacman-based.html', desc: 'Find Arch Linux commands, pacman package manager, and AUR helper commands.' },
            { id: 'manjaro', name: 'Manjaro', category: 'os', imgIcon: 'https://cdn.simpleicons.org/manjaro/35BF5C', href: 'Pages/linux/pacman-based.html', desc: 'Find Manjaro desktop commands and pacman package management.' },
            { id: 'endeavouros', name: 'EndeavourOS', category: 'os', imgIcon: 'https://cdn.simpleicons.org/endeavouros/7F3FBF', href: 'Pages/linux/pacman-based.html', desc: 'Find EndeavourOS terminal-centric commands and configurations.' },
            { id: 'garuda', name: 'Garuda Linux', category: 'os', imgIcon: 'https://cdn.simpleicons.org/garudalinux/white', href: 'Pages/linux/pacman-based.html', desc: 'Find Garuda Linux gaming and performance optimization commands.' },

            // Linux Distros — SUSE Family (Zypper-based)
            { id: 'opensuse-leap', name: 'openSUSE Leap', category: 'os', icon: 'devicon-opensuse-plain colored', href: 'Pages/linux/zypper-based.html', desc: 'Find openSUSE Leap stable workstation and server commands.' },
            { id: 'opensuse-tumbleweed', name: 'openSUSE Tumbleweed', category: 'os', icon: 'devicon-opensuse-plain colored', href: 'Pages/linux/zypper-based.html', desc: 'Find openSUSE Tumbleweed rolling release commands.' },
            { id: 'suse-enterprise', name: 'SUSE Linux Enterprise', category: 'os', icon: 'devicon-suse-plain colored', href: 'Pages/linux/zypper-based.html', desc: 'Find SUSE Linux Enterprise Server (SLES) administration commands.' },

            // Linux Distros — Independent/Others
            { id: 'alpine', name: 'Alpine Linux', category: 'os', imgIcon: 'https://cdn.simpleicons.org/alpinelinux/0D597F', href: 'Pages/linux/apk-based.html', desc: 'Find Alpine Linux minimal container, apk package manager commands.' },
            { id: 'gentoo', name: 'Gentoo', category: 'os', icon: 'devicon-gentoo-plain colored', href: 'Pages/linux/emerge-based.html', desc: 'Find Gentoo source compilation, Portage, and emerge commands.' },
            { id: 'void', name: 'Void Linux', category: 'os', imgIcon: 'https://cdn.simpleicons.org/voidlinux/478061', href: 'Pages/linux/xbps-based.html', desc: 'Find Void Linux xbps manager and runit service commands.' },
            { id: 'slackware', name: 'Slackware', category: 'os', imgIcon: 'https://cdn.simpleicons.org/slackware/white', href: 'Pages/linux/slackware.html', desc: 'Find Slackware package management and slackpkg commands.' }
        ];

        mainGrid.innerHTML = masterTopics.map(topic => {
            const iconHtml = topic.imgIcon 
                ? `<img src="${topic.imgIcon}" class="card-icon-img" alt="${topic.name}">`
                : `<i class="${topic.icon} card-icon ${topic.light ? 'card-icon--light' : ''}"></i>`;

            const href = topic.href || `Pages/${topic.id}.html`;
            const desc = topic.desc || `Find all ${topic.name} commands, explained with real use cases for beginner, mid, and advanced levels.`;

            return `
                <div class="command-card" data-category="${topic.category}">
                    ${iconHtml}
                    <h2>${topic.name} Commands</h2>
                    <p>${desc}</p>
                    <a href="${href}" class="nav-btn transition-link">Search commands</a>
                </div>
            `;
        }).join('');
    }
});
