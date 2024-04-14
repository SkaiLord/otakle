'use client';

import { GuessRow } from '@/components/GuessRow';
import { Keyboard } from '@/components/Keyboard';
import { GAME_ROUNDS } from '@/lib/constants';
import Image from 'next/image';

export default function Home() {
  const onKeyPress = (key: string) => {
    console.log(key);
  };

  return (
    <main className="pt-20 min-h-screen lg:pt-24 2xl:pt-28 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl flex flex-col items-center justify-between">
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2">
          {Array.from({ length: GAME_ROUNDS }).map((_, idx) => (
            <GuessRow key={idx} letters="" />
          ))}
        </div>
        <Keyboard onKeyPress={onKeyPress} />
      </div>
    </main>
  );
}
