import { useRef, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Places from "./Places.jsx";
import Map from "./Map.jsx";

// Компонент - панель со списком точек и картой

// Библиотеки для карты
const libraries = ["places"];

export default function Pannel() {
  // Обращение для загрузки карты
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries,
  });

  // Ref карты
  const mapRef = useRef();

  // При добавлении точки через поиск
  const panTo = useCallback(({ lat, lng }) => {
    // Постовить маркер на карту
    mapRef.current.panTo({ lat, lng });
    // Приблизить
    mapRef.current.setZoom(14);
  }, []);

  return (
    <section className="pannel">
      <div className="pannel__inner">
        <Places isLoaded={isLoaded} panTo={panTo} />
        <Map isLoaded={isLoaded} loadError={loadError} mapRef={mapRef} />
      </div>
    </section>
  );
}
