import characterWords from "@/config/character_words.json";
import englishWords from "@/config/english_words.json";
import answerWords from "@/config/answer_words.json";

const characterWordsSet = new Set(characterWords);
const englishWordsSet = new Set(englishWords);

export const isValidWord = (word: string) => {
  // console.log(answerWords);
  return (
    characterWordsSet.has(word.toUpperCase()) ||
    englishWordsSet.has(word.toUpperCase())
  );
};

export const getTodaysWord = () => {
  //Getting today's date
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let date = dd + "-" + mm + "-" + yyyy;
  // Get today's word
  const match = answerWords.filter((item, _) => item.date === date);
  // console.log(match);
  return match[0].word;
};

export const getRandomWord = () => {
  return answerWords[Math.floor(Math.random() * answerWords.length)].word;
};
