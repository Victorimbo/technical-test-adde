import { useState } from "react";
import Poster from "./Poster";
import GuessInput from "./GuessInput";

const GameApp = () => {
  const [search, setSearch] = useState<string>("");

  const handleInputSubmit = (inputValue: string) => {
    setSearch(inputValue);
  };

  return (
    <div>
    <div className="contentContainer">
      <GuessInput onChange={(value: string) => setSearch(value)} onSubmit={handleInputSubmit} />
      <Poster search={search} />
    </div>
    </div>
  );
};

export default GameApp;
