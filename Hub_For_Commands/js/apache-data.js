const apacheCommandsData = [
    { id: "httpd-version", command: "httpd -v", keywords: ["apache"], technical_desc: "Prints Apache version.", non_technical_desc: "Shows Apache version.", example: "httpd -v", sim_output: "Server version: Apache/2.4.58 (Unix)" },
    { id: "apachectl-configtest", command: "apachectl configtest", keywords: ["syntax"], technical_desc: "Parses httpd.conf.", non_technical_desc: "Checks config valid.", example: "apachectl configtest", sim_output: "Syntax OK" },
    { id: "apachectl-graceful", command: "apachectl graceful", keywords: ["reload"], technical_desc: "SIGUSR1 graceful restart.", non_technical_desc: "Reloads config without dropping connections.", example: "sudo apachectl graceful", sim_output: "" },
    { id: "apachectl-restart", command: "apachectl restart", keywords: ["bounce"], technical_desc: "Stop/start workers.", non_technical_desc: "Restarts Apache.", example: "sudo apachectl restart", sim_output: "" },
    { id: "htpasswd", command: "htpasswd -c .htpasswd user", keywords: ["basic auth"], technical_desc: "Creates htpasswd file.", non_technical_desc: "Adds password user.", example: "htpasswd -c /etc/httpd/.htpasswd alice", sim_output: "New password:\nRe-type new password:\nAdding password for user alice" },
];
