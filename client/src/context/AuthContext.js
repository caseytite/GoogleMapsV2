import React from "react";

const LoggedInUser = React.createContext({
  userID: localStorage.getItem("userId"),
});

export default LoggedInUser;
