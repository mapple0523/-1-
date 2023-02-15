import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function StateView(props) {

    const count = useSelector(function (state) {
        return state.count;
    })

    const age = useSelector(function (state) {
        return state.age;
    })

    return (
        <>
            <p>count : {count}</p>
            <p>age : {age}</p>

        </>
    )
}

export default StateView;