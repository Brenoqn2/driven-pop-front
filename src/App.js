import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { UserContext } from "./contexts/UserContext.js";
import "./reset.css";

import SignUp from "./components/sign-up/SignUp";
import Home from "./components/home/Home"
import ProductsProvider from "./contexts/ProductsContext.js";


export default function App() {
  return (
    <UserContext.Provider value>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </UserContext.Provider>
  );
}
