import Header from "./Header";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import "../styles/Landing.css";
const Landing = () => {
  return (
    <div className="bg-img">
      <Header />

      <div className="welcome">
        <h1>
          Welcome to <u>Maps!</u>
        </h1>
        <AddLocationAltIcon
          sx={{
            fontSize: "75px",
            color: "hsl(83deg 67% 60%)",
          }}
        />
      </div>
    </div>
  );
};

export default Landing;
