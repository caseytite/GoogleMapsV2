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

  return (
    <div>
      <Map points={points} setPoints={setPoints} />
    </div>
  );
};

export default App;
