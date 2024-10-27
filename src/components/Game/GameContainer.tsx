import { useEffect } from "react";
import GameGrid from "./GameGrid";
import GameKeyword from "./KeywordComponent/GameKeyword";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, updateWordDate } from "../../redux/gameSlice";
import { format } from "date-fns";
import GameOverModal from "./GameOverModal";
import { useGetWordInfoQuery } from "../../redux/api";

const GameContainer = () => {
  const dispatch = useDispatch();
  const savedWordDate = useSelector((state: any) => state.game.wordDate);
  const { isGameOver } = useSelector((state: any) => state.game.gameOver);

  const { data: dateFromServer } = useGetWordInfoQuery(undefined);

  useEffect(() => {
    if (dateFromServer) {
      const newDate = new Date(dateFromServer);
      if (newDate > new Date(savedWordDate)) {
        dispatch(resetGame());
        dispatch(updateWordDate(format(newDate, "Y-MM-dd")));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFromServer]);

  return (
    <>
      <GameGrid />
      <GameKeyword />
      {isGameOver && <GameOverModal />}
    </>
  );
};

export default GameContainer;
