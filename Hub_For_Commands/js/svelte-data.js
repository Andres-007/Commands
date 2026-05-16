const svelteCommandsData = [
    { id: "sv-create", command: "npm create svelte@latest", keywords: ["kit scaffold"], technical_desc: "Bootstraps SvelteKit/Vite options.", non_technical_desc: "Creates a Svelte project.", example: "npm create svelte@latest my-app", sim_output: "✔ Project created\r\nnpm install && npm run dev -- --open" },
    { id: "sv-dev", command: "npm run dev", keywords: ["vite"], technical_desc: "Runs dev server.", non_technical_desc: "Starts local dev.", example: "npm run dev", sim_output: "  ➜ Local: http://localhost:5173/" },
    { id: "sv-build", command: "npm run build", keywords: ["adapter"], technical_desc: "Builds SSR/edge bundles per adapter.", non_technical_desc: "Creates production build.", example: "npm run build", sim_output: "✓ built in 6.02s\n.svelte-kit/output" },
    { id: "sv-preview", command: "npm run preview", keywords: ["serve"], technical_desc: "Runs preview server against build.", non_technical_desc: "Tests production output.", example: "npm run preview", sim_output: "Listening on http://localhost:4173" },
    { id: "sv-check", command: "npm run check", keywords: ["types"], technical_desc: "Runs svelte-check.", non_technical_desc: "Validates components/types.", example: "npm run check", sim_output: "svelte-check found 0 errors and 0 warnings" },
];
