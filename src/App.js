import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { UserContext } from "./contexts/UserContext.js";
import "./reset.css";

export default function App() {
  return (
    <UserContext.Provider value>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
