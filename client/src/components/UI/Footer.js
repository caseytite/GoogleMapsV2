import "../../styles/Footer.css";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h2>Mapps!</h2>
        <AddLocationAltIcon
          sx={{
            color: "hsl(83deg 67% 60%)",
            fontSize: "xx-large",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
