import { Typography } from "@mui/material";
import Image from "next/image";

// Логотип

export default function Logo({ ...props }) {
  return (
    <div {...props}>
      <Image
        className="logo__icon"
        src="/icons/route_logo_icon.svg"
        alt="logo icon"
        width="50"
        height="50"
      />
      <Typography className="logo__text" variant="h4" component="h4">Routes</Typography>
    </div>
  );
}
