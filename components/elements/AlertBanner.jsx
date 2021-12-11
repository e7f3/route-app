import { Alert } from "@mui/material";

// Компонент предупреждения об ошибке при постройке маршрута

export default function AlertBanner({ severity, message }) {
  return (
    <Alert
      severity={severity}
      sx={{ zIndex: "10", position: "absolute", left: 0, right: 0 }}
    >
      {message}
    </Alert>
  );
}
