const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const formidable = require('formidable');
const fs = require("fs");
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

app.set("port", 5000);
app.set("view engine", "ejs");
app.set("views", __dirname + "/template");

app.use(cors());
app.use(express.static(__dirname + "/public"));
// express의 bodyParser 미들웨어 설정 - POST요청 방식에서 파라미터를 받기 위해.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.write("<h1>Hello world</h1>");
    res.end();
});

app.get("/axios_get", (req, res) => {

    let urlVal = "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=105"
    axios.get(urlVal, {}, { withCredentials: true }).then((response) => {
        //res.send(response.data)
        //res.end()
        //뉴스에있는 모든 정보를 가져온것(크롤링)
        let htmlCMD = iconv.decode(response.data, "EUC-KR").toString();
        //utf-8이 아니라 현재는 깨져서 나옴.
        const $ = cheerio.load(htmlCMD)
        //cheerio로 로딩을하고 $으로 선언해서 jquery처럼 쓸수잇음.
        //div.list_body div.cluster
        let cluster = $("div.list_body div.cluster a")
        console.log(cluster)
        res.end()
    }, []);
})


var carList = [];
for (var i = 0; i < 10; i++) {
    carList.push({ no: i, name: "car name " + i, price: (1 + i) * 1000, year: 2008 + i, company: "company" + i });
}
let no = 10;
// GET 요청 처리 - SELECT 기능
app.get("/car", (req, res) => {
    console.log("GET - /car");
    res.send(carList);
});

// POST 요청 처리 - INSERT 기능
// post요청에서 파라미터를 받기위해서는 body-parser 미들웨어 필요.
// 테스트는 Post Man으로 하면 된다.
app.post("/car", (req, res) => {
    console.log("POST - /car");
    let carObj = req.body;
    carObj.no = no++;
    carList.push(carObj);
    res.send(carList);
});


app.post("/car/modify", function (req, res) {
    console.log("POST - /car/modify")
    carList.splice(req.body.index, 1, req.body)
    res.send(carList);
})

app.post("/car/delete", function (req, res) {
    console.log("POST - /car/delete")
    carList.splice(req.body.index, 1)
    res.send(carList);
})

app.post("/saram/input", (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(">>>>>> (1) ", fields);
    });

    form.on("end", function () {
        console.log(">>>>>> (2) ");
        console.log("파일 갯수 : ", this.openedFiles.length);
        for (var i = 0; i < this.openedFiles.length; i++) {
            let file = this.openedFiles[i];
            //console.dir(file);
            var oldpath = file.filepath;
            var newpath = 'C:/Users/User/upload/' + file.originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
                res.write("<h2>upload file received!</h2>");
                res.end();
            });
        }
    });
});


// http와 express의 결합 - 같은 port를 공유한다.
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("서버 실행 중 - http://localhost:" + app.get("port"));
});