import React, { useState, useCallback, useRef } from "react";
import Search from "../components/Search";
import LocateUser from "../components/LocateUser";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { styles } from "../mapStyles/mapStyles";
import "@reach/combobox/styles.css";
import "../styles/Map.css";
import axios from "axios";
import Input from "../components/UI/Input";

const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};

const defaultLocation = {
  lat: 48.428421,
  lng: -123.365646,
};

const options = {
  styles,
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

  const [info, setInfo] = useState(null);
  const [addDescription, setAddDescription] = useState(false);
  const [pointFilter, setPointFilter] = useState("");

  const [state, setState] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    updateMarker(lat, lng);
    setAddDescription(false);
  }, []);

  const updateMarker = (lat, lng) => {
    axios
      .post("/locations", { lat, lng })
      .then((res) => setPoints((prev) => [...prev, ...res.data]));

    setAddDescription(false);
    setState((prev) => ({
      title: "",
      description: "",
      tags: "",
    }));
  };

  const editMarker = (title, description, id, tags) => {
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
        setPoints([...otherMarkers, ...res.data]);
        setInfo(...res.data);
      });
  };

  const deleteMarker = (id) => {
    axios.delete(`/locations/${id}`).then((res) => {
      setAddDescription(false);
      setInfo(null);
      setPoints([...res.data]);
    });
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
        animation={2}
        onClick={() => {
          setInfo(point);
        }}
      />
    ));

  return (
    <div className="map-container">
      <Search moveTo={moveTo} />
      <LocateUser moveTo={moveTo} />

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
                  <button onClick={() => setAddDescription(true)}>
                    Edit Details
                  </button>
                </div>
              )}
              {addDescription && (
                <div className="inputs">
                  <h3>Add Title</h3>
                  <Input
                    value={state.title}
                    onChange={(e) => {
                      setState((prev) => ({
                        ...prev,
                        title: e,
                      }));
                    }}
                    placeholder={"Title"}
                  />
                  <h3>Add Description</h3>
                  <Input
                    value={state.description}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        description: e,
                      }))
                    }
                    placeholder={"Description"}
                  />
                  <h3>Add Tags</h3>
                  <Input
                    value={state.tags}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        tags: e,
                      }))
                    }
                    placeholder={"Add Tags"}
                  />
                  <div className="edit-delete">
                    <button
                      onClick={() =>
                        editMarker(
                          state.title,
                          state.description,
                          info.id,
                          state.tags
                        )
                      }
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
        <Input
          className="point-search"
          value={pointFilter}
          onChange={setPointFilter}
          placeholder={"Filter Locations - Tags"}
        />
      </GoogleMap>
    </div>
  );
});

export default Map;
