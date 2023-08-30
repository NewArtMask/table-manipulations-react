import { useState, useEffect, useRef } from "react";

import Style from "./Search.module.css";
import { getPredication } from "./../back-end/server";

const Search = ({ filter }: { filter: (searchData: string) => void }) => {
  const [predictions, setPredictions] = useState([] as string[]);

  const inputRef = useRef<HTMLInputElement>(null);

  const getPrediction = (inputData: string) => {
    setPredictions(getPredication(inputData));
  };

  useEffect(() => {
    const handleChange = (event: any) => {
      filter(event.target.value);
    };

    const element = inputRef.current;
    element?.addEventListener("change", handleChange);

    return () => {
      element?.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <>
      <input
        type="text"
        list="autocomplete"
        className={Style.search}
        ref={inputRef}
        placeholder="search..."
        onInput={(e) => getPrediction((e.target as HTMLInputElement).value)}
      />

      <datalist id="autocomplete">
        {predictions &&
          predictions.map((prediction, idx) => (
            <option key={idx + 1} value={prediction} />
          ))}
      </datalist>
    </>
  );
};

export default Search;
