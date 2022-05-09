import React from "react";
import { useCallback, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";

const HalfRating = ({ rating, id, setPoints, point }) => {
  const [numOfRatings, setNumofRatings] = useState(point.numberofratings);
  const updateRating = useCallback(
    (rate, id) => {
      if (!rate) return;
      axios.patch(`/locations/rating/${id}`, { rate }).then((res) => {
        setPoints((prev) => [...prev.filter((p) => p.id !== id), ...res.data]);
        setNumofRatings(res.data[0].numberofratings);
      });
    },
    [setPoints]
  );
  const getRating = (rating) => {
    return rating ? rating : 0;
  };

  return (
    <>
      <Stack spacing={1}>
        <Rating
          name="half-rating"
          onClick={(e) => updateRating(e.target.value, id)}
          defaultValue={getRating(rating)}
          precision={0.5}
        />
      </Stack>
      <sub>{numOfRatings} Ratings</sub>
    </>
  );
};

export default React.memo(HalfRating);
