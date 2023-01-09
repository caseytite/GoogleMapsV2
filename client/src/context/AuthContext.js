import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import mapStyles from "../mapStyles/mapStyles";

export const LoggedInUser = createContext({
  userID: localStorage.getItem("userId"),
  style: mapStyles[0],
  loggedIn: false,
  changeStyle: () => {},
  login: () => {},
  logout: () => {},
  user: "",
});

const LoggedInUserProvider = (props) => {
  const [loggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userId") || false
  );
  const [style, setStyle] = useState(mapStyles[0]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("/user").then((res) => {
      setUser(res.data.data[0]);
    });
  }, []);

  const changeStyleHandler = (styles) => {
    const removeStyle = styles.shift();
    styles.push(removeStyle);
    setStyle(styles[0]);
  };

  const logInHandler = (userId) => {
    window.location.assign("/map");
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

  const logOutHandler = () => {
    window.location.assign("/");
    localStorage.clear();
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <LoggedInUser.Provider
      value={{
        login: logInHandler,
        logout: logOutHandler,
        loggedIn,
        changeStyle: changeStyleHandler,
        style,
        user,
      }}
    >
      {props.children}
    </LoggedInUser.Provider>
  );
};

export default LoggedInUserProvider;
