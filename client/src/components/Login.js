import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("email:", email, "password:", password);
    if (email && password) {
      axios
        .post("/login", { email, password })
        .then((res) => {
          console.log("login res", res.data.user.id);
          localStorage.setItem("userId", res.data.user.id);
        })
        .then(() => {
          console.log("success");
          navigate.push("/map");
        })
        .catch((err) => console.log("Login Error:", err.message));
    }
  };
  return (
    <div className="form-container">
      <form action="" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="on"
        />
        <Button onClick={(e) => handleLogin(e)}>Sign in</Button>
      </form>
    </div>
  );
};

export default Login;
