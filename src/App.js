import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext.js";
import "./reset.css";

import ProductsProvider from "./contexts/ProductsContext.js";

import SignUp from "./components/authorization/SignUp";
import Login from "./components/authorization/Login";
import Home from "./components/home/Home";
import ProductPage from "./components/productPage/ProductPage";

export default function App() {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) setToken(localToken);
  });
  return (
    <UserContext.Provider value={{ token, setToken, username, setUsername }}>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="/products/:productHandle" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </UserContext.Provider>
  );
}
