#!/usr/bin/env node
/**
 * generate-pages.js — Node.js page generator for Hub of Commands.
 * Run: node tools/generate-pages.js
 */
const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'Pages');

function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escJs(s) {
    return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
}

const shellModeMap = {
    bash:'bash', cmd:'cmd', ps:'powershell',
    mysql:'mysql', mongo:'mongo', pg:'psql',
    ora:'oracle', mssql:'mssql', redis:'redis', cs:'cqlsh'
};

const pages = [
    { file:'bash.html', title:'Bash', sub:'GNU/Linux shell essentials: files, processes, networking.', ph:'Search bash (list files, grep, ssh...)', js:'bash-data.js', v:'bashCommandsData', term:'bash - interactive reference', welcome:'Simulated bash. Try ls -la or pick from the list.', prompt:'$', req:null, shell:'bash' },
    { file:'windows.html', title:'Windows', sub:'Command Prompt (cmd.exe): files, networking, processes.', ph:'Search cmd (dir, ipconfig...)', js:'windows-data.js', v:'windowsCommandsData', term:'cmd.exe - reference', welcome:'Simulated Command Prompt. Try dir or ipconfig.', prompt:'>', req:null, shell:'cmd' },
    { file:'docker.html', title:'Docker', sub:'Containers and images: build, run, compose.', ph:'Search docker (ps, compose...)', js:'docker-data.js', v:'dockerCommandsData', term:'bash - Docker CLI', welcome:'Type Docker CLI commands starting with docker.', prompt:'$', req:'docker ', shell:'bash' },
    { file:'kuberenetes.html', title:'Kubernetes', sub:'kubectl: pods, deployments, services, debugging.', ph:'Search kubectl (get pods, logs...)', js:'kubectl-data.js', v:'kubectlCommandsData', term:'bash - kubectl', welcome:'Commands must start with kubectl.', prompt:'$', req:'kubectl ', shell:'bash' },
    { file:'powershell.html', title:'PowerShell', sub:'Cmdlets for files, processes, networking.', ph:'Search PowerShell (Get-ChildItem...)', js:'powershell-data.js', v:'powershellCommandsData', term:'Windows PowerShell', welcome:'Simulated PowerShell. Try Get-ChildItem.', prompt:'PS>', req:null, shell:'ps' },
    { file:'python.html', title:'Python', sub:'Interpreter, pip/poetry, tests, servers.', ph:'Search python / pip / pytest', js:'python-data.js', v:'pythonCommandsData', term:'bash - Python tooling', welcome:'python / pip / tooling examples from the list.', prompt:'$', req:null, shell:'bash' },
    { file:'nodejs.html', title:'Node.js', sub:'npm, pnpm, yarn, Node runtime.', ph:'Search npm / npx / node', js:'nodejs-data.js', v:'nodejsCommandsData', term:'bash - Node.js', welcome:'Try npm install, npx, node --version.', prompt:'$', req:null, shell:'bash' },
    { file:'react.html', title:'React', sub:'Vite / CRA style workflows.', ph:'Search vite / npm scripts', js:'react-data.js', v:'reactCommandsData', term:'bash - React toolchain', welcome:'React via npm and npx (Vite, ESLint...).', prompt:'$', req:null, shell:'bash' },
    { file:'angular.html', title:'Angular', sub:'Angular CLI: generate, serve, build.', ph:'Search ng (serve, generate)', js:'angular-data.js', v:'angularCommandsData', term:'bash - Angular CLI', welcome:'Angular commands usually start with ng.', prompt:'$', req:null, shell:'bash' },
    { file:'vuejs.html', title:'Vue.js', sub:'create-vue, Vite scripts, Pinia/Router.', ph:'Search vue npm scripts', js:'vuejs-data.js', v:'vuejsCommandsData', term:'bash - Vue.js toolchain', welcome:'Vue 3 via npm create vue and Vite scripts.', prompt:'$', req:null, shell:'bash' },
    { file:'svelte.html', title:'Svelte', sub:'SvelteKit dev/build/check.', ph:'Search npm run dev / build', js:'svelte-data.js', v:'svelteCommandsData', term:'bash - Svelte / SvelteKit', welcome:'Try npm run dev / build.', prompt:'$', req:null, shell:'bash' },
    { file:'reactnative.html', title:'React Native', sub:'Metro, run-ios/android, Expo.', ph:'Search react-native / expo', js:'reactnative-data.js', v:'reactnativeCommandsData', term:'bash - React Native', welcome:'npx react-native ... or Expo flows.', prompt:'$', req:null, shell:'bash' },
    { file:'flutter.html', title:'Flutter', sub:'doctor, run, build, Dart tooling.', ph:'Search flutter / dart', js:'flutter-data.js', v:'flutterCommandsData', term:'bash - Flutter CLI', welcome:'flutter / dart commands.', prompt:'$', req:null, shell:'bash' },
    { file:'javascript.html', title:'JavaScript', sub:'Node, ESLint, Prettier, Jest, bundlers.', ph:'Search node / eslint / jest', js:'javascript-data.js', v:'javascriptCommandsData', term:'bash - JavaScript tooling', welcome:'node and npx tooling.', prompt:'$', req:null, shell:'bash' },
    { file:'typescript.html', title:'TypeScript', sub:'tsc, tsconfig, ts-node/tsx.', ph:'Search tsc / ts-node', js:'typescript-data.js', v:'typescriptCommandsData', term:'bash - TypeScript compiler', welcome:'Try tsc --noEmit or examples below.', prompt:'$', req:null, shell:'bash' },
    { file:'html.html', title:'HTML', sub:'Validation, formatting, local preview.', ph:'Search validator / prettier / http.server', js:'html-data.js', v:'htmlCommandsData', term:'bash - HTML tooling', welcome:'HTML tooling via Node CLI or python http.server.', prompt:'$', req:null, shell:'bash' },
    { file:'css.html', title:'CSS', sub:'Box model concepts (animated) plus Sass, Tailwind, linters.', ph:'Search padding, tailwind, sass', js:'css-data.js', v:'cssCommandsData', term:'bash - CSS toolchain', welcome:'CSS compilers, utilities, and animated box-model demos.', prompt:'$', req:null, shell:'bash' },
    { file:'jquery.html', title:'jQuery', sub:'npm workflows and tooling patterns.', ph:'Search npm install jquery', js:'jquery-data.js', v:'jqueryCommandsData', term:'bash - jQuery ecosystem', welcome:'npm/CDN focused entries.', prompt:'$', req:null, shell:'bash' },
    { file:'mysql.html', title:'MySQL', sub:'mysql client SQL plus mysqldump.', ph:'Search SHOW, SELECT, mysqldump', js:'mysql-data.js', v:'mysqlCommandsData', term:'mysql client simulator', welcome:'Simulated mysql shell (SQL with semicolon OK).', prompt:'mysql>', req:null, shell:'mysql' },
    { file:'mongodb.html', title:'MongoDB', sub:'mongosh helpers for CRUD and dumps.', ph:'Search show dbs, db.collection', js:'mongodb-data.js', v:'mongodbCommandsData', term:'mongosh simulator', welcome:'Simulated mongosh.', prompt:'hub>', req:null, shell:'mongo' },
    { file:'postgresql.html', title:'PostgreSQL', sub:'psql meta-commands and SQL.', ph:'Search \\dt, SELECT, VACUUM', js:'postgresql-data.js', v:'postgresqlCommandsData', term:'psql simulator', welcome:'Simulated psql meta + SQL.', prompt:'hub=#', req:null, shell:'pg' },
    { file:'oracle.html', title:'Oracle', sub:'SQL*Plus basics and Data Pump.', ph:'Search SHOW, COMMIT, expdp', js:'oracle-data.js', v:'oracleCommandsData', term:'SQL*Plus simulator', welcome:'Simulated SQL*Plus.', prompt:'SQL>', req:null, shell:'ora' },
    { file:'sqlserver.html', title:'SQL Server', sub:'sqlcmd plus common T-SQL.', ph:'Search sqlcmd, SELECT TOP', js:'sqlserver-data.js', v:'sqlserverCommandsData', term:'sqlcmd simulator', welcome:'Simulated sqlcmd / T-SQL snippets.', prompt:'1>', req:null, shell:'mssql' },
    { file:'redis.html', title:'Redis', sub:'redis-cli strings, hashes, lists.', ph:'Search SET, GET, INFO', js:'redis-data.js', v:'redisCommandsData', term:'redis-cli simulator', welcome:'Simulated redis-cli.', prompt:'redis>', req:null, shell:'redis' },
    { file:'firebase.html', title:'Firebase', sub:'Firebase CLI init/emulators/deploy.', ph:'Search firebase deploy', js:'firebase-data.js', v:'firebaseCommandsData', term:'bash - Firebase CLI', welcome:'firebase ... commands.', prompt:'$', req:null, shell:'bash' },
    { file:'apache.html', title:'Apache', sub:'httpd/apachectl lifecycle.', ph:'Search apachectl, httpd', js:'apache-data.js', v:'apacheCommandsData', term:'bash - Apache/httpd', welcome:'apachectl / httpd commands.', prompt:'$', req:null, shell:'bash' },
    { file:'nginx.html', title:'Nginx', sub:'nginx -t, reload, journal/log helpers.', ph:'Search nginx -t, tail logs', js:'nginx-data.js', v:'nginxCommandsData', term:'bash - nginx', welcome:'nginx commands plus bash log tails.', prompt:'$', req:null, shell:'bash' },
    { file:'cassandra.html', title:'Cassandra', sub:'cqlsh plus nodetool ops.', ph:'Search DESCRIBE, nodetool', js:'cassandra-data.js', v:'cassandraCommandsData', term:'cqlsh simulator', welcome:'Simulated cqlsh/nodetool.', prompt:'cqlsh>', req:null, shell:'cs' },
];

