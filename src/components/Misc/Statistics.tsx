import * as React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { stats } from "../../utils/types";

const Statistics = () => {
  const statistics = useSelector((state: any) => state.game.statistics);

  const dataset: stats[] = Object.entries(statistics)?.map(
    ([k, v]: [k: string, v: number]) => ({
      attempt: Number(k) < 0 ? "Non indovinata" : k + "° tentativo",
      occurrences: v,
    })
  );
  const totOccurrences = Object.values(statistics).reduce(
    (prevValue: number, currentValue: number) => prevValue + currentValue
  );

  const occurenceStringBuilder = (num: number): string => {
    if (num === 0) return "   Mai";
    return num.toString().padStart(2, " ") + (num === 1 ? " volta" : " volte");
  };

  return (
    <div className="w-full flex flex-col">
      {dataset.map((e, index: number) => (
        <div className="flex w-full gap-2 justify-start my-1" key={index}>
          <div className="w-1/3">{e.attempt}</div>
          <div className="w-2/3 bg-green-50 flex justify-start text-center rounded-sm relative">
            <div className="absolute left-[37%] text-center w-20 top-0.5">
              <Typography
                className="flex"
                variant="h2"
                fontSize={16}
                fontWeight={350}
              >
                {occurenceStringBuilder(e.occurrences)}
              </Typography>
            </div>
            <div
              className="bg-green-600 rounded-r-md"
              style={{
                width: `${(e.occurrences / Number(totOccurrences)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
