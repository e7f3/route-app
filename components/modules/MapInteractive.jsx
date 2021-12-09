import { GoogleMap } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addPlaceAction, getAddressFromCoordsAction } from "../../store/placesReducer";
import { v4 as uuidv4 } from "uuid";
import mapStyles from "../../utils/mapStyles";

// Компонент - Google map

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

export default function MapInteractive({ mapRef, children }) {
  const dispatch = useDispatch();

  // Установка ref при загрузке карты
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

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
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={mapOptions}
      onClick={onClick}
      onLoad={onMapLoad}
    >
      {children}
    </GoogleMap>
  );
}
