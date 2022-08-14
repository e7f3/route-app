import { useRef, useCallback } from 'react'
import { useLoadScript } from '@react-google-maps/api'

const API_KEY = process?.env?.NEXT_PUBLIC_API_KEY ?? ''

// Библиотеки для карты
const libraries = ['places']

const usePannel = () => {
  // Обращение для загрузки карты
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  })

  // Ref карты
  const mapRef = useRef()

  // При добавлении точки через поиск
  const panTo = useCallback(({ lat, lng }) => {
    // Постовить маркер на карту
    mapRef.current.panTo({ lat, lng })
    // Приблизить
    mapRef.current.setZoom(14)
  }, [])

  return {
    isLoaded,
    loadError,
    mapRef,
    panTo,
  }
}

export default usePannel
