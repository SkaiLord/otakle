import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { GameCompletion, GameSolution } from "@/types";
import Image from "next/image";
import { getRandomWordId } from "@/utils/gameUtils";
import { useRouter } from "next/navigation";
import { ShareButtonBar } from "./ShareButtonBar";

export const GameOverDialog = ({
  open,
  setOpen,
  gameCompletionState,
  solution,
  //   handleNewGame,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  gameCompletionState: GameCompletion;
  solution: GameSolution;
  //   handleNewGame: () => void;
}) => {
  const router = useRouter();
  const handleNewGame = () => {
    router.push(`/${getRandomWordId()}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col items-center justify-center gap-y-2 text-sm md:text-base">
            <div className="text-center">
              You {gameCompletionState + " "}
              {gameCompletionState == "won" ? "🏆!" : "😢"}
            </div>
            <div className="h-0.5 w-full bg-tile-wrong"></div>
            <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-start">
              <div className="flex flex-col gap-y-2 md:w-full md:gap-y-4">
                {["word", "fullWord", "anime"].map((item, index) => (
                  <div
                    className="grid grid-cols-2 justify-items-start gap-x-4 md:gap-x-2"
                    key={index}
                  >
                    {item + " :"}
                    <span className="text-primary underline decoration-crimson decoration-wavy">
                      {solution[item as keyof GameSolution]}
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-x-2">
                  Share Word :
                  <ShareButtonBar />
                </div>
              </div>
              <div className="w-auto">
                <Image
                  src={solution.imgUrl}
                  alt={solution.anime}
                  width={150}
                  height={200}
                  className=""
                />
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="items-center sm:justify-center">
          <Button
            variant="default"
            className="w-fit hover:bg-crimson hover:text-white"
            onClick={handleNewGame}
          >
            New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
