const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

const router = express.Router();
//라우터 실습
const cookieParser = require('cookie-parser');

const expressSession = require('express-session');


//미들웨어 실습

process.env.PORT = 3000;

//app.use(express.static(__dirname+"/public"));
//아래와 같음
app.use(express.static("public"));
//안쓰면 디폴트값이/임
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
//session은 기본값을 넣어줘야함

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


const todoList = [
    { idx: 1, title: "hello", done: false },
    { idx: 2, title: "wolrd", done: false },
    { idx: 3, title: "node공부", done: false }
]
let seq = 4;

router.route("/house").get( function (req, res) {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write("<h1>서버실행중</h1>")
    res.end();
})

//로그인 처리하는 부분

router.route("/login").post( function (req,res) {
    //post 방식의 요청시에는 body에 파라미터가 담겨서 전송됨
    // let id = req.body.id
    // let passwd = req.body.passwd
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    console.log(req.body)
    if(req.session.user) {
        console.log("이미 로그인 되었다.");
        res.write("<h1>제품 상세 정보</h1>")
        res.write("로그아웃")
        res.end();
    } else {
        req.session.user = {
            id:req.body.id,
            name:"민재",
            ahuthorized:true
        }
    }
    res.write("<h1>"+req.session.user+"로그인 되엇네용</h1>")
    res.write("<a href='/process/product'> 페이지로 이동</a>")
    res.end();

    res.redirect("/");
})
// 제품 상세 페이지 - 로그인이 안되었으면 login 페이지로 이동
router.route("/process/product").get(function (req,res) {
    console.log("GET - /process/product 요청됨")
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    //세션에 유저가 있는지 확인
    if(req.session.user) {
        //session에 user 정보가 잇다. (로그인)
        res.end("<h1>제품 정보</h1>")
    } else {
        //로그아웃 상태
        res.redirect("/html/loginForm.html")
    }
})

router.route("/login/cookie").post( function (req,res) {
    //post 방식의 요청시에는 body에 파라미터가 담겨서 전송됨
    // let id = req.body.id
    // let passwd = req.body.passwd

    console.log(req.body)

    res.cookie("user",{
        id:req.body.id || req.query.id,
        password: req.body.passwd || req.query.passwd,
        name:"민재",
        ahuthorized:true
    })

    res.redirect("/");
})

router.route("/todoList").get( function (req, res) {
    req.app.render("todoList", { todoList }, function (err, data) {
        if(err) throw err;
        res.end(data);
    })
})




  app.use("/", router);
  
  var expressErrorHandler = require('express-error-handler');
  

  var errorHandler = expressErrorHandler({
      static : {
          '404':'./public/404.html'
      }
  });
  
  app.use(expressErrorHandler.httpError(404) );

  app.use(errorHandler );


  const server = http.createServer(app);
  server.listen(app.get("port"), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
  });