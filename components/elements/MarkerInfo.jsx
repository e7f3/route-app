import { InfoWindow } from "@react-google-maps/api";

export default function MarkerInfo({ selected, setSelected, className }) {
  return (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => setSelected(null)}
    >
      <div className={className}>{selected?.address?.formattedAddress}</div>
    </InfoWindow>
  );
}
