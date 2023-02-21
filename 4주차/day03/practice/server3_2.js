const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

const router = express.Router();
//라우터 실습

//미들웨어 실습

process.env.PORT = 3000;

//app.use(express.static(__dirname+"/public"));
//아래와 같음
app.use(express.static("public"));
//안쓰면 디폴트값이/임
app.set("port", process.env.PORT || 3001);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

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
    let id = req.body.id
    let passwd = req.body.passwd

    console.log(id,passwd)
    res.redirect("/");
})

router.route("/todoList").get( function (req, res) {
    req.app.render("todoList", { todoList }, function (err, data) {
        if(err) throw err;
        res.end(data);
    })
})

router.route("/json/todoList").get( function (req, res) {
    //res.end-문자열만
    //res.send--수식 이나 객체만
    res.send({todoList});

    
})

router.route("/todoList").post( function (req, res) {
    console.log("post")
    res.redirect("/todoList")
    let newItem = req.body.newItem;
    //바디에 있는 newItem을 받아오는것
    todoList.push({idx: seq++, title:newItem, done:false})
    console.log(newItem)
})

router.route("/todoList/update").get( function(req,res) {
    let idx= req.query.idx-1;
    //여기서는 1부터 시작이니까 0부터 사용
    let title= req.query.title;

    // let index = todoList.findIndex(function(item, index) {
    //     return item.idx==idx;
    // })

    todoList[idx].title=title;

    res.redirect("/todoList")
})

router.route("/todoList/delete").get( function(req,res) {
    let idx=req.query.idx;

    console.log(idx);

    res.redirect("/todoList")

    let index = todoList.findIndex(function(item, index) {
        return item.index==idx;
    })

    todoList.splice(index, 1)
})




// router로 REST 방식의 요청 처리 테스트
// get() = select, post() = insert, put() = update, delete() = delete
// router로 REST 방식의 요청 처리 테스트
// get() = select, post() = insert, put() = update, delete() = delete
router.route("/board").post((req, res) => {
  console.log("POST - /board");
  res.redirect("/");
});
router.route("/board/:user/:job").post((req, res) => {
  console.log("POST - /board/:user/:job");
  console.log(req.params);
  console.log(req.params.user, req.params.job);
  let paramObj = req.params;
  res.send({paramObj}); // JSON
});
router.route("/board").put((req, res) => {
  console.log("PUT - /board");
  let data = req.body;
  res.send({data});
});
router.route("/board").delete((req, res) => {
  console.log("DELETE - /board");
  let data = req.body;
  res.send({data});
});
router.route("/board").get((req, res) => {
  console.log("GET - /board");
  console.log("req.method => ", req.method);
  res.redirect("/");
});
//form은 put하고 delete명령이 없음.



  // 2) router미들웨어 설정
  app.use("/", router);
  
  // ERROR 페이지 설정 -  router 미들웨어 설정 아래에 위치해야 한다.
  // app.all("*", (req, res) => {
  //   res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
  //   res.status(404).end("<h1>Error! 페이지가 없습니다!</h1>");
  //   //res.status(404).redirect('/404.html');
  // });
  
  //오류 핸들러 모듈 사용
  var expressErrorHandler = require('express-error-handler');
  
  //모든 라우터 처리 후 404 오류 페이지 처리
  var errorHandler = expressErrorHandler({
      static : {
          '404':'./public/404.html'
      }
  });
  
  app.use(expressErrorHandler.httpError(404) );
  //오류가 나면 404를 실행한다.
  app.use(errorHandler );
  //미들웨어에서 errorHandler사용
  
  // 서버 실행
  const server = http.createServer(app);
  server.listen(app.get("port"), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
  });