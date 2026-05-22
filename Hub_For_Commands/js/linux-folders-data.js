/**
 * Linux distro folders for the hub index (Start-menu style).
 * Each card links to Pages/linux/*.html (package-manager family pages).
 */
window.LINUX_HUB_FOLDERS = [
    {
        id: 'debian-family',
        title: 'Debian family',
        subtitle: 'APT, .deb packages, systemd on most spins',
        cards: [
            { title: 'Ubuntu Commands', desc: 'On this page you find all commands of ubuntu, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/ubuntu.html', glyph: '🟠', icon: 'devicon-ubuntu-plain colored' },
            { title: 'Ubuntu Server Commands', desc: 'On this page you find all commands of ubuntu server, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/ubuntu.html', glyph: '🖥️', icon: 'devicon-ubuntu-plain colored' },
            { title: 'Debian Commands', desc: 'On this page you find all commands of debian, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '🔴', icon: 'devicon-debian-plain colored' },
            { title: 'Linux Mint Commands', desc: 'On this page you find all commands of linux mint, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '🍃', imgIcon: 'https://cdn.simpleicons.org/linuxmint/87CF3E' },
            { title: 'Pop!_OS Commands', desc: 'On this page you find all commands of pop!_os, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '🚀', imgIcon: 'https://cdn.simpleicons.org/popos/48B9C7' },
            { title: 'Zorin OS Commands', desc: 'On this page you find all commands of zorin os, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '🖥️', imgIcon: 'https://cdn.simpleicons.org/zorin/04A1EB' },
            { title: 'elementary OS Commands', desc: 'On this page you find all commands of elementary os, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '⌘', imgIcon: 'https://cdn.simpleicons.org/elementary/64BAFE' },
            { title: 'Kali Linux Commands', desc: 'On this page you find all commands of kali linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '🐉', imgIcon: 'https://cdn.simpleicons.org/kalilinux/557C94' },
            { title: 'Raspberry Pi OS Commands', desc: 'On this page you find all commands of raspberry pi os, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '📟', imgIcon: 'https://cdn.simpleicons.org/raspberrypi/C51A4A' },
            { title: 'Lubuntu Commands', desc: 'On this page you find all commands of lubuntu, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '💠', icon: 'devicon-ubuntu-plain colored' },
            { title: 'Xubuntu Commands', desc: 'On this page you find all commands of xubuntu, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apt-based.html', glyph: '🐭', icon: 'devicon-ubuntu-plain colored' },
        ],
    },
    {
        id: 'fedora-rhel',
        title: 'Fedora / RHEL family',
        subtitle: 'DNF / YUM, RPM packages',
        cards: [
            { title: 'Fedora Commands', desc: 'On this page you find all commands of fedora, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/dnf-based.html', glyph: '🎩', icon: 'devicon-fedora-plain colored' },
            { title: 'Red Hat Enterprise Linux Commands', desc: 'On this page you find all commands of red hat enterprise linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/dnf-based.html', glyph: '🎩', icon: 'devicon-redhat-plain colored' },
            { title: 'CentOS Stream Commands', desc: 'On this page you find all commands of centos stream, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/dnf-based.html', glyph: '🔄', icon: 'devicon-centos-plain colored' },
            { title: 'AlmaLinux Commands', desc: 'On this page you find all commands of almalinux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/dnf-based.html', glyph: '🛡️', icon: 'devicon-almalinux-plain colored' },
            { title: 'Rocky Linux Commands', desc: 'On this page you find all commands of rocky linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/dnf-based.html', glyph: '⛰️', imgIcon: 'https://cdn.simpleicons.org/rockylinux/10B981' },
            { title: 'Oracle Linux Commands', desc: 'On this page you find all commands of oracle linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/dnf-based.html', glyph: '🔶', icon: 'devicon-oracle-original colored' },
        ],
    },
    {
        id: 'arch-family',
        title: 'Arch-based',
        subtitle: 'pacman, AUR helpers, rolling release',
        cards: [
            { title: 'Arch Linux Commands', desc: 'On this page you find all commands of arch linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/pacman-based.html', glyph: '🎯', icon: 'devicon-archlinux-plain colored' },
            { title: 'Manjaro Commands', desc: 'On this page you find all commands of manjaro, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/pacman-based.html', glyph: '🏔️', imgIcon: 'https://cdn.simpleicons.org/manjaro/35BF5C' },
            { title: 'EndeavourOS Commands', desc: 'On this page you find all commands of endeavouros, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/pacman-based.html', glyph: '🚀', imgIcon: 'https://cdn.simpleicons.org/endeavouros/7F3FBF' },
            { title: 'Garuda Linux Commands', desc: 'On this page you find all commands of garuda linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/pacman-based.html', glyph: '🦅', imgIcon: 'https://cdn.simpleicons.org/garudalinux/white' },
        ],
    },
    {
        id: 'suse-zypper',
        title: 'SUSE family',
        subtitle: 'zypper, RPM',
        cards: [
            { title: 'openSUSE Leap Commands', desc: 'On this page you find all commands of opensuse leap, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/zypper-based.html', glyph: '🦎', icon: 'devicon-opensuse-plain colored' },
            { title: 'openSUSE Tumbleweed Commands', desc: 'On this page you find all commands of opensuse tumbleweed, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/zypper-based.html', glyph: '🌀', icon: 'devicon-opensuse-plain colored' },
            { title: 'SUSE Linux Enterprise Commands', desc: 'On this page you find all commands of suse linux enterprise, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/zypper-based.html', glyph: '🏢', icon: 'devicon-suse-plain colored' },
        ],
    },
    {
        id: 'lightweight-independent',
        title: 'Lightweight & independent',
        subtitle: 'apk, Portage, minimal bases',
        cards: [
            { title: 'Alpine Linux Commands', desc: 'On this page you find all commands of alpine linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/apk-based.html', glyph: '🏔️', imgIcon: 'https://cdn.simpleicons.org/alpinelinux/0D597F' },
            { title: 'Gentoo Commands', desc: 'On this page you find all commands of gentoo, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/emerge-based.html', glyph: '🐧', icon: 'devicon-gentoo-plain colored' },
            { title: 'Void Linux Commands', desc: 'On this page you find all commands of void linux, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/xbps-based.html', glyph: '⬛', imgIcon: 'https://cdn.simpleicons.org/voidlinux/478061' },
            { title: 'Slackware Commands', desc: 'On this page you find all commands of slackware, explained in real use also search for levels beginner, mid and advance.', href: 'Pages/linux/slackware.html', glyph: '📦', imgIcon: 'https://cdn.simpleicons.org/slackware/white' },
        ],
    },
    {
        id: 'desktop-environments',
        title: 'Desktop Environments',
        subtitle: 'GUIs that run on top of distros (GNOME, KDE, etc.)',
        cards: [
            { title: 'GNOME', desc: 'Modern, simple, workflow-focused (Ubuntu/Fedora default).', href: '#', glyph: '👣' },
            { title: 'KDE Plasma', desc: 'Highly customizable, Windows-like layout.', href: '#', glyph: '⚙️' },
            { title: 'XFCE', desc: 'Lightweight, fast, and classic.', href: '#', glyph: '🐭' },
            { title: 'Cinnamon', desc: 'Traditional desktop experience (Linux Mint default).', href: '#', glyph: '🌿' },
            { title: 'MATE', desc: 'Continuation of GNOME 2, solid and classic.', href: '#', glyph: '🧉' },
            { title: 'COSMIC', desc: 'Next-gen desktop by System76 (Pop!_OS).', href: '#', glyph: '🚀' },
            { title: 'Pantheon', desc: 'macOS-like elegant desktop (elementary OS).', href: '#', glyph: '🏛️' },
        ],
    },
];
