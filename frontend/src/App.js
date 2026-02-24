import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './pages/Shop';
import Details from './pages/Details';
import Cartes from './pages/Cartes';
import CheckOut from './pages/CheckOut';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop/:subcategoryid" element={<Shop/>} />
        <Route path="/Details/:id" element={<Details/>} />
        <Route path="/Cartes" element={<Cartes/>} />
        <Route path="/CheckOut" element={<CheckOut/>} />
          <Route path="/Register" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
