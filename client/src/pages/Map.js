import React, { useState, useCallback, useRef } from "react";
import Search from "../components/Search";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import "../styles/Map.css";
import axios from "axios";
import Input from "../components/UI/Input";
import { Switch } from "@mui/material";
import UserDashboard from "../components/UserDashboard";
import InfoWindowForm from "../components/InfoWindowForm";

const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};

const defaultLocation = {
  lat: 48.428421,
  lng: -123.365646,
};

const Map = ({ points, setPoints, user, changeStyle, style, setStyle }) => {
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
          setInfo(null);
          setPoints((prev) => [
            ...prev.filter((marker) => marker.time !== info.time),
            ...res.data,
          ]);
          setInfo(...res.data);
        });
    },
    [info?.time, setPoints]
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

  const moveTo = useCallback(({ lat, lng }) => {
    mapReference.current.panTo({ lat, lng });
    mapReference.current.setZoom(15);
  }, []);

  if (loadError) return "Error on map load";
  if (!isLoaded) return "Loading maps";

  const usersPins = points
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
        {usersPins}

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
      </GoogleMap>
      <UserDashboard
        style={style}
        setStyle={setStyle}
        pointFilter={pointFilter}
        setPointFilter={setPointFilter}
        moveTo={moveTo}
        changeStyle={changeStyle}
        info={info}
      />
    </div>
  );
};

export default React.memo(Map);
