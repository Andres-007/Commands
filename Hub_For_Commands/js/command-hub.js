/**
 * Generic command explorer + terminal mock (same UX as git page).
 * Configure via window.commandHubConfig before loading this file:
 * {
 *   commands: CommandEntry[],
 *   terminalTitle?: string,
 *   welcomeHtml?: string,
 *   promptSymbol?: string,
 *   requiredPrefix?: string | null,
 *   prefixMismatchMessage?: string,
 *   simDelayMs?: number,
 *   formatUnknown?: (input: string) => string
 *   CommandEntry.visualDemo?: string  // id handled by visual-demos.js
 * }
 */
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const cfg = window.commandHubConfig;
        if (!cfg || !Array.isArray(cfg.commands)) return;

        const searchInput = document.getElementById('command-search');
        const commandList = document.getElementById('command-list');
        const bashInput = document.getElementById('bash-input');
        const bashOutput = document.getElementById('bash-output');
        const detailTitle = document.getElementById('detail-title');
        const detailCommand = document.getElementById('detail-command');
        const detailTech = document.getElementById('detail-tech');
        const detailNonTech = document.getElementById('detail-nontech');
        const placeholderMsg = document.getElementById('detail-placeholder');
        const detailContent = document.getElementById('detail-content');
        const bashClearBtn = document.getElementById('bash-clear-btn');
        let bashResetBtn = null;
        if (bashClearBtn && bashClearBtn.parentNode) {
            bashResetBtn = document.createElement('button');
            bashResetBtn.className = 'term-clear-btn';
            bashResetBtn.style.marginLeft = '8px';
            bashResetBtn.style.backgroundColor = '#d32f2f'; // Red color to signify reset
            bashResetBtn.style.color = '#fff';
            bashResetBtn.textContent = 'Reset';
            bashResetBtn.ariaLabel = 'Reset Environment';
            bashClearBtn.parentNode.appendChild(bashResetBtn);
        }

        const termTitleEl = document.querySelector('.term-title');
        if (termTitleEl && cfg.terminalTitle) {
            termTitleEl.textContent = cfg.terminalTitle;
        }

        const promptEl = document.querySelector('.prompt');
        if (promptEl && cfg.promptSymbol != null && cfg.promptSymbol !== '') {
            promptEl.textContent = cfg.promptSymbol;
        }

        if (bashOutput && cfg.welcomeHtml) {
            bashOutput.innerHTML = `<div class="bash-line">${cfg.welcomeHtml}</div>`;
        }

        function normalizeSpaces(s) {
            return s.trim().replace(/\s+/g, ' ');
        }

        function stripPlaceholders(cmdPattern) {
            return cmdPattern
                .replace(/<[^>]+>/g, '')
                .replace(/\[[^\]]*\]/g, '')
                .replace(/\s+/g, ' ')
                .replace(/;+$/, '')
                .trim();
        }

        function titleFromCommand(cmdStr) {
            const parts = cmdStr.trim().split(/\s+/);
            return parts.slice(0, 3).join(' ');
        }

        function findMatchingCommand(rawInput) {
            let body = normalizeSpaces(rawInput);
            const lowerFull = body.toLowerCase();

            if (cfg.requiredPrefix) {
                const pfx = cfg.requiredPrefix.toLowerCase();
                if (!lowerFull.startsWith(pfx)) {
                    return {
                        error:
                            cfg.prefixMismatchMessage ||
                            `Use commands starting with "${cfg.requiredPrefix.trim()}".`,
                    };
                }
                body = normalizeSpaces(body.slice(cfg.requiredPrefix.length));
            }

            const bodyLower = body.toLowerCase().replace(/;+$/, '').trim();

            for (const c of cfg.commands) {
                if (!c.example) continue;
                const ex = normalizeSpaces(c.example).toLowerCase().replace(/;+$/, '');
                if (bodyLower === ex) return { cmd: c };
            }

            const scored = cfg.commands
                .map((c) => ({
                    c,
                    pattern: stripPlaceholders(c.command).toLowerCase(),
                }))
                .filter((x) => x.pattern.length > 0)
                .sort((a, b) => b.pattern.length - a.pattern.length);

            for (const { c, pattern } of scored) {
                if (bodyLower.startsWith(pattern)) return { cmd: c };
            }

            const firstTok = bodyLower.split(/[\s|]+/)[0];
            for (const c of cfg.commands) {
                const stripped = stripPlaceholders(c.command).toLowerCase();
                const pt = stripped.split(/\s+/)[0];
                if (firstTok && pt && firstTok === pt) return { cmd: c };
            }

            return null;
        }

        function renderList(commands) {
            if (!commandList) return;
            commandList.innerHTML = '';
            commands.forEach((cmd) => {
                const li = document.createElement('li');
                li.className = 'command-item';
                const snippet = (cmd.non_technical_desc || '').substring(0, 52);
                li.innerHTML = `<strong>${titleFromCommand(cmd.command)}</strong> - ${snippet}...`;
                li.addEventListener('click', () => selectCommand(cmd));
                commandList.appendChild(li);
            });
        }

        function syncVisualDemo(cmd) {
            const el = document.getElementById('visual-demo');
            if (!el || typeof window.applyVisualDemo !== 'function') return;
            if (cmd) {
                const vid = cmd.visualDemo || cmd.id || cmd.command;
                window.applyVisualDemo(vid, el);
            } else if (typeof window.clearVisualDemo === 'function') {
                window.clearVisualDemo(el);
            } else {
                el.innerHTML = '';
                el.classList.add('visual-demo--empty');
            }
        }

        function selectCommand(cmd) {
            if (!placeholderMsg || !detailContent) return;
            placeholderMsg.style.display = 'none';
            detailContent.style.display = 'block';
            detailTitle.textContent = titleFromCommand(cmd.command);
            detailCommand.textContent = cmd.example;
            detailTech.textContent = cmd.technical_desc;
            detailNonTech.textContent = cmd.non_technical_desc;
            syncVisualDemo(cmd);
            if (bashInput) {
                bashInput.value = cmd.example;
                bashInput.focus();
            }
        }

        function appendOutput(text) {
            if (!bashOutput) return;
            const div = document.createElement('div');
            div.className = 'bash-line';
            div.innerHTML = text
                .replace(/\n/g, '<br>')
                .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            bashOutput.appendChild(div);
            bashOutput.scrollTop = bashOutput.scrollHeight;
        }

        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        if (searchInput) {
            const handleSearch = debounce((e) => {
                const term = e.target.value.toLowerCase();
                const filtered = cfg.commands.filter((cmd) => {
                    const kw = cmd.keywords || [];
                    return (
                        cmd.command.toLowerCase().includes(term) ||
                        kw.some((k) => k.toLowerCase().includes(term)) ||
                        (cmd.non_technical_desc || '').toLowerCase().includes(term) ||
                        (cmd.example && cmd.example.toLowerCase().includes(term)) ||
                        (cmd.technical_desc || '').toLowerCase().includes(term)
                    );
                });
                renderList(filtered);
            }, 150);

            searchInput.addEventListener('input', handleSearch);
        }

        if (bashInput) {
            bashInput.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter') return;
                const inputCmd = bashInput.value.trim();
                if (!inputCmd) return;
                const p = cfg.promptSymbol != null ? cfg.promptSymbol : '$';
                appendOutput(`${p} ${inputCmd}`);
                bashInput.value = '';

                if (inputCmd.toLowerCase() === 'clear') {
                    bashOutput.innerHTML = '';
                    return;
                }

                const result = findMatchingCommand(inputCmd);
                if (result && result.error) {
                    appendOutput(result.error);
                    return;
                }
                if (result && result.cmd) {
                    const out =
                        result.cmd.sim_output || 'Command completed successfully.';
                    syncVisualDemo(result.cmd);
                    setTimeout(() => {
                        appendOutput(out);
                        if (bashOutput) bashOutput.scrollTop = bashOutput.scrollHeight;
                    }, cfg.simDelayMs != null ? cfg.simDelayMs : 250);
                } else {
                    const unk = cfg.formatUnknown
                        ? cfg.formatUnknown(inputCmd)
                        : `bash: ${inputCmd.split(/\s+/)[0]}: command not found`;
                    appendOutput(unk);
                }
            });
        }

        if (bashClearBtn) {
            bashClearBtn.addEventListener('click', () => {
                if (bashOutput) bashOutput.innerHTML = '';
            });
        }

        renderList(cfg.commands);
    });
})();
