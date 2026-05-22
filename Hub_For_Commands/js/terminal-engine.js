/**
 * TerminalEngine — Unified terminal simulator for Hub of Commands.
 *
 * Replaces both git-simulator.js and command-hub.js with a single class
 * that handles parsing, history, context-aware errors, OS strictness,
 * tab completion, and visual demo integration.
 *
 * Usage (from page-level <script>):
 *   window.commandHubConfig = { commands: [...], shellMode: 'bash', ... };
 *   // terminal-engine.js auto-initialises on DOMContentLoaded
 */
(function () {
    'use strict';

    /* ================================================================
     * Utility helpers
     * ================================================================ */

    function debounce(fn, wait) {
        let tid;
        return function (...args) {
            clearTimeout(tid);
            tid = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    function normalizeSpaces(s) {
        return s.trim().replace(/\s+/g, ' ');
    }

    function stripPlaceholders(pattern) {
        return pattern
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

    /* ================================================================
     * OS / Environment shell blocklists
     * ================================================================ */

    const SHELL_BLOCKLISTS = {
        cmd: {
            blocked: new Set([
                'ls', 'pwd', 'grep', 'chmod', 'chown', 'cat', 'less', 'head', 'tail',
                'touch', 'rm', 'cp', 'mv', 'top', 'htop', 'kill', 'ps', 'curl', 'wget',
                'ssh', 'scp', 'tar', 'man', 'apt', 'dnf', 'pacman', 'yum', 'brew',
                'sudo', 'su', 'export', 'alias', 'which', 'find', 'awk', 'sed',
                'echo', 'source', 'bash', 'sh', 'zsh',
            ]),
            formatBlocked(cmd) {
                return `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
            },
        },
        powershell: {
            blocked: new Set([
                'cat', 'grep', 'chmod', 'chown', 'less', 'head', 'tail',
                'top', 'htop', 'apt', 'dnf', 'pacman', 'yum', 'brew',
                'su', 'bash', 'sh', 'zsh', 'man', 'awk', 'sed',
                'export', 'source',
            ]),
            formatBlocked(cmd) {
                return `${cmd} : The term '${cmd}' is not recognized as the name of a cmdlet, function, script file, or operable program.\nCheck the spelling of the name, or if a path was included, verify that the path is correct and try again.`;
            },
        },
        bash: {
            blocked: new Set([
                'dir', 'cls', 'ipconfig', 'systeminfo', 'tasklist', 'taskkill',
                'findstr', 'type', 'more', 'copy', 'move', 'del', 'md', 'rd',
                'rmdir', 'set', 'path', 'start', 'netstat',
                'Get-ChildItem', 'Get-Process', 'Get-Service', 'Get-Content',
                'Set-Location', 'New-Item', 'Remove-Item', 'Copy-Item', 'Move-Item',
                'Invoke-WebRequest', 'Test-Connection', 'Select-Object',
            ]),
            formatBlocked(cmd) {
                return `bash: ${cmd}: command not found`;
            },
        },
    };

    /* ================================================================
     * TerminalEngine class
     * ================================================================ */

    class TerminalEngine {
        constructor(cfg) {
            this.cfg = cfg;
            this.commands = cfg.commands || [];
            this.shellMode = cfg.shellMode || 'bash';
            this.promptSymbol = cfg.promptSymbol != null ? cfg.promptSymbol : '$';
            this.requiredPrefix = cfg.requiredPrefix || null;
            this.prefixMismatchMessage = cfg.prefixMismatchMessage || null;
            this.simDelayMs = cfg.simDelayMs != null ? cfg.simDelayMs : 250;
            this.formatUnknown = cfg.formatUnknown || null;
            this.welcomeHtml = cfg.welcomeHtml || '';
            this.terminalTitle = cfg.terminalTitle || 'terminal';

            // State map (git repo init, docker container running, etc.)
            this.state = {};

            // Command history
            this.history = [];
            this.historyIndex = -1;
            this.savedInput = '';

            // DOM references (bound in mount())
            this.els = {};
        }

        /* ---- DOM binding ---- */
        mount() {
            this.els = {
                searchInput: document.getElementById('command-search'),
                commandList: document.getElementById('command-list'),
                bashInput: document.getElementById('bash-input'),
                bashOutput: document.getElementById('bash-output'),
                detailTitle: document.getElementById('detail-title'),
                detailCommand: document.getElementById('detail-command'),
                detailTech: document.getElementById('detail-tech'),
                detailNonTech: document.getElementById('detail-nontech'),
                placeholder: document.getElementById('detail-placeholder'),
                detailContent: document.getElementById('detail-content'),
                clearBtn: document.getElementById('bash-clear-btn'),
                termTitle: document.querySelector('.term-title'),
                promptEl: document.querySelector('.prompt'),
                visualDemo: document.getElementById('visual-demo'),
            };

            // Terminal title
            if (this.els.termTitle && this.terminalTitle) {
                this.els.termTitle.textContent = this.terminalTitle;
            }

            // Prompt symbol
            if (this.els.promptEl && this.promptSymbol) {
                this.els.promptEl.textContent = this.promptSymbol;
            }

            // Welcome message
            if (this.els.bashOutput && this.welcomeHtml) {
                this.els.bashOutput.innerHTML = `<div class="bash-line">${this.welcomeHtml}</div>`;
            }

            // Create Reset button alongside Clear
            if (this.els.clearBtn && this.els.clearBtn.parentNode) {
                const resetBtn = document.createElement('button');
                resetBtn.className = 'term-clear-btn';
                resetBtn.style.marginLeft = '8px';
                resetBtn.style.backgroundColor = '#d32f2f';
                resetBtn.style.color = '#fff';
                resetBtn.textContent = 'Reset';
                resetBtn.ariaLabel = 'Reset Environment';
                resetBtn.addEventListener('click', () => window.location.reload());
                this.els.clearBtn.parentNode.appendChild(resetBtn);
            }

            this._bindSearch();
            this._bindTerminal();
            this._bindClear();
            this.renderList(this.commands);
        }

        /* ---- Search ---- */
        _bindSearch() {
            if (!this.els.searchInput) return;
            const handler = debounce((e) => {
                const term = e.target.value.toLowerCase();
                const filtered = this.commands.filter((cmd) => {
                    const kw = cmd.keywords || [];
                    return (
                        cmd.command.toLowerCase().includes(term) ||
                        kw.some((k) => k.toLowerCase().includes(term)) ||
                        (cmd.non_technical_desc || '').toLowerCase().includes(term) ||
                        (cmd.example && cmd.example.toLowerCase().includes(term)) ||
                        (cmd.technical_desc || '').toLowerCase().includes(term)
                    );
                });
                this.renderList(filtered);
            }, 150);
            this.els.searchInput.addEventListener('input', handler);
        }

        /* ---- Terminal input ---- */
        _bindTerminal() {
            const input = this.els.bashInput;
            if (!input) return;

            input.addEventListener('keydown', (e) => {
                // Arrow-key history navigation
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this._historyUp(input);
                    return;
                }
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this._historyDown(input);
                    return;
                }
                // Tab completion
                if (e.key === 'Tab') {
                    e.preventDefault();
                    this._tabComplete(input);
                    return;
                }
                if (e.key !== 'Enter') return;

                const raw = input.value.trim();
                if (!raw) return;

                // Push to history
                this.history.push(raw);
                this.historyIndex = this.history.length;
                this.savedInput = '';

                // Echo the command
                this.appendOutput(`${this.promptSymbol} ${raw}`);
                input.value = '';

                // Process
                this._processCommand(raw);
            });
        }

        /* ---- History navigation ---- */
        _historyUp(input) {
            if (this.history.length === 0) return;
            if (this.historyIndex === this.history.length) {
                this.savedInput = input.value;
            }
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.history[this.historyIndex];
            }
        }

        _historyDown(input) {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                input.value = this.history[this.historyIndex];
            } else if (this.historyIndex === this.history.length - 1) {
                this.historyIndex = this.history.length;
                input.value = this.savedInput;
            }
        }

        /* ---- Tab completion ---- */
        _tabComplete(input) {
            const partial = input.value.trim().toLowerCase();
            if (!partial) return;

            const matches = this.commands
                .filter((c) => {
                    const ex = (c.example || '').toLowerCase();
                    const stripped = stripPlaceholders(c.command).toLowerCase();
                    return ex.startsWith(partial) || stripped.startsWith(partial);
                })
                .sort((a, b) => (a.example || '').length - (b.example || '').length);

            if (matches.length === 1) {
                input.value = matches[0].example || stripPlaceholders(matches[0].command);
            } else if (matches.length > 1) {
                // Show options in terminal output
                const opts = matches.slice(0, 8).map((m) => stripPlaceholders(m.command)).join('  ');
                this.appendOutput(opts);
            }
        }

        /* ---- Clear ---- */
        _bindClear() {
            if (this.els.clearBtn) {
                this.els.clearBtn.addEventListener('click', () => {
                    if (this.els.bashOutput) this.els.bashOutput.innerHTML = '';
                });
            }
        }

        /* ---- Command processing ---- */
        _processCommand(raw) {
            const lower = raw.toLowerCase().trim();

            // Built-in: clear
            if (lower === 'clear' || lower === 'cls') {
                if (this.els.bashOutput) this.els.bashOutput.innerHTML = '';
                return;
            }

            // Built-in: help
            if (lower === 'help' || lower === '--help') {
                this.appendOutput('Available commands: Type part of a command or pick from the sidebar list.\nUse Tab for completion, ↑/↓ for history.');
                return;
            }

            // OS Strictness: check blocklist
            const firstToken = raw.split(/\s+/)[0];
            const blocklist = SHELL_BLOCKLISTS[this.shellMode];
            if (blocklist && blocklist.blocked.has(firstToken)) {
                this.appendOutput(blocklist.formatBlocked(firstToken));
                return;
            }

            // Required prefix check
            let body = normalizeSpaces(raw);
            if (this.requiredPrefix) {
                const pfx = this.requiredPrefix.toLowerCase();
                if (!lower.startsWith(pfx)) {
                    this.appendOutput(
                        this.prefixMismatchMessage ||
                        `Use commands starting with "${this.requiredPrefix.trim()}".`
                    );
                    return;
                }
                body = normalizeSpaces(raw.slice(this.requiredPrefix.length));
            }

            // State checks (e.g., git requires init)
            if (this.shellMode === 'bash' || this.shellMode === 'cmd' || this.shellMode === 'powershell') {
                const stateError = this._checkState(raw, lower);
                if (stateError) {
                    this.appendOutput(stateError);
                    return;
                }
            }

            // Find matching command
            const result = this._findCommand(raw, body);

            if (result && result.error) {
                this.appendOutput(result.error);
                return;
            }

            if (result && result.cmd) {
                // Check context-aware arg errors before showing success
                const argError = this._checkArgErrors(result.cmd, raw);
                if (argError) {
                    this.appendOutput(argError);
                    return;
                }

                // Update state
                this._updateState(result.cmd, raw);

                // Trigger visual demo
                this.syncVisualDemo(result.cmd);

                // Show output with delay
                const out = result.cmd.sim_output || 'Command completed successfully.';
                setTimeout(() => {
                    this.appendOutput(out);
                    if (this.els.bashOutput) {
                        this.els.bashOutput.scrollTop = this.els.bashOutput.scrollHeight;
                    }
                }, this.simDelayMs);
            } else {
                // Unknown command
                const unk = this.formatUnknown
                    ? this.formatUnknown(raw)
                    : this._defaultUnknown(raw);
                this.appendOutput(unk);
            }
        }

        /* ---- Context-aware argument errors ---- */
        _checkArgErrors(cmd, raw) {
            if (!cmd.argErrors || !Array.isArray(cmd.argErrors)) return null;

            const parts = raw.trim().split(/\s+/);
            const stripped = stripPlaceholders(cmd.command);
            const expectedParts = stripped.split(/\s+/).length;

            for (const rule of cmd.argErrors) {
                switch (rule.when) {
                    case 'noArgs':
                        // Fired when user typed just the base command with no extra args
                        if (parts.length <= expectedParts) {
                            return rule.message;
                        }
                        break;
                    case 'missingFlag':
                        if (rule.flag && !raw.includes(rule.flag)) {
                            return rule.message.replace('%s', rule.flag);
                        }
                        break;
                    case 'invalidFlag':
                        if (rule.pattern) {
                            const regex = new RegExp(rule.pattern);
                            const extraArgs = parts.slice(expectedParts);
                            for (const arg of extraArgs) {
                                if (regex.test(arg) && !this._isKnownFlag(cmd, arg)) {
                                    return rule.message.replace('%s', arg);
                                }
                            }
                        }
                        break;
                    case 'missingValue':
                        if (rule.flag && raw.includes(rule.flag)) {
                            const idx = parts.indexOf(rule.flag);
                            if (idx >= 0 && (idx + 1 >= parts.length || parts[idx + 1].startsWith('-'))) {
                                return rule.message;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            return null;
        }

        _isKnownFlag(cmd, flag) {
            const pattern = cmd.command + ' ' + (cmd.example || '');
            return pattern.includes(flag);
        }

        /* ---- State management ---- */
        _checkState(raw, lower) {
            // Git: repo must be initialized
            if (this.requiredPrefix === 'git ' || lower.startsWith('git ')) {
                const action = lower.replace(/^git\s+/, '').split(/\s+/)[0];
                if (action === 'init' || action === 'clone') {
                    // These are allowed without init
                    return null;
                }
                if (action === 'help' || action === '--help') return null;
                if (!this.state.gitRepoInitialized) {
                    return "fatal: not a git repository (or any of the parent directories): .git\nHint: Try 'git init' first!";
                }
            }
            return null;
        }

        _updateState(cmd, raw) {
            const lower = raw.toLowerCase();
            // Git state
            if (lower.startsWith('git init') || lower.startsWith('git clone')) {
                this.state.gitRepoInitialized = true;
            }
            // Docker state
            if (lower.startsWith('docker run') || lower.startsWith('docker start')) {
                this.state.dockerContainerRunning = true;
            }
            if (lower.startsWith('docker stop') || lower.startsWith('docker rm')) {
                this.state.dockerContainerRunning = false;
            }
        }

        /* ---- Command matching ---- */
        _findCommand(rawInput, body) {
            const bodyLower = body.toLowerCase().replace(/;+$/, '').trim();

            // Exact example match
            for (const c of this.commands) {
                if (!c.example) continue;
                const ex = normalizeSpaces(c.example).toLowerCase().replace(/;+$/, '');
                if (bodyLower === ex) return { cmd: c };
            }

            // Prefix match on stripped command pattern (longest match first)
            const scored = this.commands
                .map((c) => ({
                    c,
                    pattern: stripPlaceholders(c.command).toLowerCase(),
                }))
                .filter((x) => x.pattern.length > 0)
                .sort((a, b) => b.pattern.length - a.pattern.length);

            for (const { c, pattern } of scored) {
                if (bodyLower.startsWith(pattern)) return { cmd: c };
            }

            // First-token match
            const firstTok = bodyLower.split(/[\s|]+/)[0];
            for (const c of this.commands) {
                const stripped = stripPlaceholders(c.command).toLowerCase();
                const pt = stripped.split(/\s+/)[0];
                if (firstTok && pt && firstTok === pt) return { cmd: c };
            }

            return null;
        }

        /* ---- Default unknown formatters ---- */
        _defaultUnknown(raw) {
            const firstTok = raw.split(/\s+/)[0];
            switch (this.shellMode) {
                case 'cmd':
                    return `'${raw}' is not recognized as an internal or external command,\noperable program or batch file.`;
                case 'powershell':
                    return `${firstTok} : The term '${firstTok}' is not recognized as the name of a cmdlet, function,\nscript file, or operable program.`;
                case 'mysql':
                    return 'ERROR 1064 (42000): You have an error in your SQL syntax';
                case 'mongo':
                    return `SyntaxError: Unexpected token ${JSON.stringify(firstTok)}`;
                case 'psql':
                    return 'ERROR: syntax error at or near "' + firstTok + '"';
                case 'oracle':
                    return 'SP2-0734: unknown command beginning "' + firstTok + '"...';
                case 'mssql':
                    return 'Msg 102, Level 15, State 1: Incorrect syntax near "' + firstTok + '".';
                case 'redis':
                    return `(error) ERR unknown command '${firstTok}'`;
                case 'cqlsh':
                    return 'InvalidRequest: Error from server: code=2200 [Syntax error]';
                case 'bash':
                default:
                    return `bash: ${firstTok}: command not found`;
            }
        }

        /* ---- Rendering ---- */
        renderList(commands) {
            const list = this.els.commandList;
            if (!list) return;
            list.innerHTML = '';
            commands.forEach((cmd) => {
                const li = document.createElement('li');
                li.className = 'command-item';
                const snippet = (cmd.non_technical_desc || '').substring(0, 52);
                li.innerHTML = `<strong>${titleFromCommand(cmd.command)}</strong> - ${snippet}...`;
                li.addEventListener('click', () => this.selectCommand(cmd));
                list.appendChild(li);
            });
        }

        selectCommand(cmd) {
            if (!this.els.placeholder || !this.els.detailContent) return;
            this.els.placeholder.style.display = 'none';
            this.els.detailContent.style.display = 'block';
            this.els.detailTitle.textContent = titleFromCommand(cmd.command);
            this.els.detailCommand.textContent = cmd.example;
            this.els.detailTech.textContent = cmd.technical_desc;
            this.els.detailNonTech.textContent = cmd.non_technical_desc;
            this.syncVisualDemo(cmd);
            if (this.els.bashInput) {
                this.els.bashInput.value = cmd.example;
                this.els.bashInput.focus();
            }
        }

        syncVisualDemo(cmd) {
            const el = this.els.visualDemo;
            if (!el || typeof window.applyVisualDemo !== 'function') return;
            if (cmd) {
                const vid = cmd.visualDemo || cmd.demoCategory || cmd.id || cmd.command;
                window.applyVisualDemo(vid, el);
            } else if (typeof window.clearVisualDemo === 'function') {
                window.clearVisualDemo(el);
            } else {
                el.innerHTML = '';
                el.classList.add('visual-demo--empty');
            }
        }

        appendOutput(text) {
            if (!this.els.bashOutput) return;
            const div = document.createElement('div');
            div.className = 'bash-line';
            div.innerHTML = text
                .replace(/\n/g, '<br>')
                .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            this.els.bashOutput.appendChild(div);
            this.els.bashOutput.scrollTop = this.els.bashOutput.scrollHeight;
        }
    }

    /* ================================================================
     * Auto-initialise — works both when loaded statically and
     * dynamically (via command-hub.js shim after DOMContentLoaded).
     * ================================================================ */

    function init() {
        const cfg = window.commandHubConfig;
        if (!cfg || !Array.isArray(cfg.commands)) return;
        if (window._terminalEngine) return; // Already initialised

        const engine = new TerminalEngine(cfg);
        engine.mount();

        // Expose for external integration (visual-demos etc.)
        window._terminalEngine = engine;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOMContentLoaded already fired (dynamic script load)
        init();
    }

    // Export debounce for reuse by other scripts
    window._hubDebounce = debounce;
})();
