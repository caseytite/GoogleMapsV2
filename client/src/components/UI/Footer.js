import React from "react";
import "../../styles/Footer.css";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
const Footer = ({ style }) => {
  const findWaterColor = (style) => {
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
    return ["hsl(198deg 100% 43%)", "black", "hsl(83deg 67% 60%)"];
  };
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: `${findWaterColor(style)[0]}` || "red",
      }}
    >
      <div className="footer-logo">
        <h2
          style={{
            color: `${findWaterColor(style)[1]}`,
          }}
        >
          Mapps!
        </h2>
        <AddLocationAltIcon
          sx={{
            color: `${findWaterColor(style)[2]}`,
            fontSize: "xx-large",
          }}
        />
      </div>
    </footer>
  );
};

export default React.memo(Footer);
