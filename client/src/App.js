import React from "react";
import { useState, useEffect } from "react";
import Header from "../src/components/UI/Header";
import Footer from "./components/UI/Footer";
import mapStyles from "./mapStyles/mapStyles";
import Map from "./pages/Map";
import axios from "axios";
import "./App.css";

const App = () => {
  const [points, setPoints] = useState([]);
  const [user, setUser] = useState([]);
  const [style, setStyle] = useState(mapStyles[0]);
  useEffect(() => {
    const GET_USER = axios.get("/user");
    const GET_PINS = axios.get("/locations");

    Promise.all([GET_USER, GET_PINS]).then((res) => {
      const [userInfo, pins] = res;
      setPoints(pins.data);
      setUser(userInfo.data.data[0]);
    });
  }, []);
  const changeStyle = (styles) => {
    const removeStyle = styles.shift();
    styles.push(removeStyle);
    setStyle(styles[0]);
  };

  return (
    <>
      <Header user={user} style={style} />
      <div className="map-page">
        <Map
          points={points}
          setPoints={setPoints}
          user={user}
          changeStyle={changeStyle}
          style={style}
        />
      </div>
      <Footer style={style} />
    </>
  );
};

export default React.memo(App);
