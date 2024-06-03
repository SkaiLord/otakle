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

export default function Navbar() {
  const helpWord = 'TABLE'.split('');
  const helpStates: LetterState[] = [
    'wrong',
    'misplaced',
    'wrong',
    'misplaced',
    'correct',
  ];
  const closeWord = 'FLASH'.split('');
  const closeStates: LetterState[] = [
    'correct',
    'correct',
    'correct',
    'wrong',
    'wrong',
  ];

  return (
    <nav className="w-full h-fit flex justify-center items-center p-4">
      <div className="md:w-1/2 flex md:gap-4 xs:gap-8 justify-between items-center">
        <div className="flex gap-4 items-center">
          <DialogButton
            trigger={{
              type: 'icon',
              icon: <BiHelpCircle className="w-6 h-6" />,
            }}
            title="Help"
            className="flex flex-col items-center gap-4 font-mono"
          >
            <div className="text-xs text-center">
              You have to guess the hidden word in 6 tries and the color of the
              letters changes to show how close you are.
            </div>
            <div className="text-xs text-center">
              To start the game, just enter any word, for example:
            </div>
            {/* Test Word */}
            <div className="flex gap-1">
              {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-12 w-12 rounded-md border  flex items-center justify-center text-xl',
                    {
                      'bg-tile-correct border-tile-correct':
                        helpStates[idx] === 'correct',
                      'bg-tile-wrong border-tile-wrong':
                        helpStates[idx] === 'wrong',
                      'bg-tile-misplaced border-tile-misplaced':
                        helpStates[idx] === 'misplaced',
                    }
                  )}
                >
                  {helpWord[idx]}
                </div>
              ))}
            </div>
            {/* Info box */}
            <div className="bg-primary-foreground w-full rounded-lg border-dashed p-4 flex flex-col gap-2 text-xs">
              {/* Wrong box */}
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-md border flex items-center justify-center bg-tile-wrong border-tile-wrong">
                  T
                </div>
                ,
                <div className="h-6 w-6 rounded-md border flex items-center justify-center bg-tile-wrong border-tile-wrong">
                  B
                </div>
                <div className="ml-1">
                  aren&apos;t in the target word at all.
                </div>
              </div>
              {/* Misplaced box */}
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-md border flex items-center justify-center bg-tile-misplaced border-tile-misplaced">
                  A
                </div>
                ,
                <div className="h-6 w-6 rounded-md border flex items-center justify-center bg-tile-misplaced border-tile-misplaced">
                  L
                </div>
                <div className="ml-1">
                  is in the word but in the wrong spot.
                </div>
              </div>
              {/* Correct box */}
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-md border flex items-center justify-center bg-tile-correct border-tile-correct">
                  E
                </div>
                <div className="ml-1">
                  is in the word and in the correct spot.
                </div>
              </div>
            </div>
            <div className="text-xs text-center">
              Another try to find matching letters in the target word.
            </div>
            {/* Close Word */}
            <div className="flex gap-1">
              {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-12 w-12 rounded-md border  flex items-center justify-center text-xl',
                    {
                      'bg-tile-correct border-tile-correct':
                        closeStates[idx] === 'correct',
                      'bg-tile-wrong border-tile-wrong':
                        closeStates[idx] === 'wrong',
                      'bg-tile-misplaced border-tile-misplaced':
                        closeStates[idx] === 'misplaced',
                    }
                  )}
                >
                  {closeWord[idx]}
                </div>
              ))}
            </div>
            <div className="text-xs">So close!</div>
            {/* Corect Word */}
            <div className="flex gap-1">
              {'FLAME'.split('').map((item, idx) => (
                <div
                  key={idx}
                  className="h-12 w-12 rounded-md border  flex items-center justify-center text-xl bg-tile-correct border-tile-correct"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="font-semibold text-xs">Got it!🏆</div>
          </DialogButton>
          <DialogButton
            trigger={{ type: 'icon', icon: <BsGear className="w-6 h-6" /> }}
            title="Settings"
          >
            <div>Hello World</div>
          </DialogButton>
        </div>
        <Link href="/" className="flex items-center text-xl font-bold">
          <Image
            alt="logo"
            className="cursor-pointer w-8 h-8 rounded-full object-cover"
            src="/logo.svg"
            height={50}
            width={50}
          />
          Otakle
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href={
              process.env.NEXT_PUBLIC_GITHUB_URL ||
              'https://github.com/SkaiLord/'
            }
          >
            <Button
              variant="default"
              className="rounded-full w-fit gap-2 items-center flex p-1.5"
              size="sm"
            >
              <BsGithub className="h-fit w-6" />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
