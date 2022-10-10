import React, { useState, createContext } from "react";
import mapStyles from "../mapStyles/mapStyles";

export const LoggedInUser = createContext({
  userID: localStorage.getItem("userId"),
  style: mapStyles[0],
  loggedIn: false,
  changeStyle: () => {},
  login: () => {},
  logout: () => {},
});

const LoggedInUserProvider = (props) => {
  const [loggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userId") || false
  );
  const [style, setStyle] = useState(mapStyles[0]);

  const changeStyleHandler = (styles) => {
    const removeStyle = styles.shift();
    styles.push(removeStyle);
    setStyle(styles[0]);
  };

  const logInHandler = (userId) => {
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

  const logOutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <LoggedInUser.Provider
      value={{
        login: logInHandler,
        logout: logOutHandler,
        loggedIn,
        changeStyle: changeStyleHandler,
        style,
      }}
    >
      {props.children}
    </LoggedInUser.Provider>
  );
};

export default LoggedInUserProvider;
