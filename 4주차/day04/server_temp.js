const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const fs = require('fs');
const multer = require('multer');
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