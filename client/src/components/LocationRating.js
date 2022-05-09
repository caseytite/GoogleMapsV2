import React from "react";
import { useCallback } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";

const HalfRating = ({ rating, id, setPoints, point }) => {
  const updateRating = useCallback(
    (rate, id) => {
      if (!rate) return;
      axios.patch(`/locations/rating/${id}`, { rate }).then((res) => {
        setPoints((prev) => [...prev.filter((p) => p.id !== id), ...res.data]);
      });
    },
    [setPoints]
  );
  const getRating = (point) => {
    return point.numberofratings;
  };
  return (
    <>
      <Stack spacing={1}>
        <Rating
          name="half-rating"
          onClick={(e) => updateRating(e.target.value, id)}
          defaultValue={rating ? rating : 0}
          precision={0.5}
        />
      </Stack>
      <sub>{getRating(point)} Ratings</sub>
    </>
  );
};

export default React.memo(HalfRating);
