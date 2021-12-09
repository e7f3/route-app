import { useState } from "react";
import MarkerInfo from "../elements/MarkerInfo.jsx";
import Markers from "./Markers.jsx";
import MapPolyline from "./MapPolyline.jsx";
import MapInteractive from "./MapInteractive.jsx";

// Компонент карты Google Maps JS Api

/* 
  Раскоментировав часть кода, можно изменить функционал приложения, 
  отображение реальных маршрутов вместо прямых линий на карте.
  Режимы маршрутов : автомобиль, велосипед, пешеход, общественный транспорт
*/

/* Раскоментировать для изменения функционала */
/*
import MapDirections from "./MapDirections.jsx";
import TravelMode from "../elements/TravelMode.jsx";
*/

function Map({ isLoaded, loadError, mapRef, ...props }) {
  // Состояние для хранения id выбранного маркера
  const [selected, setSelected] = useState(null);

  /* Раскоментировать для изменения функционала */
  /*
  const [travelMode, setTravelMode] = useState("DRIVING");
*/

  // Заглушка на время загрузки карты
  if (loadError) {
    return <h1>Error loading maps</h1>;
  }
  // Заглушка в случае ошибки при загрузке карты
  if (!isLoaded) {
    return <h1>Loading maps</h1>;
  }

  return (
    <div className="map" {...props}>
      <div className="map__inner">
        {/* Раскоментировать для изменения функционала. Начало */}
        {/*
        <TravelMode travelMode={travelMode} setTravelMode={setTravelMode} />
        */}
        {/* Конец */}
        <MapInteractive mapRef={mapRef}>
          {/* Раскоментировать для изменения функционала. Начало */}
          {/*
          <MapDirections travelMode={travelMode}/>
          */}
          {/* Конец */}
          {/* Кастомные маркеры на карте */}
          <Markers setSelected={setSelected} />
          {/* Окна с информацией о маркерах */}
          {selected && (
            <MarkerInfo
              className="map__marker-info"
              selected={selected}
              setSelected={setSelected}
            />
          )}
          {/* Прямые линии маршрутов */}
          {/* Закоментировать для изменения функционала. Начало. */}
          <MapPolyline />
          {/* Конец */}
        </MapInteractive>
      </div>
    </div>
  );
}

export default Map;
