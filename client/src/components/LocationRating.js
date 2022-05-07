import { useCallback } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";

export default function HalfRating({ rating, id, setPoints }) {
  const updateRating = useCallback(
    (rating, id) => {
      axios.patch(`/locations/rating/${id}`, { rating }).then((res) => {
        setPoints((prev) => [...prev.filter((p) => p.id !== id), ...res.data]);
      });
    },
    [setPoints]
  );
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
