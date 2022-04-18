import React from "react";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import axios from "axios";
import "./App.css";
import Header from "../src/components/UI/Header";

const App = () => {
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
      <Header user={user} />
      <div className="map-page">
        <Map points={points} setPoints={setPoints} />
        {user && <h1>{user.first_name}'s Locations</h1>}
        {!user && <h1>Your Locations</h1>}
      </div>
      <hr />
    </>
  );
};

export default App;
