import characterWords from "@/config/character_words.json";
import englishWords from "@/config/english_words.json";
import answerWords from "@/config/answer_words.json";
import { START_DATE } from "./constants";

const characterWordsSet = new Set(characterWords);
const englishWordsSet = new Set(englishWords);

export const isValidWord = (word: string) => {
  // console.log(answerWords);
  return (
    characterWordsSet.has(word.toUpperCase()) ||
    englishWordsSet.has(word.toUpperCase())
  );
};

export const getTodaysWordId = () => {
  //Getting today's date
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let dateId = dd + mm + yyyy;
  return dateId;
};

export const getRandomWord = () => {
  return answerWords[Math.floor(Math.random() * answerWords.length)];
};

export const getRandomWordId = () => {
  // Getting today's date
  let today = new Date();
  // let dd = String(today.getDate()).padStart(2, "0");
  // let mm = String(today.getMonth() + 1).padStart(2, "0");
  // let yyyy = today.getFullYear();
  const CURRENT_DATE: number[] = [
    today.getDate(),
    today.getMonth() + 1,
    today.getFullYear(),
  ];
  // Getting random date between START_DATE and today
  const randomYYYY = String(
    Number(START_DATE[2]) +
      Math.floor(Math.random() * (CURRENT_DATE[2] - Number(START_DATE[2]))),
  );
  const randomMM = String(
    Number(START_DATE[1]) +
      Math.floor(Math.random() * (CURRENT_DATE[1] - Number(START_DATE[1]))),
  ).padStart(2, "0");
  const randomDD = String(
    Number(START_DATE[0]) +
      Math.floor(Math.random() * (CURRENT_DATE[0] - Number(START_DATE[0]))),
  ).padStart(2, "0");
  const randomId = randomDD + randomMM + randomYYYY;
  console.log(randomId);
  return randomId;
};

export const getWordById = (id: string) => {
  // "date": "16-02-2024",
  const date = id.slice(0, 2) + "-" + id.slice(2, 4) + "-" + id.slice(4);
  // console.log(date);
  const match = answerWords.filter((item, _) => item.date === date);
  // console.log(match);
  if (match.length !== 0) return match[0];
  else return getRandomWord();
};