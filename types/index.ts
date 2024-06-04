export type LetterState = 'default' | 'wrong' | 'correct' | 'misplaced';

export type GameCompletion = 'active' | 'won' | 'lost';

export type GameState = {
  puzzleDate: string;
  guesses: Array<string>;
};

export type GameSolution = {
  date: string;
  word: string;
  fullWord: string;
  anime: string;
  imgUrl: string;
};