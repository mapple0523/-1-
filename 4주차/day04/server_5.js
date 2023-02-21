const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const fs = require('fs');
const multer = require('multer');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

process.env.PORT = 3000;
//채팅 실습(nodejs,ajax)

app.use(express.static("public"));
app.use(express.static("uploads"));
app.set("port", process.env.PORT || 3001);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(cors());
app.use(cookieParser());
app.use(expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let responseData = {};
let cnt = 0;


var messages = [];
app.get("/recieve", function (req, resp) {
    if (req.query.size >= messages.length) {
        //리시브 옆에 사이즈를 넣어서 전달해줫으므로 사이즈의 값을 받아올수있음.
        resp.end();
    } else {
        var res = {
            total: messages.length,
            messages: messages.slice(req.query.size)
        }
        resp.end(JSON.stringify(res));
        //만약 사이즈가 크거나 같으면 전부다 나왔거나 전송을 한거기떄문에 바로 end를하고
        //아니면은 메세지의 길이만큼 확인을해서 메세지의 몇번째만잘라서
        //그걸 보여줌
    }
});
app.get("/send", function (req, resp) {
    messages.push({
        sender: req.query.sender,
        message: req.query.message
        //send에 sender와 message의 값을 넣어서 보내줫으므로 둘다 읽을수있음.
    });
    resp.end()
});




router.route("/house").get(function (req, res) {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write("<h1>서버실행중</h1>")
    res.end();
})

io.sockets.on("connection", function (socket) {
    console.log("소켓으로 접속 됨.");
    //console.dir(socket);
    socket.emit("123", "hello world!");
    //emit하고 html의 on부분하고 값이 같으면 저걸 띄워주는형식
    socket.on("123", function (data) {
        console.log("client : ", data);
    })
    //접속 된 모든 소켓에 메세지 전달
    io.sockets.emit("this", { will: "be recevied by everyone" });

    socket.on("private message", (from, msg) => {
        console.log("from: " + from, ", msg: " + msg);
        //socketio_chat에서 전달된 값 두개를 from과 msg에 넣어서
        //log에 찍어서 보여주는것(서버측)
    });


});



app.use("/", router);


var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


server.listen(app.get("port"), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});


