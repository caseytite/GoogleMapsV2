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
    if (email && password) {
      axios
        .post("/user/login", { email, password })
        .then((res) => {
          if (res.error) {
            return;
          }
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
        <form className="login" action="" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email">Email</label>
          <Input
            value={email}
            type="email"
            onChange={setEmail}
            autoComplete="on"
            placeholder={"Email@mapps.com"}
            required={true}
          />
          <label htmlFor="password">Password</label>
          <Input
            value={password}
            onChange={setPassword}
            type="password"
            autoComplete="on"
            placeholder={"Password"}
            required={true}
          />
          <Button onClick={handleLogin}>Sign in</Button>
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
