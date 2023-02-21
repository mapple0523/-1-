const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
process.env.PORT = 3000;

app.use(express.static("public"));
app.set("port", process.env.PORT || 3001);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(cors());
app.use(cookieParser());
app.use(expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.route("/house").get(function (req, res) {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write("<h1>서버실행중</h1>")
    res.end();
})
//rest 방식으로 처리한 계산기 - Ajax방식으로 처리됨
router.route("/calc/:a/:b").get(function(req, res) {
    console.log("GET - calc 더하기");
    res.end(String(Number(req.params.a)+Number(req.params.b)));
})
router.route("/calc/:a/:b").put(function(req, res) {
    console.log("GET - calc 빼기");
    res.end(String(Number(req.params.a)-Number(req.params.b)));
})
router.route("/calc/:a/:b").post(function(req, res) {
    console.log("GET - calc 나누기");
    res.end(String(Number(req.params.a)/Number(req.params.b)));
})
router.route("/calc/:a/:b").delete(function(req, res) {
    console.log("GET - calc 곱하기");
    res.end(String(Number(req.params.a)*Number(req.params.b)));
})

app.use("/", router);
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});