import React from "react";
import { useState, useEffect, useContext } from "react";
import { LoggedInUser } from "./context/AuthContext";
import Header from "../src/components/UI/Header";
import Map from "./pages/Map";
import axios from "axios";
import "./App.css";

const App = () => {
  const loggedInUser = useContext(LoggedInUser);
  const [points, setPoints] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const GET_USER = axios.get("/user");
    const GET_PINS = axios.get("/locations");

    Promise.all([GET_USER, GET_PINS]).then((res) => {
      const [userInfo, pins] = res;
      setPoints(pins.data);
      setUser(userInfo.data.data[0]);
    });
  }, []);

  return (
    <>
      <Header user={user} style={loggedInUser.style} />
      <div className="map-page">
        <Map
          points={points}
          setPoints={setPoints}
          user={user}
          changeStyle={loggedInUser.changeStyle}
          style={loggedInUser.style}
        />
      </div>
    </>
  );
};

export default App;
