const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

//미들웨어 실습

process.env.PORT = 3000;

app.set("port", process.env.PORT || 3001);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//사용자 정의 미들웨어- filter 역할
app.use(function(req, res, next) {
    res.writeHead(200, {"Content-type":"text/html; charset=utf-8"})

    console.log("request url:",req.url)
    
    //미들 웨어 실행후 다음 기능 호출
    //next() 호출 이전 - request 필터
    next();
    //next() 호출 이후- response 필터
    console.log(">>> 미들웨어 1")
})

app.use("*", function(req, res, next) {
    console.log("123")

    console.log("request url:",req.query.name)
    
    //미들 웨어 실행후 다음 기능 호출
    //next() 호출 이전 - request 필터
    next();
    //next() 호출 이후- response 필터
    console.log(">>> 미들웨어 123")
    //스택같이 처리됨 먼저위에서 호출하였으니 아래가 실행이되고 위로가서 그다음 로그가 실행이됨
})



const todoList = [
    { idx: 1, title: "hello", done: false },
    { idx: 2, title: "wolrd", done: false },
    { idx: 3, title: "node공부", done: false }
]

app.get("/todoList", function (req, res) {
    req.app.render("todoList", { todoList }, function (err, data) {
        res.end(data);
    })
})

app.post("/todoList", function (req, res) {
    console.log("post")
    res.redirect("/todoList")
    let newItem = req.body.newItem;
    console.log(newItem)
})

const server = http.createServer(app);
server.listen(app.get('port'), function () {


})