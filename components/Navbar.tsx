'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BsGear, BsGithub } from 'react-icons/bs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/mode-toggle';
import { DialogButton } from './DialogButton';
import { BiHelpCircle } from 'react-icons/bi';
import { GAME_WORD_LEN } from '@/utils/constants';
import { Tile } from './GuessRow';
import { LetterState } from '@/types';
import { cn } from '@/lib/utils';
import { LuGithub } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { getRandomWordId } from "@/utils/gameUtils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const helpWord = "TABLE".split("");
  const helpStates: LetterState[] = [
    "wrong",
    "misplaced",
    "wrong",
    "misplaced",
    "correct",
  ];
  const closeWord = "FLASH".split("");
  const closeStates: LetterState[] = [
    "correct",
    "correct",
    "correct",
    "wrong",
    "wrong",
  ];

  if (pathname === "/") return;
  // console.log(pathname);

  const handleNewGame = () => {
    router.push(`/${getRandomWordId()}`);
  };

  return (
    <nav className="flex h-fit w-full items-center justify-center p-4">
      <div className="xs:gap-8 flex w-full items-center justify-between sm:w-4/5 md:w-1/2 md:gap-4">
        <div className="xs:gap-4 flex items-center gap-2">
          <DialogButton
            trigger={{
              type: "icon",
              icon: <BiHelpCircle className="h-6 w-6" />,
            }}
            title="Help"
            className="flex flex-col items-center gap-4 font-mono"
          >
            <div className="text-center text-xs">
              You have to guess the hidden word in 6 tries and the color of the
              letters changes to show how close you are.
            </div>
            <div className="text-center text-xs">
              To start the game, just enter any word, for example:
            </div>
            {/* Test Word */}
            <div className="flex gap-1">
              {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-md border text-xl",
                    {
                      "border-tile-correct bg-tile-correct":
                        helpStates[idx] === "correct",
                      "border-tile-wrong bg-tile-wrong":
                        helpStates[idx] === "wrong",
                      "border-tile-misplaced bg-tile-misplaced":
                        helpStates[idx] === "misplaced",
                    },
                  )}
                >
                  {helpWord[idx]}
                </div>
              ))}
            </div>
            {/* Info box */}
            <div className="flex w-full flex-col gap-2 rounded-lg border-dashed bg-primary-foreground p-4 text-xs">
              {/* Wrong box */}
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-tile-wrong bg-tile-wrong">
                  T
                </div>
                ,
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-tile-wrong bg-tile-wrong">
                  B
                </div>
                <div className="ml-1">
                  aren&apos;t in the target word at all.
                </div>
              </div>
              {/* Misplaced box */}
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-tile-misplaced bg-tile-misplaced">
                  A
                </div>
                ,
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-tile-misplaced bg-tile-misplaced">
                  L
                </div>
                <div className="ml-1">
                  is in the word but in the wrong spot.
                </div>
              </div>
              {/* Correct box */}
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-tile-correct bg-tile-correct">
                  E
                </div>
                <div className="ml-1">
                  is in the word and in the correct spot.
                </div>
              </div>
            </div>
            <div className="text-center text-xs">
              Another try to find matching letters in the target word.
            </div>
            {/* Close Word */}
            <div className="flex gap-1">
              {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-md border text-xl",
                    {
                      "border-tile-correct bg-tile-correct":
                        closeStates[idx] === "correct",
                      "border-tile-wrong bg-tile-wrong":
                        closeStates[idx] === "wrong",
                      "border-tile-misplaced bg-tile-misplaced":
                        closeStates[idx] === "misplaced",
                    },
                  )}
                >
                  {closeWord[idx]}
                </div>
              ))}
            </div>
            <div className="text-xs">So close!</div>
            {/* Correct Word */}
            <div className="flex gap-1">
              {"FLAME".split("").map((item, idx) => (
                <div
                  key={idx}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-tile-correct bg-tile-correct text-xl"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="text-xs font-semibold">Got it!🏆</div>
          </DialogButton>
          <DialogButton
            trigger={{ type: "icon", icon: <BsGear className="h-6 w-6" /> }}
            title="Settings"
          >
            <Button
              variant="default"
              className="w-fit hover:bg-crimson hover:text-white"
              onClick={handleNewGame}
            >
              New Game
            </Button>
          </DialogButton>
        </div>
        <Link href="/" className="flex items-center gap-x-2 text-xl font-bold">
          <Image
            alt="logo"
            className="h-8 w-8 cursor-pointer rounded-md object-cover"
            src="/otakle-logo.png"
            height={50}
            width={50}
          />
          Otakle
        </Link>
        <div className="xs:gap-4 flex items-center gap-2">
          <Link
            href={
              process.env.NEXT_PUBLIC_GITHUB_URL ||
              "https://github.com/SkaiLord/"
            }
          >
            <Button
              variant="outline"
              className="flex w-fit items-center gap-2 rounded-md p-2"
              size="icon"
            >
              <LuGithub className="h-fit w-6" />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
