import { memo } from "react";
import "../../styles/Footer.css";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import useWaterColor from "../../hooks/useWaterColor";

const Footer = () => {
  const findWaterColor = useWaterColor();
  const [backgroundColor, logoColor, iconColor] = findWaterColor;

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: `${backgroundColor}` || "red",
      }}
    >
      <div className="footer-logo">
        <h2
          style={{
            color: `${logoColor}`,
          }}
        >
          <u>Mapps!</u>
        </h2>
        <AddLocationAltIcon
          sx={{
            color: `${iconColor}`,
            fontSize: "xx-large",
          }}
        />
      </div>
    </footer>
  );
};

export default memo(Footer);
