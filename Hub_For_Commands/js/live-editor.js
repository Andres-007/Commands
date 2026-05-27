/**
 * live-editor.js — Split-Pane Interactive Live Editor / IDLE
 * Hub of Commands — Requirement 3
 *
 * Self-initialises on DOMContentLoaded when an element with
 *   id="live-editor-root"  and  data-lang="html|css|js|python|nodejs"
 * is present on the page.
 *
 * Behaviour per language:
 *   html, css, js  → iframe srcdoc live preview (real execution)
 *   python, nodejs  → simulated output pane (pattern-matched responses)
 */
(function () {
    'use strict';

    /* ================================================================
     * Syntax highlighter — lightweight, no external deps
     * Returns an HTML string with <span class="le-*"> tokens
     * ================================================================ */

    const HIGHLIGHT = {
        html: highlightHTML,
        css:  highlightCSS,
        js:   highlightJS,
        javascript: highlightJS,
        python: highlightPython,
        nodejs: highlightJS,
        typescript: highlightJS,
        react: highlightJS,
        angular: highlightJS,
        vuejs: highlightHTML,
        svelte: highlightHTML,
        jquery: highlightJS,
        reactnative: highlightJS,
        flutter: highlightJS
    };

    function escHtml(s) {
        return s
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function highlightHTML(code) {
        return escHtml(code)
            // Comments
            .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="le-comment">$1</span>')
            // Tags
            .replace(/(&lt;\/?)([\w-]+)/g, '<span class="le-tag">$1$2</span>')
            // Attributes
            .replace(/\s([\w-]+)=/g, ' <span class="le-attr">$1</span>=')
            // Strings
            .replace(/(["'])([^"']*)\1/g, '<span class="le-str">$1$2$1</span>');
    }

    function highlightCSS(code) {
        return escHtml(code)
            // Comments
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="le-comment">$1</span>')
            // Strings
            .replace(/(["'])([^"']*)\1/g, '<span class="le-str">$1$2$1</span>')
            // Values — numbers with units
            .replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|vh|vw|%|s|ms|deg|fr)?)\b/g, '<span class="le-num">$1</span>')
            // Properties (word before colon)
            .replace(/\b([\w-]+)(\s*:)/g, '<span class="le-prop">$1</span>$2')
            // Selectors (simplified: lines ending before {)
            .replace(/^([^{}\n]+)(\s*\{)/gm, '<span class="le-sel">$1</span>$2');
    }

    function highlightJS(code) {
        const KW = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|default|from|async|await|try|catch|finally|throw|typeof|instanceof|in|of|null|undefined|true|false|this|super|yield|delete|void|static|get|set)\b/g;
        return escHtml(code)
            // Template literals
            .replace(/(`[^`]*`)/g, '<span class="le-str">$1</span>')
            // Strings
            .replace(/(["'])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="le-str">$&</span>')
            // Comments
            .replace(/(\/\/[^\n]*)/g, '<span class="le-comment">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="le-comment">$1</span>')
            // Keywords
            .replace(KW, '<span class="le-kw">$1</span>')
            // Numbers
            .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="le-num">$1</span>')
            // Function calls
            .replace(/\b([\w$]+)(\s*\()/g, '<span class="le-fn">$1</span>$2');
    }

    function highlightPython(code) {
        const KW = /\b(def|class|return|if|elif|else|for|while|import|from|as|pass|break|continue|try|except|finally|raise|with|yield|lambda|global|nonlocal|del|assert|and|or|not|in|is|True|False|None|print|range|len|type|str|int|float|list|dict|tuple|set)\b/g;
        return escHtml(code)
            // Triple-quoted strings
            .replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, '<span class="le-str">$1</span>')
            // f-strings and regular strings
            .replace(/([fFrRbBuU]?["'])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="le-str">$&</span>')
            // Comments
            .replace(/(#[^\n]*)/g, '<span class="le-comment">$1</span>')
            // Keywords
            .replace(KW, '<span class="le-kw">$1</span>')
            // Numbers
            .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="le-num">$1</span>')
            // Function defs
            .replace(/\b(def|class)\s+([\w_]+)/g, '<span class="le-kw">$1</span> <span class="le-fn">$2</span>');
    }

    /* ================================================================
     * Starter snippets per language
     * ================================================================ */

    const SNIPPETS = {
        html: [
            { label: 'Hello World',    code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <style>\n    body { font-family: sans-serif; background: #1a1a2e; color: #eee; display: grid; place-items: center; min-height: 100vh; }\n    h1 { font-size: 3rem; background: linear-gradient(135deg,#a78bfa,#38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>' },
            { label: 'Card Component', code: '<!DOCTYPE html>\n<html>\n<head>\n<style>\n  * { box-sizing: border-box; margin:0; padding:0; }\n  body { background:#0f0f0f; display:flex; justify-content:center; align-items:center; min-height:100vh; font-family:sans-serif; }\n  .card { background:#1a1a1a; border:1px solid #333; border-radius:16px; padding:28px; max-width:300px; color:#eee; }\n  .card h2 { margin-bottom:8px; color:#a78bfa; }\n  .card p  { color:#888; font-size:.9rem; line-height:1.6; }\n  .badge   { display:inline-block; margin-top:14px; padding:4px 12px; background:rgba(167,139,250,.15); border:1px solid rgba(167,139,250,.3); border-radius:999px; font-size:.75rem; color:#a78bfa; }\n</style>\n</head>\n<body>\n  <div class="card">\n    <h2>Live Preview</h2>\n    <p>Edit this HTML on the left and watch it update instantly in real time.</p>\n    <span class="badge">Interactive</span>\n  </div>\n</body>\n</html>' },
        ],
        css: [
            { label: 'Gradient Card', code: 'body {\n  background: #0a0a0a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n  font-family: sans-serif;\n}\n\n.card {\n  background: #111111;\n  border: 1px solid #333;\n  border-radius: 20px;\n  padding: 40px;\n  color: #eee;\n  text-align: center;\n  box-shadow: 0 20px 60px rgba(0,0,0,0.6);\n}\n\nh1 {\n  background: linear-gradient(135deg, #a78bfa, #38bdf8);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  font-size: 2rem;\n}' }
        ],
        js: [
            { label: 'Hello DOM',     code: '// Live JS — runs in this iframe\ndocument.body.style.cssText = "background:#0a0a0a;color:#d4d4d4;font-family:\'JetBrains Mono\',monospace;padding:20px;";\n\nconst h1 = document.createElement(\'h1\');\nh1.textContent = \'Hello from JS!\';\nh1.style.cssText = "background:linear-gradient(135deg,#a78bfa,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:2rem;";\ndocument.body.appendChild(h1);\n\nconst p = document.createElement(\'p\');\np.textContent = `Rendered at: ${new Date().toLocaleTimeString()}`;\np.style.color = \'#666\';\ndocument.body.appendChild(p);' },
            { label: 'Array Methods', code: 'document.body.style.cssText = "background:#0a0a0a;color:#d4d4d4;font-family:\'JetBrains Mono\',monospace;padding:20px;line-height:2;";\n\nconst nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconst evens = nums.filter(n => n % 2 === 0);\nconst doubled = evens.map(n => n * 2);\nconst sum = doubled.reduce((acc, n) => acc + n, 0);\n\ndocument.body.innerHTML = `\n  <h3 style="color:#a78bfa;margin-bottom:12px">Array pipeline</h3>\n  <div>Original: [${nums.join(\', \')}]</div>\n  <div>Filter even: [${evens.join(\', \')}]</div>\n  <div>Double: [${doubled.join(\', \')}]</div>\n  <div style="color:#c3e88d;font-weight:bold">Sum: ${sum}</div>\n`;' }
        ],
        typescript: [
            { label: 'TS Interface & Class', code: 'interface User {\n    id: number;\n    name: string;\n    role: string;\n}\n\nclass UserManager {\n    private users: User[] = [];\n\n    addUser(user: User) {\n        this.users.push(user);\n        console.log(`Added user: ${user.name} as a ${user.role}`);\n    }\n\n    listUsers() {\n        console.log("Registered Users:");\n        this.users.forEach(u => {\n            console.log(`- [#${u.id}] ${u.name} (${u.role})`);\n        });\n    }\n}\n\nconst mgr = new UserManager();\nmgr.addUser({ id: 1, name: "Diego", role: "Lead Dev" });\nmgr.addUser({ id: 2, name: "Lucia", role: "Architect" });\nmgr.listUsers();' }
        ],
        react: [
            { label: 'Interactive Counter', code: 'function CounterApp() {\n  const [count, setCount] = React.useState(0);\n  \n  return (\n    <div style={{ textAlign: \'center\' }}>\n      <h2 style={{ color: \'#61dafb\', marginBottom: \'16px\' }}>React Counter</h2>\n      <div style={{ fontSize: \'3rem\', fontWeight: \'bold\', margin: \'20px 0\', color: \'#fff\' }}>\n        {count}\n      </div>\n      <div style={{ display: \'flex\', gap: \'10px\', justifyContent: \'center\' }}>\n        <button className="btn" onClick={() => setCount(count - 1)}>-</button>\n        <button className="btn" onClick={() => setCount(0)}>Reset</button>\n        <button className="btn" onClick={() => setCount(count + 1)}>+</button>\n      </div>\n    </div>\n  );\n}\n\nconst root = ReactDOM.createRoot(document.getElementById(\'root\'));\nroot.render(<CounterApp />);' }
        ],
        vuejs: [
            { label: 'Vue 3 Template', code: '<div style="text-align: center;">\n  <h2 style="color: #42b883; margin-bottom: 12px;">{{ message }}</h2>\n  <div style="font-size: 2.2rem; margin: 20px; color: #fff;">Count: {{ count }}</div>\n  <button class="btn" @click="count++">Increment</button>\n  <button class="btn" style="background:#35495e; margin-left: 10px;" @click="count = 0">Reset</button>\n</div>' }
        ],
        svelte: [
            { label: 'Svelte Interactive App', code: '<div class="svelte-card">\n  <h2>Svelte Reactive Playground</h2>\n  <p>Standard Svelte bindings simulation.</p>\n</div>' }
        ],
        angular: [
            { label: 'Angular Core Component', code: '@Component({\n  selector: \'app-root\',\n  template: `\n    <div class="angular-box">\n      <h2>{{ title }}</h2>\n    </div>\n  `\n})' }
        ],
        jquery: [
            { label: 'Fading Effects', code: '$("#btn").click(function() {\n  $(".box").animate({\n    width: "toggle",\n    height: "toggle",\n    opacity: "toggle"\n  }, 800);\n});' }
        ],
        reactnative: [
            { label: 'Mobile Card Layout', code: 'import React from \'react\';\nimport { View, Text, StyleSheet } from \'react-native\';' }
        ],
        flutter: [
            { label: 'Material App Scaffold', code: 'import \'package:flutter/material.dart\';' }
        ],
        python: [
            { label: 'Hello Python',  code: 'print("Hello, Python!")\n\nfor i in range(5):\n    print(f"  → iteration {i}")\n\nprint("Done.")' },
            { label: 'List Comp',     code: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\nevens   = [n for n in numbers if n % 2 == 0]\nsquared = [n ** 2 for n in evens]\n\nprint(f"Evens:   {evens}")\nprint(f"Squared: {squared}")\nprint(f"Sum:     {sum(squared)}")' }
        ],
        nodejs: [
            { label: 'Hello Node',    code: 'const os = require(\'os\');\n\nconsole.log("Hello from Node.js!");\nconsole.log(`Platform : ${os.platform()}`);\nconsole.log(`Arch     : ${os.arch()}`);\nconsole.log(`Hostname : ${os.hostname()}`);\nconsole.log(`CPUs     : ${os.cpus().length} cores`);' }
        ],
    };

    /* ================================================================
     * Python / Node simulated evaluation
     * Pattern-match known constructs, return plausible output
     * ================================================================ */

    function simEval(code, lang) {
        const lines = code.split('\n');
        const output = [];

        if (lang === 'python') {
            for (const line of lines) {
                const trimmed = line.trim();
                const pMatch = trimmed.match(/^print\(([^)]+)\)$/);
                if (pMatch) {
                    let val = pMatch[1].trim();
                    val = val.replace(/f(["'])(.*?)\1/, (_, q, s) => {
                        return s.replace(/\{([^}]+)\}/g, (__, expr) => {
                            return evalSimpleExpr(expr, lines);
                        });
                    });
                    val = val.replace(/^["']|["']$/g, '');
                    output.push(val);
                }
                if (/^(class|def)\s+\w+/.test(trimmed)) {
                    output.push(`<span class="le-dim"># ${trimmed}</span>`);
                }
            }
            if (output.length === 0) {
                output.push('<span class="le-dim"># No print() calls detected</span>');
                output.push('<span class="le-dim"># Add print() statements to see output</span>');
            }
        } else {
            for (const line of lines) {
                const trimmed = line.trim();
                const clMatch = trimmed.match(/^console\.log\(([^)]+)\)$/);
                if (clMatch) {
                    let val = clMatch[1].trim();
                    val = val.replace(/^["'`]|["'`]$/g, '').replace(/\\n/g, '\n');
                    output.push(val);
                }
                if (/\.listen\(\d+/.test(trimmed)) {
                    const portM = trimmed.match(/\.listen\((\d+)/);
                    const port = portM ? portM[1] : '3000';
                    output.push(`Server running at http://localhost:${port}/`);
                }
            }
            if (output.length === 0) {
                output.push('<span class="le-dim">// No console.log() calls detected</span>');
                output.push('<span class="le-dim">// Add console.log() to see output</span>');
            }
        }
        return output.join('\n');
    }

    function evalSimpleExpr(expr, lines) {
        for (const line of lines) {
            const m = line.match(/^\s*(\w+)\s*=\s*(.+)$/);
            if (m && m[1] === expr.trim()) {
                return m[2].trim().replace(/^["']|["']$/g, '');
            }
        }
        try {
            const result = Function('"use strict"; return (' + expr + ')')();
            if (typeof result !== 'object') return String(result);
        } catch (_) { /* ignore */ }
        return `{${expr}}`;
    }

    /* ================================================================
     * Build iframe srcdoc for HTML/CSS/JS/Frameworks preview
     * ================================================================ */

    function buildSrcdoc(code, lang) {
        if (lang === 'html') return code;
        if (lang === 'css') {
            return `<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0} body{background:#0a0a0a;color:#d4d4d4;font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh} .wrapper{width:100%;max-width:400px} .card{background:#111;border:1px solid #333;border-radius:16px;padding:30px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5)} ${code}</style></head><body><div class="wrapper"><div class="card"><h1>CSS Preview</h1><p>Your custom styling rules apply to this elements visually in real time.</p></div></div></body></html>`;
        }
        if (lang === 'js' || lang === 'javascript') {
            return `<!DOCTYPE html><html><head><style>body{margin:0}</style></head><body><script>${code}<\/script></body></html>`;
        }
        if (lang === 'typescript') {
            return `<!DOCTYPE html><html><head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/typescript/5.0.4/typescript.min.js"><\/script>
            <style>
              body { background:#0a0a0a; color:#d4d4d4; font-family:'JetBrains Mono',monospace; padding:20px; line-height:1.6; font-size:14px; }
              .console-log { margin-bottom: 6px; }
              .console-title { color:#a78bfa; font-weight:bold; margin-bottom:12px; border-bottom:1px solid #222; padding-bottom:6px; }
            </style>
            </head><body>
            <div class="console-title">TypeScript Live Console Logs</div>
            <div id="output"></div>
            <script>
              const originalLog = console.log;
              console.log = function(...args) {
                  const out = document.getElementById('output');
                  const div = document.createElement('div');
                  div.className = 'console-log';
                  div.textContent = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
                  out.appendChild(div);
                  originalLog.apply(console, args);
              };
              try {
                  const code = \`${code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
                  const js = ts.transpile(code);
                  eval(js);
              } catch(err) {
                  const out = document.getElementById('output');
                  const div = document.createElement('div');
                  div.style.color = '#f07178';
                  div.textContent = 'TypeScript Transpilation Error: ' + err.message;
                  out.appendChild(div);
              }
            <\/script>
            </body></html>`;
        }
        if (lang === 'react') {
            return `<!DOCTYPE html><html><head>
            <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin><\/script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin><\/script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
            <style>
              body { background:#0f0f0f; color:#eee; font-family:sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; padding:15px; }
              #root { width: 100%; max-width: 400px; background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
              .btn { background: #61dafb; color: #20232a; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; font-size: 0.9rem; margin: 4px; }
              .btn:hover { opacity: 0.9; }
            </style>
            </head><body>
            <div id="root"></div>
            <script type="text/babel">
              try {
                  ${code}
              } catch(err) {
                  document.getElementById('root').innerHTML = '<div style="color:#f07178">React Render Error: ' + err.message + '</div>';
              }
            <\/script>
            </body></html>`;
        }
        if (lang === 'vuejs') {
            return `<!DOCTYPE html><html><head>
            <script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
            <style>
              body { background:#0f0f0f; color:#eee; font-family:sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; padding:15px; }
              #app { width: 100%; max-width: 400px; background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
              .btn { background: #42b883; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; font-size: 0.9rem; }
              .btn:hover { opacity: 0.9; }
            </style>
            </head><body>
            <div id="app">
              ${code}
            </div>
            <script>
              try {
                  const { createApp } = Vue;
                  createApp({
                    data() {
                      return {
                        count: 0,
                        message: 'Hello from Vue 3 Live Editor!'
                      }
                    }
                  }).mount('#app');
              } catch(err) {
                  document.getElementById('app').innerHTML = '<div style="color:#f07178">Vue Init Error: ' + err.message + '</div>';
              }
            <\/script>
            </body></html>`;
        }
        if (lang === 'svelte') {
            return `<!DOCTYPE html><html><head>
            <style>
              body { background:#0f0f0f; color:#eee; font-family:sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; padding:15px; }
              .svelte-card { width: 100%; max-width: 400px; background: #1a1a1a; border: 1px solid #ff3e00; border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align:center; }
              h2 { color: #ff3e00; margin-bottom: 12px; }
              button { background: #ff3e00; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.9rem; margin-top:10px; }
            </style>
            </head><body>
            <div class="svelte-card">
              <h2>Svelte Sandbox</h2>
              <div style="font-size:2.2rem; margin:15px 0; color:#fff;" id="counter-val">Count: 0</div>
              <button id="btn">Click me</button>
            </div>
            <script>
              let count = 0;
              document.getElementById('btn').addEventListener('click', () => {
                 count++;
                 document.getElementById('counter-val').textContent = 'Count: ' + count;
              });
            <\/script>
            </body></html>`;
        }
        if (lang === 'angular') {
            return `<!DOCTYPE html><html><head>
            <style>
              body { background:#0f0f0f; color:#eee; font-family:sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; padding:15px; }
              .angular-box { width: 100%; max-width: 400px; background: #1a1a1a; border: 1px solid #dd0031; border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align:center; }
              h2 { color: #dd0031; margin-bottom: 12px; }
              button { background: #dd0031; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.9rem; margin-top:10px; }
              .active-badge { display:inline-block; margin-top:12px; background:rgba(221,0,49,0.15); border:1px solid #dd0031; padding:4px 12px; border-radius:99px; font-size:0.75rem; color:#dd0031; font-weight:bold; }
            </style>
            </head><body>
            <div class="angular-box">
              <h2>Angular Sandbox Output</h2>
              <button id="btn">Toggle Active State</button>
              <br>
              <div id="badge" style="display:none;" class="active-badge">Active State On!</div>
            </div>
            <script>
              let active = false;
              document.getElementById('btn').addEventListener('click', () => {
                 active = !active;
                 document.getElementById('badge').style.display = active ? 'inline-block' : 'none';
              });
            <\/script>
            </body></html>`;
        }
        if (lang === 'jquery') {
            return `<!DOCTYPE html><html><head>
            <script src="https://code.jquery.com/jquery-3.7.1.min.js"><\/script>
            <style>
              body { background:#0a0a0a; color:#d4d4d4; font-family:sans-serif; display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh; margin:0; }
              .box { width: 120px; height: 120px; background: #0769ad; border-radius: 12px; margin-top: 20px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; }
            </style>
            </head><body>
            <button id="btn" style="background:#0769ad;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">Trigger jQuery Animation</button>
            <div class="box">jQuery Box</div>
            <script>
              try {
                  ${code}
              } catch(err) {
                  document.body.innerHTML += '<div style="color:#f07178;margin-top:10px">jQuery Error: ' + err.message + '</div>';
              }
            <\/script>
            </body></html>`;
        }
        if (lang === 'reactnative') {
            return `<!DOCTYPE html><html><head>
            <style>
              body { background:#0a0a0a; color:#d4d4d4; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; }
              .phone-frame { width: 280px; height: 460px; border: 8px solid #333; border-radius: 36px; overflow: hidden; background: #ffffff; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.8); position:relative; }
              .notch { width: 120px; height: 18px; background: #333; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; align-self: center; position:absolute; z-index: 10; }
              .screen { flex: 1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding: 20px; background: #121212; color: #fff; text-align: center; }
              .btn { background: #8e44ad; color: #fff; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; border:none; margin-top: 15px; font-size: 0.8rem; }
            </style>
            </head><body>
            <div class="phone-frame">
              <div class="notch"></div>
              <div class="screen">
                <h3 style="color:#a78bfa;font-size:1.1rem;margin:0 0 10px;">React Native Phone</h3>
                <p style="font-size:0.75rem;color:#888;line-height:1.4;">Native Layout Simulator.</p>
                <button class="btn" onclick="alert('React Native Pressed!')">Tap Action</button>
              </div>
            </div>
            </body></html>`;
        }
        if (lang === 'flutter') {
            return `<!DOCTYPE html><html><head>
            <style>
              body { background:#0a0a0a; color:#d4d4d4; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; }
              .phone-frame { width: 280px; height: 460px; border: 8px solid #333; border-radius: 36px; overflow: hidden; background: #02569B; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.8); position:relative; }
              .notch { width: 120px; height: 18px; background: #333; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; align-self: center; position:absolute; z-index: 10; }
              .app-bar { background: #02569B; padding: 25px 12px 10px; color:#fff; font-size:0.85rem; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.2); display:flex; justify-content:center; }
              .screen { flex: 1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding: 20px; background: #fafafa; color: #333; text-align: center; }
              .btn { background: #02569B; color: #fff; padding: 8px 18px; border-radius: 4px; font-weight: bold; cursor: pointer; border:none; margin-top: 15px; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.15); }
            </style>
            </head><body>
            <div class="phone-frame">
              <div class="notch"></div>
              <div class="app-bar">Flutter Scaffold</div>
              <div class="screen">
                <h3 style="color:#02569B;font-size:1.1rem;margin:0 0 10px;">Flutter Simulator</h3>
                <p style="font-size:0.75rem;color:#666;line-height:1.4;">Dart Widget Canvas Simulator.</p>
                <button class="btn" onclick="alert('Flutter Elevated Action!')">Press Me</button>
              </div>
            </div>
            </body></html>`;
        }
        return '';
    }

    /* ================================================================
     * Component builder
     * ================================================================ */

    function buildEditor(root, lang) {
        const isLive = ['html', 'css', 'js', 'javascript', 'typescript', 'react', 'vuejs', 'svelte', 'angular', 'jquery', 'reactnative', 'flutter'].includes(lang);
        const isVisualAvailable = ['html', 'css'].includes(lang);
        const snippets = SNIPPETS[lang] || [];
        const hlFn     = HIGHLIGHT[lang] || ((s) => escHtml(s));
        const defaultCode = snippets[0] ? snippets[0].code : `// Start coding in ${lang}...`;

        root.innerHTML = `
        <div class="live-editor-section">
            <div class="live-editor-section-header">
                <span class="live-editor-badge">Live Editor</span>
                <h2 class="live-editor-title">Interactive ${lang.toUpperCase()} Editor & IDLE</h2>
            </div>
            <p class="live-editor-subtitle">
                ${isLive
                    ? 'Type code on the left — the right panel renders a live preview instantly.'
                    : 'Type code on the left — the right panel simulates realistic output as you write.'}
            </p>

            <div class="le-snippets">
                ${snippets.map((s, i) =>
                    `<button class="le-snippet-btn" data-snippet-idx="${i}">${escHtml(s.label)}</button>`
                ).join('')}
            </div>

            <div class="live-editor-pane" style="margin-top:14px">
                <!-- Left: Editor Pane -->
                <div class="le-editor-side">
                    <!-- NetBeans-Style Tabs (HTML/CSS only) -->
                    ${isVisualAvailable ? `
                    <div class="le-mode-bar">
                        <button class="le-mode-btn active" id="le-btn-code">Code Editor</button>
                        <button class="le-mode-btn" id="le-btn-visual">🎨 NetBeans Designer</button>
                    </div>
                    ` : ''}

                    <div class="le-editor-header" id="le-ed-header">
                        <div class="le-header-dot-row">
                            <span class="le-header-dot red"></span>
                            <span class="le-header-dot yellow"></span>
                            <span class="le-header-dot green"></span>
                        </div>
                        editor.${lang === 'nodejs' ? 'js' : lang === 'javascript' ? 'js' : lang === 'vuejs' ? 'vue' : lang === 'react' ? 'jsx' : lang}
                    </div>

                    <!-- Code Pane -->
                    <div class="le-editor-wrap" id="le-code-panel">
                        <pre class="le-highlight" aria-hidden="true"></pre>
                        <textarea class="le-textarea"
                            spellcheck="false"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="off"
                            aria-label="${lang} code editor"
                            id="le-textarea-${lang}"
                        ></textarea>
                    </div>

                    <!-- NetBeans Visual Designer Pane (HTML/CSS only) -->
                    ${isVisualAvailable ? `
                    <div class="le-designer-workspace" id="le-visual-panel" style="display: none;">
                        <!-- Palette (Toolbox) -->
                        <div class="le-designer-palette">
                            <div class="le-palette-title">Toolbox</div>
                            <button class="le-palette-item" data-tool="h1">Heading 1</button>
                            <button class="le-palette-item" data-tool="p">Paragraph</button>
                            <button class="le-palette-item" data-tool="button">Button</button>
                            <button class="le-palette-item" data-tool="card">Card Component</button>
                        </div>
                        <!-- Visual Canvas -->
                        <div class="le-designer-canvas-wrap">
                            <div class="le-designer-canvas" id="le-design-canvas">
                                <h1>Visual Designer Workspace</h1>
                                <p>Select elements to change their design properties visually.</p>
                            </div>
                        </div>
                        <!-- Properties Panel -->
                        <div class="le-designer-inspector" id="le-design-inspector">
                            <div class="le-inspector-header">Properties Inspector</div>
                            <div id="le-inspector-fields">
                                <div class="le-inspector-empty">Select any element in the canvas to adjust visual properties.</div>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>

                <!-- Right: Preview / Output -->
                <div class="le-preview-side">
                    <div class="le-preview-header">
                        <div class="le-header-dot-row">
                            <span class="le-header-dot red"></span>
                            <span class="le-header-dot yellow"></span>
                            <span class="le-header-dot green"></span>
                        </div>
                        ${isLive ? 'preview' : 'output'}
                    </div>
                    ${isLive
                        ? `<iframe class="le-iframe" sandbox="allow-scripts allow-same-origin" id="le-iframe-${lang}" title="Live preview"></iframe>`
                        : `<div class="le-sim-output" id="le-output-${lang}"><span class="le-sim-dim"># Output will appear here as you type…</span></div>`
                    }
                    <div class="le-run-bar">
                        <button class="le-run-btn" id="le-run-btn-${lang}" type="button">
                            ▶ Run
                        </button>
                        <span class="le-run-status" id="le-run-status-${lang}"></span>
                    </div>
                </div>
            </div>
        </div>`;

        /* -- Wire up references -- */
        const textarea   = root.querySelector('.le-textarea');
        const highlight  = root.querySelector('.le-highlight');
        const runBtn     = root.querySelector('.le-run-btn');
        const statusEl   = root.querySelector('.le-run-status');
        const iframe     = root.querySelector('.le-iframe');
        const simOutput  = root.querySelector('.le-sim-output');
        const snippetBtns = root.querySelectorAll('.le-snippet-btn');

        /* -- Tabs logic -- */
        const codeTab = root.querySelector('#le-btn-code');
        const visualTab = root.querySelector('#le-btn-visual');
        const codePanel = root.querySelector('#le-code-panel');
        const visualPanel = root.querySelector('#le-visual-panel');
        const designCanvas = root.querySelector('#le-design-canvas');
        const inspectorFields = root.querySelector('#le-inspector-fields');
        let activeSelectedEl = null;

        if (codeTab && visualTab) {
            codeTab.addEventListener('click', () => {
                visualTab.classList.remove('active');
                codeTab.classList.add('active');
                visualPanel.style.display = 'none';
                codePanel.style.display = 'block';
            });

            visualTab.addEventListener('click', () => {
                codeTab.classList.remove('active');
                visualTab.classList.add('active');
                codePanel.style.display = 'none';
                visualPanel.style.display = 'flex';
                syncCodeToVisual();
            });
        }

        /* -- Bidirectional Sync (Code -> Visual Canvas) -- */
        function syncCodeToVisual() {
            if (!designCanvas) return;
            const code = textarea.value;
            if (lang === 'html') {
                // If it's a full document, extract body content
                const bodyMatch = code.match(/<body>([\s\S]*?)<\/body>/i);
                if (bodyMatch) {
                    designCanvas.innerHTML = bodyMatch[1].trim();
                } else {
                    designCanvas.innerHTML = code;
                }
                setupVisualInteractions();
            } else if (lang === 'css') {
                // For CSS, we render a sample block and parse the styles to apply them!
                designCanvas.innerHTML = `
                <div class="visual-css-wrap" style="padding:15px; border-radius:10px;">
                  <div class="card" style="border:1px solid #ddd; padding:20px; border-radius:8px; text-align:center;">
                    <h1>Header Element</h1>
                    <p>Card Paragraph Text Element</p>
                  </div>
                </div>`;
                applyStylesToVisual(code);
                setupVisualInteractions();
            }
        }

        /* -- CSS parsing and applying to visual sample container -- */
        function applyStylesToVisual(cssCode) {
            let styleTag = document.getElementById('le-visual-styles');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'le-visual-styles';
                document.head.appendChild(styleTag);
            }
            // Scoped rules for visual designer area
            const scopedCss = cssCode
                .replace(/\bbody\b/g, '#le-design-canvas .visual-css-wrap')
                .replace(/\.card\b/g, '#le-design-canvas .card')
                .replace(/\bh1\b/g, '#le-design-canvas h1')
                .replace(/\bp\b/g, '#le-design-canvas p');
            styleTag.textContent = scopedCss;
        }

        /* -- Visual elements interactivity -- */
        function setupVisualInteractions() {
            if (!designCanvas) return;
            const elements = designCanvas.querySelectorAll('*');
            elements.forEach(el => {
                // Ignore structural wrapper if CSS designer
                if (el.classList.contains('visual-css-wrap')) return;

                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    designCanvas.querySelectorAll('.selected').forEach(x => x.classList.remove('selected'));
                    el.classList.add('selected');
                    activeSelectedEl = el;
                    renderInspector(el);
                });
            });
        }

        /* -- Render Properties Inspector Panel -- */
        function renderInspector(el) {
            if (!inspectorFields) return;
            const computed = window.getComputedStyle(el);
            const tag = el.tagName.toLowerCase();

            // Font-size in integer
            const fSize = parseInt(computed.fontSize) || 16;
            // Padding
            const padding = parseInt(computed.padding) || 10;
            // Border-radius
            const radius = parseInt(computed.borderRadius) || 0;

            // Colors in Hex
            const colorHex = rgb2hex(computed.color);
            const bgHex = rgb2hex(computed.backgroundColor);

            inspectorFields.innerHTML = `
                <div class="le-inspector-prop">
                    <label class="le-inspector-label">Element Selector</label>
                    <div style="font-size:0.75rem; color:#a78bfa; font-weight:bold;">&lt;${tag}&gt;</div>
                </div>
                ${tag !== 'div' ? `
                <div class="le-inspector-prop">
                    <label class="le-inspector-label">Text Content</label>
                    <input type="text" class="le-inspector-input" id="prop-text" value="${escHtml(el.textContent.trim())}">
                </div>` : ''}
                <div class="le-inspector-prop">
                    <label class="le-inspector-label">Font Size</label>
                    <div class="le-inspector-slider-row">
                        <input type="range" class="le-inspector-slider" id="prop-fsize" min="10" max="64" value="${fSize}">
                        <span class="le-inspector-slider-val">${fSize}px</span>
                    </div>
                </div>
                <div class="le-inspector-prop">
                    <label class="le-inspector-label">Text Color</label>
                    <input type="color" class="le-inspector-input" id="prop-color" value="${colorHex}">
                </div>
                <div class="le-inspector-prop">
                    <label class="le-inspector-label">Background Color</label>
                    <input type="color" class="le-inspector-input" id="prop-bgcolor" value="${bgHex}">
                </div>
                <div class="le-inspector-prop">
                    <label class="le-inspector-label">Padding</label>
                    <div class="le-inspector-slider-row">
                        <input type="range" class="le-inspector-slider" id="prop-padding" min="0" max="80" value="${padding}">
                        <span class="le-inspector-slider-val">${padding}px</span>
                    </div>
                </div>
                <div class="le-inspector-prop">
                    <label class="le-inspector-label">Border Radius</label>
                    <div class="le-inspector-slider-row">
                        <input type="range" class="le-inspector-slider" id="prop-radius" min="0" max="30" value="${radius}">
                        <span class="le-inspector-slider-val">${radius}px</span>
                    </div>
                </div>
                <button class="le-designer-btn-danger" id="prop-delete">✕ Delete Element</button>
            `;

            // -- Bind events for live visual adjustments --
            const txtInput = inspectorFields.querySelector('#prop-text');
            const fsizeInput = inspectorFields.querySelector('#prop-fsize');
            const colorInput = inspectorFields.querySelector('#prop-color');
            const bgInput = inspectorFields.querySelector('#prop-bgcolor');
            const paddingInput = inspectorFields.querySelector('#prop-padding');
            const radiusInput = inspectorFields.querySelector('#prop-radius');
            const deleteBtn = inspectorFields.querySelector('#prop-delete');

            if (txtInput) {
                txtInput.addEventListener('input', () => {
                    el.textContent = txtInput.value;
                    syncVisualToCode();
                });
            }

            fsizeInput.addEventListener('input', (e) => {
                el.style.fontSize = e.target.value + 'px';
                inspectorFields.querySelector('#prop-fsize').nextElementSibling.textContent = e.target.value + 'px';
                syncVisualToCode();
            });

            colorInput.addEventListener('input', (e) => {
                el.style.color = e.target.value;
                syncVisualToCode();
            });

            bgInput.addEventListener('input', (e) => {
                el.style.backgroundColor = e.target.value;
                syncVisualToCode();
            });

            paddingInput.addEventListener('input', (e) => {
                el.style.padding = e.target.value + 'px';
                inspectorFields.querySelector('#prop-padding').nextElementSibling.textContent = e.target.value + 'px';
                syncVisualToCode();
            });

            radiusInput.addEventListener('input', (e) => {
                el.style.borderRadius = e.target.value + 'px';
                inspectorFields.querySelector('#prop-radius').nextElementSibling.textContent = e.target.value + 'px';
                syncVisualToCode();
            });

            deleteBtn.addEventListener('click', () => {
                el.remove();
                inspectorFields.innerHTML = `<div class="le-inspector-empty">Select any element in the canvas to adjust visual properties.</div>`;
                activeSelectedEl = null;
                syncVisualToCode();
            });
        }

        /* -- Bidirectional Sync (Visual Canvas -> Code Editor) -- */
        function syncVisualToCode() {
            if (lang === 'html') {
                // Clone visual element to remove selection highlights before code parsing
                const clone = designCanvas.cloneNode(true);
                clone.querySelectorAll('.selected').forEach(x => x.classList.remove('selected'));
                const cleanedHtml = clone.innerHTML.trim();

                // Reconstruct clean HTML template
                const currentCode = textarea.value;
                if (currentCode.includes('<body>')) {
                    textarea.value = currentCode.replace(/<body>([\s\S]*?)<\/body>/i, `<body>\n  ${cleanedHtml}\n</body>`);
                } else {
                    textarea.value = cleanedHtml;
                }
            } else if (lang === 'css') {
                // Regenerate pristine CSS from styles of selected elements
                let rules = [];
                const wrap = designCanvas.querySelector('.visual-css-wrap');
                const card = designCanvas.querySelector('.card');
                const h1 = designCanvas.querySelector('h1');
                const p = designCanvas.querySelector('p');

                if (wrap && wrap.style.backgroundColor) {
                    rules.push(`body {\n  background: ${wrap.style.backgroundColor};\n}`);
                }
                if (card) {
                    let cardRules = [];
                    if (card.style.backgroundColor) cardRules.push(`  background: ${card.style.backgroundColor};`);
                    if (card.style.padding) cardRules.push(`  padding: ${card.style.padding};`);
                    if (card.style.borderRadius) cardRules.push(`  border-radius: ${card.style.borderRadius};`);
                    if (cardRules.length > 0) {
                        rules.push(`.card {\n${cardRules.join('\n')}\n}`);
                    }
                }
                if (h1) {
                    let h1Rules = [];
                    if (h1.style.color) h1Rules.push(`  color: ${h1.style.color};`);
                    if (h1.style.fontSize) h1Rules.push(`  font-size: ${h1.style.fontSize};`);
                    if (h1Rules.length > 0) {
                        rules.push(`h1 {\n${h1Rules.join('\n')}\n}`);
                    }
                }
                if (p) {
                    let pRules = [];
                    if (p.style.color) pRules.push(`  color: ${p.style.color};`);
                    if (p.style.fontSize) pRules.push(`  font-size: ${p.style.fontSize};`);
                    if (pRules.length > 0) {
                        rules.push(`p {\n${pRules.join('\n')}\n}`);
                    }
                }
                textarea.value = rules.join('\n\n');
                applyStylesToVisual(textarea.value);
            }
            applyHighlight(textarea.value);
            updatePreview(textarea.value);
        }

        /* -- Visual Palette (Add element events) -- */
        const paletteItems = root.querySelectorAll('.le-palette-item');
        paletteItems.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!designCanvas) return;
                const tool = btn.dataset.tool;
                let newEl;

                if (tool === 'h1') {
                    newEl = document.createElement('h1');
                    newEl.textContent = 'New Heading';
                } else if (tool === 'p') {
                    newEl = document.createElement('p');
                    newEl.textContent = 'Insert body paragraph text here.';
                } else if (tool === 'button') {
                    newEl = document.createElement('button');
                    newEl.className = 'btn';
                    newEl.textContent = 'Visual Button';
                } else if (tool === 'card') {
                    newEl = document.createElement('div');
                    newEl.className = 'card';
                    newEl.style.cssText = 'background:#1a1a1a; padding:15px; border-radius:10px; border:1px solid #333; margin-top:10px; color:#fff;';
                    newEl.innerHTML = `<h3>Container Card</h3><p>Editable elements container</p>`;
                }

                if (newEl) {
                    if (lang === 'css') {
                        // Apply CSS designer adding
                        const wrap = designCanvas.querySelector('.visual-css-wrap');
                        if (wrap) wrap.appendChild(newEl);
                    } else {
                        designCanvas.appendChild(newEl);
                    }
                    setupVisualInteractions();
                    newEl.click(); // Auto-select new item
                    syncVisualToCode();
                }
            });
        });

        /* -- RGB to Hex converter helper -- */
        function rgb2hex(rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
            const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (!rgbMatch) return '#ffffff';
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgbMatch[1]) + hex(rgbMatch[2]) + hex(rgbMatch[3]);
        }

        /* -- Code input listeners -- */
        let debounceTimer = null;

        function applyHighlight(text) {
            highlight.innerHTML = hlFn(text) + '\n';
        }

        function syncScroll() {
            highlight.scrollTop  = textarea.scrollTop;
            highlight.scrollLeft = textarea.scrollLeft;
        }

        function updatePreview(code) {
            if (isLive) {
                if (iframe) {
                    iframe.srcdoc = buildSrcdoc(code, lang);
                    statusEl.textContent = '● live ready';
                    statusEl.className   = 'le-run-status ok';
                }
            } else {
                if (simOutput) {
                    const result = simEval(code, lang);
                    simOutput.innerHTML =
                        `<span class="le-sim-prompt">$ run ${lang === 'nodejs' ? 'node' : lang}</span>\n` +
                        result;
                    statusEl.textContent = '● simulation';
                    statusEl.className   = 'le-run-status ok';
                }
            }
        }

        function onInput() {
            const code = textarea.value;
            applyHighlight(code);
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => updatePreview(code), 350);
        }

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end   = textarea.selectionEnd;
                textarea.value = textarea.value.slice(0, start) + '    ' + textarea.value.slice(end);
                textarea.selectionStart = textarea.selectionEnd = start + 4;
                onInput();
            }
        });

        textarea.addEventListener('input', onInput);
        textarea.addEventListener('scroll', syncScroll);

        runBtn.addEventListener('click', () => {
            updatePreview(textarea.value);
        });

        snippetBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.snippetIdx, 10);
                if (snippets[idx]) {
                    textarea.value = snippets[idx].code;
                    onInput();
                    updatePreview(textarea.value);
                    textarea.focus();
                }
            });
        });

        /* -- Initial load -- */
        textarea.value = defaultCode;
        applyHighlight(defaultCode);
        setTimeout(() => updatePreview(defaultCode), 100);
    }

    /* ================================================================
     * Auto-init
     * ================================================================ */

    function init() {
        const root = document.getElementById('live-editor-root');
        if (!root) return;
        const lang = (root.dataset.lang || 'html').toLowerCase();
        buildEditor(root, lang);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ================================================================
     * Also render the CLI section banner in the sidebar list
     * Hooks into the TerminalEngine after it mounts
     * ================================================================ */

    function initCliSectionBanner() {
        // Wait for terminal engine to render the list
        const tid = setInterval(() => {
            const engine = window._terminalEngine;
            if (!engine) return;
            clearInterval(tid);

            const cfg = window.commandHubConfig;
            if (!cfg || !Array.isArray(cfg.commands)) return;

            const cliCmds = cfg.commands.filter(c => c.cliSection);
            if (cliCmds.length === 0) return;

            const list = document.getElementById('command-list');
            if (!list) return;

            // Insert a divider before CLI commands
            const divider = document.createElement('li');
            divider.style.cssText = 'padding:10px 15px 4px;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:#555;font-weight:600;border-top:1px solid #1e1e1e;margin-top:4px;';
            divider.textContent = '⚡ Bash / CLI Integration';
            divider.setAttribute('role', 'separator');
            list.appendChild(divider);

            // Render CLI section commands
            cliCmds.forEach(cmd => {
                const li = document.createElement('li');
                li.className = 'command-item';
                const snippet = (cmd.non_technical_desc || '').substring(0, 52);
                li.innerHTML = `<strong>${cmd.command.split(' ').slice(0, 3).join(' ')}</strong> - ${snippet}...`;
                li.style.borderLeft = '2px solid rgba(139,92,246,0.5)';
                li.addEventListener('click', () => engine.selectCommand(cmd));
                list.appendChild(li);
            });
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCliSectionBanner);
    } else {
        initCliSectionBanner();
    }

})();
