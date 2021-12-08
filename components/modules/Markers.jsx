import { useDispatch, useSelector } from "react-redux";
import {
  getAddressFromCoordsAction,
  removePlaceAction,
  updatePlaceAction,
} from "../../store/placesReducer";
import { Marker } from "@react-google-maps/api";

export default function Markers({ setSelected }) {
  const dispatch = useDispatch();
  const placeIds = useSelector((state) => state.placesReducer.placeIds);
  const places = useSelector((state) => state.placesReducer.places);

  const onDragEnd = (event, placeId) => {
    const newPlace = {
      id: placeId,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    dispatch(getAddressFromCoordsAction(newPlace));
  };

  const onClick = (placeId) => {
    setSelected(places[placeId]);
    console.log(places[placeId])
    //dispatch(removePlaceAction(placeId));
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
