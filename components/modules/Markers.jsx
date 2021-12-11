import { useDispatch, useSelector } from "react-redux";
import { getAddressFromCoordsAction } from "../../store/placesReducer";
import { Marker } from "@react-google-maps/api";

// Компонент маркеров

export default function Markers({ setSelected }) {
  const dispatch = useDispatch();

  // Получение состояния из store
  const { places, placeIds } = useSelector((state) => state.placesReducer);

  // При перетаскивании маркера
  const onDragEnd = (event, placeId) => {
    // Обновление координат точки
    const newPlace = {
      id: placeId,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    // Запрос на декодирование координат точки в адрес
    // и добавление этой информации в объект точки
    dispatch(getAddressFromCoordsAction(newPlace));
  };

  // При клике на маркер изменить состояние
  const onClick = (placeId) => {
    setSelected(places[placeId]);
  };

  return (
    <>
      {placeIds.map((placeId) => {
        if (placeId && places[placeId]) {
          return (
            <Marker
              key={placeId}
              position={{
                lat: places[placeId].lat,
                lng: places[placeId].lng,
              }}
              icon={{
                url: "/icons/place_icon.svg",
              }}
              draggable={true}
              onDragEnd={(event) => onDragEnd(event, placeId)}
              onClick={() => onClick(placeId)}
            />
          );
        }
      })}
    </>
  );
}
