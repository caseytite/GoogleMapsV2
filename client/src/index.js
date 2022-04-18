import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";
import Header from "./components/Header";
import LoggedInUser from "./context/AuthContext";
import Landing from "./components/Landing";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <LoggedInUser.Provider value={{ userId: localStorage.getItem("userId") }}>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<App />} />
      </Routes>
    </LoggedInUser.Provider>
  </BrowserRouter>,

  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
