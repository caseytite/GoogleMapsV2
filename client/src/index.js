import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import LoggedInUser from "./context/AuthContext";
import Landing from "./pages/Landing";
import Footer from "../src/components/UI/Footer";
import Register from "./pages/Register";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <LoggedInUser.Provider value={{ userId: localStorage.getItem("userId") }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="map" element={<App />} />
        <Route path="register" element={<Register />} />
      </Routes>
      {/* <Footer /> */}
    </LoggedInUser.Provider>
  </BrowserRouter>,

  rootElement
);
