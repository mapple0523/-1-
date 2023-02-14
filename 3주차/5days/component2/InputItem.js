import { useState } from "react";

function InputItem({ appendItem }) {
    const [newWork, setNewwork] = useState("");
    const [newName, setnewName] = useState("");
    //input의 value로 사용 할 경우에는 초기값을 넣어주어야함.
    return (
        <>
            제목:<input type="text" value={newWork} onChange={function (event) {
                setNewwork(event.target.value)
            }}

            ></input>

            할일:<input type="text" value={newName} onChange={function (event) {
                setnewName(event.target.value)
            }} />

            <button onClick={function (event) {
                if(newWork,newName){
                    appendItem(newWork,newName)
                }
                // else if(newName==""){
                //     alert("할일이 비어있습니다.")
                // 이부분은 내용없음을 넣기위하여 사용하지않았음.}
                else {
                    appendItem("(내용없음)","(할일 없음)")
                }
                //만약 내용이 없으면 내용없음이 들어감.
                //추가를 누르면 두개의 값을 추가하여서 title과 name에 값이 들어가도록 하였음.
                setnewName("")
                setNewwork("")
                //입력이 되고나면 비워주는부분
                //setNew에 띄워쓰기를 해놔서 내용없음이 안들어갔던거였음;;;;
            }}>추가</button>
        </>
    )
}

export default InputItem