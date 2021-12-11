import { useDispatch } from "react-redux";
import { ToggleRouteModeAction } from "../../store/routeReducer";
import { Button } from "@mui/material";

// Компонент для изменения режима отображения маршрутов

export default function RouteMode({ className }) {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(ToggleRouteModeAction());
  };
  return (
    <div className={className}>
      <Button onClick={onClick} variant="outlined">
        Change route mode
      </Button>
    </div>
  );
}
