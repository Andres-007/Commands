/**
 * Visual demos keyed by CommandEntry.visualDemo (CSS animations only).
 */
(function () {
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
            '<p class="visual-demo__caption"><strong>border</strong> draws the edge of the box; thickness participates in layout depending on <code style="color:#888">box-sizing</code>.</p>' +
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
            '<p class="visual-demo__caption"><strong>border-box</strong> keeps the outer width fixed while border/padding grow inward. <strong>content-box</strong> adds border/padding outside the width.</p>' +
            '<div class="vd-boxsize-row">' +
            '<div class="vd-boxsize-card">' +
            '<h4>box-sizing: border-box</h4>' +
            '<div class="vd-track"><div class="vd-sample vd-sample--border-box"></div></div>' +
            '</div>' +
            '<div class="vd-boxsize-card">' +
            '<h4>box-sizing: content-box</h4>' +
            '<div class="vd-track"><div class="vd-sample vd-sample--content-box"></div></div>' +
            '</div>' +
            '</div>';
    }

    function bashLsDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption"><strong>ls</strong> lists names in a directory — like flashing folder contents into view.</p>' +
            '<div class="vd-ls-grid">' +
            '<div class="vd-file"><i>&#128193;</i>src</div>' +
            '<div class="vd-file"><i>&#128196;</i>README</div>' +
            '<div class="vd-file"><i>&#128196;</i>package.json</div>' +
            '<div class="vd-file"><i>&#128193;</i>dist</div>' +
            '<div class="vd-file"><i>&#128196;</i>.env</div>' +
            '<div class="vd-file"><i>&#128196;</i>vite.config.ts</div>' +
            '</div>';
    }

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
            '<div style="display:flex; gap:20px; align-items:center; padding:15px; background:#111; border:1px solid #333; border-radius:8px;">' +
            '<div style="font-size:2rem;">📁 <span style="font-size:1rem; color:#aaa">project/</span></div>' +
            '<div style="font-size:1.5rem; opacity:0; animation: fadeInRight 0.5s ease forwards; color:#4caf50;">&rarr;</div>' +
            '<div style="opacity:0; animation: fadeInRight 0.5s ease 0.3s forwards; padding:10px; border:1px dashed #4caf50; border-radius:6px; font-family:monospace;">📁 .git/</div>' +
            '</div>' +
            '<style>@keyframes fadeInRight { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }</style>';
    }

    function gitAddDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Files move from the <strong>Working Directory</strong> to the <strong>Staging Area</strong>.</p>' +
            '<div style="display:flex; justify-content:space-between; text-align:center; padding:15px; background:#111; border:1px solid #333; border-radius:8px;">' +
            '<div style="width:40%;"><strong>Working Dir</strong><div style="margin-top:10px; padding:10px; background:#333; border-radius:4px; opacity:0.5; transition:all 0.5s;">📄 index.html</div></div>' +
            '<div style="width:10%; align-self:center; font-size:1.5rem; color:#4caf50;">&rarr;</div>' +
            '<div style="width:40%;"><strong>Staging Area</strong><div style="margin-top:10px; padding:10px; background:#4caf50; color:#fff; border-radius:4px; opacity:0; animation: fadeUp 0.5s ease 0.4s forwards;">📄 index.html</div></div>' +
            '</div>' +
            '<style>@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }</style>';
    }

    function gitCommitDemo(el) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Staged files are permanently bundled into a <strong>Commit Snapshot</strong> in the history.</p>' +
            '<div style="display:flex; justify-content:space-between; text-align:center; padding:15px; background:#111; border:1px solid #333; border-radius:8px;">' +
            '<div style="width:40%;"><strong>Staging Area</strong><div style="margin-top:10px; padding:10px; background:#4caf50; color:#fff; border-radius:4px;">📄 index.html</div></div>' +
            '<div style="width:10%; align-self:center; font-size:1.5rem; color:#f44336;">&rarr;</div>' +
            '<div style="width:40%;"><strong>History</strong><div style="margin-top:10px; padding:10px; background:#f44336; color:#fff; border-radius:50%; width:60px; height:60px; line-height:40px; margin:10px auto 0; opacity:0; animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s forwards;">#a1b2</div></div>' +
            '</div>' +
            '<style>@keyframes scaleIn { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }</style>';
    }

    var DEMOS = {
        'css-padding': paddingDemo,
        'css-margin': marginDemo,
        'css-border': borderDemo,
        'css-box-sizing': boxSizingDemo,
        'bash-ls': bashLsDemo,
        'git-branches': gitBranchesDemo,
        'git-init-demo': gitInitDemo,
        'git-add-demo': gitAddDemo,
        'git-commit-demo': gitCommitDemo,
    };

    function genericTerminalDemo(el, id) {
        el.innerHTML =
            '<p class="visual-demo__title">Live preview</p>' +
            '<p class="visual-demo__caption">Interactive terminal execution for <strong>' + (id || 'command') + '</strong>.</p>' +
            '<div class="vd-generic-term" style="background:#000; padding:15px; border-radius:6px; font-family:monospace; color:#0f0; min-height:80px; border:1px solid #333; margin-top:10px;">' +
            '<div><span style="color:#aaa">$</span> <span class="vd-typewriter">' + (id || 'executing...') + '</span><span class="vd-cursor" style="animation: blink 1s step-end infinite;">_</span></div>' +
            '<div style="color:#aaa; margin-top:8px; opacity:0; animation: fadeIn 0.5s ease 1.5s forwards;">[Process completed]</div>' +
            '</div>' +
            '<style>@keyframes blink { 50% { opacity: 0; } } @keyframes fadeIn { to { opacity: 1; } }</style>';
    }

    window.applyVisualDemo = function (id, rootEl) {
        if (!rootEl) return;
        var fn = DEMOS[id];
        rootEl.classList.remove('visual-demo--empty');
        if (!fn) {
            genericTerminalDemo(rootEl, id);
            return;
        }
        fn(rootEl);
    };

    window.clearVisualDemo = function (rootEl) {
        if (!rootEl) return;
        rootEl.innerHTML = '';
        rootEl.classList.add('visual-demo--empty');
    };
})();
