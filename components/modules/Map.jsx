import { GoogleMap, Polyline } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import MarkerInfo from "../elements/MarkerInfo.jsx";
import {
  addPlaceAction,
  getAddressFromCoordsAction,
} from "../../store/placesReducer";
import mapStyles from "../../utils/mapStyles";
import Markers from "./Markers.jsx";

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

// Настройка карты

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 51.523772,
  lng: -0.158538,
};
const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// Настройка линии маршрута

const polylineOptions = {
  strokeColor: "#90caf9",
};

function Map({ isLoaded, loadError, mapRef, ...props }) {
  const dispatch = useDispatch();

  // Получение состояния из store
  const placeIds = useSelector((state) => state.placesReducer.placeIds);
  const places = useSelector((state) => state.placesReducer.places);

  // Состояние для хранения id выбранного маркера
  const [selected, setSelected] = useState(null);

  /* Раскоментировать для изменения функционала */
  /*
  const [travelMode, setTravelMode] = useState("DRIVING");
*/

  // При клике по карте
  const onClick = useCallback((event) => {
    // Генерация уникального id
    const id = uuidv4();
    // Создание объекта точки
    const newPlace = {
      id,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    // Добавление точки в список точек
    dispatch(addPlaceAction(newPlace));
    // Запрос на декодирование координат точки в адрес
    // и добавление этой информации в объект точки
    dispatch(getAddressFromCoordsAction(newPlace));
  }, []);

  // При загрузке карты установить реф
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

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
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={mapOptions}
          onClick={onClick}
          onLoad={onMapLoad}
        >
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
          <Polyline
            path={placeIds.map((placeId) => ({
              lat: places[placeId].lat,
              lng: places[placeId].lng,
            }))}
            options={polylineOptions}
          />
          {/* Конец */}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
