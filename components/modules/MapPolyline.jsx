import { Polyline } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Компонент маршрутов между точками

// Настройка линии маршрута

const polylineOptions = {
  strokeColor: "#90caf9",
};

export default function MapPolyline() {
  // Получение состояния из store
  const placeIds = useSelector((state) => state.placesReducer.placeIds);
  const places = useSelector((state) => state.placesReducer.places);

  // Состояние для хранения маршрута
  const [path, setPath] = useState([]);

  useEffect(() => {
    // Обновление маршрута при изменении списка точек
    setPath(
      placeIds.map((placeId) => ({
        lat: places[placeId].lat,
        lng: places[placeId].lng,
      }))
    );
  }, [placeIds, places]);

  return <Polyline path={path} options={polylineOptions} />;
}
