import React from "react";
import TextField from "@mui/material/TextField";

// Кастомный Input 

const Input = React.forwardRef(({ ...props }, ref) => {
  return <TextField {...props} ref={ref} color='neutral'/>;
});

export default Input;
