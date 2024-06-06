'use client';

import { Button } from "@/components/ui/button";
import { getTodaysWordId } from "@/utils/gameUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handlePlay = () => {
    const ID = getTodaysWordId();
    router.push(`/${ID}`);
  };
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <div className="flex w-1/2 gap-x-4 rounded-lg border-4 border-white bg-tile-wrong p-4">
        <Image
          src="/otakle_icons/android-chrome-512x512.png"
          width={250}
          height={250}
          alt="logo"
          className="h-auto rounded-2xl"
        />
        <div className="flex flex-grow flex-col items-center justify-center gap-y-8 text-2xl md:text-3xl lg:text-4xl">
          <div className="-rotate-2 underline decoration-[#d20f18] underline-offset-8">
            OTAKLE
          </div>
          <Button
            variant="default"
            className="text-2xl hover:bg-[#d20f18] hover:text-white"
            onClick={handlePlay}
          >
            Play Now!
          </Button>
        </div>
      </div>
    </div>
  );
}
