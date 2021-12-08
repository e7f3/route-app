import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemovePlaceButton from "../elements/RemovePlaceButton.jsx";
import MyTable from "../elements/MyTable.jsx";

const labels = ["Lattitude:", "Longitude:"];

export default function ExpandCard({ place }) {
  if (!place) {
    return <></>;
  }
  const [summary, setSummary] = useState("Loading address...");
  useEffect(() => {
    if (place.hasOwnProperty("address")) {
      setSummary(place.address.formattedAddress);
    }
  }, [place]);
  const { lat, lng } = place;

  return (
    <Accordion sx={{ border: "1px solid #eee" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <RemovePlaceButton placeId={place.id} />
        <Typography>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MyTable size="small" labels={labels} values={[lat, lng]} />
      </AccordionDetails>
    </Accordion>
  );
}
