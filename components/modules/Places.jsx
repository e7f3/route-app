import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setPlaceIdsAction } from "../../store/placesReducer";
import PlacesList from "./PlacesList.jsx";
import Search from "./Search.jsx";

// Компонент с поиском и списком точек

export default function Places({ isLoaded, panTo }) {
  const dispatch = useDispatch();

  // Получение состояния из store
  const placeIds = useSelector((state) => state.placesReducer.placeIds);

  // При перетаскивании точки в списке
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Установить новый порядок точек в списке точек
    const newPlaceIds = Array.from(placeIds);
    newPlaceIds.splice(source.index, 1);
    newPlaceIds.splice(destination.index, 0, draggableId);
    dispatch(setPlaceIdsAction(newPlaceIds));
  };

  return (
    <div className="places">
      <div className="places__inner">
        <Search isLoaded={isLoaded} label="Input an address..." panTo={panTo} />
        <div className="places__actual">
          <DragDropContext onDragEnd={onDragEnd}>
            <PlacesList />
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
