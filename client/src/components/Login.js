import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("email:", email, "password:", password);
    if (email && password) {
      axios
        .post("/login", { email, password })
        .then((res) => {})
        .then((response) => {})
        .catch((err) => console.log("Login Error:", err.message));
    }
    console.log("success");
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
        <button onClick={(e) => handleLogin(e)}>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
