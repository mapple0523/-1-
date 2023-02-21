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

const clientSocketMap = {};

io.sockets.on("connection", function(socket) {
    console.log("소켓으로 접속 됨.");

    socket.on("login", function(data){
        data.socketId = socket.id;
        //데이터에 소켓아이디를 추가 데이터안에 소켓아이디는 존재하지않음.
        clientSocketMap[data.userId] = data;
        //배열에 키값을 만들고 데이터를 넣고
        //console.dir(clientSocketMap)
        //console.log(data)

    })
    
    socket.on("send", function(data) {
        if(data.receive == "All") {
            socket.broadcast.emit("send message", data);
            //io.sockets.emit("send messgae", data);
            // 나를 포함한 모든 클라이이언트에게 메시지가 전송된다. 
            //socket.boradcast.emit은 나를 제외한 다른 모든클라이언트들에게 전달된다.
            return;
        }

        let user01Socketid=clientSocketMap[data.receive].socketId
        //받는사람에 해당하는 receive즉 받는사람의 socketId를 찾아서
        let user01 = io.sockets.sockets.get(user01Socketid)
        //소켓 그 자체가 되어서 user01에 해당하는 소켓id를 찾음

        console.log(data)

        user01.emit("send message", data);
        //그 소켓에 해당하는 사람한테 데이터를 전송해준다.
    })



    socket.on("disconnect", function () {
        console.log("/chat 클라이언트 접속이 해제 됨.");
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


