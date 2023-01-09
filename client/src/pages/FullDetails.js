import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocationRating from "../components/LocationRating";
import Button from "../components/UI/Button";
import axios from "axios";

const FullDetails = () => {
  const id = useLocation().state.id;
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    title: null,
    creationDate: null,
    tags: null,
    description: null,
    isPublic: null,
    rating: null,
  });

  useEffect(() => {
    axios.get(`/locations/full-details/${id}`).then((res) => {
      setDetails({
        title: res.data.title,
        creationDate: res.data.time,
        tags: res.data.tags,
        description: res.data.description,
        isPublic: res.data.ispublic,
        numberOfRatings: res.data.numberofratings,
        rating: res.data.rating / res.data.numberofratings,
      });
    });
  }, [id]);

  const handleBackToMap = (e) => {
    e.preventDefault();
    navigate("/map");
  };

  console.log("details", details);

  return (
    <div style={{ margin: "0 20px" }}>
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <h1>Full Details for {details.title}</h1>
        <LocationRating
          rating={details.rating && details.rating}
          id={id}
          point={{ numberofratings: details.numberOfRatings }}
        />
      </span>
      <hr />
      <span>
        <h4>Created on {new Date(details.creationDate).toDateString()}</h4>
        <h4>{details.isPublic ? "Public" : "Private"} Location</h4>
      </span>
      <p>
        {details.description} Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Eligendi, facere at. Natus, voluptatum iste, saepe,
        voluptates animi totam consequuntur architecto assumenda suscipit
        incidunt quae repellat necessitatibus atque rerum corrupti doloremque?
        Voluptas aspernatur veniam assumenda voluptates nemo omnis maiores
        beatae atque harum quia. Maxime aperiam fuga odit sequi, rem repellat
        at. Dicta natus vel perspiciatis. Incidunt cum beatae ut nihil dicta?
        Vel similique maxime velit modi, praesentium ea dicta obcaecati nam ex
        ipsa eveniet, consequatur tenetur alias nisi accusantium. Assumenda
        inventore provident cupiditate laudantium aut doloremque molestiae fugit
        sequi dolor sint.
      </p>
      <p>Tags: {details.tags}</p>
      <Button onClick={handleBackToMap}>Back</Button>
    </div>
  );
};

export default FullDetails;
