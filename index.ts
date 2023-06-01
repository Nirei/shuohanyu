import { login } from "masto";

import config from "./config.json" assert { type: "json" };
import dictionary from "./dictionary.json" assert { type: "json" };

type DictionaryEntry = {
  word: string;
  pinyin: string;
  english: string;
  level: string;
};

const masto = await login({
  url: config.url,
  accessToken: config.apptoken,
});

const choice = <T>(array: Array<T>) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const generateToot = ({ word, pinyin, english, level }: DictionaryEntry) => {
  // prettier-ignore
  const status = `Pīnyīn: ${pinyin}\n`
    + `\n`
    + `English: ${english}\n`
    + `\n`
    + `#Mandarin #Chinese #${level.toUpperCase()}`;

  return {
    status,
    spoilerText: word,
    visibility: "public",
    language: "zh",
  } as const;
};

const entry = choice(dictionary);
const toot = generateToot(entry);
console.log(toot);

const status = await masto.v1.statuses.create(toot);

console.log(status.url);
