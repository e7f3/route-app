import { CircularProgress } from "@mui/material";

// Компонент заглушка на время загрузки

export default function Progress({ className }) {
  return (
    <div className={className}>
      <CircularProgress />
    </div>
  );
}
