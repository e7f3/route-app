import { useSelector } from "react-redux";
import MapDirections from "./MapDirections.jsx";
import MapPolyline from "./MapPolyline.jsx";

// Компонент маршрутов на карте

export default function MapRoutes() {
  // Получение состояния из store
  const routeMode = useSelector((state) => state.routeReducer.routeMode);

  // Отображение маршрутов в зависимости от режима

  return routeMode === "DIRECTIONS" ? <MapDirections /> : <MapPolyline />;
}
