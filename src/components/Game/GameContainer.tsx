import { useEffect, useState } from "react";
import GameGrid from "./GameGrid";
import GameKeyword from "./KeywordComponent/GameKeyword";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../../redux/gameSlice";
import { format } from "date-fns";
import GameOverModal from "./GameOverModal";
import { useGetWordInfoQuery } from "../../redux/api";
import { Box, LinearProgress } from "@mui/material";

const GameContainer = () => {
  const dispatch = useDispatch();
  const savedWordDate = useSelector((state: any) => state.game.wordDate);
  const { isGameOver } = useSelector((state: any) => state.game.gameOver);

  const { data: dateFromServer } = useGetWordInfoQuery(undefined);

  useEffect(() => {
    if (dateFromServer && savedWordDate) {
      if (
        new Date(dateFromServer) > new Date(savedWordDate) ||
        new Date(dateFromServer) < new Date(savedWordDate)
      ) {
        dispatch(resetGame(format(dateFromServer, "Y-MM-dd")));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFromServer]);

  if (!dateFromServer)
    return (
      <Box
        sx={{
          width: "40%",
        }}
      >
        <LinearProgress />
      </Box>
    );

  return (
    <>
      <GameGrid />
      <GameKeyword />
      {isGameOver && <GameOverModal />}
    </>
  );
};

export default GameContainer;
