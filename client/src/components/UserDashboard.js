import Input from "./UI/Input";
import Button from "./UI/Button";
import LocateUser from "../components/LocateUser";
import mapStyles from "../mapStyles/mapStyles";
import "../styles/UserDashboard.css";

const UserDashboard = ({
  pointFilter,
  setPointFilter,
  moveTo,
  changeStyle,
  info,
}) => {
  return (
    <>
      <div className="dashboard-hdr">
        <div className="location-filter">
          <h2>Search your locations!</h2>
          <Input
            className="point-search"
            value={pointFilter}
            onChange={setPointFilter}
            placeholder={"Filter Locations - Tags"}
          />
        </div>
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
      <div className="point-info">
        {info?.title && <h2>{info.title}</h2>}
        {info?.description && <h4>Description</h4>}
        {info?.description && <p>Description: {info.description}</p>}
        {info?.tags && <h4>Tags </h4>}
        {info?.tags && <p>Tags: {info.tags}</p>}
      </div>
    </>
  );
};

export default UserDashboard;
