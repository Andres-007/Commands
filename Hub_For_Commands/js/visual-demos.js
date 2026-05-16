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

    var DEMOS = {
        'css-padding': paddingDemo,
        'css-margin': marginDemo,
        'css-border': borderDemo,
        'css-box-sizing': boxSizingDemo,
        'bash-ls': bashLsDemo,
        'git-branches': gitBranchesDemo,
    };

    window.applyVisualDemo = function (id, rootEl) {
        if (!rootEl) return;
        var fn = DEMOS[id];
        if (!fn) {
            rootEl.innerHTML = '';
            rootEl.classList.add('visual-demo--empty');
            return;
        }
        rootEl.classList.remove('visual-demo--empty');
        fn(rootEl);
    };

    window.clearVisualDemo = function (rootEl) {
        if (!rootEl) return;
        rootEl.innerHTML = '';
        rootEl.classList.add('visual-demo--empty');
    };
})();
