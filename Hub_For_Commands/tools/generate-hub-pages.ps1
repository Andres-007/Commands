$base = Join-Path $PSScriptRoot "..\\Pages"

function HtmlEscape([string]$s) {
    return ($s -replace '&', '&amp;' -replace '"', '&quot;' -replace '<', '&lt;' -replace '>', '&gt;')
}

$pages = @(
    @{ file='bash.html'; title='Bash Commands'; sub='GNU/Linux shell essentials: files, processes, networking.'; ph='Search bash (list files, grep, ssh...)'; js='bash-data.js'; var='bashCommandsData'; term='bash - interactive reference'; welcome='Simulated bash. Try ls -la or pick from the list.'; prompt='$'; req=$null; unk='bash' }
    @{ file='windows.html'; title='Windows Commands'; sub='Command Prompt (cmd.exe): files, networking, processes.'; ph='Search cmd (dir, ipconfig...)'; js='windows-data.js'; var='windowsCommandsData'; term='cmd.exe - reference'; welcome='Simulated Command Prompt. Try dir or ipconfig.'; prompt='>'; req=$null; unk='cmd' }
    @{ file='docker.html'; title='Docker Commands'; sub='Containers and images: build, run, compose.'; ph='Search docker (ps, compose...)'; js='docker-data.js'; var='dockerCommandsData'; term='bash - Docker CLI'; welcome='Type Docker CLI commands starting with docker.'; prompt='$'; req='docker '; unk=$null }
    @{ file='kuberenetes.html'; title='Kubernetes Commands'; sub='kubectl: pods, deployments, services, debugging.'; ph='Search kubectl (get pods, logs...)'; js='kubectl-data.js'; var='kubectlCommandsData'; term='bash - kubectl'; welcome='Commands must start with kubectl.'; prompt='$'; req='kubectl '; unk=$null }
    @{ file='powershell.html'; title='PowerShell Commands'; sub='Cmdlets for files, processes, networking.'; ph='Search PowerShell (Get-ChildItem...)'; js='powershell-data.js'; var='powershellCommandsData'; term='Windows PowerShell'; welcome='Simulated PowerShell. Try Get-ChildItem.'; prompt='PS>'; req=$null; unk='ps' }
    @{ file='python.html'; title='Python Commands'; sub='Interpreter, pip/poetry, tests, servers.'; ph='Search python / pip / pytest'; js='python-data.js'; var='pythonCommandsData'; term='bash - Python tooling'; welcome='python / pip / tooling examples from the list.'; prompt='$'; req=$null; unk=$null }
    @{ file='nodejs.html'; title='Node.js Commands'; sub='npm, pnpm, yarn, Node runtime.'; ph='Search npm / npx / node'; js='nodejs-data.js'; var='nodejsCommandsData'; term='bash - Node.js'; welcome='Try npm install, npx, node --version.'; prompt='$'; req=$null; unk=$null }
    @{ file='react.html'; title='React Commands'; sub='Vite / CRA style workflows.'; ph='Search vite / npm scripts'; js='react-data.js'; var='reactCommandsData'; term='bash - React toolchain'; welcome='React via npm and npx (Vite, ESLint...).'; prompt='$'; req=$null; unk=$null }
    @{ file='angular.html'; title='Angular Commands'; sub='Angular CLI: generate, serve, build.'; ph='Search ng (serve, generate)'; js='angular-data.js'; var='angularCommandsData'; term='bash - Angular CLI'; welcome='Angular commands usually start with ng.'; prompt='$'; req=$null; unk=$null }
    @{ file='vuejs.html'; title='Vue.js Commands'; sub='create-vue, Vite scripts, Pinia/Router.'; ph='Search vue npm scripts'; js='vuejs-data.js'; var='vuejsCommandsData'; term='bash - Vue.js toolchain'; welcome='Vue 3 via npm create vue and Vite scripts.'; prompt='$'; req=$null; unk=$null }
    @{ file='svelte.html'; title='Svelte Commands'; sub='SvelteKit dev/build/check.'; ph='Search npm run dev / build'; js='svelte-data.js'; var='svelteCommandsData'; term='bash - Svelte / SvelteKit'; welcome='Try npm run dev / build.'; prompt='$'; req=$null; unk=$null }
    @{ file='reactnative.html'; title='React Native Commands'; sub='Metro, run-ios/android, Expo.'; ph='Search react-native / expo'; js='reactnative-data.js'; var='reactnativeCommandsData'; term='bash - React Native'; welcome='npx react-native ... or Expo flows.'; prompt='$'; req=$null; unk=$null }
    @{ file='flutter.html'; title='Flutter Commands'; sub='doctor, run, build, Dart tooling.'; ph='Search flutter / dart'; js='flutter-data.js'; var='flutterCommandsData'; term='bash - Flutter CLI'; welcome='flutter / dart commands.'; prompt='$'; req=$null; unk=$null }
    @{ file='javascript.html'; title='JavaScript Commands'; sub='Node, ESLint, Prettier, Jest, bundlers.'; ph='Search node / eslint / jest'; js='javascript-data.js'; var='javascriptCommandsData'; term='bash - JavaScript tooling'; welcome='node and npx tooling.'; prompt='$'; req=$null; unk=$null }
    @{ file='typescript.html'; title='TypeScript Commands'; sub='tsc, tsconfig, ts-node/tsx.'; ph='Search tsc / ts-node'; js='typescript-data.js'; var='typescriptCommandsData'; term='bash - TypeScript compiler'; welcome='Try tsc --noEmit or examples below.'; prompt='$'; req=$null; unk=$null }
    @{ file='html.html'; title='HTML Commands'; sub='Validation, formatting, local preview.'; ph='Search validator / prettier / http.server'; js='html-data.js'; var='htmlCommandsData'; term='bash - HTML tooling'; welcome='HTML tooling via Node CLI or python http.server.'; prompt='$'; req=$null; unk=$null }
    @{ file='css.html'; title='CSS Commands'; sub='Box model concepts (animated) plus Sass, Tailwind, linters.'; ph='Search padding, tailwind, sass'; js='css-data.js'; var='cssCommandsData'; term='bash - CSS toolchain'; welcome='CSS compilers, utilities, and animated box-model demos.'; prompt='$'; req=$null; unk=$null }
    @{ file='jquery.html'; title='jQuery Commands'; sub='npm workflows and tooling patterns.'; ph='Search npm install jquery'; js='jquery-data.js'; var='jqueryCommandsData'; term='bash - jQuery ecosystem'; welcome='npm/CDN focused entries.'; prompt='$'; req=$null; unk=$null }
    @{ file='mysql.html'; title='MySQL Commands'; sub='mysql client SQL plus mysqldump.'; ph='Search SHOW, SELECT, mysqldump'; js='mysql-data.js'; var='mysqlCommandsData'; term='mysql client simulator'; welcome='Simulated mysql shell (SQL with semicolon OK).'; prompt='mysql>'; req=$null; unk='mysql' }
    @{ file='mongodb.html'; title='MongoDB Commands'; sub='mongosh helpers for CRUD and dumps.'; ph='Search show dbs, db.collection'; js='mongodb-data.js'; var='mongodbCommandsData'; term='mongosh simulator'; welcome='Simulated mongosh.'; prompt='hub>'; req=$null; unk='mongo' }
    @{ file='postgresql.html'; title='PostgreSQL Commands'; sub='psql meta-commands and SQL.'; ph='Search \dt, SELECT, VACUUM'; js='postgresql-data.js'; var='postgresqlCommandsData'; term='psql simulator'; welcome='Simulated psql meta + SQL.'; prompt='hub=#'; req=$null; unk='pg' }
    @{ file='oracle.html'; title='Oracle Commands'; sub='SQL*Plus basics and Data Pump.'; ph='Search SHOW, COMMIT, expdp'; js='oracle-data.js'; var='oracleCommandsData'; term='SQL*Plus simulator'; welcome='Simulated SQL*Plus.'; prompt='SQL>'; req=$null; unk='ora' }
    @{ file='sqlserver.html'; title='SQL Server Commands'; sub='sqlcmd plus common T-SQL.'; ph='Search sqlcmd, SELECT TOP'; js='sqlserver-data.js'; var='sqlserverCommandsData'; term='sqlcmd simulator'; welcome='Simulated sqlcmd / T-SQL snippets.'; prompt='1>'; req=$null; unk='mssql' }
    @{ file='redis.html'; title='Redis Commands'; sub='redis-cli strings, hashes, lists.'; ph='Search SET, GET, INFO'; js='redis-data.js'; var='redisCommandsData'; term='redis-cli simulator'; welcome='Simulated redis-cli.'; prompt='redis>'; req=$null; unk='redis' }
    @{ file='firebase.html'; title='Firebase Commands'; sub='Firebase CLI init/emulators/deploy.'; ph='Search firebase deploy'; js='firebase-data.js'; var='firebaseCommandsData'; term='bash - Firebase CLI'; welcome='firebase ... commands.'; prompt='$'; req=$null; unk=$null }
    @{ file='apache.html'; title='Apache Commands'; sub='httpd/apachectl lifecycle.'; ph='Search apachectl, httpd'; js='apache-data.js'; var='apacheCommandsData'; term='bash - Apache/httpd'; welcome='apachectl / httpd commands.'; prompt='$'; req=$null; unk=$null }
    @{ file='nginx.html'; title='Nginx Commands'; sub='nginx -t, reload, journal/log helpers.'; ph='Search nginx -t, tail logs'; js='nginx-data.js'; var='nginxCommandsData'; term='bash - nginx'; welcome='nginx commands plus bash log tails.'; prompt='$'; req=$null; unk=$null }
    @{ file='cassandra.html'; title='Cassandra Commands'; sub='cqlsh plus nodetool ops.'; ph='Search DESCRIBE, nodetool'; js='cassandra-data.js'; var='cassandraCommandsData'; term='cqlsh simulator'; welcome='Simulated cqlsh/nodetool.'; prompt='cqlsh>'; req=$null; unk='cs' }
)

