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
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { isValidWord } from '@/utils/isValidWord';

export default function Home() {
  const { toast } = useToast();

  const [currentGuess, dispatch] = useCurrentGuessReducer();
  const [guesses, setGuesses] = useState<string[]>([]);

  const onKeyPress = useCallback(
    (key: string) => {
      console.log(key);

      // Handle backspace
      if (key === BACKSPACE) {
        dispatch({ type: 'backspace' });
        return;
      }

      // Handle enter
      if (key === ENTER) {
        if (currentGuess.length != GAME_WORD_LEN) {
          toast({
            variant: 'destructive',
            description: 'Word too short',
          });
          return;
        }
        // console.log(currentGuess);
        if (!isValidWord(currentGuess)) {
          toast({
            variant: 'destructive',
            description: 'Word Not Found',
          });
          return;
        }
        setGuesses([...guesses, currentGuess]);
        dispatch({ type: 'clear' });
        return;
      }

      // Handle invalid key
      if (key.length !== 1 || !/[a-z]|[A-Z]/.test(key)) {
        return;
      }

      // Append the key to the guess
      dispatch({ type: 'add', letter: key.toUpperCase() });
    },
    [dispatch, currentGuess, guesses, setGuesses]
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

  return (
    <main className="pt-20 min-h-screen lg:pt-24 2xl:pt-28 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl flex flex-col items-center justify-between">
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2">
          {Array.from({ length: GAME_ROUNDS }).map((_, idx) => (
            <GuessRow
              key={idx}
              guess={idx === guesses.length ? currentGuess : guesses[idx]}
            />
          ))}
        </div>
        <Keyboard onKeyPress={onKeyPress} />
      </div>
    </main>
  );
}
