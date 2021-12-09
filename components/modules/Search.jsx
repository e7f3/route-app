import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Input from "../elements/Input.jsx";
import {
  Autocomplete,
  Button,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addPlaceAction } from "../../store/placesReducer.js";

// Комронент поиска адреса

// Получение координат из адреса
const getCoords = async (address, returnAddress = false) => {
  const results = await getGeocode({ address });
  const { lat, lng } = await getLatLng(results[0]);
  return returnAddress ? { lat, lng, address: results[0] } : { lat, lng };
};

export default function Search({ isLoaded, label, panTo }) {
  // Если карта не загружена - показать заглушку
  if (!isLoaded) {
    return <Input disabled={true} label="Loading..." />;
  }
  const dispatch = useDispatch();

  // Настройка react-hook-form
  const { register, handleSubmit } = useForm();
  // Состояние для управляемого input
  const [inputValue, setInputValue] = useState("");
  // Состояние для открытия / закрытия подсказок при вводе
  const [open, setOpen] = useState(false);

  // Настройка подсказок Google Places API при вводе
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
  });

  // При добавлении точки
  const onSubmit = async (formData) => {
    // Получение координат и адреса из запроса
    const { lat, lng, address } = await getCoords(formData.search, true);
    const {
      address_components: addressComponents,
      formatted_address: formattedAddress,
    } = address;

    // Создание объекта точки
    const place = {
      id: uuidv4(),
      address: { addressComponents, formattedAddress },
      lat,
      lng,
    };

    // Добавление точки в список точек
    dispatch(addPlaceAction(place));
    // Сбросить данные ввода
    setInputValue("");
  };

  // Открытие списка подсказок при непустом запросе
  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpen(true);
    }
  };

  // Управление input
  const onChange = (event, newValue) => {
    setValue(newValue);
  };
  const onInputChange = (event, newInputValue) => {
    setValue(newInputValue);
    setInputValue(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  // При клике по подсказке
  const onSuggestionClick = async (event) => {
    // Обновление состояния ввода
    setInputValue(event.target.textContent);
    // Закрытие списка подсказок
    setOpen(false);
    // Получение координат точки
    const { lat, lng } = await getCoords(event.target.textContent);
    // Установка маркера на карту
    panTo({ lat, lng });
  };
  // Получение метки подсказки
  const getOptionLabel = (option) => {
    return typeof option === "string" ? option : option.description;
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          selectOnFocus
          filterOptions={(x) => x}
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
              {...register("search")}
              type="search"
            />
          )}
          getOptionLabel={getOptionLabel}
          renderOption={(option) => {
            return (
              <ListItemButton key={option.id} onClick={onSuggestionClick}>
                <ListItemText primary={option.key} />
              </ListItemButton>
            );
          }}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
}
