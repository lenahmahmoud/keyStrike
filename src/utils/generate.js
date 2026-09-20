import { wordBank } from "../data/wordsBank";
import { quotes } from "../data/quoteBank";

export function generate(mainOption, subOption) {
  if (mainOption === "quote") {
    const pool = quotes[subOption];
    const random = Math.floor(Math.random() * pool.length);
    return pool[random];
  }

  let wordCount;

  if (mainOption === "time") {
    const durationInSeconds = Number(subOption);
    wordCount = Math.ceil((durationInSeconds / 60) * 150 * 1.5);
  } else {
    wordCount = Number(subOption);
  }

  const stream = [];
  for (let i = 0; i < wordCount; i++) {
    const random = Math.floor(Math.random() * wordBank.length);
    stream.push(wordBank[random]);
  }

  return stream.join(" ");
}