import './App.css';
import DriverLogin from './component/login&register/DriverAccReg/login';
import DriverRegister from './component/login&register/DriverAccReg/register';

import PassangerLogin from './component/login&register/PassangerAccReg/login';
import PassangerRegister from './component/login&register/PassangerAccReg/register';

import Home from "./component/home/home";
import DriverAcc from "./component/UserAccount/DriverAccount/DriverAcc";
import PassangerAcc from "./component/UserAccount/PassangerAccount/PassangerAcc";

import {BrowserRouter as Router, Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/PassangerLogin' element={<PassangerLogin/>}/>
        <Route path='/PassangerRegister' element={<PassangerRegister />}/>
        <Route path='/DriverLogin' element={<DriverLogin/>}/>
        <Route path='/DriverRegister' element={<DriverRegister />}/>
        <Route path='/PassangerAcc' element={<PassangerAcc/>}/>
        <Route path='/DriverAcc' element={<DriverAcc/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
