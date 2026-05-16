const nginxCommandsData = [
    { id: "ngx-version", command: "nginx -v", keywords: ["version"], technical_desc: "Prints nginx version.", non_technical_desc: "Shows nginx version.", example: "nginx -v", sim_output: "nginx version: nginx/1.24.0" },
    { id: "ngx-test", command: "nginx -t", keywords: ["config"], technical_desc: "Validates configuration.", non_technical_desc: "Checks nginx.conf syntax.", example: "sudo nginx -t", sim_output: "nginx: configuration file /etc/nginx/nginx.conf test is successful" },
    { id: "ngx-reload", command: "nginx -s reload", keywords: ["hot reload"], technical_desc: "Reloads master process.", non_technical_desc: "Reloads config gracefully.", example: "sudo nginx -s reload", sim_output: "" },
    { id: "ngx-stop", command: "nginx -s quit", keywords: ["shutdown"], technical_desc: "Graceful shutdown.", non_technical_desc: "Stops nginx politely.", example: "sudo nginx -s quit", sim_output: "" },
    { id: "ngx-access-log", command: "tail -f /var/log/nginx/access.log", keywords: ["logs bash"], technical_desc: "Typical bash monitoring.", non_technical_desc: "Watch requests live (bash).", example: "tail -n 50 /var/log/nginx/access.log", sim_output: "127.0.0.1 - - [15/May/2026:12:00:00 +0000] \"GET / HTTP/1.1\" 200" },
];
