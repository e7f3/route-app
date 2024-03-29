import { useDispatch } from "react-redux";
import { removePlaceAction } from "../../store/placesReducer";
import { Link } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// Компонент кнопки удаления точки из списка точек

export default function RemovePlaceButton({ placeId }) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(removePlaceAction(placeId));
  };
  return (
    <Link
      component="button"
      sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}
      onClick={onClick}
    >
      <ClearIcon color='error'/>
    </Link>
  );
}
