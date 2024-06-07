"use client";

import Game from "@/components/Game";
import { Skeleton } from "@/components/ui/skeleton";
import { getWordById } from "@/utils/gameUtils";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [solution, setSolution] = useState({
    date: "04-06-2024",
    word: "LUFFY",
    fullWord: "MONKEY D LUFFY",
    anime: "ONE PIECE",
    imgUrl: "https://static.zerochan.net/Monkey.D..Luffy.full.3349048.png",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSolution(getWordById(params.slug));
    setTimeout(() => {
      setLoading(false);
      // console.log(solution);
    }, 2000);
  }, [params]);
  //   console.log(solution);
  // TODO: Add auth layer
  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <Skeleton className="h-[85vh] w-5/6 rounded-md md:h-screen md:w-3/5" />
      ) : (
        <Game solution={solution} />
      )}
      {/* TODO: Add statistics/leaderboard */}
    </div>
  );
}
