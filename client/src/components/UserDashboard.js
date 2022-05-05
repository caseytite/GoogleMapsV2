import Input from "./UI/Input";
import Button from "./UI/Button";
import LocateUser from "../components/LocateUser";
import mapStyles from "../mapStyles/mapStyles";
import "../styles/UserDashboard.css";

const UserDashboard = ({
  pointFilter,
  setPointFilter,
  moveTo,
  user,
  changeStyle,
}) => {
  return (
    <>
      <div className="dashboard-hdr">
        <Input
          className="point-search"
          value={pointFilter}
          onChange={setPointFilter}
          placeholder={"Filter Locations - Tags"}
        />
        <div className="btn-container">
          <Button
            onClick={() => {
              changeStyle(mapStyles);
            }}
            children={"Style!"}
          />
          <LocateUser moveTo={moveTo} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default UserDashboard;
