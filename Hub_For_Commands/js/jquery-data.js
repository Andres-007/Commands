const jqueryCommandsData = [
    { id: "jq-npm-install", command: "npm install jquery", keywords: ["cdn alternative"], technical_desc: "Adds jquery package for bundlers.", non_technical_desc: "Installs jQuery locally.", example: "npm install jquery", sim_output: "added 1 package" },
    { id: "jq-bundle-webpack", command: "npm run build", keywords: ["legacy bundle"], technical_desc: "ProvidePlugin injects global $.", non_technical_desc: "Classic pattern for jQuery globals with webpack.", example: "npm run build", sim_output: "chunk vendors.js [jquery]" },
    { id: "jq-eslint-globals", command: "/* global $ */", keywords: ["lint"], technical_desc: "ESLint env/browser globals.", non_technical_desc: "Tell ESLint about `$`.", example: "/* global $, jQuery */", sim_output: "(no console output)" },
    { id: "jq-migrate", command: "npm install jquery-migrate", keywords: ["upgrade"], technical_desc: "Logs deprecated APIs.", non_technical_desc: "Helps upgrading old jQuery code.", example: "npm install jquery-migrate", sim_output: "added jquery-migrate" },
];
