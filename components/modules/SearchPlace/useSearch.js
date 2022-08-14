import { useState, useCallback } from 'react'

import usePlacesAutocomplete from 'use-places-autocomplete'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { addPlaceAction } from '../../../store/placesReducer.js'
import { getCoords } from '../../../utils/getCoords.js'

const useSearch = (panTo) => {
  const dispatch = useDispatch()

  // Настройка react-hook-form
  const { register, handleSubmit } = useForm()

  // Состояние для управляемого input
  const [inputValue, setInputValue] = useState('')

  // Состояние для открытия / закрытия подсказок при вводе
  const [isOpen, setIsOpen] = useState(false)

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.523772, lng: () => -0.158538 },
      radius: 100 * 1000,
    },
  })

  // При добавлении точки
  const onSubmit = useCallback(async (formData) => {
    // Получение координат и адреса из запроса
    const { lat, lng, address } = await getCoords(formData.search, true)
    const {
      address_components: addressComponents,
      formatted_address: formattedAddress,
    } = address

    // Создание объекта точки
    const place = {
      id: uuidv4(),
      address: { addressComponents, formattedAddress },
      lat,
      lng,
    }

    // Добавление точки в список точек
    dispatch(addPlaceAction(place))
    // Сбросить данные ввода
    setInputValue('')
  }, [])

  const handleFormSubmit = handleSubmit(onSubmit)

  // Открытие списка подсказок при непустом запросе
  const handleOpen = () => {
    if (inputValue.length > 0) {
      setIsOpen(true)
    }
  }
  // Закрытие списка подсказок
  const handleClose = () => {
    setIsOpen(false)
  }

  const filterOptions = (elem) => elem

  // Управление input
  const onChange = (event, newValue) => {
    setValue(newValue)
  }
  const onInputChange = (event, newInputValue) => {
    setValue(newInputValue)
    setInputValue(newInputValue)
    if (newInputValue.length > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  // При клике по подсказке
  const onSuggestionClick = async (event) => {
    // Обновление состояния ввода
    setInputValue(event.target.textContent)
    // Закрытие списка подсказок
    setIsOpen(false)
    // Получение координат точки
    const { lat, lng } = await getCoords(event.target.textContent)
    // Установка маркера на карту
    panTo({ lat, lng })
  }

  return {
    isOpen,
    handleOpen,
    handleClose,
    filterOptions,
    onInputChange,
    onChange,
    ready,
    data,
    value,
    inputValue,
    register,
    onSuggestionClick,
    handleSubmit,
    onSubmit,
  }
}

export default useSearch
