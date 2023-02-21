const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const fs = require('fs');
const multer = require('multer');
process.env.PORT = 3000;
//multer 예제(파일 업로드)

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

//post 전송 방식을 사용하기 때문에 bodyParser가 먼저 선언되어야함.
let stroage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "uploads")
        //도착점을 uploads로 하였음
        //뒤에는 도착할 폴더이름을 나타내는것이라 무엇으로하던 상관이없음
        //처음에 null을 넣어주는이유: 첫번째 인자가 오류가 없어서 null을 넣어줌
    }, filename: function(req, file, callback) {
        callback(null, Date.now() + "_" +file.originalname ); //중복을 막기위해서 날짜를 넣어줌
        //날짜를 뒤에두니 확장자도 앞으로가서 파일을 읽지를 못하였음.
    }
});
//파일 제한: 10개 1G 이하로 제한하기
let upload = multer({
    storage: stroage,
    limit:{
    files: 10,
    fileSize: 1024*1024*1024
    }
    //파일 10개의 크기를 기가로 제한하겟다.
})

router.route("/process/photo").post(upload.array("photo",1), function(req, res){
    console.log("post-/process/photo 호출")
    console.log(req.files)
    res.end();
})

router.route("/house").get(function (req, res) {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write("<h1>서버실행중</h1>")
    res.end();
})

app.use("/", router);
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});