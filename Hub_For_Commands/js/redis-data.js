const redisCommandsData = [
    { id: "rd-cli", command: "redis-cli -u redis://localhost:6379", keywords: ["connect"], technical_desc: "RESP protocol CLI.", non_technical_desc: "Opens Redis CLI.", example: "redis-cli", sim_output: "127.0.0.1:6379>" },
    { id: "rd-ping", command: "PING", keywords: ["health"], technical_desc: "Latency check.", non_technical_desc: "Checks server responds.", example: "PING", sim_output: "PONG" },
    { id: "rd-set", command: "SET key value", keywords: ["string"], technical_desc: "Sets string key.", non_technical_desc: "Stores a value.", example: "SET session:abc \"{\"uid\":1}\"", sim_output: "OK" },
    { id: "rd-get", command: "GET key", keywords: ["string"], technical_desc: "Gets string key.", non_technical_desc: "Reads a value.", example: "GET session:abc", sim_output: "{\"uid\":1}" },
    { id: "rd-del", command: "DEL key", keywords: ["delete"], technical_desc: "Deletes keys.", non_technical_desc: "Removes keys.", example: "DEL cache:users", sim_output: "(integer) 1" },
    { id: "rd-expire", command: "EXPIRE key 3600", keywords: ["ttl"], technical_desc: "Sets TTL seconds.", non_technical_desc: "Auto-delete after time.", example: "EXPIRE session:abc 3600", sim_output: "(integer) 1" },
    { id: "rd-hset", command: "HSET user:1 name Ana", keywords: ["hash"], technical_desc: "Hash field set.", non_technical_desc: "Stores object fields.", example: "HSET user:1 email ana@example.com", sim_output: "(integer) 1" },
    { id: "rd-hgetall", command: "HGETALL user:1", keywords: ["hash"], technical_desc: "Returns hash.", non_technical_desc: "Reads all fields.", example: "HGETALL user:1", sim_output: "1) \"email\"\n2) \"ana@example.com\"" },
    { id: "rd-lpush", command: "LPUSH jobs compile", keywords: ["list"], technical_desc: "Push list head.", non_technical_desc: "Adds to queue.", example: "LPUSH jobs \"task-42\"", sim_output: "(integer) 3" },
    { id: "rd-brpop", command: "BRPOP jobs 5", keywords: ["queue"], technical_desc: "Blocking pop.", non_technical_desc: "Waits for queue item.", example: "BRPOP jobs 5", sim_output: "1) \"jobs\"\n2) \"task-42\"" },
    { id: "rd-info", command: "INFO memory", keywords: ["metrics"], technical_desc: "Server sections.", non_technical_desc: "Shows memory stats.", example: "INFO memory", sim_output: "used_memory_human:512M\n..." },
    { id: "rd-flushdb", command: "FLUSHDB", keywords: ["danger"], technical_desc: "Clears current DB.", non_technical_desc: "Deletes all keys in DB.", example: "FLUSHDB", sim_output: "OK" },
];
