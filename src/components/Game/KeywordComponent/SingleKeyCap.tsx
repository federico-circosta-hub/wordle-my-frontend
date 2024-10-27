import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeLetter,
  setLetterInput,
  updateGrid,
} from "../../../redux/gameSlice";
import { singleCell } from "../../../utils/types";
import { useLazyCheckWordQuery } from "../../../redux/api";
import CustomizedSnackbar from "../../Misc/CustomizedSnackbar";

const SingleKeyCap = ({ letter }) => {
  const dispatch = useDispatch();

  const { grid, attempt, letterStatus } = useSelector(
    (state: any) => state.game
  );
  const [displaySnack, setDisplaySnack] = useState<boolean>(false);
  const [checkWord] = useLazyCheckWordQuery();

  const handleClick = () => {
    if (letter === "Invio") return handleSend();
    if (letter === "⌫") return dispatch(removeLetter());
    dispatch(setLetterInput({ letter }));
  };

  const handleSend = () => {
    const wordArray = grid[attempt].map((e: singleCell) => e.value);
    const word = wordArray.toString().replaceAll(",", "");
    if (word.length < 5) return setDisplaySnack(true);
    checkWord(word)
      .unwrap()
      .then((data) => {
        console.log("Success:", data);
        dispatch(updateGrid(data));
      })
      .catch((error) => {
        if (error.data?.error === "invalid word") return setDisplaySnack(true);
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`${
          letter === "Invio"
            ? "lg:w-20 w-14 text-lg"
            : letter === "⌫"
            ? "lg:w-16 w-12  text-2xl"
            : "lg:w-14 w-7 text-lg"
        } lg:h-14 md:h-12 h-10 flex items-center justify-center lg:m-2 m-1 rounded-md font-bold cursor-pointer uppercase shadow-md transition-colors duration-200 ${
          ["Invio", "⌫"].includes(letter)
            ? "bg-blue-300 text-white hover:bg-blue-400"
            : letterStatus[letter]?.rightPosition
            ? "bg-green-600 hover:bg-green-700 text-white"
            : letterStatus[letter]?.isPresent
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : letterStatus[letter]?.isPresent === false
            ? "bg-gray-500 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        } select-none`}
      >
        {letter}
      </div>
      <CustomizedSnackbar
        isOpen={displaySnack}
        setIsOpen={setDisplaySnack}
        content="Parola non valida"
        severity="error"
      />
    </>
  );
};

export default SingleKeyCap;
