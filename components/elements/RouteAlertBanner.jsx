import { Alert } from "@mui/material";

export default function RouteAlertBanner({ severity, message }) {
  return (
    <Alert
      severity={severity}
      sx={{ zIndex: "10", position: "absolute", left: 0, right: 0 }}
    >
      {message}
    </Alert>
  );
}
