import React, { useState } from "react";
import Poster from "./Poster";
import GuessInput from "./GuessInput";

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
