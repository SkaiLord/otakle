'use client';

import Game from '@/components/Game';
import { getTodaysWord } from "@/utils/gameUtils";
import React from "react";

export default function Home() {
  const solution = getTodaysWord() || "APPLE";
  // TODO: Add auth layer
  // TODO: Share url/secret_path
  return (
    <div className="flex flex-col items-center gap-4">
      <Game solution={solution} />
      {/* TODO: Add statistics/leaderboard */}
    </div>
  );
}
