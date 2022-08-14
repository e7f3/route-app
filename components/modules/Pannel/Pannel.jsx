import styles from './Pannel.module.scss'

import Places from '../Places/Places.jsx'
import Map from '../Map/Map.jsx'
import usePannel from './usePannel'

// Компонент - панель со списком точек и картой

export default function Pannel() {
  const { isLoaded, loadError, mapRef, panTo } = usePannel()

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <Places isLoaded={isLoaded} panTo={panTo} />
        <Map isLoaded={isLoaded} loadError={loadError} mapRef={mapRef} />
      </div>
    </section>
  )
}
