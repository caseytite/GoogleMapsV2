import React from "react";
import { useState, useEffect, useContext } from "react";
import { LoggedInUser } from "./context/AuthContext";
import Map from "./pages/Map";
import axios from "axios";
import "./App.css";

const App = () => {
  const loggedInUser = useContext(LoggedInUser);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (!loggedInUser.user) return;
    axios.get("/locations").then((res) => {
      setPoints(res.data);
    });
  }, [loggedInUser.user]);

  return (
    <div className="map-page">
      <Map
        points={points}
        setPoints={setPoints}
        user={loggedInUser.user}
        changeStyle={loggedInUser.changeStyle}
        style={loggedInUser.style}
      />
    </div>
  );
};

export default App;
