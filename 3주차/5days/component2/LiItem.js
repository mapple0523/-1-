import { useState } from "react";

function LiItem({ item, deleteItem, Checked, updateItem }) {
    const [Check, setCheck] = useState(false)
    const [mode, setMode] = useState(false)
    const [title, setTitle] = useState(item.title)
    const [nametitle, setNametitle] = useState(item.name);
    return (


        <li>
            <p>
                <input type="checkbox"
                    onChange={function () {
                        setCheck(!Check)
                        //체크를 확인해서 check의 값에 넣음 (반대의 값을 넣어줌)
                        updateItem(item)

                    }}></input>
                {Check ?
                    (<input type="text"
                        className="checked"
                        onChange={function (event) {
                            setNametitle(event.target.value);
                        }}
                        // 취소선이 나오면 할일이 나오도록 설정함.
                        value={item.name}
                        readOnly={mode ? "" : "readonly"}
                        onClick={function (event) {
                            setMode(true)
                        }}

                        onBlur={function (event) {
                            item.title = title;
                            updateItem(item)
                            setMode(false)
                        }}

                    />)
                    :
                    (<input type="text"
                        onChange={function (event) {
                            setTitle(event.target.value);
                        }}
                        value={item.title}
                        readOnly={mode ? "" : "readonly"}
                        onClick={function (event) {
                            setMode(true)
                        }}

                        onBlur={function (event) {
                            item.title = title;
                            updateItem(item)
                            setMode(false)
                        }}

                    />)
                    //취소선이 아니면 제목이 나옴.
                }
                {/* check가 참이면 className을 바꾸어서 css의 checked를 적용시킴 */}



                <button onClick={function () {
                    setMode(!mode)
                    if (mode) {
                        item.title = title;
                        updateItem(item)
                    } else {
                        item.name = nametitle;
                        updateItem(item)
                    }
                }}>
                    {mode ? "수정완료" : "수정"}</button>
                {/* 고쳐야 할 부분: 수정을 눌렀을때 연속으로 입력되는것이아닌 여러개가 입력이됨.
                    예상이 가는것: check가 입력할때마다 확인이 되어서 그런거같다. */}
                <button onClick={function () {
                    deleteItem(item.no);
                }}>삭제</button>
            </p>
        </li>

    );
}


export default LiItem;
