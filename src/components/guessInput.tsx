import React from "react";
import { TextField } from "@mui/material";

const GuessInput = () => {
    
    return(
        <div className="input-container">
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
            />
        </div>
    )
}

export default GuessInput;