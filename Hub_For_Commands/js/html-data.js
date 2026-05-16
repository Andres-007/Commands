const htmlCommandsData = [
    { id: "html-validator-w3c", command: "npx html-validator-cli index.html", keywords: ["lint markup"], technical_desc: "Uses W3C validator API wrapper.", non_technical_desc: "Checks HTML for structural errors.", example: "npx html-validator-cli dist/index.html", sim_output: "✔ Document validates according to chosen schema." },
    { id: "html-prettier", command: "npx prettier -w \"**/*.html\"", keywords: ["format"], technical_desc: "Formats HTML via Prettier printer.", non_technical_desc: "Pretty-prints HTML templates.", example: "npx prettier -w src/index.html", sim_output: "src/index.html 28ms" },
    { id: "html-tidy", command: "tidy -qe index.html", keywords: ["legacy"], technical_desc: "HTML Tidy repairs/markup warnings.", non_technical_desc: "Older CLI to clean messy HTML.", example: "tidy -qe page.html", sim_output: "No warnings or errors." },
    { id: "html-http-serve", command: "python -m http.server", keywords: ["preview"], technical_desc: "Serves static HTML folder.", non_technical_desc: "Opens HTML locally via HTTP.", example: "python -m http.server 8080", sim_output: "Serving HTTP on 0.0.0.0 port 8080" },
    { id: "html-open", command: "start index.html", keywords: ["windows open"], technical_desc: "OS opens default browser.", non_technical_desc: "Opens file in browser (Windows).", example: "start index.html", sim_output: "" },
];
