const http = require('http');

const server = http.createServer(function(req, res) {
    res.end("<h1>Hello Nodejs world")
});

server.listen(2200, function(){
    console.log("nodejs 서버 실행중...");
});
// console.log("Hello node.js World!")


  