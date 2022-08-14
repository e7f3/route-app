import styles from './SearchPlace.module.scss'

import Input from '../../elements/Input/Input.jsx'
import {
  Autocomplete,
  Button,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import useSearch from './useSearch.js'
import { getOptionLabel } from '../../../utils/getOptionLabel.js'
// Комронент поиска адреса

export default function SearchPlace({ isLoaded, label, panTo }) {
  // Если карта не загружена - показать заглушку
  if (!isLoaded) {
    return <Input disabled={true} label='Loading...' />
  }

  const {
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
  } = useSearch(panTo)

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          open={isOpen}
          onOpen={handleOpen}
          onClose={handleClose}
          selectOnFocus
          filterOptions={filterOptions}
          freeSolo
          onInputChange={onInputChange}
          onChange={onChange}
          disabled={!ready}
          options={data}
          value={value}
          inputValue={inputValue}
          renderInput={(params) => (
            <Input
              {...params}
              label={label}
              {...register('search')}
              type='search'
            />
          )}
          getOptionLabel={getOptionLabel}
          renderOption={(option) => {
            return (
              <ListItemButton key={option.id} onClick={onSuggestionClick}>
                <ListItemText primary={option.key} />
              </ListItemButton>
            )
          }}
        />
        <Button type='submit' variant='outlined' color='neutral'>
          Add
        </Button>
      </form>
    </div>
  )
}
