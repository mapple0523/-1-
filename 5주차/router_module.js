module.exports = function (router, app) {

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


    router.route("/home").get(function (req, res) {
        console.log("123")

        res.end("<h1>Home</h1>")
    })

    router.route("/product").get(async (req, res) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.write("<h1>product page!</h1>");
        if (req.session.user) {
            res.write("Hi : " + req.session.user.name + " login!");
            res.write("<p><a href='/logout'>Logout</a></p>");
            res.write("<p><a href='/user_list'>유저목록</a></p>");
            res.write("<p><a href='/user_detail'>유저 상세 목록</a></p>");
            res.end();
        } else {
            res.redirect("/login.html");
        }
    });

    router.route("/login").post((req, res) => {
        const localDb = app.get("localDb");
        console.log("POST - /login");
        const userId = req.body.id;
        const passwd = req.body.passwd;
        if (localDb) {
            let users = localDb.collection("users").findOne({ id: userId, password: passwd }, function (err, result) {
                if (err) throw err;
                if (result) {
                    // session에 정보를 저장 하고 이동...
                    req.session.user = {
                        id: userId,
                        name: result.name
                    }
                    res.redirect("/product");
                } else {
                    console.log("불일치한다.");
                    res.redirect("/login.html");
                }
            });
        } else {
            console.log("localDB 없습니다.")
        }
    });

    router.route("/logout").get(async function (req, res) {
        req.session.user = null;
        res.redirect("/login.html")
    })

    router.route("/process/adduser").post(function (req, res) {
        const localDb = app.get("localDb");
        console.log("회원가입 호출됨")

        let paramId = req.body.id || req.query.id;
        let paramPasswd = req.body.password || req.query.password
        let paramName = req.body.name || req.query.name;

        const user = localDb.collection("users")

        // a=user.find({}, {"_id":false, "id":true, "password": false, "name": false}, function(err, data) {
        //     if(err) throw err;
        //     console.log(data)
        // })

        //console.log(a)
        //console.log("%s,%s,%s",paramId,paramName,paramPasswd)

        if (localDb) {
            addUser(localDb, paramId, paramPasswd, paramName, function (err, result) {
                if (err) { throw err; }

                if (result && result.insertedCount > 0) {
                    //console.dir(result);
                    res.redirect("/login.html")
                } else {
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                    res.write('<h1>사용자 추가 실패</h1>');
                    res.end();
                }
            });
        } else {
            res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
            res.write('<h1>데이터 베이스 연결 실패</h1>');
            res.end();
        }

    })
    router.route("/user_list").get(async (req, res) => {
        const localDb = app.get("localDb");
        console.log("GET - /test/car/list 요청 됨.");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.write("<h1>유저 목록 페이지입니다.</h1>");

        if (localDb) {
            const user = localDb.collection("users")
            user.find({}).toArray(function (findErr, userList) {
                if (findErr) throw error
                req.app.render("users/user_list", { userList }, function (err, html) {
                    res.end(html);
                })
            })
            console.log("출력 완료 !");
        }
    })

    router.route("/user_detail").get(async (req, res) => {
        const localDb = app.get("localDb");
        console.log("GET - /test/car/list 요청 됨.");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.write("<h1>유저 목록 페이지입니다.</h1>");

        if (localDb) {
            const user = localDb.collection("users")
            user.find({}).toArray(function (findErr, userList) {
                if (findErr) throw error
                req.app.render("users/user_detail", { userList }, function (err, html) {
                    res.end(html);
                })
            })
            console.log("출력 완료 !");
        }
    })

    router.route("/test/car/list").get(async (req, res) => {
        const db = app.get("db");
        console.log("GET - /test/car/list 요청 됨.");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.write("<h1>Test page!</h1>");

        if (db) {
            const car = db.collection("car");
            car.find({}).toArray(function (findErr, carList) {
                if (findErr) throw err;
                req.app.render("car/list", { carList }, function (err, html) {
                    res.end(html);
                });
            });
            console.log("출력 완료 !");
        }
    });


}