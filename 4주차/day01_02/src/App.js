
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './inc/Main';
import Header from './inc/Head';
import Profile from './inc/Profile';
import Gallery from './inc/Gallery';
import Lecture from './inc/Lecture';
import Contact from './inc/Contact';
import ABC from './inc/abc'
import ABCD from './inc/abcd';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* 브라우저 라우터에 감싸고 */}
        <h1>안녕하세요</h1>
        <Header />
        <Routes>
          {/* routes에 감싼다음 */}
          <Route path="/" element={<Main />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/Gallery" element={<Gallery />}/>
          <Route path="/Lecture" element={<Lecture />}/>
          <Route path="/Contact" element={<Contact />}/>
          <Route path="/abc" element={<ABC />}/>
          <Route path="/abcd" element={<ABCD />}/>
          {/* 라우터의 경로를 지정해준다. 누르면 inc안에있는 것들이 실행이된다. */}
          {/* /안의 경로가 실행이되면 속성의값은 import해준 것이 적용된다. */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
