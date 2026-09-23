import { useSelector } from "react-redux";
import { Link } from "react-router";

const Result = () => {
  const result = useSelector((state) => state.result);

  console.log(result);

  return (
    <div className="mt-30 w-[70%] mx-auto">
      <div>
        <div className="text-center mb-10">
          <p className="text-6xl font-bold text-light-primary dark:text-accent">
            {result.wpm}
          </p>
          <p className="text-lg text-light-text-secondary dark:text-gray-400 mt-1 tracking-wide">
            WPM
          </p>
        </div>

        <div className="flex justify-between">
          <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl w-[300px] p-2 h-[200px] flex flex-col items-center justify-center">
            <p className="text-2xl text-light-text-secondary dark:text-gray-500 uppercase tracking-wide">
              Accuracy
            </p>
            <p className="text-2xl font-semibold text-light-text dark:text-white mt-1">
              {result.accuracy}%
            </p>
          </div>

          <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl w-[300px] p-2 h-[200px] flex flex-col items-center justify-center">
            <p className="text-2xl text-light-text-secondary dark:text-gray-500 uppercase tracking-wide">
              correct Words
            </p>
            <p className="text-2xl font-semibold text-light-text dark:text-white mt-1">
              {result.correctWords}
            </p>
          </div>

          <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl w-[300px] p-2 h-[200px] flex flex-col items-center justify-center">
            <p className="text-2xl text-light-text-secondary dark:text-gray-500 uppercase tracking-wide">
              Time Taken
            </p>
            <p className="text-2xl font-semibold text-light-text dark:text-white mt-1">
              {result.timeElapsedSeconds}s
            </p>
          </div>

          <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl w-[300px] p-2 h-[200px] flex flex-col items-center justify-center">
            <p className="text-2xl text-light-text-secondary dark:text-gray-500 uppercase tracking-wide">
              Errors
            </p>
            <p className="text-2xl font-semibold text-light-text dark:text-white mt-1">
              {result.totalAttempted - result.correctWords}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <Link
            className="flex items-center gap-2 bg-light-primary dark:bg-accent text-light-surface dark:text-dark font-semibold px-5 py-2.5 rounded-lg hover:brightness-95 cursor-pointer"
            to="/test"
          >
            Try Again
          </Link>

          <Link
            className="flex items-center gap-2 border border-light-border dark:border-white/20 text-light-text dark:text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-light-muted dark:hover:bg-white/5 cursor-pointer"
            to="/dashboard"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;