const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

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

app.get("/house", function (req, res) {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write("<h1>서버실행중</h1>")
    res.end();
})

app.get("/todoList", function (req, res) {
    req.app.render("todoList", { todoList }, function (err, data) {
        if(err) throw err;
        res.end(data);
    })
})

app.get("/json/todoList", function (req, res) {
    //res.end-문자열만
    //res.send--수식 이나 객체만
    res.send({todoList});

    
})

app.post("/todoList", function (req, res) {
    console.log("post")
    res.redirect("/todoList")
    let newItem = req.body.newItem;
    //바디에 있는 newItem을 받아오는것
    todoList.push({idx: seq++, title:newItem, done:false})
    console.log(newItem)
})

app.get("/todoList/update", function(req,res) {
    let idx= req.query.idx-1;
    //여기서는 1부터 시작이니까 0부터 사용
    let title= req.query.title;

    // let index = todoList.findIndex(function(item, index) {
    //     return item.idx==idx;
    // })

    todoList[idx].title=title;

    res.redirect("/todoList")
})

app.get("/todoList/delete", function(req,res) {
    let idx=req.query.idx;

    console.log(idx);

    res.redirect("/todoList")

    let index = todoList.findIndex(function(item, index) {
        return item.index==idx;
    })

    todoList.splice(index, 1)
})

const server = http.createServer(app);
server.listen(app.get('port'), function () {


})