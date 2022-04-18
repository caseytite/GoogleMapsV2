import React, { useState, useCallback, useRef } from "react";
import Search from "./Search";
import LocateUser from "./LocateUser";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Data,
} from "@react-google-maps/api";
import { formatRelative, set } from "date-fns";
import mapStyles from "../mapStyles";
import "@reach/combobox/styles.css";
import "../styles/Map.css";
import axios from "axios";
import Input from "./Input";

const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};
const defaultLocation = {
  lat: 48.428421,
  lng: -123.365646,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = React.memo((props) => {
  const { points, setPoints } = props;
  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarker] = useState(points);
  const [info, setInfo] = useState(null);
  const [addDescription, setAddDescription] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [pointFilter, setPointFilter] = useState("");

  const onMapClick = useCallback((event) => {
    setMarker((prev) => {
      return [
        ...prev,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
          description,
          title,
        },
      ];
    });
    setAddDescription(false);
  }, []);

  const updateMarker = (title, description, tags, lat, lng) => {
    const currentMarker = markers.find((marker) => marker.time === info.time);
    // const otherMarkers = markers.filter((marker) => marker.time !== info.time);
    currentMarker.description = description;
    currentMarker.title = title;
    // setPoints([...points, currentMarker]);
    // setMarker([...otherMarkers, currentMarker]);
    axios
      .post("/user", { title, description, tags, lat, lng })
      .then((res) => setPoints([res.data]));

    setAddDescription(false);
    setTitle("");
    setDescription("");
    setTags("");
  };

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

  const marks = markers.map((marker) => (
    <Marker
      key={marker.time}
      position={{
        lat: +marker.lat,
        lng: +marker.lng,
      }}
      icon={{
        url: "/hand-point-right-solid.svg",
        scaledSize: new window.google.maps.Size(20, 20),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(22, 5),
      }}
      animation={2}
      onClick={() => {
        setInfo(marker);
      }}
    />
  ));
  const pointSpots = points
    .filter((point) => {
      const regex = new RegExp(pointFilter, "gi");
      return regex.test(point.title || point.tags);
    })
    .map((point) => (
      <Marker
        key={point.time}
        position={{
          lat: +point.lat,
          lng: +point.lng,
        }}
        icon={{
          url: "/hand-point-right-solid.svg",
          scaledSize: new window.google.maps.Size(20, 20),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(22, 5),
        }}
        animation={2}
        onClick={() => {
          setInfo(point);
        }}
      />
    ));

  return (
    <div>
      <Search moveTo={moveTo} />
      <LocateUser moveTo={moveTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={defaultLocation}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={options}
      >
        {marks}
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
                  <button onClick={() => setAddDescription(true)}>
                    Add Details
                  </button>
                </div>
              )}
              {addDescription && (
                <div className="inputs">
                  <h3>Add Title</h3>
                  <Input
                    value={title}
                    onChange={setTitle}
                    placeholder={"Title"}
                  />
                  <h3>Add Description</h3>
                  <Input
                    value={description}
                    onChange={setDescription}
                    placeholder={"Description"}
                  />
                  <h3>Add Tags</h3>
                  <Input
                    value={tags}
                    onChange={setTags}
                    placeholder={"Add Tags"}
                  />
                  <button
                    onClick={() =>
                      updateMarker(title, description, tags, info.lat, info.lng)
                    }
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </InfoWindow>
        ) : null}
        <Input
          className="point-search"
          value={pointFilter}
          onChange={setPointFilter}
          placeholder={"Search your locations"}
        />
      </GoogleMap>
    </div>
  );
});

export default Map;
