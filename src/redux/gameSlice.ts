import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    wordDate: "1970-01-01",
    grid: Array(6)
      .fill(null)
      .map(() => Array(5).fill({ value: "" })),
    attempt: 0,
    letterStatus: {},
    gameOver: { isGameOver: false, isPositive: false },
    statistics: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, "-1": 0 },
  },
  reducers: {
    setLetterInput: (state, action) => {
      const { letter } = action.payload;
      const newGrid = state.grid.map((row) => row.map((cell) => ({ ...cell })));
      const emptyIndex = newGrid[state.attempt].findIndex(
        (cell) => cell.value === ""
      );
      if (emptyIndex < 0) return;
      newGrid[state.attempt][emptyIndex].value = letter;
      state.grid = newGrid;
    },
    removeLetter: (state) => {
      const newGrid = state.grid.map((row) => row.map((cell) => ({ ...cell })));
      let emptyIndex =
        newGrid[state.attempt].findIndex((cell) => cell.value === "") - 1;
      if (emptyIndex < 0) emptyIndex = 4;
      newGrid[state.attempt][emptyIndex].value = "";
      state.grid = newGrid;
    },
    updateGrid: (state, payload) => {
      const responseData = payload.payload;
      const newGrid = state.grid.map((row) => row.map((cell) => ({ ...cell })));
      const newRow = newGrid[state.attempt].map((e: any, i: number) => ({
        ...e,
        isPresent: responseData[i].is_present,
        rightPosition: responseData[i].right_position,
      }));
      const guessed = newRow.every((e) => e.rightPosition);
      newGrid[state.attempt] = newRow;
      newRow.forEach((e) => {
        if (
          !Object.keys(state.letterStatus).includes(e.value) ||
          e.rightPosition
        )
          state.letterStatus = {
            ...state.letterStatus,
            [e.value]: {
              rightPosition: e.rightPosition,
              isPresent: e.isPresent,
            },
          };
      });
      state.attempt += 1;
      const isOver = guessed || state.attempt === 6;
      state.grid = newGrid;
      state.gameOver = { isGameOver: isOver, isPositive: guessed };
      if (isOver)
        state.statistics = {
          ...state.statistics,
          [guessed ? state.attempt : -1]: (state.statistics[
            guessed ? state.attempt : -1
          ] += 1),
        };
    },

    resetGame: (state, payload) => {
      state.grid = Array(6)
        .fill(null)
        .map(() => Array(5).fill({ value: "" }));
      state.attempt = 0;
      state.letterStatus = {};
      state.gameOver = { isGameOver: false, isPositive: false };
      state.wordDate = payload.payload;
    },
  },
});

export const { setLetterInput, removeLetter, updateGrid, resetGame } =
  gameSlice.actions;
export default gameSlice.reducer;
