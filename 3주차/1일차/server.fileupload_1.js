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
app.set("port", 3000);
//console.dir(app)
//console.log(__dirname)

app.set("view engine", "ejs");
app.set("views", __dirname + "template");
//app.set("views", "./template");

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
        var oldpath = files.photo.filepath;
        //임시폴더를 만들어 사진의 경로를 넣음
        console.log(oldpath);

        //우리가 포토로 값을 입력받아서 files.photo로 해주어야함.
        //files.사진의.파일경로
        var newpath = 'C:/Users/imj09/upload/' + files.photo.originalFilename;
        //file.사진의.오리지널 파일이름(원래 파일이름)
        fs.rename(oldpath, newpath, function (err) {
            //오래된 경로를 새로운 경로로 이동하고 콜백함수 실행
            if (err) throw err;
            res.write('파일이 업로드되고 이동되었습니다.');
            res.end();
        });
    });

})

const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("server running" + app.get("port"));

})
