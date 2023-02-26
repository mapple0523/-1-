const http = require("http")
const express = require("express");
const app = express();
const server = http.createServer(app)
const cors = require("cors");
const mongodb = require("mongodb");
const mongojs = require("mongojs");
const { MongoClient } = require('mongodb');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { error } = require("console");
const router = express.Router();
const routerModule = require("./router_module")

app.set("port", process.env.PORT || 3000)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri, { useUnifiedTopology: true });
let db = null;
let localDb = null;
async function connectDB() {
    try {
        await client.connect();
        db = client.db("vehicle");
        localDb = client.db("local")
        console.log("Connected successfully to server");
        app.set("db", db);
        app.set("localDb", localDb)
    } finally {
    }
}

var addUser = function (database, id, password, name, callback) {
    console.log('addUser 함수 오출 됨: %s, %s, %s', id, password, name);

    var users = database.collection('users');

    // insertMany 기능 사용
    users.insertMany([{ "id": id, "password": password, "name": name }], function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }

        if (result.insertedCount > 0) {
            console.log("사용자 레코드 추가 됨 : ", result.insertedCount);
        } else {
            console.log("추가 된 카운트 없음")
        }

        callback(null, result);
    });
}

routerModule(router, app);


app.use("/", router);
server.listen(app.get("port"), () => {
    console.log("http://localhost:" + app.get("port"));
    console.log("Node.js 서버 실행 중 ...");
    connectDB().catch(console.dir);
    //서버가 실행이 된후 마지막에 들어가기때문에 db가 들어가지않음
});
