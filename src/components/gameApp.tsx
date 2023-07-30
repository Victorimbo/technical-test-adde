import React, { useState } from "react";
import GuessInput from "./guessInput";
import Poster from "./poster";

const GameApp = () => {

  return (
    <div>
      <GuessInput />
      <Poster />
    </div>
  );
};

export default GameApp;