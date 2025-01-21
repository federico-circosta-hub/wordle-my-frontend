import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import Statistics from "../Misc/Statistics";
import { decryptString, updateCountdown } from "../../utils/functions";
import { useGetEncryptedWordQuery } from "../../redux/api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const GameOverModal = () => {
  const secretKey = process.env.REACT_APP_SECRET_KEY || "";
  const { isGameOver, isPositive } = useSelector(
    (state: any) => state.game.gameOver
  );
  //const savedData = useSelector((state: any) => state.game);

  const [countdownTimer, setCountdownTimer] = useState<string>("");
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
  const { data: encryptedWord } = useGetEncryptedWordQuery(undefined);

  useEffect(() => {
    const timer = setInterval(() => updateCountdown(setCountdownTimer), 1000);
    updateCountdown(setCountdownTimer);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (encryptedWord) {
      setWordOfTheDay(
        decryptString(encryptedWord.ciphertext, encryptedWord.iv, secretKey)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encryptedWord]);

  return (
    <BootstrapDialog open={isGameOver}>
      <DialogTitle sx={{ m: 0, p: 2 }} variant="h4">
        {isPositive ? "Hai vinto!" : "Questa volta non hai indovinato!"}
      </DialogTitle>
      <DialogContent dividers>
        {/*         {"wordDate " + savedData.wordDate + ";\n"}
        {"grid " + savedData.grid[0][0].value + ";\n"}
        {"attempt " + savedData.attempt + ";\n"}
        {"gameOver " +
          savedData.gameOver.isGameOver +
          " " +
          savedData.gameOver.isPositive} */}
        <Typography gutterBottom variant="h5">
          La parola di oggi è:
        </Typography>
        <div className="w-full flex gap-1">
          {wordOfTheDay.split("").map((e: string, index: number) => (
            <div
              key={`word-of-the-day-letter-${index}`}
              className={`w-8 flex items-center justify-center aspect-square uppercase rounded-md bg-green-600 border-green-700 text-white`}
            >
              {e}
            </div>
          ))}
        </div>
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
        <Typography gutterBottom variant="h6">
          Tempo rimanente per la prossima parola: {countdownTimer}
        </Typography>
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
        <Typography gutterBottom variant="h5">
          Le tue statistiche:
        </Typography>
        <div className="w-full flex justify-center">
          <Statistics />
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default GameOverModal;
