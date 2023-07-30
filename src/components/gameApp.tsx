import React, { useState } from "react";
import GuessInput from "./guessInput";
import Poster from "./poster";

const GameApp = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <GuessInput onChange={(value) => setSearch(value)} />
      <Poster search={search} />
    </div>
  );
};

export default GameApp;