// Linux distro pages
const linuxPages = [
    { file:'linux/ubuntu.html', title:'Ubuntu', sub:'apt, snap, common desktop & server workflows.', ph:'Search apt / dpkg / snap', js:'linux/apt-data.js', v:'aptCommandsData', term:'bash - Ubuntu', welcome:'Ubuntu terminal. Try apt update or dpkg -l.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/apt-based.html', title:'APT-based distros', sub:'apt/dpkg commands for Debian family distros.', ph:'Search apt / dpkg / snap', js:'linux/apt-data.js', v:'aptCommandsData', term:'bash - apt', welcome:'APT-family terminal. Try apt install <pkg>.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/dnf-based.html', title:'DNF-based distros', sub:'dnf/rpm commands for Fedora/RHEL family.', ph:'Search dnf / rpm / systemctl', js:'linux/dnf-data.js', v:'dnfCommandsData', term:'bash - dnf', welcome:'DNF-family terminal. Try dnf install <pkg>.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/pacman-based.html', title:'Pacman-based distros', sub:'pacman/makepkg for Arch family.', ph:'Search pacman / yay / makepkg', js:'linux/pacman-data.js', v:'pacmanCommandsData', term:'bash - pacman', welcome:'Pacman terminal. Try pacman -Syu.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/zypper-based.html', title:'Zypper-based distros', sub:'zypper/rpm for openSUSE/SUSE family.', ph:'Search zypper / rpm', js:'linux/zypper-data.js', v:'zypperCommandsData', term:'bash - zypper', welcome:'Zypper terminal. Try zypper install <pkg>.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/apk-based.html', title:'APK-based distros', sub:'apk for Alpine Linux.', ph:'Search apk add / del / info', js:'linux/apk-data.js', v:'apkCommandsData', term:'bash - apk', welcome:'Alpine apk terminal. Try apk add <pkg>.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/emerge-based.html', title:'Portage-based distros', sub:'emerge/eselect for Gentoo.', ph:'Search emerge / eselect / USE', js:'linux/emerge-data.js', v:'emergeCommandsData', term:'bash - emerge', welcome:'Gentoo terminal. Try emerge --sync.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/xbps-based.html', title:'XBPS-based distros', sub:'xbps for Void Linux.', ph:'Search xbps-install / remove', js:'linux/xbps-data.js', v:'xbpsCommandsData', term:'bash - xbps', welcome:'Void xbps terminal. Try xbps-install <pkg>.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
    { file:'linux/slackware.html', title:'Slackware', sub:'slackpkg/upgradepkg package management.', ph:'Search slackpkg / installpkg', js:'linux/slackware-data.js', v:'slackwareCommandsData', term:'bash - Slackware', welcome:'Slackware terminal. Try slackpkg search <pkg>.', prompt:'$', req:null, shell:'bash', cssPrefix:'../../', jsPrefix:'../../', backHref:'../../index.html' },
];

function generatePage(p) {
    const cssPrefix = p.cssPrefix || '../';
    const jsPrefix = p.jsPrefix || '../';
    const backHref = p.backHref || '../index.html';
    const reqJs = p.req === null ? 'null' : `'${escJs(p.req)}'`;
    const shellMode = shellModeMap[p.shell] || 'bash';

    const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escHtml(p.title)} Commands</title>
    <meta name="description" content="Interactive ${escHtml(p.title)} command reference with simulated terminal. Search, learn, and practice ${p.title.toLowerCase()} commands with animated visual demos.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${cssPrefix}css/style.css">
    <link rel="stylesheet" href="${cssPrefix}css/stylegit.css">
    <link rel="stylesheet" href="${cssPrefix}css/visual-demos.css">
</head>

<body>
    <div id="transition-overlay" class="transition-overlay"></div>

    <header class="hub-header">
        <h1>${escHtml(p.title)} Commands</h1>
        <p>${escHtml(p.sub)}</p>
        <div style="margin-top: 20px;">
            <a href="${backHref}" class="nav-btn secondary transition-link">&larr; Back to Hub</a>
        </div>
    </header>

    <main class="hub-container git-layout">
        <section class="git-sidebar">
            <div id="search-container" class="search-container">
                <input type="search" id="command-search" placeholder="${escHtml(p.ph)}" autofocus>
            </div>
            <ul id="command-list" class="command-list"></ul>
        </section>

        <section class="git-content">
            <div id="detail-placeholder" class="placeholder-msg">
                <p>Select a command to view details and try it in the terminal.</p>
            </div>

            <div id="detail-content" class="detail-card" style="display: none;">
                <h2 id="detail-title" class="cmd-title">Command</h2>
                <div class="code-block">
                    <code id="detail-command">example</code>
                </div>
                <div class="explanation-box non-tech">
                    <span class="badge badge-nontech">Plain English</span>
                    <p id="detail-nontech"></p>
                </div>
                <div class="explanation-box tech">
                    <span class="badge badge-tech">Technical</span>
                    <p id="detail-tech"></p>
                </div>
                <div id="visual-demo" class="visual-demo visual-demo--empty" aria-live="polite"></div>
            </div>

            <div class="terminal-container">
                <div class="terminal-header">
                    <div style="display: flex; gap: 6px;">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <span class="term-title">terminal</span>
                    <button id="bash-clear-btn" class="term-clear-btn" aria-label="Clear Terminal">Clear</button>
                </div>
                <div class="terminal-body" id="bash-output"></div>
                <div class="terminal-input-wrapper">
                    <span class="prompt">${escHtml(p.prompt)}</span>
                    <input type="text" id="bash-input" class="bash-input" autocomplete="off" spellcheck="false">
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <p>SIXNIE</p>
    </footer>

    <script src="${jsPrefix}js/js.js"></script>
    <script src="${jsPrefix}js/${p.js}"></script>
    <script>
        window.commandHubConfig = {
            commands: ${p.v},
            shellMode: '${shellMode}',
            terminalTitle: '${escJs(p.term)}',
            welcomeHtml: '${escJs(p.welcome)}',
            promptSymbol: '${escJs(p.prompt)}',
            requiredPrefix: ${reqJs},
        };
    </script>
    <script src="${jsPrefix}js/visual-demos.js"></script>
    <script src="${jsPrefix}js/terminal-engine.js"></script>
</body>

</html>
`;

    const outPath = path.join(pagesDir, p.file);
    const outDir = path.dirname(outPath);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
}

// Generate all pages
const allPages = [...pages, ...linuxPages];
allPages.forEach(generatePage);
console.log(`Wrote ${allPages.length} pages to ${pagesDir}`);
