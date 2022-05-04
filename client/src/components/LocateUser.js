import React from "react";
import "@reach/combobox/styles.css";
import "../styles/LocateUser.css";

const LocateUser = ({ moveTo }) => {
  return (
    <button
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
    </button>
  );
};

export default LocateUser;
