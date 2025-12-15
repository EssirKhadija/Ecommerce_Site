import React, {useState, useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Menu from "./components/Menu";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import DashboardRoute from "./pages/Dashboard/Dashboard";


import { load, save } from "./utils/storage";

function App(){
  const initial =[
      { id: 1, nomA: "Bureaux en bois massif", pu: 2000, image: "BUREAU-massif.webp", desc: "Bureau en bois massif, finition naturelle." },
      { id: 2, nomA: "Cahier A4 96 pages", pu: 30, image: "cahiers.jpg", desc: "Cahier A4 96 pages lignées." },
      { id: 3, nomA: "Lot de 12 stylos", pu: 50, image: "stylos.jpg", desc: "Stylos à bille, lot de 12." }
  ];

  const [articles, setArticles] = useState(()=> load("articles", initial));
  const [cart, setCart] = useState(() => load("cart", []));
  const [loggedIn, setLoggedIn] = useState(()=> load("loggedIn", false));

  useEffect(() => save("articles", articles), [articles]);
  useEffect(() => save("cart", cart), [cart]);
  useEffect(() => save("loggedIn", loggedIn), [loggedIn]);


  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateCartQty = (id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0));
  };

  const clearCart = () => setCart([]);

  return(
    <div className="d-flex flex-column min-vh-100">
      <Menu cartCount={cart.reduce((s, p) => s + p.qty, 0)}/>
      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<Home articles={articles} addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductPage articles={articles} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateCartQty={updateCartQty} clearCart={clearCart} />} />
          <Route path="/login" element={<Login onLogin={setLoggedIn} />} />
          <Route path="/dashboard/*" element={<DashboardRoute loggedIn={loggedIn} setLoggedIn={setLoggedIn} articles={articles} setArticles={setArticles} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;