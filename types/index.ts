export type LetterState = 'default' | 'wrong' | 'correct' | 'misplaced';

export type GameCompletion = 'active' | 'won' | 'lost';

export type GameState = {
  puzzleDate: string;
  guesses: Array<string>;
};
