import { useCallback } from "react";
import { InfoWindow } from "@react-google-maps/api";
import InfoWindowForm from "./InfoWindowForm";
import axios from "axios";

const Window = ({
  addDescription,
  setAddDescription,
  info,
  setInfo,
  user,
  isPublic,
  setIsPublic,
  state,
  setState,
  setPoints,
}) => {
  const editMarker = useCallback(
    (title, description, id, tags) => {
      axios
        .put(`/locations/${id}`, { title, description, tags })
        .then((res) => {
          setAddDescription(false);
          setState((prev) => ({
            title: "",
            description: "",
            tags: "",
          }));

          return res;
        })
        .then((res) => {
          setInfo(null);
          setPoints((prev) => [
            ...prev.filter((marker) => marker.time !== info.time),
            ...res.data,
          ]);
          setInfo(...res.data);
        });
    },
    [info?.time, setPoints, setAddDescription, setInfo, setState]
  );

  const handlePublicSwitch = useCallback(
    (id) => {
      axios
        .patch(`/locations/${id.id}`)
        .then((res) => {
          setPoints((prev) => [
            ...prev.filter((point) => point.id !== id.id),
            res.data[0],
          ]);
          return res.data[0];
        })
        .then((res) => setIsPublic(res.ispublic))
        .catch((e) => console.log(e, "Fail"));
    },
    [setIsPublic, setPoints]
  );

  const vaildateUsersPin = useCallback((user, info) => {
    return user.id === info.user_id ? true : false;
  }, []);
  const deleteMarker = useCallback(
    (id) => {
      axios.delete(`/locations/${id}`).then((res) => {
        setAddDescription(false);
        setInfo(null);
        setPoints([...res.data]);
      });
    },
    [setPoints, setAddDescription, setInfo]
  );

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
