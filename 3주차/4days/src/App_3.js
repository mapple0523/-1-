import React, { useState } from 'react';

function App(props) {
    const [fishArr, setFishArr] = useState(["ㅇㅈㅇ", "ㄲㄷㄱ", "ㅁㅌ"]);
    const [newFish, setNewFish] = useState("광어");

    return (
        <>
            <h1>hello</h1>
            <p>
                <input type="text" value={newFish} onChange={function (event) { setNewFish(event.target.value) }
                //setNewfish의 값은 input의 값임. 동기화가 되어서 계속 바뀜.
                } />
                {/* react의 input임 */}
                <button onClick={function (event) {
                    setFishArr([ newFish, ...fishArr])
                    //합칠 대상을 앞에두면 뒤로 적용이되고 뒤에두면 앞으로 값이 추가됨
                    //statr가 변경되면서 component가 다시 렌더링됨
                    setNewFish("");
                }}>추가</button>
                
            </p>
            <ul>
                {
                    fishArr.map(function (item, index) {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        </>
    )
}

export default App;