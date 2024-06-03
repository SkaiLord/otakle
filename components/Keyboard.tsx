'use client';

import { FaBackspace } from 'react-icons/fa';
import { Button } from './ui/button';
import { BACKSPACE, ENTER } from '@/utils/constants';
import { LetterState } from '@/types';
import { cn } from '@/lib/utils';

const ROWS = [
  'QWERTYUIOP'.split(''), //['Q','W'...]
  'ASDFGHJKL'.split(''),
  [BACKSPACE, ...'ZXCVBNM'.split(''), ENTER],
];

type Props = {
  onKeyPress: (key: string) => void;
  letterToLetterState: { [letter: string]: LetterState };
};
export const Keyboard = ({ onKeyPress, letterToLetterState }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {ROWS.map((letters, index) => {
        return (
          <div key={index} className="flex gap-1.5 w-full">
            {letters.map((letter, idx) => {
              return (
                <Key
                  key={idx}
                  letter={letter}
                  onKeyPress={onKeyPress}
                  letterState={letterToLetterState[letter] ?? 'default'}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

type KeyProps = {
  letter: string;
  onKeyPress: (key: string) => void;
  letterState: LetterState;
};

export const Key = ({ letter, onKeyPress, letterState }: KeyProps) => {
  return (
    <Button
      onClick={() => onKeyPress(letter)}
      className={cn('p-0.5 text-xl flex-1 text-base', {
        'flex-[1.5]': letter === BACKSPACE || letter === ENTER,
        'bg-slate-400 hover:bg-slate-500 active:bg-slate-400':
          letterState === 'default',
        'bg-tile-correct border-tile-correct hover:bg-tile-correct/85 active:bg-tile-correct':
          letterState === 'correct',
        'bg-tile-misplaced border-tile-misplaced hover:bg-tile-misplaced/85 active:bg-tile-misplaced':
          letterState === 'misplaced',
        'bg-tile-wrong border-tile-wrong hover:bg-tile-wrong':
          letterState === 'wrong',
      })}
      size={'lg'}
    >
      {letter == BACKSPACE ? <FaBackspace className="h-6 w-8" /> : letter}
    </Button>
  );
};
