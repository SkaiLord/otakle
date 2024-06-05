'use client';

import Game from '@/components/Game';
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomWord, getTodaysWord } from "@/utils/gameUtils";
import { useEffect, useState } from "react";

export default function Home() {
  const [solution, setSolution] = useState({
    date: "04-06-2024",
    word: "LUFFY",
    fullWord: "MONKEY D LUFFY",
    anime: "ONE PIECE",
    imgUrl: "https://i.imgur.com/PLAobHS.jpeg",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSolution(getRandomWord());
    setTimeout(() => {
      setLoading(false);
      // console.log(solution);
    }, 2000);
  }, []);
  // console.log(solution);
  // TODO: Add auth layer
  // TODO: Share url/secret_path
  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <Skeleton className="h-screen w-[50vw] rounded-md" />
      ) : (
        <Game solution={solution} />
      )}
      {/* TODO: Add statistics/leaderboard */}
    </div>
  );
}
