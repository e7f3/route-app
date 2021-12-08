import { Droppable, resetServerContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import PlaceCard from "./PlaceCard.jsx";

export default function PlacesList() {
  const placeIds = useSelector((state) => state.placesReducer.placeIds);

  return (
    <Droppable droppableId="places">
      {(provided, snapshot) => (
        <ul
          className="places__list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {placeIds.map((placeId, index) => {
            if (placeId) {
              return (
                <PlaceCard
                  className="places__list-item"
                  placeId={placeId}
                  index={index}
                  key={placeId}
                />
              );
            }
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {},
  };
}
