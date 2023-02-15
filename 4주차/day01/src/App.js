
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import StateView from './component/StateView';
import StateController from './component/StateController';

function App() {

  return (
    <>
    <h1> hello</h1>
    <StateView/>
    <StateController/>
    </>
  );
}

export default App;
