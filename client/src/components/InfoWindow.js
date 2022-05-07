import { InfoWindow } from "@react-google-maps/api";
import InfoWindowForm from "./InfoWindowForm";

const Window = ({
  addDescription,
  setAddDescription,
  info,
  setInfo,
  user,
  vaildateUsersPin,
  isPublic,
  setIsPublic,
  handlePublicSwitch,
  deleteMarker,
  state,
  setState,
  editMarker,
}) => {
  return (
    <>
      {info ? (
        <InfoWindow
          position={{ lat: +info.lat, lng: +info.lng }}
          onCloseClick={() => {
            setInfo(null);
            setAddDescription(false);
          }}
        >
          <InfoWindowForm
            addDescription={addDescription}
            setAddDescription={setAddDescription}
            info={info}
            vaildateUsersPin={vaildateUsersPin}
            user={user}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            handlePublicSwitch={handlePublicSwitch}
            deleteMarker={deleteMarker}
            state={state}
            setState={setState}
            editMarker={editMarker}
          />
        </InfoWindow>
      ) : null}
    </>
  );
};

export default Window;
