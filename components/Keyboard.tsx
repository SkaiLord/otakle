'use client';

import { FaBackspace } from 'react-icons/fa';
import { Button } from './ui/button';
import { BACKSPACE, ENTER } from '@/utils/constants';

const ROWS = [
  'QWERTYUIOP'.split(''), //['Q','W'...]
  'ASDFGHJKL'.split(''),
  [BACKSPACE, ...'ZXCVBNM'.split(''), ENTER],
];

type Props = {
  onKeyPress: (key: string) => void;
};
export const Keyboard = ({ onKeyPress }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {ROWS.map((letters, index) => {
        return (
          <div key={index} className="flex gap-1.5 w-full">
            {letters.map((letter, idx) => {
              return <Key key={idx} letter={letter} onKeyPress={onKeyPress} />;
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
};

export const Key = ({ letter, onKeyPress }: KeyProps) => {
  return (
    <Button
      onClick={() => onKeyPress(letter)}
      className={`${
        letter != BACKSPACE && letter != ENTER ? ' flex-1' : 'flex-grow'
      } p-1 text-xl bg-slate-600 hover:bg-slate-500`}
      size={'lg'}
      variant={'outline'}
    >
      {letter == BACKSPACE ? <FaBackspace className="h-6 w-8" /> : letter}
    </Button>
  );
};
