import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function StateController(props) {
    const dispatch = useDispatch();
    //액션을 발생시키는 내장함수. 액션을 전달시켜줌
    const count = useSelector(function (state) {
        return state.count;
    })
    const age = useSelector(function (state) {
        return state.age;
    })

    return (
        <>
            <fieldset>
                <br />
                <input type="text" value={count} onChange={function (event) {
                    dispatch({ type: "changeCnt", count: event.target.value })
                }}></input>

                <button onClick={function () {
                    dispatch({ type: "count 증가" });
                }}>증가</button>
                <button onClick={function () {
                    dispatch({ type: "count 감소" });
                }}>감소</button>
            </fieldset>

            <fieldset>
                <input type="text" value={age} onChange={function (event) {
                    dispatch({ type: "ageCnt", age: event.target.value })
                }}></input>

                <button onClick={function () {
                    dispatch({ type: "age 증가" });
                }}>증가</button>
                <button onClick={function () {
                    dispatch({ type: "age 감소" });
                }}>감소</button>
            </fieldset>
        </>
    )
}

export default StateController;