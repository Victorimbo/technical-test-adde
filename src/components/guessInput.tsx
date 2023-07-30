import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const GuessInput = ({ onChange, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    // onChange(value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div className="input-container">
      <TextField
        id="outlined-basic"
        label="Enter movie title"
        variant="outlined"
        onChange={handleInputChange}
        value={inputValue}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default GuessInput;
