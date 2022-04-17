import React from "react";
import { useState, useEffect } from "react";
import Map from "./components/Map";
const App = () => {
  useEffect(() => {
    fetch("/user")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div>
      <Map />
    </div>
  );
};

export default App;
