/**
 * command-hub.js — Backward-compatible wrapper.
 * 
 * Old generated pages reference this file. It injects a shellMode
 * into commandHubConfig (if missing) by auto-detecting from
 * existing config fields, then loads terminal-engine.js.
 */
(function () {
    'use strict';

    // If terminal-engine.js is already loaded, nothing to do
    if (window._terminalEngine) return;

    // Auto-detect shellMode from existing config if not set
    var cfg = window.commandHubConfig;
    if (cfg && !cfg.shellMode) {
        // Use formatUnknown function or prompt to detect shell environment
        if (cfg.formatUnknown) {
            // Legacy pages had a formatUnknown, remove it — terminal-engine handles this
            delete cfg.formatUnknown;
        }

        // Detect from prompt/title/welcome
        var prompt = (cfg.promptSymbol || '').toLowerCase();
        var title = (cfg.terminalTitle || '').toLowerCase();

        if (prompt === '>' || title.indexOf('cmd') !== -1) {
            cfg.shellMode = 'cmd';
        } else if (prompt === 'ps>' || title.indexOf('powershell') !== -1) {
            cfg.shellMode = 'powershell';
        } else if (prompt.indexOf('mysql') !== -1) {
            cfg.shellMode = 'mysql';
        } else if (prompt.indexOf('hub>') !== -1 || title.indexOf('mongosh') !== -1) {
            cfg.shellMode = 'mongo';
        } else if (prompt.indexOf('hub=#') !== -1 || title.indexOf('psql') !== -1) {
            cfg.shellMode = 'psql';
        } else if (prompt.indexOf('sql>') !== -1 || title.indexOf('sql*plus') !== -1) {
            cfg.shellMode = 'oracle';
        } else if (prompt === '1>' || title.indexOf('sqlcmd') !== -1) {
            cfg.shellMode = 'mssql';
        } else if (prompt.indexOf('redis') !== -1) {
            cfg.shellMode = 'redis';
        } else if (prompt.indexOf('cqlsh') !== -1) {
            cfg.shellMode = 'cqlsh';
        } else {
            cfg.shellMode = 'bash';
        }
    }

    // Dynamically load terminal-engine.js
    var currentScript = document.querySelector('script[src*="command-hub"]');
    var s = document.createElement('script');
    s.src = currentScript
        ? currentScript.src.replace('command-hub.js', 'terminal-engine.js')
        : '../js/terminal-engine.js';
    document.body.appendChild(s);
})();
