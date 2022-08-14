import styles from './Places.module.scss'

import { useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import PlacesList from '../PlacesList/PlacesList.jsx'
import SearchPlace from '../SearchPlace/SearchPlace'
import RouteMode from '../../elements/RouteMode/RouteMode'
import usePlaces from './usePlaces'

// Компонент с поиском и списком точек

export default function Places({ isLoaded, panTo }) {
  const onDragEnd = usePlaces()
  const placesRef = useRef()
  const togglePlaces = () => {
    placesRef.current.classList.toggle(styles.shrink)
  }

  return (
    <div className={styles.wrapper} ref={placesRef}>
      <div className={styles.content}>
        <SearchPlace
          isLoaded={isLoaded}
          label='Input an address...'
          panTo={panTo}
        />
        <div className={styles.DnDArea}>
          <DragDropContext onDragEnd={onDragEnd}>
            <PlacesList />
          </DragDropContext>
        </div>
        <div className={styles.control}>
          <div className={styles.mode}>
            <RouteMode />
          </div>
        </div>
        <button className={styles.togglePlaces}>
          <input
            className={styles.checkbox}
            type='checkbox'
            id='placesToggle'
            onChange={togglePlaces}
          />
          <label className={styles.label} htmlFor='placesToggle' />
        </button>
      </div>
    </div>
  )
}
