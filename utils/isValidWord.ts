import allowedWords from '@/config/allowed_words.json';

const allowedWordsSet = new Set(allowedWords);

export const isValidWord = (word: string) => {
  return allowedWordsSet.has(word.toLowerCase());
};
