import React from "react";
import SingleKeyCap from "./SingleKeyCap";

const GameKeyword = () => {
  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Invio", "z", "x", "c", "v", "b", "n", "m", "⌫"],
  ];

  return (
    <div className="w-full flex flex-col items-center space-y-1">
      {keyboardLayout.map((row: string[], rowIndex: number) => (
        <div key={rowIndex} className="flex">
          {row.map((letter: string) => (
            <SingleKeyCap key={letter} letter={letter} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameKeyword;
