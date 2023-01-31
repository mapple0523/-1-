const express = require('express');
const app= express();

//public(파일)을 외부에서 접속할수있도록 static 설정하는것
app.use(express.static('public'));

const carList = [];//const는 상수
let cnt=1;

app.get('/car/input', function(req, res){
    // // let name = req.query.name;
    // // let price = req.query.price;
    // // let company = req.query.company;
    // // let year = req.query.year;

    // console.log(name,price,company,year)
    
    // res.end(`${name},${price},${company},${year}`);

    // console.log(req.query);
    // res.send();
    // res.end or red.writter or res.send
    // res.send는 객체를 리턴해주는것
    // res.end() 문자열 사용

    req.query.no=1
    carList.push(req.query);

    res.send(carList);
})

app.listen(3000, function() {
    console.log("노드js 서버 실행 중 : 3000");
});