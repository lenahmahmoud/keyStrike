export function bestWpm(history) {
  return Math.max(...history.map((h) => h.wpm));
}
export function bestAccuracy(history) {
  return Math.max(...history.map((h) => h.accuracy));
}
export function averageWpm(history) {
  const wpms = history.map((h) => h.wpm);
  const total = wpms.reduce((acc, current) => {
    return acc + current;
  }, 0);

  return total / wpms.length;
}
export function totalSeconds(history) {
  return history.reduce((acc, h) => acc + h.timeElapsedSeconds , 0);
}
