export function calculateResult(state, mode, subOption) {
  const correctWords = state.textStream.filter(
    (w) => w.status === "correct",
  ).length;
  const totalAttempted = state.currentWord;

  const timeElapsedSeconds =
    mode === "time" ? Number(subOption) : state.timeTaken;
  const minutesElapsed = timeElapsedSeconds / 60;

  const wpm =
    minutesElapsed > 0 ? Math.round(correctWords / minutesElapsed) : 0;
  const accuracy =
    totalAttempted > 0 ? Math.round((correctWords / totalAttempted) * 100) : 0;

  return { wpm, accuracy, correctWords, totalAttempted ,timeElapsedSeconds ,mode};
}
