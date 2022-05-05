import React from "react";
import Button from "./UI/Button";
import "@reach/combobox/styles.css";
import "../styles/LocateUser.css";

const LocateUser = ({ moveTo }) => {
  return (
    <Button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            moveTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Locate Me!
    </Button>
  );
};

export default LocateUser;
