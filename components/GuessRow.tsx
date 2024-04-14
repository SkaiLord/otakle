import { GAME_WORD_LEN } from '@/utils/constants';

type Props = { guess: string };

export const GuessRow = ({ guess }: Props) => {
  return (
    <div className="flex gap-x-2">
      {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => (
        <Tile key={idx} letter={guess ? guess[idx] : ''} />
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
