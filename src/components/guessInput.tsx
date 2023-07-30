import React from "react";
import { TextField } from "@mui/material";

const GuessInput = ({ onChange }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className="input-container">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default GuessInput;
