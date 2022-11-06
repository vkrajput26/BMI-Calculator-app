import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom"
import Signup from './components/signup';
import Login from './components/login';
import CalculateBMI from './components/calculateBMI';
import Logout from './components/Logout';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<h1>welcome</h1>} ></Route>
      <Route path='/signup' element={<Signup/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/calculateBMI' element={<CalculateBMI/>} ></Route>
      <Route path='/logout' element={<Logout/>} ></Route>
    </Routes>
    </div>
  );
}

export default App;
