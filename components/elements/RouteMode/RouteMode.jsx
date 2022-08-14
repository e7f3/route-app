import styles from './RouteMode.module.scss'

import { useDispatch } from 'react-redux'
import { ToggleRouteModeAction } from '../../../store/routeReducer'
import { Button } from '@mui/material'

// Компонент для изменения режима отображения маршрутов

export default function RouteMode() {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(ToggleRouteModeAction())
  }
  return (
    <div className={styles.wrapper}>
      <Button onClick={onClick} variant='outlined' color='neutral'>
        Change route mode
      </Button>
    </div>
  )
}
