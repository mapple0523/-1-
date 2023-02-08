const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');
//내장모듈은 초록색 파란색은 외부모듈

// app.set("key", "value"); -- setAttribute 용도로 사용함
// app.get("key"); -- getAttribute의 용도
// app.get("path", callback) -- 서버의 doGet 역할을 해준다
// app.post("path", callback) -- 서버의 dopost 역할을 해준다
//console.dir(app)
//console.log(__dirname)
app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", __dirname + "template");
//app.set("views", "./template");

const saramList = [
    { "no": 1, "name": "Saram", "email": "saram@saram.com", "phone": 1 },
    { "no": 2, "name": "Sara", "email": "sara@saram.com", "phone": 1 },
    { "no": 3, "name": "Sar", "email": "sar@saram.com", "phone": 1 },
    { "no": 4, "name": "S", "email": "s@saram.com", "phone": 1 },
    { "no": 5, "name": "abc", "email": "saram@saram.com", "phone": 1 },
    { "no": 6, "name": "abc", "email": "saram@saram.com", "phone": 1 }
]

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello World!</h1>");
    res.end();

})
app.post("/saram/input", (req, res) => {
    let form = new formidable.IncomingForm();
    //formidable 임시폴더
    // form.parse(req, function (err, fields, files) {
    //     //폼에있는걸 paresing하고 콜백함수를 호출
    //     res.write('File uploaded');
    //     res.end();
    //   });
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<h1>upload file receive</h1>");
        console.log(">>>>>>>(1)")
        res.end();
        //엔드가 되면 아래의 이벤트가 실행함
        //on은 이벤트 실행함수
    });

    //분리해서 사용가능함
    form.on("end", function () {
        //this는 form
        //열려있는 파일의 갯수
        console.log(">>>>>>>(2)")
        for (let i = 0; i < this.openedFiles.length; i++) {
            //console.log("2", this.openedFiles[i])
            let file = this.openedFiles[i]
            let oldpath = file.filepath;
            //console.log(oldpath);
            //우리가 포토로 값을 입력받아서 files.photo로 해주어야함.
            //files.사진의.파일경로
            let newpath = 'C:/Users/imj09/upload/' + file.originalFilename;
            //file.사진의.오리지널 파일이름(원래 파일이름)
            fs.rename(oldpath, newpath, function (err) {
                //오래된 경로를 새로운 경로로 이동하고 콜백함수 실행
                if (err) throw err;
                //res.write('File uploaded and moved!');
                //res.end();
            });
        }
    });

})

const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("server running" + app.get("port"));

})
