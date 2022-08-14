import styles from './MarkerInfo.module.scss'

import { InfoWindow } from '@react-google-maps/api'
import { useDispatch } from 'react-redux'
import { removePlaceAction } from '../../../store/placesReducer'

// Компонент для окошек, открывающихся при клике на маркер на карте

export default function MarkerInfo({ selected, setSelected }) {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(removePlaceAction(selected.id))
    setSelected(null)
  }

  return (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => setSelected(null)}
    >
      <div className={styles.content}>
        <div className={styles.text}>{selected?.address?.formattedAddress}</div>
        <button className={styles.button} onClick={handleClick}>
          DELETE
        </button>
      </div>
    </InfoWindow>
  )
}
