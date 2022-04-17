import React from "react";
// import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Map from "./components/Map";
import Login from "./components/Login";
import Header from "./components/Header";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <ScrollToTop />
    <Header />
    <Switch>
      <Route exact path="/">
        <h1>Maps</h1>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/map">
        <App />
      </Route>
      {/* <Route path="/login" element={<Login />} /> */}
    </Switch>
  </BrowserRouter>,

  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
