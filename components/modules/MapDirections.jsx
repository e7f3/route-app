import { DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RouteAlertBanner from "../elements/RouteAlertBanner.jsx";

// Компонент маршрутов для работы с Google Directions Api

export default function MapDirections({ travelMode }) {
  // Получение состояния из store
  const placeIds = useSelector((state) => state.placesReducer.placeIds);
  const places = useSelector((state) => state.placesReducer.places);
  // Состояние для хранения маршрутов
  const [directions, setDirections] = useState(null);
  // Состояние для ошибок
  const [error, setError] = useState(null);

  useEffect(async () => {
    // Создание маршрутов с помощью Google Direction Service
    try {
      setError(null);

      // Проверка количества точек
      if (placeIds.length > 1) {
        // Создание списка промежуточных точек
        const waypoints = placeIds.map((placeId) => ({
          location: { lat: places[placeId].lat, lng: places[placeId].lng },
          stopover: true,
        }));
        // Начало маршрута
        const origin = waypoints.shift().location;
        // Конец маршрута
        const destination = waypoints.pop().location;

        // Проверка на режим
        // (в режиме общественного транспорта нет промежуточных точек)
        const transitModeCheck =
          travelMode === "TRANSIT" && placeIds.length > 2;

        // Параметры Direction Service
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

        // Построение маршрута
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
