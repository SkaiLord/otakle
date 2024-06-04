'use client';

import { GuessRow } from '@/components/GuessRow';
import { Keyboard } from '@/components/Keyboard';
import {
  BACKSPACE,
  ENTER,
  GAME_ROUNDS,
  GAME_WORD_LEN,
} from '@/utils/constants';
import { useCurrentGuessReducer } from '@/hooks/useCurrentGuessReducer';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { isValidWord } from "@/utils/gameUtils";
import { getTileStates } from "@/utils/getTileStates";
import { GameCompletion, GameSolution, LetterState } from "@/types";
import {
  getStoredGameState,
  setStoredGameState,
} from "@/utils/gameStateStorage";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Game({ solution }: { solution: GameSolution }) {
  const { toast } = useToast();
  const router = useRouter();

  const [currentGuess, dispatch] = useCurrentGuessReducer();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameCompletionState, setGameCompletionState] =
    useState<GameCompletion>("active");
  const [shakeCurrentRow, setShakeCurrentRow] = useState(false);
  const shakeTimeout = useRef<number>();

  const [gameOver, setGameOver] = useState(false);

  const setGuessesCallback = useCallback(
    (guesses: string[]) => {
      setGuesses(guesses);
    },
    [setGuesses],
  );

  const shakeCurrentGuess = useCallback(() => {
    clearTimeout(shakeTimeout.current);
    setShakeCurrentRow(true);
    shakeTimeout.current = window.setTimeout(() => {
      setShakeCurrentRow(false);
    }, 650);
    return () => clearTimeout(shakeTimeout.current);
  }, [shakeTimeout]);

  const submitWord = useCallback(() => {
    if (currentGuess.length != GAME_WORD_LEN) {
      shakeCurrentGuess();
      toast({
        variant: "destructive",
        description: "Word too short",
      });
      return;
    }
    if (!isValidWord(currentGuess)) {
      shakeCurrentGuess();
      toast({
        variant: "destructive",
        description: "Word Not Found",
      });
      return;
    }
    setGuessesCallback([...guesses, currentGuess]);
    dispatch({ type: "clear" });
    if (currentGuess === solution.word) {
      setTimeout(() => {
        setGameCompletionState("won");
      }, 2000);
      // TODO: Add success animation & modal open
      setTimeout(() => {
        setGameOver(true);
      }, 4000);
      return;
    }
    if (guesses.length + 1 === GAME_ROUNDS) {
      setGameCompletionState("lost");
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  }, [
    currentGuess,
    setGuessesCallback,
    guesses,
    dispatch,
    solution,
    shakeCurrentGuess,
    toast,
  ]);

  const onKeyPress = useCallback(
    (key: string) => {
      // Handle game completed state - won or lost
      if (gameCompletionState !== "active") return;
      // Handle backspace
      if (key === BACKSPACE) {
        dispatch({ type: "backspace" });
        return;
      }

      // Handle enter
      if (key === ENTER) {
        submitWord();
        return;
      }

      // Handle invalid key
      if (key.length !== 1 || !/[a-z]|[A-Z]/.test(key)) {
        return;
      }

      // Append the key to the guess
      dispatch({ type: "add", letter: key.toUpperCase() });
    },
    [dispatch, submitWord, gameCompletionState],
  );

  const onKeyDownEvt = useCallback(
    (evt: KeyboardEvent) => {
      onKeyPress(evt.key);
    },
    [onKeyPress],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownEvt);
    return () => window.removeEventListener("keydown", onKeyDownEvt);
  }, [onKeyDownEvt]);

  const guessIdxToTileStates = Array.from({ length: GAME_ROUNDS }).map(
    (_, idx) => {
      const isSubmitted = idx < guesses.length;
      return getTileStates(solution.word, guesses[idx], isSubmitted);
    },
  );

  const letterToLetterState: { [letter: string]: LetterState } = {};
  guessIdxToTileStates.forEach((tileStates, idx) => {
    const guess = guesses[idx];
    if (!guess) {
      return;
    }
    tileStates.forEach((tileState, letterIdx) => {
      const letter = guess[letterIdx];
      if (
        tileState === "correct" ||
        letterToLetterState[letter] === "correct"
      ) {
        letterToLetterState[letter] = "correct";
        return;
      }
      if (
        tileState === "misplaced" ||
        letterToLetterState[letter] === "misplaced"
      ) {
        letterToLetterState[letter] = "misplaced";
        return;
      }
      if (tileState === "wrong") {
        letterToLetterState[letter] = "wrong";
      }
    });
  });

  return (
    <div className="container flex min-h-screen max-w-4xl flex-col items-center justify-between lg:max-w-6xl 2xl:max-w-7xl">
      <div className="flex w-full max-w-xl flex-col items-center gap-8">
        <div className="flex flex-col gap-2">
          {Array.from({ length: GAME_ROUNDS }).map((_, idx) => {
            const isCurrentGuess = idx === guesses.length;
            return (
              <GuessRow
                key={idx}
                guess={isCurrentGuess ? currentGuess : guesses[idx]}
                letterStates={guessIdxToTileStates[idx]}
                shake={shakeCurrentRow && isCurrentGuess}
                bounce={
                  gameCompletionState === "won" && idx === guesses.length - 1
                }
              />
            );
          })}
        </div>
        <Keyboard
          onKeyPress={onKeyPress}
          letterToLetterState={letterToLetterState}
        />
      </div>
      {/* TODO: Add modal for new game */}
      {gameOver && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-black/80 p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <div className="absolute right-4 top-4 flex justify-between">
              <IoCloseOutline
                className="h-6 w-6 hover:cursor-pointer"
                onClick={() => setGameOver(false)}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div className="text-center">
                You {gameCompletionState + " "}
                {gameCompletionState == "won" ? "🏆!" : "😢"}
              </div>
              <div className="h-0.5 w-full bg-tile-wrong"></div>
              <div className="flex w-full justify-between">
                <div className="flex flex-col gap-y-2 md:gap-y-4">
                  {["word", "fullWord", "anime"].map((item, index) => (
                    <div className="grid grid-cols-2 gap-x-2" key={index}>
                      {item}
                      <span className="text-tile-correct">
                        {": " + solution[item as keyof GameSolution]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-auto">
                  <Image
                    src={solution.imgUrl}
                    alt={solution.anime}
                    width={150}
                    height={200}
                    className=""
                  />
                </div>
              </div>
              <Button
                variant="success"
                className="w-fit"
                onClick={() => window.location.reload()}
              >
                New Game
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
