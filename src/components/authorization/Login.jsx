import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../publicComponents/Header";
import Footer from "../publicComponents/Footer";
import { Background, FormContainer } from "../authorization/SignUp";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
  const { setToken, setUsername } = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = { email, password };
      const response = await axios.post("http://localhost:5000/login", data);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUsername(response.data.username);
      navigate("/");
    } catch (error) {
      window.alert(error);
    }
  }
  return (
    <>
      <Background>
        <Header />
        <main>
          <FormContainer>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="">E-mail</label>
              <input
                type="email"
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

              <button type="submit">Login</button>
            </form>
            <Link to="/sign-up">
              <span>Don't have an account yet? Sign up!</span>
            </Link>
          </FormContainer>
        </main>
      </Background>
      <Footer />
    </>
  );
}
