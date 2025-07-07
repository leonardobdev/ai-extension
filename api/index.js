try {
    let http = require("http");

    var API_KEY = "";
    var model = "gemma3:4b";
    var hostname = "127.0.0.1";
    var port = 11434;
    var path = `/api/generate`;
    var method = "POST";
    var headers = {
        "Content-Type": "application/json"
    };

    var server = http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Private-Network", "true");
        if (req.method == "OPTIONS") {
            res.writeHead(204, { "Content-Type": "text/plan" })
                .end("", "utf-8");
            return;
        }

        if (["POST"].includes(req.method.toLocaleUpperCase()) && ["/api/generate"].includes(req.url)) {
            let chunks = "";
            req.on("data", chunk => chunks += chunk.toString())
            req.on("end", () => {
                let body = JSON.parse(chunks);

                let request = http.request({
                    hostname,
                    port,
                    path,
                    method,
                    headers,
                }, response => {
                    let chunks = "";
                    response.on("data", chunk => chunks += chunk);
                    response.on("end", () => {
                        let result = chunks;
                        res.writeHead(200, { "Content-Type": "application/json" })
                            .end(result, "utf-8");
                    });
                })
                request.on("error", err => {
                    if (err.code === "ENOENT") {
                        res.writeHead(404, { "Content-Type": "text/plain" })
                            .end("404", "utf-8");
                    } else {
                        res.writeHead(500, { "Content-Type": "text/plain" })
                            .end("500", "utf-8");
                    }
                });
                request.end(JSON.stringify(body));
            })
        } else {
            res.writeHead(405, { "Content-Type": "text/plain" })
                .end("405", "utf-8");
        }
    });
    server.listen(11435, "127.0.0.1", () => console.log(`http://${hostname}:11435/`));
} catch (err) {
    console.log(err);
}