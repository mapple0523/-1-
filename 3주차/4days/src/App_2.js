import { useState } from 'react';
import './App.css';
import Car from './comp.ex/Car';
import Hello from './comp.ex/Hello';


function App_2() {
  //state 선언.
  const [brand, setBrand] = useState("KIA");
  const [carName, setCarName] = useState("K7");
  const [user, setUser] = useState("user1223");

  function onChangeName(newname) {
    console.log("changeName() 호출")
    setUser(newname);
  }

  function assignTest() {
    console.log("123")
    const target = {a:1, b:2}
    const source = {b:4, c:5}

    const reTarget = Object.assign({},target, source);
    console.log(target)
    console.log(reTarget)
  }

  function assignTest2() {
    console.log("assignTest2() 실행");
    const target = {a:1, b:2}
    const source = [
      {b:4, c:5},
      {b:6, c:7, f:8},
      {b:9, c:10, d:11}
    ]

    Object.assign(target, ...source);
    //전부다 적용시켜주는것

    console.log(target)
  }

  function testSpread() {
    console.log("testSpread() 호출...")
    const arr = [{name: "kim"},
    {name: "lee"},
    {name: "ki"},
    {name: "k"}
    
  ]

    const newArr = [...arr, 5]
    console.log(arr)
    console.log(newArr)
  }
  return (
    <div>
      {/* 컴포넌트 생성 */}
      <Car brand={brand} name={carName}></Car>
      {/* <h1>Hello world</h1> */}
      <Hello name={user} address="Seoul" ChangeName={onChangeName}></Hello>
      {/* Changename은 변수이고 onChangeName은 함수임. */}
      <hr />
      <button onClick={
        function () {
          assignTest();
        }
      }>assign 테스트</button>
      <hr/>
      <button onClick= {
        function() {
          assignTest2();
        }
      }>assign 테스트2</button>
      <hr/>
      <button onClick= {
        function() {
          testSpread();
        }
      }>testSpread</button>
    </div>
  );
}

export default App_2;
