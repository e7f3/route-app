import styles from './Map.module.scss'

import { useState } from 'react'
import MarkerInfo from '../../elements/MarkerInfo/MarkerInfo.jsx'
import Markers from '../Markers.jsx'
import MapInteractive from '../MapInteractive.jsx'
import MapRoutes from '../MapRoutes.jsx'
import TravelMode from '../../elements/TravelMode/TravelMode.jsx'
import AlertBanner from '../../elements/AlertBanner.jsx'
import Progress from '../../elements/Progress.jsx'

// Компонент карты Google Maps JS Api

function Map({ isLoaded, loadError, mapRef, ...props }) {
  // Состояние для хранения id выбранного маркера
  const [selected, setSelected] = useState(null)

  // Заглушка на время загрузки карты
  if (loadError) {
    return <AlertBanner severity='error' message='Error loading maps!' />
  }
  // Заглушка в случае ошибки при загрузке карты
  if (!isLoaded) {
    return <Progress className='map__progress' />
  }

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.content}>
        {/* Переключение режимов построения маршрута */}
        <TravelMode />

        {/* Карта Google */}
        <MapInteractive mapRef={mapRef}>
          {/* Маршруты */}
          <MapRoutes />

          {/* Кастомные маркеры на карте */}
          <Markers setSelected={setSelected} />

          {/* Окна с информацией о маркерах */}
          {selected && (
            <MarkerInfo
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </MapInteractive>
      </div>
    </div>
  )
}

export default Map
