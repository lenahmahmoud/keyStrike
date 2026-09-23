import {
  bestWpm,
  totalSeconds,
  averageWpm,
  bestAccuracy,
} from "../../utils/historyCalculations";

const History = ({ history }) => {
  const wpmBest = bestWpm(history);
  const accuracyBest = bestAccuracy(history);
  const avg = averageWpm(history);
  const totalSec = totalSeconds(history);

  const chartWidth = 700;
  const chartHeight = 180;
  const padding = 10;

  const recentHistory = history.slice(-9);

  const maxWpm = Math.max(...recentHistory.map((h) => h.wpm), 1);

  const points = recentHistory
    .map((h, i) => {
      const x =
        recentHistory.length === 1
          ? chartWidth / 2
          : (i / (recentHistory.length - 1)) * (chartWidth - padding * 2) +
            padding;

      const y =
        chartHeight - padding - (h.wpm / maxWpm) * (chartHeight - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="px-8 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Top stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl p-5">
            <p className="text-xs text-light-text-secondary dark:text-gray-500 uppercase tracking-wide">
              Best WPM
            </p>

            <p className="text-3xl font-bold text-light-primary dark:text-accent mt-1">
              {wpmBest}{" "}
              <span className="text-sm text-light-text-secondary dark:text-gray-500 font-normal">
                {accuracyBest} Accuracy
              </span>
            </p>
          </div>

          <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl p-5">
            <p className="text-xs text-light-text-secondary dark:text-gray-500 uppercase tracking-wide">
              Average WPM
            </p>

            <p className="text-3xl font-bold text-light-primary dark:text-accent mt-1">
              {avg}{" "}
              <span className="text-sm text-light-text-secondary dark:text-gray-500 font-normal">
                Over {history.length} tests
              </span>
            </p>
          </div>

          <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl p-5">
            <p className="text-xs text-light-text-secondary dark:text-gray-500 uppercase tracking-wide">
              Tests Taken
            </p>

            <p className="text-3xl font-bold text-light-primary dark:text-accent mt-1">
              {history.length}{" "}
              <span className="text-sm text-light-text-secondary dark:text-gray-500 font-normal">
                {totalSec} seconds Typed
              </span>
            </p>
          </div>
        </div>

        {/* Progress trend */}
        <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-semibold text-light-text dark:text-white uppercase tracking-wide">
              Progress Trend
            </p>

            <p className="text-xs text-light-text-secondary dark:text-gray-500">
              Last 9 tests
            </p>
          </div>

          <svg
            viewBox="0 0 700 180"
            className="w-full h-44"
            role="img"
            aria-label="WPM progress over recent tests"
          >
            <line
              x1="0"
              y1="170"
              x2="700"
              y2="170"
              stroke="#333"
              strokeWidth="0.5"
            />

            <polyline
              points={points}
              fill="none"
              stroke="#e2b714"
              strokeWidth="2"
            />
          </svg>

          <div className="flex justify-between text-xs text-light-text-secondary dark:text-gray-500 mt-2">
            {recentHistory.map((_, i) => (
              <span key={i}>Test {i + 1}</span>
            ))}
          </div>
        </div>

        {/* Recent attempts table */}
        <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl p-6 mt-6">
          <p className="text-sm font-semibold text-light-text dark:text-white uppercase tracking-wide mb-4">
            Recent Attempts
          </p>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-light-text-secondary dark:text-gray-500 text-left border-b border-light-border dark:border-white/10">
                <th className="pb-2 font-normal text-center">Time</th>
                <th className="pb-2 font-normal text-center">WPM</th>
                <th className="pb-2 font-normal text-center">Accuracy</th>
                <th className="pb-2 font-normal text-center">Mode</th>
              </tr>
            </thead>

            <tbody className="text-light-text dark:text-gray-300">
              {history.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-light-border dark:border-white/5 last:border-0"
                >
                  <td className="py-2.5 text-center">
                    {row.timeElapsedSeconds}s
                  </td>

                  <td className="py-2.5 text-center text-light-primary dark:text-accent font-semibold">
                    {row.wpm}
                  </td>

                  <td className="py-2.5 text-center">{row.accuracy}</td>

                  <td className="py-2.5 text-center text-light-text-secondary dark:text-gray-500">
                    {row.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
