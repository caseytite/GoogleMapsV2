import { LoggedInUser } from "../context/AuthContext";
import { useContext } from "react";

const useWaterColor = () => {
  const loggedIn = useContext(LoggedInUser);
  const style = loggedIn.style;

  if (style) {
    const waterColor = style.filter((sty) => sty.featureType === "water");
    const bgColor = waterColor[0].stylers[0].color;
    let textColor = "black";
    if ((bgColor[1] === "0" && bgColor[2] !== "0") || bgColor[1] === "2") {
      textColor = "whitesmoke";
    }
    let iconColor = "hsl(83deg 67% 60%)";
    if (bgColor[1] === "a") {
      iconColor = "hsl(136deg 53% 43%)";
    }
    return [bgColor, textColor, iconColor];
  }
  return ["none", "black", "hsl(83deg 67% 60%)"];
};

export default useWaterColor;
