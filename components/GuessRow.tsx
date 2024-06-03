import { cn } from '@/lib/utils';
import { LetterState } from '@/types';
import { GAME_WORD_LEN } from '@/utils/constants';
import { useEffect, useState } from 'react';
import css from './GuessRow.module.css';

type Props = {
  guess: string;
  letterStates: LetterState[];
  shake: boolean;
  bounce: boolean;
};

export const GuessRow = ({ guess, letterStates, shake, bounce }: Props) => {
  return (
    <div className={cn('flex gap-x-2', { 'animate-shake': shake })}>
      {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => (
        <Tile
          key={idx}
          idx={idx}
          letter={guess ? guess[idx] : ''}
          state={letterStates[idx]}
          bounce={bounce}
        />
      ))}
    </div>
  );
};

type TileProps = {
  letter: string | undefined;
  state: LetterState;
  idx: number;
  bounce: boolean;
};

export const Tile = ({ letter, state, idx, bounce }: TileProps) => {
  const [revealColor, setRevealColor] = useState(false);
  const animationDelay = bounce ? idx * 80 : idx * 300;

  useEffect(() => {
    let timeout: number;
    if (state !== 'default') {
      timeout = window.setTimeout(() => {
        setRevealColor(true);
      }, animationDelay + 300);
    }
    return () => clearTimeout(timeout);
  }, [animationDelay, state]);

  return (
    <div
      style={{
        animationDelay: state === 'default' ? '0ms' : `${animationDelay}ms`,
      }}
      className={cn(
        'h-12 w-12 rounded-md border  flex items-center justify-center text-xl',
        {
          'border-gray-500': state === 'default' && !letter,
          // 'border-gray-300 animate-pop': !!letter,
          // issue in applying normal tailwind css so used module.css file
          [css.hasLetter]: !!letter,
          [css.correct]: state === 'correct' && revealColor,
          [css.wrong]: state === 'wrong' && revealColor,
          [css.misplaced]: state === 'misplaced' && revealColor,
          [css.flip]: state !== 'default',
          [css.bounce]: bounce,
        }
      )}
    >
      {letter}
    </div>
  );
};
