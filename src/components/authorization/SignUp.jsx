import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../publicComponents/Header";

export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirmPassword] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = { name, email, password, confirm_password };
      const response = await axios.post("https://driven-pop.herokuapp.com/sign-up", data);
      window.alert(response.data);
      navigate("/login");
    } catch (error) {
      window.alert(error.response.data);
    }
  }
  return (
    <Background>
      <Header />
      <main>
        <FormContainer>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Ex: myname123"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="">E-mail</label>
            <input
              type="text"
              name="email"
              placeholder="Ex: myname@myemail.com"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Ex: mypassword"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="">Confirm password</label>
            <input
              type="password"
              name="password"
              placeholder="Ex: mypassword"
              value={confirm_password || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Register</button>
          </form>
          <Link to="/login">
            <span>Already registered? Sign in!</span>
          </Link>
        </FormContainer>
      </main>
    </Background>
  );
}

export const Background = styled.div`
  background-color: aliceblue;
  height: 100vh;
  main {
    margin-top: 30px;
  }
  a {
    margin-top: 35px;
    text-decoration: none;
    color: inherit;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
  }
  label {
    margin-bottom: 5px;
  }
  input {
    border-radius: 15px;
    border: 1px gray solid;
    width: 90%;
    padding: 0 10px 0 10px;
    height: 40px;
    margin-bottom: 25px;
  }
  button {
    width: 100%;
    border: 1px gray solid;
    border-radius: 15px;
    height: 30px;
  }
`;
