const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

process.env.PORT = 3000;
//app.set("port",3000)
app.set("port", process.env.PORT || 3001);
app.set("views", __dirname + "/views"); //뷰 엔진이 들어있는 폴더
app.set("view engine", "ejs");

app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true }));
//bodyParsr 미들웨어 설정express의 설정으로 변경

//http와 express를 합쳐준다- 같은 port 사용

app.get("/house", function (req, res) {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write("<h1>서버실행중</h1>")
    res.end();
})

const carList = [
    { no: 1, title: "SONATA1", price: 2000, company: "HYUNDAI", year: 2022 },
    { no: 2, title: "SONATA2", price: 3000, company: "HYUNDAI1", year: 2022 },
    { no: 3, title: "SONATA3", price: 4000, company: "HYUNDAI2", year: 2022 },
    { no: 4, title: "SONATA4", price: 5000, company: "HYUNDAI3", year: 2022 }
]

const todoList = [
    { idx: 1, title: "hello", done: false },
    { idx: 2, title: "wolrd", done: false },
    { idx: 3, title: "node공부", done: false }
]


//ejs 템플릿 뷰 엔진 사용.
app.get("/car", function (req, res) {
    //req.app.render(뷰파일, data, function(콜백함수))
    let userName = "홍길동"
    req.app.render("car", { userName, carList }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data)
    });
})

app.get("/peo", function (req, res) {
    //app.get뒤의 링크와 뷰파일은 같을 필요가 없음.
    //req.app.render(뷰파일, data, function(콜백함수))
    req.app.render("people", {}, function (err, data) {
        res.end(data)
    });
})

app.get("/todoList", function (req, res) {
    req.app.render("todoList", { todoList }, function (err, data) {
        res.end(data);
    })
})

app.post("/todoList", function (req, res) {
    console.log("post")
    //저장후 목록갱신-다시 todoList로 보내주는것 - bodyParser미들웨어를 사용
    res.redirect("/todoList")
    // express.json(), express.urlencoded() 미들웨어로 설정해야함.
    let newItem = req.body.newItem;
    //todoList의 newItem을 가져오는것
    console.log(newItem)
})

const server = http.createServer(app);
server.listen(app.get('port'), function () {


})