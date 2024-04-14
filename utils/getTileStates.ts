import { LetterState } from '@/types';
import { GAME_WORD_LEN } from './constants';

export const replaceCharAtIndex = (
  str: string,
  idx: number,
  newChar: string
) => {
  return str.substring(0, idx) + newChar + str.substring(idx + 1, str.length);
};

export const getTileStates = (
  solution: string,
  guess: string | undefined,
  isSubmitted: boolean
) => {
  const tileStates: Array<LetterState> = Array.from<LetterState>({
    length: GAME_WORD_LEN,
  }).fill('default');
  if (!isSubmitted || !guess) {
    return tileStates;
  }

  for (let i = 0; i < solution.length; i++) {
    if (guess[i] === solution[i]) {
      tileStates[i] = 'correct';
      solution = replaceCharAtIndex(solution, i, ' ');
    }
  }

  for (let i = 0; i < solution.length; i++) {
    if (tileStates[i] === 'correct') {
      continue;
    }
    if (solution.includes(guess[i])) {
      solution = replaceCharAtIndex(solution, solution.indexOf(guess[i]), ' ');
      tileStates[i] = 'misplaced';
    } else {
      tileStates[i] = 'wrong';
    }
  }

  return tileStates;
};
