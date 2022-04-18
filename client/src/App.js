import React from "react";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
const App = () => {
  const [points, setPoints] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("/user").then((res) => {
      setPoints(res.data);
      setUser(res.data[0]);
    });
  }, []);
  console.log(user);
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
