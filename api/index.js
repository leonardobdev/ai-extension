try {
    let http = require("http");

    var API_KEY = "";
    var model = "gemma3:1b";
    var hostname = "127.0.0.1";
    var port = 11434;
    var path = `/api/generate`;
    var method = "POST";
    var headers = {
        "Content-Type": "application/json"
    };
    var request = (options, callback) => {
        let req = http.request(options, res => {
            let chunks = "";
            res.on("data", chunk => chunks += chunk);
            res.on("end", () => callback(null, chunks));
        })
        req.on("error", err => callback(err, null));
        req.end(JSON.stringify(options.body));
    };

    var server = http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        if (req.method == "OPTIONS") {
            res.writeHead(204, { "Content-Type": "text/plan" })
                .end("", "utf-8");
            return;
        }

        if (["POST"].includes(req.method) && req.url == "/api/generate") {
            let chunks = "";
            req.on("data", chunk => chunks += chunk.toString())
            req.on("end", () => {
                let body = JSON.parse(chunks);

                request({
                    hostname,
                    port,
                    path,
                    method,
                    headers,
                    body
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                        if (err.code === "ENOENT") {
                            res.writeHead(404, { "Content-Type": "text/plain" })
                                .end("404", "utf-8");
                        } else {
                            res.writeHead(500, { "Content-Type": "text/plain" })
                                .end("500", "utf-8");
                        }
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" })
                            .end(response, "utf-8");
                    }
                });
            })
        } else {
            console.log(err);
            res.writeHead(405, { "Content-Type": "text/plain" })
                .end("405", "utf-8");
        }
    });
    server.listen(11435, hostname, () => console.log(`http://${hostname}:11435/`));
} catch (err) {
    console.log(err);
}