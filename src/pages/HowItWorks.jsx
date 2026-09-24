import { SlidersHorizontal, Keyboard, LineChart } from "lucide-react";
import { Link } from "react-router";

const steps = [
  {
    number: "01",
    icon: SlidersHorizontal,
    title: "Pick a mode",
    description:
      "Select time limit, word count, or custom quotes depending on your current training focus.",
  },
  {
    number: "02",
    icon: Keyboard,
    title: "Start typing",
    description:
      "Begin typing to start the timer. Watch out for red indicators highlighting errors instantly.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "See your results",
    description:
      "Examine detailed stats highlighting WPM drop points, raw speed, accuracy, and key errors.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-light-bg dark:bg-dark px-8 py-20 mt-10 text-light-text dark:text-white">
      <div className="w-[70%] mx-auto text-center">
        <h1 className="text-3xl font-bold text-light-text dark:text-grLight">
          How It Works
        </h1>

        <p className="mt-3 text-light-text-secondary dark:text-grDark">
          Three steps to master your muscle memory and track your progress
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="bg-light-surface dark:bg-white/5 rounded-xl p-6 border border-light-border dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="bg-light-muted dark:bg-white/5 rounded-lg p-2 flex items-center">
                  <Icon className="w-5 h-5 text-light-primary dark:text-accent" />
                </div>

                <h3 className="font-semibold text-light-primary dark:text-accent">
                  {title}
                </h3>
              </div>

              <p className="mt-2 text-sm text-light-text-secondary dark:text-grLight leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/test"
            className="mt-20 bg-light-primary dark:bg-accent text-light-surface dark:text-dark font-semibold px-6 py-2.5 rounded-lg hover:brightness-95 cursor-pointer"
          >
            Got it, let's go
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
