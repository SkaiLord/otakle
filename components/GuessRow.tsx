import { GAME_WORD_LEN } from '@/lib/constants';

type Props = { letters: string };

export const GuessRow = ({ letters }: Props) => {
  return (
    <div className="flex gap-x-2">
      {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => (
        <Tile key={idx} letter={letters[idx]} />
      ))}
    </div>
  );
};

type TileProps = { letter: string | undefined };

export const Tile = ({ letter }: TileProps) => {
  return (
    <div className="h-16 w-16 rounded-md border border-gray-500 flex items-center justify-center text-2xl">
      {letter}
    </div>
  );
};
