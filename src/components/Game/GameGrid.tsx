import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { singleCell } from "../../utils/types";

const GameGrid = () => {
  const { grid, attempt } = useSelector((state: { game: any }) => state.game);
  const [previousRow, setPreviousRow] = useState<singleCell[]>([]);
  useEffect(() => {
    if (attempt > 0) {
      grid[attempt - 1].forEach((element: singleCell, index: number) => {
        setTimeout(() => {
          setPreviousRow((prev) => [...prev, element]);
        }, 200 * (index + 1));
      });
    }
    return () => setPreviousRow([]);
    // eslint-disable-next-line
  }, [attempt]);

  return (
    <div className="grid grid-cols-5 gap-2">
      {grid.map((row: singleCell[], rowIndex: number) =>
        row.map((cell: singleCell, cellIndex: number) => (
          <div
            key={cellIndex}
            className={`2xl:w-28 md:w-16 w-14 flex items-center justify-center aspect-square uppercase rounded-sm border ${
              rowIndex === attempt && "shadow-sm shadow-indigo-300"
            }  ${
              (rowIndex === attempt - 1 ? previousRow[cellIndex] : cell)
                ?.rightPosition
                ? "bg-green-600 border-green-700 text-white"
                : (rowIndex === attempt - 1 ? previousRow[cellIndex] : cell)
                    ?.isPresent
                ? "bg-yellow-500 border-yellow-600 text-white"
                : (rowIndex === attempt - 1 ? previousRow[cellIndex] : cell)
                    ?.isPresent === false
                ? "bg-gray-400 border-gray-500 text-white"
                : "bg-gray-50 border-indigo-100 text-sky-900"
            }
            ${rowIndex === attempt - 1 ? "animate-[pulse_0.5s]" : ""}
            `}
            style={{ animationDelay: `${cellIndex * 0.2}s` }}
          >
            <h2 className="text-4xl font-bold ">{cell.value}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default GameGrid;
