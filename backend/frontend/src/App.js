import Patientlogin from "./pages/Login/patientlogin";
import Patientsignup from "./pages/Login/patientsignup";
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home/home.js";
import Doctorlogin from "./pages/Login/doctorlogin";
import Doctorsignup from "./pages/Login/doctorsignup";
import Doctorshome from "./pages/home/doctorshome";
import Profile from "./pages/home/profile";
function App() {
  return (
  <Routes>
      <Route path='/' element={< Patientlogin />}></Route>
      <Route path='/signup' element={<Patientsignup />}></Route>
      <Route path='/doctorlogin' element={<Doctorlogin />}></Route>
      <Route path='/doctorsignup' element={<Doctorsignup />}></Route>
      <Route path='/home:id' element={<Home />}></Route>
      <Route path='/doctorshome:id' element={<Doctorshome />}></Route>
      <Route path='/profiledata/:id' element={<Profile/>}></Route>
      
  </Routes>)
  
}

export default App;
