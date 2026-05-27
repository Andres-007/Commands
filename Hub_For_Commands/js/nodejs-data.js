const nodejsCommandsData = [
    // ── Core Node / npm commands ─────────────────────────────────────
    { id: "node-version",    command: "node --version",             keywords: ["runtime"],        technical_desc: "Prints Node semver.",                                 non_technical_desc: "Shows installed Node.js version.",              example: "node --version",             sim_output: "v22.2.0" },
    { id: "npm-init",        command: "npm init -y",                keywords: ["package.json"],   technical_desc: "Creates package.json with defaults.",                 non_technical_desc: "Starts a Node project quickly.",                example: "npm init -y",                sim_output: "Wrote to package.json:\n{ \"name\": \"hub\", ... }" },
    { id: "npm-install",     command: "npm install <pkg>",          keywords: ["dependencies"],   technical_desc: "Installs packages updating package-lock.",            non_technical_desc: "Adds libraries your project needs.",            example: "npm install express",        sim_output: "added 57 packages in 8s" },
    { id: "npm-ci",          command: "npm ci",                     keywords: ["ci cd"],          technical_desc: "Clean install from lockfile.",                        non_technical_desc: "Installs exact versions on CI servers.",        example: "npm ci",                     sim_output: "added 312 packages in 25s" },
    { id: "npm-run",         command: "npm run <script>",           keywords: ["scripts"],        technical_desc: "Runs lifecycle scripts defined in package.json.",      non_technical_desc: "Runs commands like build or test.",             example: "npm run build",              sim_output: "> hub@1.0.0 build\n> vite build\nvite v5.x building for production...\ndist/index.html" },
    { id: "npm-test",        command: "npm test",                   keywords: ["jest"],           technical_desc: "Runs test script hook.",                              non_technical_desc: "Runs your project tests.",                     example: "npm test",                   sim_output: "PASS src/App.test.tsx\nTests: 3 passed" },
    { id: "npm-publish",     command: "npm publish",                keywords: ["registry"],       technical_desc: "Publishes tarball to configured registry.",            non_technical_desc: "Uploads your package to npm.",                 example: "npm publish --access public", sim_output: "+ my-lib@1.0.0" },
    { id: "npm-outdated",    command: "npm outdated",               keywords: ["upgrade"],        technical_desc: "Compares wanted/latest ranges.",                      non_technical_desc: "Shows packages that can update.",              example: "npm outdated",               sim_output: "Package  Current  Wanted  Latest\nlodash   4.17.19  4.17.21  4.17.21" },
    { id: "npx",             command: "npx <pkg>",                  keywords: ["run binary"],     technical_desc: "Downloads ephemeral package and executes bin.",        non_technical_desc: "Runs a CLI without global install.",           example: "npx eslint src/",            sim_output: "✖ 0 problems (0 errors, 0 warnings)" },
    { id: "node-inspect",    command: "node --inspect app.js",      keywords: ["debugger"],       technical_desc: "Opens inspector websocket.",                          non_technical_desc: "Lets Chrome DevTools debug Node.",             example: "node --inspect-brk app.js",  sim_output: "Debugger listening on ws://127.0.0.1:9229/..." },
    { id: "corepack-enable", command: "corepack enable",            keywords: ["pnpm yarn"],      technical_desc: "Activates package manager shims.",                    non_technical_desc: "Uses embedded Yarn/pnpm via Corepack.",        example: "corepack enable",            sim_output: "" },
    { id: "pnpm-install",    command: "pnpm install",               keywords: ["fast"],           technical_desc: "Hard-linked store install.",                          non_technical_desc: "Installs deps efficiently with pnpm.",         example: "pnpm install",               sim_output: "Packages: +210\nDone in 6.2s" },
    { id: "yarn-install",    command: "yarn",                       keywords: ["classic berry"],  technical_desc: "Install using Yarn resolution.",                      non_technical_desc: "Installs dependencies with Yarn.",             example: "yarn install",               sim_output: "➤ YN0000: Done in 5s 120ms" },
    { id: "npm-config-registry", command: "npm config get registry",keywords: ["mirror"],         technical_desc: "Reads npm config.",                                  non_technical_desc: "Shows which npm server you use.",              example: "npm config get registry",    sim_output: "https://registry.npmjs.org/" },

    // ── Bash / CLI Integration ────────────────────────────────────────
    { id: "node-cli-run-dev", command: "npm run dev", keywords: ["bash", "cli", "vite", "dev server"], cliSection: true,
      technical_desc: "Invokes the 'dev' script from package.json; typically starts Vite/webpack-dev-server with HMR.",
      non_technical_desc: "Starts your local development server with hot-reloading.",
      example: "npm run dev",
      sim_output: "  VITE v5.2.0  ready in 342 ms\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose" },

    { id: "node-cli-run-start", command: "npm start", keywords: ["bash", "cli", "production"], cliSection: true,
      technical_desc: "Runs the 'start' lifecycle script; conventionally node index.js or a pm2 entrypoint.",
      non_technical_desc: "Boots your Node.js app (usually for production).",
      example: "npm start",
      sim_output: "Server listening on port 3000" },

    { id: "node-cli-env", command: "NODE_ENV=production node app.js", keywords: ["bash", "env", "environment"], cliSection: true,
      technical_desc: "Inline env-var injection before the process; sets process.env.NODE_ENV in the spawned process.",
      non_technical_desc: "Runs Node.js in production mode by passing an env variable inline.",
      example: "NODE_ENV=production node app.js",
      sim_output: "Running in production\nListening on :8080" },

    { id: "node-cli-npx-create", command: "npx create-react-app my-app", keywords: ["bash", "scaffold", "react"], cliSection: true,
      technical_desc: "Downloads the create-react-app runner ephemerally and scaffolds a new CRA project.",
      non_technical_desc: "Creates a brand-new React project folder in one command.",
      example: "npx create-vite@latest my-app -- --template react",
      sim_output: "✔ Project name: my-app\nDone. Now run:\n  cd my-app\n  npm install\n  npm run dev" },
];
