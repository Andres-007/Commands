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
            { title: 'Ubuntu', desc: 'apt, snap, common server & desktop workflows.', href: 'Pages/linux/ubuntu.html', glyph: '🟠', icon: 'devicon-ubuntu-plain colored' },
            { title: 'Ubuntu Server', desc: 'Command-line only Ubuntu, optimized for hosting.', href: 'Pages/linux/ubuntu.html', glyph: '🖥️', icon: 'devicon-ubuntu-plain colored' },
            { title: 'Debian', desc: 'Stable/testing branches, pure apt workflow.', href: 'Pages/linux/apt-based.html', glyph: '🔴', icon: 'devicon-debian-plain colored' },
            { title: 'Linux Mint', desc: 'Ubuntu/Debian bases, apt & GUI drivers.', href: 'Pages/linux/apt-based.html', glyph: '🍃', imgIcon: 'https://cdn.simpleicons.org/linuxmint/87CF3E' },
            { title: 'Pop!_OS', desc: 'Ubuntu-based, apt + COSMIC tooling.', href: 'Pages/linux/apt-based.html', glyph: '🚀', imgIcon: 'https://cdn.simpleicons.org/popos/48B9C7' },
            { title: 'Zorin OS', desc: 'Ubuntu LTS base, apt-focused.', href: 'Pages/linux/apt-based.html', glyph: '🖥️', imgIcon: 'https://cdn.simpleicons.org/zorin/04A1EB' },
            { title: 'elementary OS', desc: 'Ubuntu LTS, pantheon + apt.', href: 'Pages/linux/apt-based.html', glyph: '⌘', imgIcon: 'https://cdn.simpleicons.org/elementary/64BAFE' },
            { title: 'Kali Linux', desc: 'Debian testing base, apt + security tools.', href: 'Pages/linux/apt-based.html', glyph: '🐉', imgIcon: 'https://cdn.simpleicons.org/kalilinux/557C94' },
            { title: 'Raspberry Pi OS', desc: 'Debian armhf/arm64, raspi-config.', href: 'Pages/linux/apt-based.html', glyph: '📟', imgIcon: 'https://cdn.simpleicons.org/raspberrypi/C51A4A' },
            { title: 'Lubuntu', desc: 'Ubuntu flavour, LXQt + apt.', href: 'Pages/linux/apt-based.html', glyph: '💠', icon: 'devicon-ubuntu-plain colored' },
            { title: 'Xubuntu', desc: 'Ubuntu + XFCE, apt.', href: 'Pages/linux/apt-based.html', glyph: '🐭', icon: 'devicon-ubuntu-plain colored' },
        ],
    },
    {
        id: 'fedora-rhel',
        title: 'Fedora / RHEL family',
        subtitle: 'DNF / YUM, RPM packages',
        cards: [
            { title: 'Fedora', desc: 'Bleeding-edge RPM, dnf, SELinux default.', href: 'Pages/linux/dnf-based.html', glyph: '🎩', icon: 'devicon-fedora-plain colored' },
            { title: 'Red Hat Enterprise Linux', desc: 'dnf + subscription-manager.', href: 'Pages/linux/dnf-based.html', glyph: '🎩', icon: 'devicon-redhat-plain colored' },
            { title: 'CentOS Stream', desc: 'Rolling preview of RHEL, dnf.', href: 'Pages/linux/dnf-based.html', glyph: '🔄', icon: 'devicon-centos-plain colored' },
            { title: 'AlmaLinux', desc: 'RHEL-compatible, dnf.', href: 'Pages/linux/dnf-based.html', glyph: '🛡️', icon: 'devicon-almalinux-plain colored' },
            { title: 'Rocky Linux', desc: 'RHEL-compatible, dnf.', href: 'Pages/linux/dnf-based.html', glyph: '⛰️', imgIcon: 'https://cdn.simpleicons.org/rockylinux/10B981' },
            { title: 'Oracle Linux', desc: 'RHEL-compatible, dnf/yum.', href: 'Pages/linux/dnf-based.html', glyph: '🔶', icon: 'devicon-oracle-original colored' },
        ],
    },
    {
        id: 'arch-family',
        title: 'Arch-based',
        subtitle: 'pacman, AUR helpers, rolling release',
        cards: [
            { title: 'Arch Linux', desc: 'pacman, systemd, wiki-first.', href: 'Pages/linux/pacman-based.html', glyph: '🎯', icon: 'devicon-archlinux-plain colored' },
            { title: 'Manjaro', desc: 'pacman + pamac, friendlier defaults.', href: 'Pages/linux/pacman-based.html', glyph: '🏔️', imgIcon: 'https://cdn.simpleicons.org/manjaro/35BF5C' },
            { title: 'EndeavourOS', desc: 'Arch installer + pacman.', href: 'Pages/linux/pacman-based.html', glyph: '🚀', imgIcon: 'https://cdn.simpleicons.org/endeavouros/7F3FBF' },
            { title: 'Garuda Linux', desc: 'Arch + BTRFS snapshots, pacman.', href: 'Pages/linux/pacman-based.html', glyph: '🦅', imgIcon: 'https://cdn.simpleicons.org/garudalinux/white' },
        ],
    },
    {
        id: 'suse-zypper',
        title: 'SUSE family',
        subtitle: 'zypper, RPM',
        cards: [
            { title: 'openSUSE Leap', desc: 'Stable, zypper + YaST.', href: 'Pages/linux/zypper-based.html', glyph: '🦎', icon: 'devicon-opensuse-plain colored' },
            { title: 'openSUSE Tumbleweed', desc: 'Rolling, zypper.', href: 'Pages/linux/zypper-based.html', glyph: '🌀', icon: 'devicon-opensuse-plain colored' },
            { title: 'SUSE Linux Enterprise', desc: 'Enterprise zypper workflows.', href: 'Pages/linux/zypper-based.html', glyph: '🏢', icon: 'devicon-suse-plain colored' },
        ],
    },
    {
        id: 'lightweight-independent',
        title: 'Lightweight & independent',
        subtitle: 'apk, Portage, minimal bases',
        cards: [
            { title: 'Alpine Linux', desc: 'musl, apk, OpenRC or systemd.', href: 'Pages/linux/apk-based.html', glyph: '🏔️', imgIcon: 'https://cdn.simpleicons.org/alpinelinux/0D597F' },
            { title: 'Gentoo', desc: 'Portage, emerge, USE flags.', href: 'Pages/linux/emerge-based.html', glyph: '🐧', icon: 'devicon-gentoo-plain colored' },
            { title: 'Void Linux', desc: 'xbps package manager.', href: 'Pages/linux/xbps-based.html', glyph: '⬛', imgIcon: 'https://cdn.simpleicons.org/voidlinux/478061' },
            { title: 'Slackware', desc: 'Classic slackpkg/upgradepkg.', href: 'Pages/linux/slackware.html', glyph: '📦', imgIcon: 'https://cdn.simpleicons.org/slackware/white' },
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
