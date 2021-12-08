import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setPlaceIdsAction } from "../../store/placesReducer";
import PlacesList from "./PlacesList.jsx";
import Search from "./Search.jsx";

export default function Places({ isLoaded, loadError, panTo }) {
  const dispatch = useDispatch();
  const placeIds = useSelector((state) => state.placesReducer.placeIds);

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
    const newPlaceIds = Array.from(placeIds);
    newPlaceIds.splice(source.index, 1);
    newPlaceIds.splice(destination.index, 0, draggableId);
    dispatch(setPlaceIdsAction(newPlaceIds));
  };

  return (
    <div className="places">
      <div className="places__inner">
      <Search isLoaded={isLoaded} label="Input an address..." panTo={panTo}/>
        <div className="places__actual">
          <DragDropContext onDragEnd={onDragEnd}>
            <PlacesList />
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
