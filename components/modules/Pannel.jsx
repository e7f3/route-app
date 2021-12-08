import { useRef, useCallback } from "react";
import { Container } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import Places from "./Places.jsx";
import Map from "./Map.jsx";

const libraries = ["places"];

export default function Pannel() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  return (
    <section className="pannel">
      <div className="pannel__inner">
        <Places isLoaded={isLoaded} loadError={loadError} panTo={panTo} />
        <Map isLoaded={isLoaded} loadError={loadError} mapRef={mapRef} />
      </div>
    </section>
  );
}
