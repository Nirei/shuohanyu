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

const dieRoll = (sides: number) => {
  return Math.floor(Math.random() * sides);
};

const choice = <T>(array: Array<T>) => {
  const index = dieRoll(array.length);
  return array[index];
};

const ENGAGEMENT: string[] = [
  "Boost if you got it right!",
  "Boost if you got it right! 🎯",
  "Boost if you're committed to mastering Chinese grammar!",
  "Boost if you're committed to mastering Chinese grammar! 📖✅",
  "Boost if you're excited to explore Chinese literature!",
  "Boost if you're excited to explore Chinese literature! 🚀📚",
  "Boost if you're proud of your progress in learning Chinese!",
  "Boost if you're proud of your progress in learning Chinese! 🚀🎓",
  "Comment with a Chinese idiom that inspires you!",
  "Comment with a Chinese idiom that inspires you! 💬🀄️",
  "Comment with your favorite Chinese phrase and its meaning!",
  "Comment with your favorite Chinese phrase and its meaning! 💬📖",
  "Comment with your favorite Chinese word!",
  "Comment with your favorite Chinese word! 💬🇨🇳",
  "Double-tap if learning Chinese is your new year's resolution!",
  "Double-tap if learning Chinese is your new year's resolution! 👆🎉",
  "Double-tap if you're on your way to becoming fluent in Chinese!",
  "Double-tap if you're on your way to becoming fluent in Chinese! 💬",
  "Like if you're enjoying your Chinese language journey!",
  "Like if you're enjoying your Chinese language journey! ❤️🌟",
  "Like this post if you're ready to level up your Mandarin skills!",
  "Like this post if you're ready to level up your Mandarin skills! 🚀🔥",
  "Reply with '加油!' if you're motivated to learn Chinese!",
  "Reply with '加油!' if you're motivated to learn Chinese! 💪🎉",
  "Retoot and challenge your followers to a Chinese vocabulary duel!",
  "Retoot and challenge your followers to a Chinese vocabulary duel! 🔄⚔️",
  "Retoot and let the world know you're a Chinese language enthusiast!",
  "Retoot and let the world know you're a Chinese language enthusiast! 🌍🗣️",
  "Retoot if you're acing your Chinese lessons!",
  "Retoot if you're acing your Chinese lessons! ✨📚",
  "Share if you believe learning Chinese is a valuable skill!",
  "Share if you believe learning Chinese is a valuable skill! 📣💡",
  "Share if you're mastering Chinese one character at a time!",
  "Share if you're mastering Chinese one character at a time! 📝🔢",
  "Share this post and spread the joy of learning Chinese!",
  "Share this post and spread the joy of learning Chinese! 😄📣",
  "Tag a friend and challenge them to a tongue-twister in Chinese!",
  "Tag a friend and challenge them to a tongue-twister in Chinese! 👥🌬️",
  "Tag a friend who loves learning Chinese!",
  "Tag a friend who loves learning Chinese! 👥❤️",
  "Tag someone who needs to start learning Chinese today!",
  "Tag someone who needs to start learning Chinese today! 👥📆",
];

const generateEngagement = () => {
  if (Math.random() >= 0.125) return "";

  const index = dieRoll(ENGAGEMENT.length);

  return `${ENGAGEMENT[index]}\n`;
};

const generateToot = ({ word, pinyin, english, level }: DictionaryEntry) => {
  // prettier-ignore
  const status = `Pīnyīn: ${pinyin}\n`
    + `\n`
    + `English: ${english}\n`
    + `\n`
    + `${generateEngagement()}`
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
