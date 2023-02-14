import React, { useEffect, useState } from 'react';
import "./App.css"
import InputItem from './component2/InputItem';
import TodoList from './component2/TodoList';



function App(props) {
    const [TodoList1, setTodoList1] = useState([]);
    const [noCount, setNoCount] = useState(1);


    useEffect( () => {
        //localStorage에 데이터가 있으면 로드한다.
        // 저장은 문자열로 한다.
        console.log("useEffect 사용중.")
        const localStroageData = localStorage.getItem("TodoList1Data");
        if (localStroageData) {
            let objData = JSON.parse(localStroageData);
            setTodoList1(objData.TodoList1);
            setNoCount(objData.noCount);
            console.log("data load 완료")
            console.dir(objData)
        }
    }, [])

    function saveLocalStorage(newList, noCnt) {
        localStorage.setItem("TodoList1Data", JSON.stringify({ TodoList1: newList, noCount: noCnt }));
        //TOdoList로 되어있어서 읽지를 못하였다.. 제대로 확인하자..
        console.log("data save")
    }

    function appendItem(Item,name1) {
        console.log(noCount)
        let newList = [...TodoList1, { no: noCount, title: Item, name:name1, done: false }]
        //Item을 받아와야하는데 Item.title을 하여서 값을 읽지못하여서 공백으로 나왓음
        //오류가 날떄는 해당하는 컴포넌트 부분으로 이동하여서 확인해야함.
        let noCnt = noCount + 1;
        setTodoList1(newList);
        setNoCount(noCnt);
        //값을 추가하고 TodoList1의 뒤에 값을 추가하는것
        //객체가 아니므로 []를 넣어서 객체로 만들어주어야함.
        saveLocalStorage(newList, noCnt)
    }

    function deleteItem(no) {
        let newList = TodoList1.filter(function (item, index) {
            return item.no != no;
            //item의 no와 다른 no의 값들을 리턴함.
        });
        //새로운 뉴리스트가 만들어짐
        setTodoList1(newList)
        saveLocalStorage(newList, noCount)
    }

    function updateItem(item) {
        const newList = [...TodoList1];
        setTodoList1(newList)
        saveLocalStorage(newList, noCount)
        //console.dir(TodoList1);
    }


    function Checked(done) {
        let check = TodoList1.filter(function (item, index) {
            if (item.done == true) {
                return true;
            }
        })
    }
    //Check가 되는지 확인할려고 했던 부분. 
    //하지만 클래스를 바꾸어보면 어떨까라는 생각이들어서 실행을 하지않았음.
    return (
        <>
            <h1>Todo List.</h1>
            <InputItem appendItem={appendItem}></InputItem>
            <hr />
            <TodoList TodoList1={TodoList1} deleteItem={deleteItem} Checked={Checked} updateItem={updateItem} />
            {/* TodoLIst로 해서 오류낫는데 1시간동안 못찾음 변수이름 제대로 적기.*/}
        </>
    )
}

export default App;