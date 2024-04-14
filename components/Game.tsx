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
import { isValidWord } from '@/utils/isValidWord';
import { getTileStates } from '@/utils/getTileStates';
import { GameCompletion, LetterState } from '@/types';
import {
  getStoredGameState,
  setStoredGameState,
} from '@/utils/gameStateStorage';

type Props = {
  solution: string;
};

export default function Game({ solution }: Props) {
  const { toast } = useToast();

  const [currentGuess, dispatch] = useCurrentGuessReducer();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameCompletionState, setGameCompletionState] =
    useState<GameCompletion>('active');
  const [shakeCurrentRow, setShakeCurrentRow] = useState(false);
  const shakeTimeout = useRef<number>();

  const setGuessesCallback = useCallback(
    (guesses: string[]) => {
      setGuesses(guesses);
    },
    [setGuesses]
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
        variant: 'destructive',
        description: 'Word too short',
      });
      return;
    }
    if (!isValidWord(currentGuess)) {
      shakeCurrentGuess();
      toast({
        variant: 'destructive',
        description: 'Word Not Found',
      });
      return;
    }
    setGuessesCallback([...guesses, currentGuess]);
    dispatch({ type: 'clear' });
    if (currentGuess === solution) {
      setTimeout(() => {
        setGameCompletionState('won');
      }, 2000);
      toast({
        // variant: 'success',
        description: 'You Won 🏆',
      });
      return;
    }
    if (guesses.length + 1 === GAME_ROUNDS) {
      setGameCompletionState('lost');
      toast({
        variant: 'destructive',
        description: 'Better luck next time 🍀',
      });
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
      // Handle backspace
      if (key === BACKSPACE) {
        dispatch({ type: 'backspace' });
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
      dispatch({ type: 'add', letter: key.toUpperCase() });
    },
    [dispatch, submitWord]
  );

  const onKeyDownEvt = useCallback(
    (evt: KeyboardEvent) => {
      onKeyPress(evt.key);
    },
    [onKeyPress]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownEvt);
    return () => window.removeEventListener('keydown', onKeyDownEvt);
  }, [onKeyDownEvt]);

  const guessIdxToTileStates = Array.from({ length: GAME_ROUNDS }).map(
    (_, idx) => {
      const isSubmitted = idx < guesses.length;
      return getTileStates(solution, guesses[idx], isSubmitted);
    }
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
        tileState === 'correct' ||
        letterToLetterState[letter] === 'correct'
      ) {
        letterToLetterState[letter] = 'correct';
        return;
      }
      if (
        tileState === 'misplaced' ||
        letterToLetterState[letter] === 'misplaced'
      ) {
        letterToLetterState[letter] = 'misplaced';
        return;
      }
      if (tileState === 'wrong') {
        letterToLetterState[letter] = 'wrong';
      }
    });
  });

  return (
    <main className="pt-20 min-h-screen lg:pt-24 2xl:pt-28 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl flex flex-col items-center justify-between">
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
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
                  gameCompletionState === 'won' && idx === guesses.length - 1
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
    </main>
  );
}
