import { useState } from "react";
import { TextField, Button } from "@mui/material";

const GuessInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue("");
  };

  onkeyup = (event) => {
    if(event.key === 'Enter') {
      handleSubmit();
    }
  }

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