foreach ($p in $pages) {
    $reqJs = if ($null -eq $p.req) { 'null' } else { "'" + ($p.req -replace "\\","\\\\" -replace "'","\\'") + "'" }

    $unkJs = ''
    if ($null -ne $p.unk) {
        switch ($p.unk) {
            'bash' { $unkJs = @'
                formatUnknown: function (input) {
                    var t = input.split(/\s+/)[0];
                    return 'bash: ' + t + ': command not found';
                },
'@ }
            'cmd' { $unkJs = @'
                formatUnknown: function (input) {
                    return "'" + input + "' is not recognized as an internal or external command";
                },
'@ }
            'ps' { $unkJs = @'
                formatUnknown: function (input) {
                    var t = input.split(/\s+/)[0];
                    return "The term '" + t + "' is not recognized...";
                },
'@ }
            'mysql' { $unkJs = @'
                formatUnknown: function () {
                    return 'ERROR 1064 (42000): You have an error in your SQL syntax';
                },
'@ }
            'mongo' { $unkJs = @'
                formatUnknown: function (input) {
                    return 'SyntaxError: Unexpected token ' + JSON.stringify(input.split(/\s+/)[0]);
                },
'@ }
            'pg' { $unkJs = @'
                formatUnknown: function () {
                    return 'ERROR: syntax error at or near';
                },
'@ }
            'ora' { $unkJs = @'
                formatUnknown: function () {
                    return 'SP2-0734: unknown command beginning';
                },
'@ }
            'mssql' { $unkJs = @'
                formatUnknown: function () {
                    return 'Msg 102, Level 15, Incorrect syntax';
                },
'@ }
            'redis' { $unkJs = @'
                formatUnknown: function (input) {
                    return '(error) ERR unknown command `' + input.split(/\s+/)[0] + '`';
                },
'@ }
            'cs' { $unkJs = @'
                formatUnknown: function () {
                    return 'InvalidRequest: Error from server: code=2200';
                },
'@ }
            Default { $unkJs = '' }
        }
    }

    $subEsc = HtmlEscape($p.sub)
    $titleEsc = HtmlEscape($p.title)
    $phEsc = HtmlEscape($p.ph)

    $html = @"
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$titleEsc</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/stylegit.css">
    <link rel="stylesheet" href="../css/visual-demos.css">
</head>

<body>
    <div id="transition-overlay" class="transition-overlay"></div>

    <header class="hub-header">
        <h1>$titleEsc</h1>
        <p>$subEsc</p>
        <div style="margin-top: 20px;">
            <a href="../index.html" class="nav-btn secondary transition-link">&lt;- Back to Hub</a>
        </div>
    </header>

    <main class="hub-container git-layout">
        <section class="git-sidebar">
            <div id="search-container" class="search-container">
                <input type="text" id="command-search" placeholder="$phEsc" autofocus>
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
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                    <span class="term-title">terminal</span>
                </div>
                <div class="terminal-body" id="bash-output"></div>
                <div class="terminal-input-wrapper">
                    <span class="prompt">$</span>
                    <input type="text" id="bash-input" class="bash-input" autocomplete="off" spellcheck="false">
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <p>SIXNIE</p>
    </footer>

    <script src="../js/js.js"></script>
    <script src="../js/$($p.js)"></script>
    <script>
        window.commandHubConfig = {
            commands: $($p.var),
            terminalTitle: $(ConvertTo-Json $p.term),
            welcomeHtml: $(ConvertTo-Json $p.welcome),
            promptSymbol: $(ConvertTo-Json $p.prompt),
            requiredPrefix: $reqJs,
$unkJs
        };
    </script>
    <script src="../js/visual-demos.js"></script>
    <script src="../js/command-hub.js"></script>
</body>

</html>
"@

    Set-Content -Path (Join-Path $base $p.file) -Value $html -Encoding utf8
}

Write-Host "Wrote $($pages.Count) pages."
