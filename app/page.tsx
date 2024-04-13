import { GuessRow } from '@/components/GuessRow';
import { GAME_ROUNDS } from '@/lib/constants';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-xl flex flex-col items-center ">
        <div className="flex flex-col gap-2">
          {Array.from({ length: GAME_ROUNDS }).map((_, idx) => (
            <GuessRow key={idx} letters="" />
          ))}
        </div>
      </div>
    </main>
  );
}
