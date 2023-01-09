import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import LoggedInUserProvider from "./context/AuthContext";
import Landing from "./pages/Landing";
import Header from "./components/UI/Header";
import Footer from "../src/components/UI/Footer";
import Register from "./pages/Register";
import FullDetails from "./pages/FullDetails";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <LoggedInUserProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="map" element={<App />} />
        <Route path="register" element={<Register />} />
        <Route path="full-details" element={<FullDetails />} />
      </Routes>
      <Footer />
    </LoggedInUserProvider>
  </BrowserRouter>,

  rootElement
);
