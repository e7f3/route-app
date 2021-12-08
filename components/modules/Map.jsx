import { GoogleMap, Polyline } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import MarkerInfo from "../elements/MarkerInfo.jsx";
/*
import MapDirections from "./MapDirections.jsx";
import TravelMode from "../elements/TravelMode.jsx";
*/

import {
  addPlaceAction,
  getAddressFromCoordsAction,
} from "../../store/placesReducer";
import mapStyles from "../../utils/mapStyles";
import Markers from "./Markers.jsx";

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
const polylineOptions = {
  strokeColor: "#90caf9",
};

function Map({ isLoaded, loadError, mapRef, ...props }) {
  const dispatch = useDispatch();
  const placeIds = useSelector((state) => state.placesReducer.placeIds);
  const places = useSelector((state) => state.placesReducer.places);
  const [selected, setSelected] = useState(null);

  /*
  const [travelMode, setTravelMode] = useState("DRIVING");
*/
  const onClick = useCallback((event) => {
    const id = uuidv4();
    const newPlace = {
      id,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    dispatch(addPlaceAction(newPlace));
    dispatch(getAddressFromCoordsAction(newPlace));
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return <h1>Error loading maps</h1>;
  }
  if (!isLoaded) {
    return <h1>Loading maps</h1>;
  }

  return (
    <div className="map" {...props}>
      <div className="map__inner">
        {/*
        <TravelMode travelMode={travelMode} setTravelMode={setTravelMode} />
        */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={mapOptions}
          onClick={onClick}
          onLoad={onMapLoad}
        >
          {/*
          <MapDirections travelMode={travelMode}/>
          */}
          <Markers setSelected={setSelected} />
          {selected && (
            <MarkerInfo
              className="map__marker-info"
              selected={selected}
              setSelected={setSelected}
            />
          )}
          <Polyline
            path={placeIds.map((placeId) => ({
              lat: places[placeId].lat,
              lng: places[placeId].lng,
            }))}
            options={polylineOptions}
          />
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
