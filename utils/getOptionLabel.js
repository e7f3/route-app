// Получение метки подсказки

export const getOptionLabel = (option) => {
  return typeof option === 'string' ? option : option.description
}
