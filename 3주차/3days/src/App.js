import React, { useState, useEffect, Component } from 'react';
import "./AppCss.css";
// css는 app.css 파일을 만들어서 스타일 적용 후 import하면 된다.

function Menu(props) {
    const [menuitems, setmenuitems] = useState(["HOME", "PROFILE", "GALLERY", "LECTURE", "GUEST"]);

    return (
        <>
            <ul className="menu">
                {menuitems.map((item, i) => {
                    return <li key="i">item</li>
                })}
            </ul>
        </>
    )
}

function Row() {
    return (
        <>
            <div className="row0">
                <Column>
                </Column>
            </div>

        </>
    )

}

function Row1() {
    return (
        <>
            <div className="row1"> row1
                <Column1></Column1>
            </div>

        </>

    )
}

function Column(props) {
    return (
        <>
            <div className="column0">row0
                <Component1></Component1>
                <Component2></Component2>
            </div>
            <div className="column1">row1
                <Component1></Component1>
            </div>
        </>
    )
}

function Column1(props) {
    return (
        <>
            <div className="column2"> column2
            <Component3></Component3>
            </div>
        </>
    )
}




function Component1() {
    return (
        <>
            <div className="component0">component0 <br />Someinput</div>
        </>
    )
}

function Component2() {
    return (
        <>
            <div className="component0">component1 <br />Someimage</div>
        </>
    )
}

function Component3() {
    return (
        <>
            <div className="component1">component2 <br />Someinput</div>
            <div className="component1">component2 <br />Someinput</div>
            <div className="component1">component2 <br />Someinput</div>
        </>
    )
}

function App() {
    return (
        <>
            <Menu></Menu>

            <div className="container">
                
                <Row>
                </Row>
                <Row1>
                </Row1>
            </div>
        </>
    )
}
export default App;