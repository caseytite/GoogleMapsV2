import { useState } from "react";
import axios from "axios";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/UI/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("/user/login", { email, password })
        .then((res) => {
          localStorage.setItem("userId", res.data.user.id);
        })
        .then(() => {
          navigate("/map");
        })
        .catch((err) => {
          setError("Incorrect Email or Password");
        });
    }
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="bg-img">
      <Header />
      <div className="form-container">
        <form className="login" action="" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <Input
            value={email}
            type="text"
            onChange={setEmail}
            autoComplete="on"
            placeholder={"Email@mapps.com"}
          />
          <label htmlFor="password">Password</label>
          <Input
            value={password}
            onChange={setPassword}
            type="password"
            autoComplete="on"
            placeholder={"Password"}
          />
          <Button onClick={(e) => handleLogin(e)}>Sign in</Button>
        </form>
      </div>
      {error && <h3 className="error">{error}</h3>}
      <div className="new-user">
        <h3>
          First Time ?{" "}
          <span className="reg-link" onClick={handleRegister}>
            Register Now!
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Login;
