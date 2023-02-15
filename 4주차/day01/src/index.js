import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// react-redux 관련 모듈 import
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";

const currentState = { count: 10, age:21};

function reducer(sa = currentState,action) {
  //currentState에 있는 값을 변수를 지정해 저장하고 action을 불러옴.
  if (currentState == undefined) {
    return { count: 10};
  }
  if (action.type === "changeCnt") {
    sa.count=action.count;
  }

  if (action.type === "ageCnt") {
    sa.age=action.age;
  }

  if (action.type === "count 증가") {
    sa.count++;
  }
  if (action.type === "count 감소") {
    sa.count--;
  }
  if (action.type === "age 증가") {
    sa.age++;
  }
  if (action.type === "age 감소") {
    sa.age--;
  }

  const newState = { ...sa };
  return newState;
}

let store = createStore(reducer);
//리덕스안에 reducer 함수를 넣었음 그로인해서 리덕스가 실행됨.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* provider안에 app이 있으므로 app이 불러와지면 provider안에있는 reducer가 실행됨. */}
    <App />
  </Provider>);
  // 컴포넌트에서 보낸 액션이 앱으로오고 앱에 도착하면 provider에서 돌아가는 reducer함수에 액션이 도착하여서
  //action을 받아서 값에 맞는 행동을 함


