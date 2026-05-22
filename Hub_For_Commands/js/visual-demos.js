/**
 * Visual demos — Tier 1 bespoke + Tier 2 category-aware templates.
 * Keyed by CommandEntry.visualDemo or CommandEntry.demoCategory.
 */
(function () {
    'use strict';

    /* ================================================================
     * TIER 1 — BESPOKE DEMOS (unique per-command animations)
     * ================================================================ */

    /* --- CSS Box Model (existing) --- */
    function paddingDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>padding</strong> is empty space between the border and the content. Watch the teal stripe region breathe.</p>' +
            '<div class="vd-legend">' +
            '<span><i class="vd-dot vd-dot--margin"></i> margin</span>' +
            '<span><i class="vd-dot vd-dot--border"></i> border</span>' +
            '<span><i class="vd-dot vd-dot--padding"></i> padding</span>' +
            '<span><i class="vd-dot vd-dot--content"></i> content</span>' +
            '</div>' +
            '<div class="vd-stage">' +
            '<div class="vd-margin">' +
            '<div class="vd-border">' +
            '<div class="vd-padding vd-animate-padding">' +
            '<div class="vd-content">content</div>' +
            '</div></div></div></div>';
    }

    function marginDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>margin</strong> pushes siblings away: transparent space <strong>outside</strong> the border (purple stripes).</p>' +
            '<div class="vd-legend">' +
            '<span><i class="vd-dot vd-dot--margin"></i> margin</span>' +
            '<span><i class="vd-dot vd-dot--border"></i> border</span>' +
            '<span><i class="vd-dot vd-dot--padding"></i> padding</span>' +
            '</div>' +
            '<div class="vd-stage">' +
            '<div class="vd-margin vd-animate-margin">' +
            '<div class="vd-border">' +
            '<div class="vd-padding" style="padding:12px">' +
            '<div class="vd-content">box</div>' +
            '</div></div></div></div>';
    }

    function borderDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>border</strong> draws the edge of the box; thickness participates in layout.</p>' +
            '<div class="vd-stage">' +
            '<div class="vd-margin" style="padding:14px">' +
            '<div class="vd-border vd-animate-border">' +
            '<div class="vd-padding" style="padding:14px">' +
            '<div class="vd-content">inside</div>' +
            '</div></div></div></div>';
    }

    function boxSizingDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>border-box</strong> keeps outer width fixed. <strong>content-box</strong> adds border/padding outside.</p>' +
            '<div class="vd-boxsize-row">' +
            '<div class="vd-boxsize-card"><h4>box-sizing: border-box</h4><div class="vd-track"><div class="vd-sample vd-sample--border-box"></div></div></div>' +
            '<div class="vd-boxsize-card"><h4>box-sizing: content-box</h4><div class="vd-track"><div class="vd-sample vd-sample--content-box"></div></div></div>' +
            '</div>';
    }

    /* --- Bash ls (existing) --- */
    function bashLsDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>ls</strong> lists names in a directory.</p>' +
            '<div class="vd-ls-grid">' +
            '<div class="vd-file"><i>&#128193;</i>src</div>' +
            '<div class="vd-file"><i>&#128196;</i>README</div>' +
            '<div class="vd-file"><i>&#128196;</i>package.json</div>' +
            '<div class="vd-file"><i>&#128193;</i>dist</div>' +
            '<div class="vd-file"><i>&#128196;</i>.env</div>' +
            '<div class="vd-file"><i>&#128196;</i>vite.config.ts</div>' +
            '</div>';
    }

    /* --- Git bespoke demos --- */
    function gitBranchesDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>branches</strong> are parallel timelines; <strong>HEAD</strong> (white dot) shows which line you are on.</p>' +
            '<div class="vd-git-branches">' +
            '<div class="vd-branch-lane"><span class="vd-branch-dot main"></span><span class="vd-branch-label">main</span><div class="vd-branch-track"><span class="vd-head" title="HEAD"></span></div></div>' +
            '<div class="vd-branch-lane"><span class="vd-branch-dot feature"></span><span class="vd-branch-label">feature</span><div class="vd-branch-track"></div></div>' +
            '<div class="vd-branch-lane"><span class="vd-branch-dot hotfix"></span><span class="vd-branch-label">hotfix</span><div class="vd-branch-track"></div></div>' +
            '</div>';
    }

    function gitInitDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">A new hidden <strong>.git/</strong> folder is created to track changes.</p>' +
            '<div class="vd-flow-row">' +
            '<div class="vd-flow-box">📁 <span class="vd-flow-label">project/</span></div>' +
            '<div class="vd-flow-arrow vd-animate-fadein">→</div>' +
            '<div class="vd-flow-box vd-flow-box--result vd-animate-fadein-delay">📁 .git/</div>' +
            '</div>';
    }

    function gitAddDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Files move from the <strong>Working Directory</strong> to the <strong>Staging Area</strong>.</p>' +
            '<div class="vd-staging-row">' +
            '<div class="vd-staging-zone"><div class="vd-staging-label">Working Dir</div><div class="vd-staging-file vd-staging-file--source">📄 index.html</div></div>' +
            '<div class="vd-staging-arrow">→</div>' +
            '<div class="vd-staging-zone"><div class="vd-staging-label">Staging Area</div><div class="vd-staging-file vd-staging-file--staged vd-animate-slideup">📄 index.html</div></div>' +
            '</div>';
    }

    function gitCommitDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Staged files are permanently bundled into a <strong>Commit Snapshot</strong>.</p>' +
            '<div class="vd-staging-row">' +
            '<div class="vd-staging-zone"><div class="vd-staging-label">Staging Area</div><div class="vd-staging-file vd-staging-file--staged">📄 index.html</div></div>' +
            '<div class="vd-staging-arrow" style="color:#f44336">→</div>' +
            '<div class="vd-staging-zone"><div class="vd-staging-label">History</div><div class="vd-commit-bubble vd-animate-scalein">#a1b2</div></div>' +
            '</div>';
    }

    function gitPushDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Local commits fly to the <strong>remote repository</strong>.</p>' +
            '<div class="vd-transfer-row">' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">💻</div><div class="vd-transfer-label">Local</div><div class="vd-commit-dots"><span class="vd-cdot"></span><span class="vd-cdot"></span><span class="vd-cdot"></span></div></div>' +
            '<div class="vd-transfer-pipe"><div class="vd-transfer-packet vd-animate-fly-right">📦</div><div class="vd-transfer-line"></div></div>' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">☁️</div><div class="vd-transfer-label">Remote</div></div>' +
            '</div>';
    }

    function gitPullDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Remote changes are <strong>fetched and merged</strong> into your local branch.</p>' +
            '<div class="vd-transfer-row">' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">💻</div><div class="vd-transfer-label">Local</div></div>' +
            '<div class="vd-transfer-pipe"><div class="vd-transfer-packet vd-animate-fly-left">📦</div><div class="vd-transfer-line"></div></div>' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">☁️</div><div class="vd-transfer-label">Remote</div><div class="vd-commit-dots"><span class="vd-cdot"></span><span class="vd-cdot"></span></div></div>' +
            '</div>';
    }

    function gitMergeDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Two branches <strong>converge</strong> into a merge commit.</p>' +
            '<div class="vd-merge-diagram">' +
            '<svg viewBox="0 0 260 100" class="vd-merge-svg">' +
            '<line x1="20" y1="30" x2="130" y2="30" class="vd-merge-line vd-merge-line--main"/>' +
            '<line x1="60" y1="30" x2="100" y2="70" class="vd-merge-line vd-merge-line--branch"/>' +
            '<line x1="100" y1="70" x2="180" y2="70" class="vd-merge-line vd-merge-line--branch"/>' +
            '<line x1="180" y1="70" x2="200" y2="30" class="vd-merge-line vd-merge-line--converge"/>' +
            '<line x1="200" y1="30" x2="240" y2="30" class="vd-merge-line vd-merge-line--main"/>' +
            '<circle cx="20" cy="30" r="6" class="vd-merge-node vd-merge-node--main"/>' +
            '<circle cx="60" cy="30" r="6" class="vd-merge-node vd-merge-node--main"/>' +
            '<circle cx="130" cy="30" r="6" class="vd-merge-node vd-merge-node--main"/>' +
            '<circle cx="100" cy="70" r="6" class="vd-merge-node vd-merge-node--branch"/>' +
            '<circle cx="180" cy="70" r="6" class="vd-merge-node vd-merge-node--branch"/>' +
            '<circle cx="200" cy="30" r="8" class="vd-merge-node vd-merge-node--merge vd-animate-pulse"/>' +
            '<circle cx="240" cy="30" r="6" class="vd-merge-node vd-merge-node--main"/>' +
            '<text x="200" y="18" class="vd-merge-text">merge</text>' +
            '</svg>' +
            '</div>';
    }

    function gitStashDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Uncommitted changes slide into a <strong>stash drawer</strong> for later retrieval.</p>' +
            '<div class="vd-stash-scene">' +
            '<div class="vd-stash-files">' +
            '<div class="vd-stash-item vd-animate-stash-slide" style="animation-delay:0s">📄 index.html</div>' +
            '<div class="vd-stash-item vd-animate-stash-slide" style="animation-delay:0.15s">📄 style.css</div>' +
            '</div>' +
            '<div class="vd-stash-drawer">' +
            '<div class="vd-stash-drawer-label">📥 stash@{0}</div>' +
            '</div>' +
            '</div>';
    }

    function gitRebaseDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Commits are <strong>replayed</strong> on top of a new base, creating a linear history.</p>' +
            '<div class="vd-rebase-scene">' +
            '<div class="vd-rebase-before"><span class="vd-rebase-label">Before</span>' +
            '<div class="vd-rebase-track"><span class="vd-rebase-dot main"></span><span class="vd-rebase-dot main"></span><span class="vd-rebase-dot main" style="opacity:0.4"></span></div>' +
            '<div class="vd-rebase-track vd-rebase-track--branch"><span class="vd-rebase-dot feature"></span><span class="vd-rebase-dot feature"></span></div>' +
            '</div>' +
            '<div class="vd-rebase-arrow">⟹</div>' +
            '<div class="vd-rebase-after"><span class="vd-rebase-label">After</span>' +
            '<div class="vd-rebase-track"><span class="vd-rebase-dot main"></span><span class="vd-rebase-dot main"></span><span class="vd-rebase-dot feature vd-animate-fadein" style="animation-delay:0.3s"></span><span class="vd-rebase-dot feature vd-animate-fadein" style="animation-delay:0.5s"></span></div>' +
            '</div>' +
            '</div>';
    }

    /* --- Docker bespoke demos --- */
    function dockerRunDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">An <strong>image</strong> is layered and spun up into a running <strong>container</strong>.</p>' +
            '<div class="vd-container-scene">' +
            '<div class="vd-container-image">' +
            '<div class="vd-layer vd-animate-layer" style="animation-delay:0s">Layer: OS base</div>' +
            '<div class="vd-layer vd-animate-layer" style="animation-delay:0.25s">Layer: Dependencies</div>' +
            '<div class="vd-layer vd-animate-layer" style="animation-delay:0.5s">Layer: App code</div>' +
            '</div>' +
            '<div class="vd-container-arrow vd-animate-fadein" style="animation-delay:0.8s">→</div>' +
            '<div class="vd-container-box vd-animate-container-spin">' +
            '<div class="vd-container-status">●</div>' +
            '<div class="vd-container-name">nginx:latest</div>' +
            '</div>' +
            '</div>';
    }

    function dockerComposeDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>docker compose up</strong> starts multiple services connected via networks.</p>' +
            '<div class="vd-compose-scene">' +
            '<div class="vd-compose-service vd-animate-fadein" style="animation-delay:0s"><span class="vd-compose-dot" style="background:#42a5f5"></span>api</div>' +
            '<div class="vd-compose-link vd-animate-fadein" style="animation-delay:0.3s">───</div>' +
            '<div class="vd-compose-service vd-animate-fadein" style="animation-delay:0.4s"><span class="vd-compose-dot" style="background:#66bb6a"></span>db</div>' +
            '<div class="vd-compose-link vd-animate-fadein" style="animation-delay:0.6s">───</div>' +
            '<div class="vd-compose-service vd-animate-fadein" style="animation-delay:0.7s"><span class="vd-compose-dot" style="background:#ff7043"></span>redis</div>' +
            '<div class="vd-compose-network vd-animate-fadein" style="animation-delay:1s">🌐 hub_default network</div>' +
            '</div>';
    }

    function dockerBuildDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>Dockerfile</strong> instructions build layers into a final image.</p>' +
            '<div class="vd-build-scene">' +
            '<div class="vd-build-step vd-animate-build-step" style="animation-delay:0s"><span class="vd-build-num">1</span>FROM node:20</div>' +
            '<div class="vd-build-step vd-animate-build-step" style="animation-delay:0.3s"><span class="vd-build-num">2</span>COPY . /app</div>' +
            '<div class="vd-build-step vd-animate-build-step" style="animation-delay:0.6s"><span class="vd-build-num">3</span>RUN npm install</div>' +
            '<div class="vd-build-step vd-animate-build-step" style="animation-delay:0.9s"><span class="vd-build-num">4</span>EXPOSE 3000</div>' +
            '<div class="vd-build-step vd-animate-build-step" style="animation-delay:1.2s"><span class="vd-build-num">5</span>CMD ["node", "server.js"]</div>' +
            '<div class="vd-build-result vd-animate-fadein" style="animation-delay:1.8s">✅ myapp:1.0</div>' +
            '</div>';
    }

    /* --- SQL bespoke demos --- */
    function sqlSelectDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>SELECT</strong> queries retrieve matching rows from a table.</p>' +
            '<div class="vd-table-scene">' +
            '<table class="vd-db-table">' +
            '<thead><tr><th>id</th><th>name</th><th>role</th></tr></thead>' +
            '<tbody>' +
            '<tr class="vd-db-row vd-animate-row-highlight" style="animation-delay:0.2s"><td>1</td><td>Alice</td><td>admin</td></tr>' +
            '<tr class="vd-db-row"><td>2</td><td>Bob</td><td>user</td></tr>' +
            '<tr class="vd-db-row vd-animate-row-highlight" style="animation-delay:0.5s"><td>3</td><td>Carol</td><td>admin</td></tr>' +
            '<tr class="vd-db-row"><td>4</td><td>Dave</td><td>user</td></tr>' +
            '</tbody></table>' +
            '<div class="vd-db-result vd-animate-fadein" style="animation-delay:1s">→ 2 rows returned</div>' +
            '</div>';
    }

    function sqlInsertDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>INSERT</strong> adds a new row into the table.</p>' +
            '<div class="vd-table-scene">' +
            '<table class="vd-db-table">' +
            '<thead><tr><th>id</th><th>name</th><th>role</th></tr></thead>' +
            '<tbody>' +
            '<tr class="vd-db-row"><td>1</td><td>Alice</td><td>admin</td></tr>' +
            '<tr class="vd-db-row"><td>2</td><td>Bob</td><td>user</td></tr>' +
            '<tr class="vd-db-row vd-db-row--new vd-animate-slideup"><td>3</td><td>Eve</td><td>editor</td></tr>' +
            '</tbody></table>' +
            '<div class="vd-db-result vd-animate-fadein" style="animation-delay:0.8s">→ 1 row inserted</div>' +
            '</div>';
    }

    function sqlCreateTableDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>CREATE TABLE</strong> defines a new table schema.</p>' +
            '<div class="vd-table-scene">' +
            '<div class="vd-schema-box">' +
            '<div class="vd-schema-header vd-animate-fadein">users</div>' +
            '<div class="vd-schema-col vd-animate-fadein" style="animation-delay:0.2s"><span class="vd-schema-key">🔑</span> id INT PRIMARY KEY</div>' +
            '<div class="vd-schema-col vd-animate-fadein" style="animation-delay:0.4s">name VARCHAR(100)</div>' +
            '<div class="vd-schema-col vd-animate-fadein" style="animation-delay:0.6s">email VARCHAR(255)</div>' +
            '<div class="vd-schema-col vd-animate-fadein" style="animation-delay:0.8s">created_at TIMESTAMP</div>' +
            '</div>' +
            '</div>';
    }

    /* --- Kubernetes bespoke demos --- */
    function k8sPodsDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>Pods</strong> are the smallest deployable units in a cluster.</p>' +
            '<div class="vd-k8s-cluster">' +
            '<div class="vd-k8s-node">' +
            '<div class="vd-k8s-node-label">Node 1</div>' +
            '<div class="vd-k8s-pods-row">' +
            '<div class="vd-k8s-pod vd-animate-pod-scale" style="animation-delay:0s"><span class="vd-k8s-pod-status running"></span>api-abc</div>' +
            '<div class="vd-k8s-pod vd-animate-pod-scale" style="animation-delay:0.2s"><span class="vd-k8s-pod-status running"></span>api-def</div>' +
            '<div class="vd-k8s-pod vd-animate-pod-scale" style="animation-delay:0.4s"><span class="vd-k8s-pod-status running"></span>web-xyz</div>' +
            '</div></div></div>';
    }

    function k8sDeployDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>Rolling update</strong> — old pods scale down while new pods scale up.</p>' +
            '<div class="vd-k8s-rolling">' +
            '<div class="vd-k8s-rolling-row">' +
            '<span class="vd-k8s-rpod vd-k8s-rpod--old vd-animate-pod-down" style="animation-delay:0s">v1</span>' +
            '<span class="vd-k8s-rpod vd-k8s-rpod--old vd-animate-pod-down" style="animation-delay:0.5s">v1</span>' +
            '<span class="vd-k8s-rpod vd-k8s-rpod--old vd-animate-pod-down" style="animation-delay:1s">v1</span>' +
            '</div>' +
            '<div class="vd-k8s-rolling-label">⟹ rolling update</div>' +
            '<div class="vd-k8s-rolling-row">' +
            '<span class="vd-k8s-rpod vd-k8s-rpod--new vd-animate-pod-up" style="animation-delay:0.3s">v2</span>' +
            '<span class="vd-k8s-rpod vd-k8s-rpod--new vd-animate-pod-up" style="animation-delay:0.8s">v2</span>' +
            '<span class="vd-k8s-rpod vd-k8s-rpod--new vd-animate-pod-up" style="animation-delay:1.3s">v2</span>' +
            '</div>' +
            '</div>';
    }

    /* --- Linux bespoke demos --- */
    function linuxMkdirDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>mkdir</strong> creates new directories in the file tree.</p>' +
            '<div class="vd-tree">' +
            '<div class="vd-tree-item">📁 project/</div>' +
            '<div class="vd-tree-item vd-tree-indent">📁 src/</div>' +
            '<div class="vd-tree-item vd-tree-indent">📄 README.md</div>' +
            '<div class="vd-tree-item vd-tree-indent vd-tree-new vd-animate-fadein" style="animation-delay:0.4s">📁 docs/</div>' +
            '<div class="vd-tree-item vd-tree-indent2 vd-tree-new vd-animate-fadein" style="animation-delay:0.7s">📁 api/</div>' +
            '</div>';
    }

    function linuxRmDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>rm</strong> permanently removes files from the filesystem.</p>' +
            '<div class="vd-tree">' +
            '<div class="vd-tree-item">📁 project/</div>' +
            '<div class="vd-tree-item vd-tree-indent">📄 app.js</div>' +
            '<div class="vd-tree-item vd-tree-indent vd-tree-delete vd-animate-delete">📄 old-notes.txt</div>' +
            '<div class="vd-tree-item vd-tree-indent vd-tree-delete vd-animate-delete" style="animation-delay:0.3s">📁 temp/</div>' +
            '<div class="vd-tree-item vd-tree-indent">📄 config.json</div>' +
            '</div>';
    }

    function linuxChmodDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>chmod</strong> changes file permission bits for owner, group, and others.</p>' +
            '<div class="vd-chmod-scene">' +
            '<div class="vd-chmod-file">📄 deploy.sh</div>' +
            '<div class="vd-chmod-matrix">' +
            '<div class="vd-chmod-row"><span class="vd-chmod-who">Owner</span><span class="vd-chmod-perm on">r</span><span class="vd-chmod-perm on">w</span><span class="vd-chmod-perm vd-animate-toggle">x</span></div>' +
            '<div class="vd-chmod-row"><span class="vd-chmod-who">Group</span><span class="vd-chmod-perm on">r</span><span class="vd-chmod-perm">w</span><span class="vd-chmod-perm vd-animate-toggle" style="animation-delay:0.2s">x</span></div>' +
            '<div class="vd-chmod-row"><span class="vd-chmod-who">Other</span><span class="vd-chmod-perm on">r</span><span class="vd-chmod-perm">w</span><span class="vd-chmod-perm vd-animate-toggle" style="animation-delay:0.4s">x</span></div>' +
            '</div></div>';
    }

    function processDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Process states: <strong>start → running → stop</strong>.</p>' +
            '<div class="vd-process-scene">' +
            '<div class="vd-process-bar"><div class="vd-process-bar-label">PID 4242 — nginx</div><div class="vd-process-cpu vd-animate-cpu-bar"></div></div>' +
            '<div class="vd-process-bar"><div class="vd-process-bar-label">PID 1024 — node</div><div class="vd-process-cpu vd-animate-cpu-bar" style="animation-delay:0.3s"></div></div>' +
            '<div class="vd-process-bar"><div class="vd-process-bar-label">PID 8812 — python</div><div class="vd-process-cpu vd-animate-cpu-bar" style="animation-delay:0.6s"></div></div>' +
            '</div>';
    }

    /* --- Misc bespoke demos --- */
    function npmInstallDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>npm install</strong> resolves and downloads the dependency tree.</p>' +
            '<div class="vd-npm-scene">' +
            '<div class="vd-npm-progress"><div class="vd-npm-progress-bar vd-animate-npm-progress"></div></div>' +
            '<div class="vd-npm-tree">' +
            '<div class="vd-npm-dep vd-animate-fadein" style="animation-delay:0.3s">├── react@18.2.0</div>' +
            '<div class="vd-npm-dep vd-animate-fadein" style="animation-delay:0.5s">├── react-dom@18.2.0</div>' +
            '<div class="vd-npm-dep vd-animate-fadein" style="animation-delay:0.7s">├── vite@5.2.0</div>' +
            '<div class="vd-npm-dep vd-animate-fadein" style="animation-delay:0.9s">└── eslint@9.0.0</div>' +
            '</div>' +
            '<div class="vd-npm-result vd-animate-fadein" style="animation-delay:1.4s">added 245 packages in 4.2s</div>' +
            '</div>';
    }

    function pythonVenvDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>python -m venv</strong> creates an isolated environment.</p>' +
            '<div class="vd-venv-scene">' +
            '<div class="vd-venv-global">🌐 Global Python</div>' +
            '<div class="vd-venv-arrow vd-animate-fadein">↓ isolate</div>' +
            '<div class="vd-venv-bubble vd-animate-scalein">' +
            '<div class="vd-venv-label">🔒 .venv/</div>' +
            '<div class="vd-venv-items">' +
            '<span class="vd-venv-item">python3</span>' +
            '<span class="vd-venv-item">pip</span>' +
            '<span class="vd-venv-item">site-packages/</span>' +
            '</div></div></div>';
    }

    function windowsTasklistDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>tasklist</strong> shows running processes like Task Manager in text mode.</p>' +
            '<div class="vd-table-scene">' +
            '<table class="vd-db-table">' +
            '<thead><tr><th>Name</th><th>PID</th><th>Mem</th></tr></thead>' +
            '<tbody>' +
            '<tr class="vd-db-row vd-animate-fadein" style="animation-delay:0.1s"><td>explorer.exe</td><td>1204</td><td>85 MB</td></tr>' +
            '<tr class="vd-db-row vd-animate-fadein" style="animation-delay:0.3s"><td>node.exe</td><td>8812</td><td>124 MB</td></tr>' +
            '<tr class="vd-db-row vd-animate-fadein" style="animation-delay:0.5s"><td>chrome.exe</td><td>3420</td><td>312 MB</td></tr>' +
            '<tr class="vd-db-row vd-animate-fadein" style="animation-delay:0.7s"><td>code.exe</td><td>6100</td><td>256 MB</td></tr>' +
            '</tbody></table>' +
            '</div>';
    }

    /* ================================================================
     * Bespoke demo registry
     * ================================================================ */

    var DEMOS = {
        // CSS
        'css-padding': paddingDemo,
        'css-margin': marginDemo,
        'css-border': borderDemo,
        'css-box-sizing': boxSizingDemo,
        // Bash
        'bash-ls': bashLsDemo,
        // Git
        'git-branches': gitBranchesDemo,
        'git-init-demo': gitInitDemo,
        'git-add-demo': gitAddDemo,
        'git-commit-demo': gitCommitDemo,
        'git-push-demo': gitPushDemo,
        'git-pull-demo': gitPullDemo,
        'git-merge-demo': gitMergeDemo,
        'git-stash-demo': gitStashDemo,
        'git-rebase-demo': gitRebaseDemo,
        // Docker
        'docker-run': dockerRunDemo,
        'docker-compose-up': dockerComposeDemo,
        'docker-build': dockerBuildDemo,
        // SQL
        'sql-select': sqlSelectDemo,
        'sql-insert': sqlInsertDemo,
        'sql-create-table': sqlCreateTableDemo,
        // Kubernetes
        'k8s-pods': k8sPodsDemo,
        'k8s-deploy': k8sDeployDemo,
        // Linux
        'linux-mkdir': linuxMkdirDemo,
        'linux-rm': linuxRmDemo,
        'linux-chmod': linuxChmodDemo,
        'linux-process': processDemo,
        // Misc
        'npm-install': npmInstallDemo,
        'python-venv': pythonVenvDemo,
        'windows-tasklist': windowsTasklistDemo,
    };

    /* ================================================================
     * TIER 2 — CATEGORY-AWARE TEMPLATES
     * Each receives the command id/name for contextual label.
     * ================================================================ */

    function tplFileCreate(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Creating a new item in the filesystem.</p>' +
            '<div class="vd-tree">' +
            '<div class="vd-tree-item">📁 current/</div>' +
            '<div class="vd-tree-item vd-tree-indent">📄 existing.txt</div>' +
            '<div class="vd-tree-item vd-tree-indent vd-tree-new vd-animate-fadein" style="animation-delay:0.3s">📄 ' + (id || 'new-file') + '</div>' +
            '</div>';
    }

    function tplFileDelete(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Removing an item from the filesystem.</p>' +
            '<div class="vd-tree">' +
            '<div class="vd-tree-item">📁 current/</div>' +
            '<div class="vd-tree-item vd-tree-indent vd-tree-delete vd-animate-delete">📄 ' + (id || 'target') + '</div>' +
            '<div class="vd-tree-item vd-tree-indent">📄 kept.txt</div>' +
            '</div>';
    }

    function tplFileMove(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Moving or renaming an item.</p>' +
            '<div class="vd-flow-row">' +
            '<div class="vd-flow-box">📄 old-name</div>' +
            '<div class="vd-flow-arrow vd-animate-fadein">→</div>' +
            '<div class="vd-flow-box vd-flow-box--result vd-animate-fadein-delay">📄 new-name</div>' +
            '</div>';
    }

    function tplNetworkRequest(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">A request travels from client to server and back.</p>' +
            '<div class="vd-transfer-row">' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">💻</div><div class="vd-transfer-label">Client</div></div>' +
            '<div class="vd-transfer-pipe"><div class="vd-transfer-packet vd-animate-fly-right">📡</div><div class="vd-transfer-line"></div></div>' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">🖥️</div><div class="vd-transfer-label">Server</div></div>' +
            '</div>';
    }

    function tplProcessLifecycle(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Process lifecycle: <strong>created → running → stopped</strong>.</p>' +
            '<div class="vd-lifecycle">' +
            '<div class="vd-lifecycle-stage vd-animate-fadein" style="animation-delay:0s"><span class="vd-lifecycle-dot" style="background:#666"></span>Created</div>' +
            '<div class="vd-lifecycle-arrow vd-animate-fadein" style="animation-delay:0.3s">→</div>' +
            '<div class="vd-lifecycle-stage vd-animate-fadein" style="animation-delay:0.5s"><span class="vd-lifecycle-dot" style="background:#4caf50"></span>Running</div>' +
            '<div class="vd-lifecycle-arrow vd-animate-fadein" style="animation-delay:0.8s">→</div>' +
            '<div class="vd-lifecycle-stage vd-animate-fadein" style="animation-delay:1s"><span class="vd-lifecycle-dot" style="background:#f44336"></span>Stopped</div>' +
            '</div>';
    }

    function tplDatabaseQuery(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Querying data from the database.</p>' +
            '<div class="vd-table-scene">' +
            '<table class="vd-db-table">' +
            '<thead><tr><th>key</th><th>value</th><th>type</th></tr></thead>' +
            '<tbody>' +
            '<tr class="vd-db-row vd-animate-row-highlight" style="animation-delay:0.2s"><td>user:1</td><td>Alice</td><td>string</td></tr>' +
            '<tr class="vd-db-row vd-animate-row-highlight" style="animation-delay:0.5s"><td>user:2</td><td>Bob</td><td>string</td></tr>' +
            '</tbody></table>' +
            '</div>';
    }

    function tplDatabaseModify(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Modifying data in the database.</p>' +
            '<div class="vd-table-scene">' +
            '<table class="vd-db-table">' +
            '<thead><tr><th>field</th><th>before</th><th>after</th></tr></thead>' +
            '<tbody>' +
            '<tr class="vd-db-row"><td>status</td><td class="vd-db-old">active</td><td class="vd-db-new vd-animate-fadein" style="animation-delay:0.4s">inactive</td></tr>' +
            '</tbody></table>' +
            '</div>';
    }

    function tplContainerLifecycle(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Container lifecycle management.</p>' +
            '<div class="vd-container-scene">' +
            '<div class="vd-container-box vd-animate-container-spin">' +
            '<div class="vd-container-status">●</div>' +
            '<div class="vd-container-name">' + (id || 'container') + '</div>' +
            '</div></div>';
    }

    function tplPackageInstall(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Installing packages and resolving dependencies.</p>' +
            '<div class="vd-npm-scene">' +
            '<div class="vd-npm-progress"><div class="vd-npm-progress-bar vd-animate-npm-progress"></div></div>' +
            '<div class="vd-npm-tree">' +
            '<div class="vd-npm-dep vd-animate-fadein" style="animation-delay:0.3s">├── resolving dependencies...</div>' +
            '<div class="vd-npm-dep vd-animate-fadein" style="animation-delay:0.7s">├── downloading packages...</div>' +
            '<div class="vd-npm-dep vd-animate-fadein" style="animation-delay:1.1s">└── linking binaries...</div>' +
            '</div>' +
            '<div class="vd-npm-result vd-animate-fadein" style="animation-delay:1.6s">✅ Done</div>' +
            '</div>';
    }

    function tplConfigChange(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Updating configuration settings.</p>' +
            '<div class="vd-config-scene">' +
            '<div class="vd-config-row vd-animate-fadein" style="animation-delay:0s"><span class="vd-config-key">port</span><span class="vd-config-val">3000</span></div>' +
            '<div class="vd-config-row vd-animate-fadein" style="animation-delay:0.2s"><span class="vd-config-key">debug</span><span class="vd-config-val vd-animate-toggle">true → false</span></div>' +
            '<div class="vd-config-row vd-animate-fadein" style="animation-delay:0.4s"><span class="vd-config-key">env</span><span class="vd-config-val">production</span></div>' +
            '</div>';
    }

    function tplAuthFlow(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Authentication and secure connection.</p>' +
            '<div class="vd-transfer-row">' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">🔑</div><div class="vd-transfer-label">Client</div></div>' +
            '<div class="vd-transfer-pipe"><div class="vd-transfer-packet vd-animate-fly-right">🔒</div><div class="vd-transfer-line"></div></div>' +
            '<div class="vd-transfer-endpoint"><div class="vd-transfer-icon">🛡️</div><div class="vd-transfer-label">Server</div></div>' +
            '</div>';
    }

    function tplBuildCompile(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Source files are compiled into output bundles.</p>' +
            '<div class="vd-flow-row">' +
            '<div class="vd-flow-box">📄 source files</div>' +
            '<div class="vd-flow-arrow vd-animate-fadein">⚙️</div>' +
            '<div class="vd-flow-box vd-flow-box--result vd-animate-fadein-delay">📦 output bundle</div>' +
            '</div>';
    }

    var CATEGORY_TEMPLATES = {
        'file-create': tplFileCreate,
        'file-delete': tplFileDelete,
        'file-move': tplFileMove,
        'network-request': tplNetworkRequest,
        'process-lifecycle': tplProcessLifecycle,
        'database-query': tplDatabaseQuery,
        'database-modify': tplDatabaseModify,
        'container-lifecycle': tplContainerLifecycle,
        'package-install': tplPackageInstall,
        'config-change': tplConfigChange,
        'auth-flow': tplAuthFlow,
        'build-compile': tplBuildCompile,
    };

    /* ================================================================
     * Generic fallback terminal demo
     * ================================================================ */

    function genericTerminalDemo(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Interactive terminal execution for <strong>' + (id || 'command') + '</strong>.</p>' +
            '<div class="vd-generic-term">' +
            '<div><span class="vd-gt-prompt">$</span> <span class="vd-typewriter">' + (id || 'executing...') + '</span><span class="vd-cursor">_</span></div>' +
            '<div class="vd-gt-result vd-animate-fadein" style="animation-delay:1.5s">[Process completed]</div>' +
            '</div>';
    }

    /* ================================================================
     * Public API
     * ================================================================ */

    window.applyVisualDemo = function (id, rootEl) {
        if (!rootEl) return;
        rootEl.classList.remove('visual-demo--empty');

        // Normalize command string for fuzzy match
        var cmd = (id || '').toLowerCase();

        // 1) Try exact bespoke demo
        var fn = DEMOS[id];
        if (fn) { fn(rootEl); return; }

        // 2) Fuzzy matching loop
        if (cmd.includes('commit')) { DEMOS['git-commit-demo'](rootEl); return; }
        if (cmd.includes('run') && cmd.includes('docker')) { DEMOS['docker-run'](rootEl); return; }
        if (cmd.includes('install')) { 
            if (cmd.includes('npm')) {
                DEMOS['npm-install'](rootEl);
            } else {
                CATEGORY_TEMPLATES['package-install'](rootEl, id);
            }
            return; 
        }
        if (cmd.includes('pull')) { DEMOS['git-pull-demo'](rootEl); return; }
        if (cmd.includes('push')) { DEMOS['git-push-demo'](rootEl); return; }
        if (cmd.includes('add')) { DEMOS['git-add-demo'](rootEl); return; }
        if (cmd.includes('merge')) { DEMOS['git-merge-demo'](rootEl); return; }
        if (cmd.includes('stash')) { DEMOS['git-stash-demo'](rootEl); return; }
        if (cmd.includes('rebase')) { DEMOS['git-rebase-demo'](rootEl); return; }
        if (cmd.includes('init')) { DEMOS['git-init-demo'](rootEl); return; }
        if (cmd.includes('branch')) { DEMOS['git-branches'](rootEl); return; }
        if (cmd.includes('compose') && cmd.includes('up')) { DEMOS['docker-compose-up'](rootEl); return; }
        if (cmd.includes('build')) { DEMOS['docker-build'](rootEl); return; }
        if (cmd.includes('ls')) { DEMOS['bash-ls'](rootEl); return; }
        if (cmd.includes('mkdir')) { DEMOS['linux-mkdir'](rootEl); return; }
        if (cmd.includes('rm')) { DEMOS['linux-rm'](rootEl); return; }
        if (cmd.includes('chmod')) { DEMOS['linux-chmod'](rootEl); return; }

        // 3) Try category template
        var tpl = CATEGORY_TEMPLATES[id];
        if (tpl) { tpl(rootEl, id); return; }

        // 4) Generic fallback
        genericTerminalDemo(rootEl, id);
    };

    window.clearVisualDemo = function (rootEl) {
        if (!rootEl) return;
        rootEl.innerHTML = '';
        rootEl.classList.add('visual-demo--empty');
    };
})();
