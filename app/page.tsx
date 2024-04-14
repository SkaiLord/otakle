'use client';

import Game from '@/components/Game';
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Game solution={'APPLE'} />
    </div>
  );
}
