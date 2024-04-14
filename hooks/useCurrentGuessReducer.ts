import { GAME_WORD_LEN } from '@/utils/constants';
import { useReducer } from 'react';

type AddLetterAction = {
  type: 'add';
  letter: string;
};

type BackspaceAction = {
  type: 'backspace';
};

type ClearAction = {
  type: 'clear';
};

type Action = AddLetterAction | BackspaceAction | ClearAction;

const reducer = (state: string, action: Action) => {
  switch (action.type) {
    case 'add':
      if (state.length === GAME_WORD_LEN) {
        return state;
      }
      return state + action.letter;
    case 'backspace':
      if (state.length !== 0) {
        return state.substring(0, state.length - 1);
      }
      return state;
    case 'clear':
      return '';
  }
};

export const useCurrentGuessReducer = () => {
  return useReducer(reducer, '');
};
