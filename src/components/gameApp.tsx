import React, { useState } from "react";
import Poster from "./poster";
import GuessInput from "./guessInput";

const GameApp = () => {
  const [search, setSearch] = useState<string>("");

  const handleInputSubmit = (inputValue) => {
    setSearch(inputValue);
  };

  return (
    <div>
      <GuessInput onChange={(value) => setSearch(value)} onSubmit={handleInputSubmit} />
      <Poster search={search} />
    </div>
  );
};

export default GameApp;
