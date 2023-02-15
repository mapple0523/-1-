const http = require("http")
const fs = require("fs");
const url = require("url");

const server = http.createServer() ;

    server.listen(3000, function () {
        console.log("node.js 서버 실행중중")
    });

    server.on("request", function (req, res) {
        let data = fs.readFileSync("./package.json", "utf8")
        //ㅇ
        console.log(data)

        res.end(data)

    });

