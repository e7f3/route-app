import { getGeocode, getLatLng } from 'use-places-autocomplete'

// Получение координат из адреса
export const getCoords = async (address, returnAddress = false) => {
  const results = await getGeocode({ address })
  const { lat, lng } = await getLatLng(results[0])
  return returnAddress ? { lat, lng, address: results[0] } : { lat, lng }
}
