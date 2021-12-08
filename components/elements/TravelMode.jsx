import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";

export default function TravelMode({ travelMode, setTravelMode }) {
  const handleChange = (event, newTravelMode) => {
    setTravelMode(newTravelMode);
  };
  const control = {
    value: travelMode,
    onChange: handleChange,
    exclusive: true,
  };
  return (
    <div className="travel-mode">
      <ToggleButtonGroup size="small" {...control}>
        <ToggleButton value="DRIVING" key="Driving">
          <DirectionsCarIcon />
        </ToggleButton>
        <ToggleButton value="BICYCLING" key="Bicycling">
          <PedalBikeIcon />
        </ToggleButton>
        <ToggleButton value="WALKING" key="Walking">
          <DirectionsWalkIcon />
        </ToggleButton>
        <ToggleButton value="TRANSIT" key="Transit">
          <DirectionsTransitIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}