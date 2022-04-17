import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";
import Header from "./components/Header";
import LoggedInUser from "./context/AuthContext";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <LoggedInUser.Provider value={{ userId: localStorage.getItem("userId") }}>
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
      </Switch>
    </LoggedInUser.Provider>
  </BrowserRouter>,

  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
