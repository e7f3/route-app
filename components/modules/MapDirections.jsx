import { DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RouteAlertBanner from "../elements/RouteAlertBanner.jsx";

export default function MapDirections({ travelMode }) {
  const placeIds = useSelector((state) => state.placesReducer.placeIds);
  const places = useSelector((state) => state.placesReducer.places);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      setError(null);
      if (placeIds.length > 1) {
        const transitModeCheck =
          travelMode === "TRANSIT" && placeIds.length > 2;
        const waypoints = placeIds.map((placeId) => ({
          location: { lat: places[placeId].lat, lng: places[placeId].lng },
          stopover: true,
        }));

        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;

        const params = (() => {
          if (transitModeCheck) {
            setError({
              message: "Exactly two waypoints required in transit travel mode!",
              severity: "warning",
            });
            return {
              origin,
              destination,
              travelMode,
            };
          }
          return { origin, destination, travelMode, waypoints };
        })();

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(params, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
            setError({
              message: "Route not found!",
              severity: "error",
            });
          }
        });
      } else {
        setDirections(null);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [placeIds, places, travelMode]);

  return (
    <>
      {error ? (
        <RouteAlertBanner message={error.message} severity={error.severity} />
      ) : (
        <></>
      )}
      {directions ? (
        <DirectionsRenderer
          options={{
            directions,
            draggable: true,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#90caf9",
            },
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
