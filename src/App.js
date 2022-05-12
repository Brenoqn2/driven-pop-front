import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { UserContext } from "./contexts/UserContext.js";
import "./reset.css";

import SignUp from "./components/sign-up/SignUp";

export default function App() {
  return (
    <UserContext.Provider value>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/sign-up" element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
