import { useEffect, useState } from "react";
import axios from "axios"
import Test from "./Test";
// ajax를 호환을 하는데 제대로하지않아서 새로 받아서 사용

function App() {

  const [saramList, setSaramList] = useState([]);
  //변수역할, 메소드

  useEffect(() => {
    //axios를 활용한 ajax처리
    //axios를 사용하기 위해서는 import를 해주어야함.
    axios.get("http://localhost:5000/car").then((response) => {
      //링크안에있는것을 읽어오면 then부분을 실행.
      setSaramList(response.data);
    })
  }, []);
  //뒤에있는 [] 랜더링을 나타내는건데 그걸 비우면 디폴트값으로 사용됨.

  return (
    //jsx문법을 따름
    <>
      <h1>민재의 홈페이지</h1>
      <Test/>
      <ul>
        {
          saramList.map((saram) => {
            return <li key={saram.no}>{saram.name}, {saram.company}, {saram.year}</li>
          })
        }
      </ul>

    </>
  );
}

export default App;
