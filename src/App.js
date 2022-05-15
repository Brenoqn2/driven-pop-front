import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext.js";
import "./reset.css";

import SignUp from "./components/authorization/SignUp";
import Login from "./components/authorization/Login";

export default function App() {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  return (
    <UserContext.Provider value={{ token, setToken, username, setUsername }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
