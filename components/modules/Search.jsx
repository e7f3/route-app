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

const getCoords = async (address, returnAddress = false) => {
  const results = await getGeocode({ address });
  const { lat, lng } = await getLatLng(results[0]);
  return returnAddress ? { lat, lng, address: results[0] } : { lat, lng };
};

export default function Search({ isLoaded, label, panTo }) {
  if (!isLoaded) {
    return <Input disabled={true} label="Loading..." />;
  }
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.523772, lng: () => -0.158538 },
      radius: 100 * 1000,
    },
  });

  const onSubmit = async (formData) => {
    const { lat, lng, address } = await getCoords(formData.search, true);
    const {
      address_components: addressComponents,
      formatted_address: formattedAddress,
    } = address;
    const place = {
      id: uuidv4(),
      address: { addressComponents, formattedAddress },
      lat,
      lng,
    };
    dispatch(addPlaceAction(place));
    setInputValue("");
  };

  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpen(true);
    }
  };
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
  const onSuggestionClick = async (event) => {
    setInputValue(event.target.textContent);
    setOpen(false);
    const { lat, lng } = await getCoords(event.target.textContent);
    panTo({ lat, lng });
  };
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
