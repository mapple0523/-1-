const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.end("<h1>Home page</h1")
});
app.get('/profile', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); //한국어로 불러오기
    res.end("<h1>프로필 페이지</h1")
});

app.get('/car', function (req, res) {
    // 쿼리스트링으로 전달된 파라미터 받아오기
    let name=req.query.name;
    let year=req.query.year;
    console.log(name,year);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); //한국어로 불러오기
    res.end("<h1>자동차 목록 페이지</h1")
    //res:받는것 req:요청하는것
})

// node index.js로 실행하면 소스 수정후 재실행 해야 적용
// nodemon. 모듈을 설치하고 nodemon으로 실행하면 수정후 바로 재실행 해줌

app.listen(3000, function(){
    console.log("서버실행중");
});