import { InfoWindow } from "@react-google-maps/api";

// Компонент для окошек, открывающихся при клике на маркер на карте

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
