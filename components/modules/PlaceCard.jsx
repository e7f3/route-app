import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import ExpandCard from "./ExpandCard.jsx";

// Компонент - точка в списке точек

export default function PlaceCard({ placeId, index, ...props }) {
  // Получение состояния из store
  const places = useSelector((state) => state.placesReducer.places);
  // Если точки нет в списке - вернуть пустой компонент
  if (!placeId || !places[placeId]) {
    return <></>;
  }
  return (
    <Draggable draggableId={placeId} index={index} key={placeId}>
      {(provided) => {
        return (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...props}
          >
            <div className="place-card">
              <ExpandCard place={places[placeId]} />
            </div>
          </li>
        );
      }}
    </Draggable>
  );
}
