import { useState } from "react";
import Header from "./UI/Header";
import "../styles/Register.css";
import Input from "../components/UI/Input";
import Button from "./UI/Button";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {};
  return (
    <div className="bg-img">
      <Header />
      <div className="reg-container">
        <form className="reg-form" onSubmit={(e) => e.preventDefault()}>
          <h1>Register!</h1>
          <label htmlFor="firstName">First Name</label>
          <Input
            value={firstName}
            onChange={setFirstName}
            type={"text"}
            placeholder={"First Name"}
          />
          <label htmlFor="lastName">Last Name</label>
          <Input
            value={lastName}
            onChange={setLastName}
            type={"text"}
            placeholder="Last Name"
          />
          <label htmlFor="email">Email</label>
          <Input
            value={email}
            onChange={setEmail}
            type={"email"}
            placeholder={"email@maps.com"}
          />
          <label htmlFor="password">Password</label>
          <Input
            value={password}
            onChange={setPassword}
            type={"password"}
            placeholder={"Password"}
          />
          <Button onClick={handleRegister} children={"Register!"} />
        </form>
      </div>
    </div>
  );
};

export default Register;
