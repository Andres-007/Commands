const javascriptCommandsData = [
    { id: "js-node-eval", command: "node -e \"console.log(1+1)\"", keywords: ["snippet"], technical_desc: "Evaluates script via -e flag.", non_technical_desc: "Runs tiny JS one-liners.", example: "node -e \"console.log('hi')\"", sim_output: "hi" },
    { id: "js-node-file", command: "node app.js", keywords: ["run script"], technical_desc: "Executes CommonJS/ESM entry.", non_technical_desc: "Runs a JavaScript file.", example: "node server.js", sim_output: "Listening on :3000" },
    { id: "js-eslint", command: "npx eslint .", keywords: ["lint"], technical_desc: "AST lint rules.", non_technical_desc: "Checks JS style/errors.", example: "npx eslint src/", sim_output: "✖ 0 problems" },
    { id: "js-prettier", command: "npx prettier -w .", keywords: ["format"], technical_desc: "Formats with prettier printer.", non_technical_desc: "Formats JS/HTML/CSS consistently.", example: "npx prettier -w \"src/**/*.js\"", sim_output: "src/app.js 45ms" },
    { id: "js-jest", command: "npx jest", keywords: ["tests"], technical_desc: "Runs Jest runner.", non_technical_desc: "Runs JavaScript tests.", example: "npx jest --coverage", sim_output: "Tests: 10 passed" },
    { id: "js-webpack", command: "npx webpack", keywords: ["bundle"], technical_desc: "Webpack CLI build.", non_technical_desc: "Bundles legacy JS apps.", example: "npx webpack --mode production", sim_output: "asset bundle.js 420 KiB\nwebpack compiled successfully" },
    { id: "js-rollup", command: "npx rollup -c", keywords: ["library"], technical_desc: "Rollup bundler for libraries.", non_technical_desc: "Builds libraries efficiently.", example: "npx rollup -c", sim_output: "created dist/index.js in 1.2s" },
];
