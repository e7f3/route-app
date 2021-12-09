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

// Компонент - аккордеон, при клике раскрывает подробную информацию
// о точке в списке точек

const labels = ["Lattitude:", "Longitude:"];

export default function ExpandCard({ place }) {
  // Если точка удалена, возвращает пустой компонент
  if (!place) {
    return <></>;
  }

  // Если ответ на запрос о адресе точки ещё не пришёл, показывать вместо адреса заглушку
  const [summary, setSummary] = useState("Loading address...");

  // Если ответ на запрос пришёл - показывать адрес
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
