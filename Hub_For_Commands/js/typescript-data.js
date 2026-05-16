const typescriptCommandsData = [
    { id: "ts-version", command: "tsc --version", keywords: ["compiler"], technical_desc: "Prints TypeScript compiler version.", non_technical_desc: "Checks installed TypeScript.", example: "tsc --version", sim_output: "Version 5.4.5" },
    { id: "ts-init", command: "tsc --init", keywords: ["tsconfig"], technical_desc: "Writes tsconfig.json scaffold.", non_technical_desc: "Creates TypeScript config.", example: "tsc --init", sim_output: "Created tsconfig.json" },
    { id: "ts-compile", command: "tsc", keywords: ["build"], technical_desc: "Compiles project per tsconfig.", non_technical_desc: "Turns TS into JS files.", example: "tsc -p .", sim_output: "" },
    { id: "ts-noEmit", command: "tsc --noEmit", keywords: ["ci"], technical_desc: "Typecheck only.", non_technical_desc: "Checks types without writing files.", example: "tsc --noEmit", sim_output: "" },
    { id: "ts-watch", command: "tsc --watch", keywords: ["watch"], technical_desc: "Incremental watch mode.", non_technical_desc: "Rebuilds on save.", example: "tsc --watch", sim_output: "[12:01:02 AM] Starting compilation in watch mode...\n[12:01:03 AM] Found 0 errors." },
    { id: "ts-node", command: "ts-node src/main.ts", keywords: ["runtime"], technical_desc: "Runs TS via transpile hooks.", non_technical_desc: "Runs TypeScript directly.", example: "ts-node src/main.ts", sim_output: "Server listening on 4000" },
    { id: "tsx-run", command: "npx tsx watch src/index.ts", keywords: ["esbuild"], technical_desc: "esbuild-powered TS runner.", non_technical_desc: "Fast TS execution alternative.", example: "npx tsx src/index.ts", sim_output: "done" },
];
