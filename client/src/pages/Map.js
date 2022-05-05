import React, { useState, useCallback, useRef } from "react";
import Search from "../components/Search";
import LocateUser from "../components/LocateUser";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { styles, altStyle } from "../mapStyles/mapStyles";
import { mapStyles } from "../mapStyles/mapStyles";
import "@reach/combobox/styles.css";
import "../styles/Map.css";
import axios from "axios";
import Input from "../components/UI/Input";
import { Switch } from "@mui/material";
import Button from "../components/UI/Button";
import UserDashboard from "../components/UserDashboard";

const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};

const defaultLocation = {
  lat: 48.428421,
  lng: -123.365646,
};

const Map = ({ points, setPoints, user, changeStyle, style, setStyle }) => {
  // const [style, setStyle] = useState();
  const options = {
    styles: style,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [info, setInfo] = useState(null);
  const [addDescription, setAddDescription] = useState(false);
  const [pointFilter, setPointFilter] = useState("");

  const [isPublic, setIsPublic] = useState("");

  const [state, setState] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const updateMarker = useCallback(
    (lat, lng) => {
      axios
        .post("/locations", { lat, lng })
        .then((res) => setPoints((prev) => [...prev, ...res.data]));

      setAddDescription(false);
      setState((prev) => ({
        title: "",
        description: "",
        tags: "",
      }));
    },
    [setPoints]
  );

  const onMapClick = useCallback(
    (event) => {
      if (event.placeId) {
        return;
      }
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      updateMarker(lat, lng);
    },
    [updateMarker]
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
          const otherMarkers = points.filter(
            (marker) => marker.time !== info.time
          );
          setInfo(null);
          setPoints((prev) => [
            ...prev.filter((marker) => marker.time !== info.time),
            ...res.data,
          ]);
          setInfo(...res.data);
        });
    },
    [info?.time, points, setPoints]
  );

  const deleteMarker = useCallback(
    (id) => {
      axios.delete(`/locations/${id}`).then((res) => {
        setAddDescription(false);
        setInfo(null);
        setPoints([...res.data]);
      });
    },
    [setPoints]
  );

  const vaildateUsersPin = useCallback((user, info) => {
    return user.id === info.user_id ? true : false;
  }, []);

  const mapReference = useRef();
  const onMapLoad = useCallback((map) => {
    mapReference.current = map;
  }, []);

  // const changeStyle = (styles) => {
  //   const removeStyle = styles.shift();
  //   styles.push(removeStyle);
  //   setStyle(styles[0]);
  // };

  const moveTo = useCallback(({ lat, lng }) => {
    mapReference.current.panTo({ lat, lng });
    mapReference.current.setZoom(15);
  }, []);

  if (loadError) return "Error on map load";
  if (!isLoaded) return "Loading maps";

  const pointSpots = points
    .filter((point) => {
      const regex = new RegExp(pointFilter, "gi");
      return regex.test(point.title) || regex.test(point.tags);
    })
    .map((point) => (
      <Marker
        key={point.id}
        position={{
          lat: +point.lat,
          lng: +point.lng,
        }}
        animation={2}
        onClick={() => {
          setInfo(point);
          setIsPublic(point.ispublic);
        }}
      />
    ));

  return (
    <div className="map-container">
      <Search moveTo={moveTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={defaultLocation}
        onClick={info ? null : onMapClick}
        onLoad={onMapLoad}
        options={options}
      >
        {pointSpots}

        {info ? (
          <InfoWindow
            position={{ lat: +info.lat, lng: +info.lng }}
            onCloseClick={() => {
              setInfo(null);
              setAddDescription(false);
            }}
          >
            <div>
              {!addDescription && (
                <div>
                  <h2>{!info.title ? "Your new pin!" : info.title} </h2>
                  <p>Created {new Date(info.time).toDateString()}</p>
                  {info.description && <p>{info.description}</p>}
                  {vaildateUsersPin(user, info) && (
                    <button
                      onClick={() =>
                        setAddDescription(true) && setIsPublic(info.ispublic)
                      }
                    >
                      Edit Details
                    </button>
                  )}
                </div>
              )}
              {addDescription && (
                <div className="inputs">
                  <span className="switch">
                    <h3>{`Set ${isPublic ? "Private" : "Public"} `}</h3>
                    <Switch
                      size="small"
                      onClick={() => handlePublicSwitch(info)}
                      checked={isPublic}
                      color={isPublic ? "warning" : "default"}
                    />
                  </span>
                  <h3>Title</h3>

                  <Input
                    value={state.title}
                    onChange={(e) => {
                      setState((prev) => ({
                        ...prev,
                        title: e,
                      }));
                    }}
                    placeholder={"Title"}
                    required={true}
                  />
                  <h3>Description</h3>
                  <Input
                    value={state.description}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        description: e,
                      }))
                    }
                    placeholder={"Description"}
                    required={true}
                  />
                  <h3>Tags</h3>
                  <Input
                    value={state.tags}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        tags: e,
                      }))
                    }
                    placeholder={"Add Tags"}
                    required={true}
                  />
                  <div className="edit-delete">
                    <button
                      onClick={() => {
                        {
                          state.title &&
                            state.description &&
                            state.tags &&
                            editMarker(
                              state.title,
                              state.description,
                              info.id,
                              state.tags
                            );
                        }
                      }}
                    >
                      Save
                    </button>
                    <button onClick={() => deleteMarker(info.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <UserDashboard
        style={style}
        setStyle={setStyle}
        pointFilter={pointFilter}
        setPointFilter={setPointFilter}
        moveTo={moveTo}
        user={user}
        changeStyle={changeStyle}
      />
    </div>
  );
};

export default React.memo(Map);
