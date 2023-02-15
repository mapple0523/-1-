console.log(">>> hello nodejs")

function task(success, rejected) {
    console.log("task 실행")
    setTimeout(function () {
        console.log("task 실행 끝")
        rejected("실행 결과 값");
    }, 1000)

}

function success(result) {
    console.log("task 실행>>", result)
}

function rejected(err) {
    console.log("reject 실행123", err)
}


new Promise(task).then(success, rejected);