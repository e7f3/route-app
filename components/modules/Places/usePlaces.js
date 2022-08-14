import { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceIdsAction } from '../../../store/placesReducer'

const usePlaces = () => {
  const dispatch = useDispatch()
  const placesRef = useRef()

  // Получение состояния из store
  const placeIds = useSelector((state) => state.placesReducer.placeIds)

  // При перетаскивании точки в списке
  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result
      if (!destination) {
        return
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }
      // Установить новый порядок точек в списке точек
      const newPlaceIds = Array.from(placeIds)
      newPlaceIds.splice(source.index, 1)
      newPlaceIds.splice(destination.index, 0, draggableId)
      dispatch(setPlaceIdsAction(newPlaceIds))
    },
    [placeIds]
  )

  const togglePlaces = () => {
    placesRef.current.classList.toggle(styles.shrink)
  }

  return { onDragEnd, placesRef, togglePlaces }
}

export default usePlaces
