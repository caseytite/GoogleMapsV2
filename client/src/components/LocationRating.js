import { useCallback, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";

export default function HalfRating({ rating, id, setPoints }) {
  console.log(id);
  const updateRating = useCallback((rating, id) => {
    axios.patch(`/locations/rating/${id}`, { rating }).then((res) => {
      console.log(res.data);
      setPoints((prev) => [...prev.filter((p) => p.id !== id), ...res.data]);
    });
  });
  console.log(rating);
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        onClick={(e) => updateRating(e.target.value, id)}
        defaultValue={rating}
        precision={0.5}
      />
    </Stack>
  );
}
