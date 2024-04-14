import { GameState } from '@/types';
import { GAME_STATE_KEY } from './constants';

const getTodayPuzzleDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const getStoredGameState = () => {
  if (typeof window !== undefined) {
    const gameStateStr = localStorage.getItem(GAME_STATE_KEY);
    if (!gameStateStr) {
      return [];
    }
    // TODO: add validation for localStorage
    const gameState = JSON.parse(gameStateStr) as GameState;
    if (gameState.puzzleDate !== getTodayPuzzleDate()) {
      return [];
    }
    // return []; // uncomment to turn off local storage
    return gameState.guesses;
  }
};

export const setStoredGameState = (guesses: Array<string>) => {
  localStorage.setItem(
    GAME_STATE_KEY,
    JSON.stringify({
      puzzleDate: getTodayPuzzleDate(),
      guesses,
    })
  );
};
