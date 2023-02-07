const http = require('http');
const express = require('express');
const app= express();
const cors = require('cors');

//public(파일)을 외부에서 접속할수있도록 static 설정하는것
//크로스 오리진 문제 해결을 위해 cors를 설치해주는것
app.use(cors());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./template")
//ejs는 미들웨어라서 use가 아닌 set으로 사용함.

const saramList = [
            {"no":1, "name": "Saram", "email": "saram@saram.com", "phone": 1},
            {"no":2, "name": "Sara", "email": "sara@saram.com", "phone": 1},
            {"no":3, "name": "Sar", "email": "sar@saram.com", "phone": 1},
            {"no":4, "name": "S", "email": "s@saram.com", "phone": 1},
            {"no":5, "name": "abc", "email": "saram@saram.com", "phone": 1},
            {"no":6, "name": "abc", "email": "saram@saram.com", "phone": 1}
        ]


app.get("/saram/list", (req, res) => {
    res.send({saramList: saramList})
});


app.get("/", function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<h1>안녕하세요</h1>");
    res.write("<a href='/html/2_day05_01.html'>ex01</a>" );
    res.write("<br/><a href='/html/2_day05_02.html'>ex02</a>" );
    res.write("<br/><a href='/html/2_day05_03.html'>ex03</a>" );
    res.write("<br/><a href='/home'>home</a>" );
    res.end();
    //res.redirect("main.html")//다른페이지로 갱신시키는것
    //뒤의 링크 지정
})



app.get("/home", function (req,res) {
    // home.ejs 템플릿이 보여 지도록 함
    //뒤의 링크 지정
    //req.app.render(ejs파일명,데이터객체,콜백함수)
    var testArr = [
        {number:1, name:"홍길동", age:12},
        {number:2, name:"김길동", age:15},
        {number:3, name:"박길동", age:13},
        {number:4, name:"홍최길동", age:14}
    ];
    req.app.render("home", {testArr}, function(err,html) {
        if(err != null){
            console.log("오류발생!")
            res.end();
            //err != null은 에러가 있으면 실행
        } else {
            res.end(html);
        }
    });
});
//ejs에서 html파일을 만들어서 사용하는것
//err은 오류를 잡는것

const server = http.createServer(app);
app.listen(3000, function() {
    console.log("노드js 서버 실행 중 : 3000");
    //포트번호 지정
});

// nodejs 설치하면 npm이 같이 설치 된다.
// npm : 팩키지 매니저
// 자동으로 모듈을 설치하고 제거 하고 관리한다.
// npm install --save 모듈
// npm i -S 모듈
// --save : 현재 프로젝트에 저장. -S
// --svae-dev : 개발환경에서만 사용. -D
// -g : 글로벌 환경에 저장
// npm unintall -g 모듈
// npm list -g --depth=0
//  한번 열면 으로 닫아줘야함.
//  ejs에서 주석으로 <% %> 을 사용하면 오류가 발생함