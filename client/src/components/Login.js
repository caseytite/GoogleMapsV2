import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("/login", { email, password })
        .then((res) => {
          localStorage.setItem("userId", res.data.user.id);
        })
        .then(() => {
          navigate.push("/map");
        })
        .catch((err) => console.log("Login Error:", err.message));
    }
  };
  return (
    <div className="form-container">
      <form action="" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <Input
          value={email}
          type="text"
          onChange={setEmail}
          autoComplete="on"
        />
        <label htmlFor="password">Password</label>
        <Input
          value={password}
          onChange={setPassword}
          type="password"
          autoComplete="on"
        />
        <Button onClick={(e) => handleLogin(e)}>Sign in</Button>
      </form>
    </div>
  );
};

export default Login;
