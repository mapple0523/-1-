import React, { useState } from 'react';
import "./App.css"

function LiItem({ item, deleteItem, Checked }) {
    const [Check,setCheck] = useState(true)
    return (
        <li>
            <p>
                <input type="checkbox" class="checked" onChange={function() {
                    setCheck(!Check)
                    //체크를 확인해서 check의 값에 넣음
                    
                }}></input>
                {Check? (<input type="text" value={item.title} disabled />)
                :
                (<input type="text" className="checked" value={item.title} disabled />)
                }
                {/* check가 참이면 className을 바꾸어서 css의 checked를 적용시킴 */}
                <button onClick={function () {

                }}>
                    수정</button>
                <button onClick={function () {
                    deleteItem(item.no);
                }}>삭제</button>
            </p>
        </li>
    );
}

function InputItem({ appendItem }) {
    const [newWork, setNewwork] = useState("123");
    //input의 value로 사용 할 경우에는 초기값을 넣어주어야함.
    return (
        <>
            할일:<input type="text" value={newWork} onChange={function (event) {
                setNewwork(event.target.value)
            }}></input>
            <button onClick={function (event) {
                appendItem(newWork)
            }}>추가</button>
        </>
    )
}

function TodoList({ TodoList1, deleteItem, Checked }) {
    return (
        <div>
            <ul>{
                TodoList1.map(function (item, index) {
                    return <LiItem key={item.no} item={item} deleteItem={deleteItem} Checked={Checked} />
                })}
            </ul>
        </div>
    )
}
let noCount = 5;

function App(props) {
    //과제 1: 취소선 기능 추가
    //과제 2: todolist 데이터를 localStroage에다가 저장.
    const [TodoList1, setTodoList1] = useState([
        { no: 1, title: "점심 먹기", done: false },
        { no: 2, title: "산책 하기", done: false },
        { no: 3, title: "공부 하기", done: false },
        { no: 4, title: "자기", done: false }
    ]);
    //todoList에 값을 넣어서 상수로 만듬
    function appendItem(newItem) {
        console.log(noCount)
        setTodoList1([...TodoList1, { no: noCount++, title: newItem, done: false }])
        //값을 추가하고 TodoList1의 뒤에 값을 추가하는것
    }
    function deleteItem(no) {
        let newList = TodoList1.filter(function (item, index) {
            return item.no != no;
            //item의 no와 다른 no의 값들을 리턴함.
        })
        //새로운 뉴리스트가 만들어짐
        setTodoList1(newList)
    }

    function Checked(done) {
        let check = TodoList1.filter(function (item, index) {
            if(item.done == true){
                return true;
            }
        })

    }
    return (
        <>
            <h1>Todo List.</h1>
            <InputItem appendItem={appendItem}></InputItem>
            <hr />
            <TodoList TodoList1={TodoList1} deleteItem={deleteItem} Checked={Checked} />
        </>
    )
}

export default App;