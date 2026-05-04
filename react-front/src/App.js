import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import Localizaciones from './components/Localizaciones';
import Reservas from './components/Reservas';
import MisReservas from './components/MisReservas';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import Checkout from './components/Checkout';
import MisPedidos from './components/MisPedidos';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);

  return (
    <Router>
      <div className="App">
        <Navbar carrito={carrito} setCarrito={setCarrito} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/localizaciones" element={<Localizaciones />} />
          <Route path="/reservas/:idLocalizacion" element={<Reservas />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;