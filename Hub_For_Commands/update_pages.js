const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'Pages');
const newMain = `    <main class="hub-container workspace-layout">
        <!-- Left Column: Command Sidebar -->
        <section class="workspace-sidebar">
            <div id="search-container" class="search-container">
                <input type="search" id="command-search" placeholder="Search commands..." autofocus>
            </div>
            <ul id="command-list" class="command-list">
                <!-- Dynamically populated by JS -->
            </ul>
        </section>

        <!-- Central Column: The Execution Hub -->
        <section class="workspace-execution">
            <!-- Interactive Terminal -->
            <div class="terminal-container">
                <div class="terminal-header">
                    <div class="terminal-controls">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <span class="term-title">bash - CLI simulator</span>
                    <button id="bash-clear-btn" class="term-clear-btn" aria-label="Clear Terminal">Clear</button>
                </div>
                <div class="terminal-body" id="bash-output">
                    <div class="bash-line">Terminal ready.</div>
                </div>
                <div class="terminal-input-wrapper">
                    <span class="prompt">$</span>
                    <input type="text" id="bash-input" class="bash-input" autocomplete="off" spellcheck="false">
                </div>
            </div>

            <!-- Command Details -->
            <div id="detail-placeholder" class="placeholder-msg">
                <p>Select a command to view details and try it out.</p>
            </div>

            <div id="detail-content" class="detail-card" style="display: none;">
                <h2 id="detail-title" class="cmd-title">Command</h2>
                <div class="code-block">
                    <code id="detail-command">example</code>
                </div>
                <div class="explanation-blocks">
                    <div class="explanation-box non-tech">
                        <span class="badge badge-nontech">Plain English</span>
                        <p id="detail-nontech">Simple explanation here.</p>
                    </div>
                    <div class="explanation-box tech">
                        <span class="badge badge-tech">Technical</span>
                        <p id="detail-tech">Technical description here.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Right Column: Live Canvas -->
        <section class="workspace-canvas">
            <div id="visual-demo" class="visual-demo visual-demo--empty" aria-live="polite"></div>
        </section>
    </main>`;

const files = fs.readdirSync(targetDir);
for (const file of files) {
    if (file.endsWith('.html')) {
        const p = path.join(targetDir, file);
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(/<main[^>]*>[\s\S]*?<\/main>/i, newMain);
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated ' + file);
    }
}
