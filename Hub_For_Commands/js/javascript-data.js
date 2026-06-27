const javascriptCommandsData = [
    // ── Core JS tooling ───────────────────────────────────────────────
    { id: "js-node-repl",  command: "node",                        keywords: ["repl shell interactive"], technical_desc: "Opens interactive V8 engine REPL terminal.", non_technical_desc: "Opens interactive JS shell.", example: "node", sim_output: "Welcome to Node.js v22.2.0.\nType \".help\" for more information.\n>" },
    { id: "js-node-eval",  command: "node -e \"console.log(1+1)\"", keywords: ["snippet"],  technical_desc: "Evaluates script via -e flag.",          non_technical_desc: "Runs tiny JS one-liners.",          example: "node -e \"console.log('hi')\"",    sim_output: "hi" },
    { id: "js-node-file",  command: "node app.js",                 keywords: ["run script"],technical_desc: "Executes CommonJS/ESM entry.",           non_technical_desc: "Runs a JavaScript file.",           example: "node server.js",                   sim_output: "Listening on :3000" },
    { id: "js-eslint",     command: "npx eslint .",                keywords: ["lint"],      technical_desc: "AST lint rules.",                        non_technical_desc: "Checks JS style/errors.",           example: "npx eslint src/",                  sim_output: "✖ 0 problems" },
    { id: "js-prettier",   command: "npx prettier -w .",           keywords: ["format"],    technical_desc: "Formats with prettier printer.",         non_technical_desc: "Formats JS/HTML/CSS consistently.", example: "npx prettier -w \"src/**/*.js\"", sim_output: "src/app.js 45ms" },
    { id: "js-jest",       command: "npx jest",                    keywords: ["tests"],     technical_desc: "Runs Jest runner.",                      non_technical_desc: "Runs JavaScript tests.",            example: "npx jest --coverage",              sim_output: "Tests: 10 passed" },
    { id: "js-jest-watch", command: "npx jest --watch",           keywords: ["tests watch"], technical_desc: "Jest runner in file-watching live-reload mode.", non_technical_desc: "Runs tests continuously on save.", example: "npx jest --watch", sim_output: "No tests found related to files changed since last commit." },
    { id: "js-webpack",    command: "npx webpack",                 keywords: ["bundle"],    technical_desc: "Webpack CLI build.",                     non_technical_desc: "Bundles legacy JS apps.",           example: "npx webpack --mode production",    sim_output: "asset bundle.js 420 KiB\nwebpack compiled successfully" },
    { id: "js-rollup",     command: "npx rollup -c",               keywords: ["library"],   technical_desc: "Rollup bundler for libraries.",          non_technical_desc: "Builds libraries efficiently.",     example: "npx rollup -c",                    sim_output: "created dist/index.js in 1.2s" },

    // ── Bash / CLI Integration ────────────────────────────────────────
    { id: "js-cli-vite-dev", command: "npx vite", keywords: ["bash", "cli", "dev server", "vite"], cliSection: true,
      technical_desc: "Starts Vite's ESM-native dev server with instant HMR using native browser ES modules.",
      non_technical_desc: "Fires up a blazing-fast local dev server for modern JS projects.",
      example: "npx vite",
      sim_output: "  VITE v5.2.0  ready in 280 ms\n  ➜  Local:   http://localhost:5173/" },

    { id: "js-cli-vite-build", command: "npx vite build", keywords: ["bash", "vite build"], cliSection: true,
      technical_desc: "Bundles application code with Rollup for static asset hosting optimizations.",
      non_technical_desc: "Builds optimized static assets for production.",
      example: "npx vite build",
      sim_output: "vite v5.2.0 building for production...\ndist/index.html 0.45 kB\ndist/assets/index.js 142.12 kB" },

    { id: "js-cli-tsc", command: "npx tsc --watch", keywords: ["bash", "typescript", "compile"], cliSection: true,
      technical_desc: "Runs TypeScript compiler in watch mode, re-emitting on every save.",
      non_technical_desc: "Auto-compiles TypeScript files as you edit them.",
      example: "npx tsc --watch",
      sim_output: "[10:30:00] Starting compilation in watch mode...\n[10:30:01] Found 0 errors." },

    { id: "js-cli-ts-check", command: "npx tsc --noEmit --allowJs --checkJs", keywords: ["jsdoc typecheck typescript"], cliSection: true,
      technical_desc: "Runs TypeScript type checker against JS files parsing JSDoc declarations.",
      non_technical_desc: "Checks types in vanilla JS files using JSDoc comments.",
      example: "npx tsc --noEmit --allowJs --checkJs",
      sim_output: "Found 0 errors." },

    { id: "js-cli-npm-update", command: "npm update", keywords: ["npm packages update"], cliSection: true,
      technical_desc: "Updates all listed packages in package.json matching semver ranges.",
      non_technical_desc: "Updates packages within your project restrictions.",
      example: "npm update",
      sim_output: "upgraded 12 packages" },

    { id: "js-cli-http-server", command: "npx http-server . -p 8080", keywords: ["bash", "static", "serve"], cliSection: true,
      technical_desc: "Spawns a zero-config static file server via http-server package.",
      non_technical_desc: "Serves any folder as a local website instantly.",
      example: "npx http-server . -p 8080",
      sim_output: "Starting up http-server, serving .\nAvailable on:\n  http://127.0.0.1:8080" },
];
