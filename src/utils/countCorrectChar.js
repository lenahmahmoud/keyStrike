export function countCorrectChars(typed, target) {
  let correct = 0;
  for (let i = 0; i < target.length; i++) {
    if (typed[i] === target[i]) {
      correct++;
    }
  }
  return correct;
}