import Input from "./UI/Input";
import Button from "./UI/Button";
import LocateUser from "../components/LocateUser";
import { styles, altStyle } from "../mapStyles/mapStyles";
import mapStyles from "../mapStyles/mapStyles";
import "../styles/UserDashboard.css";

const UserDashboard = ({
  style,
  setStyle,
  pointFilter,
  setPointFilter,
  moveTo,
  user,
  changeStyle,
}) => {
  return (
    <>
      <div className="dashboard-hdr">
        {user && <h1>{user.first_name}'s Locations</h1>}
        {!user && <h1>Your Locations</h1>}
        <div className="btn-container">
          <Button
            onClick={() => {
              // style === styles ? setStyle(altStyle) : setStyle(styles)
              changeStyle(mapStyles);
            }}
            children={"Style!"}
            // btnClass={"change-style"}
          />
          <LocateUser moveTo={moveTo} />
        </div>
      </div>
      <hr />
      <Input
        className="point-search"
        value={pointFilter}
        onChange={setPointFilter}
        placeholder={"Filter Locations - Tags"}
      />
    </>
  );
};

export default UserDashboard;
