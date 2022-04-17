import React from "react";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import axios from "axios";
const App = () => {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    axios.get("/user").then((res) => {
      setPoints(res.data);
    });
  }, []);
  console.log("in app", points);
  return (
    <div>
      <Map points={points} setPoints={setPoints} />
      <h1>{points[0].first_name}'s Locations</h1>
    </div>
  );
};

export default App;
