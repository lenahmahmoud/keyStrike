import { Link } from "react-router";

import { LockKeyhole } from "lucide-react";

const NotLoggedIn = () => {

  return (

    <div className="flex items-center justify-center min-h-[90vh]">

      <div className="flex flex-col items-center text-center w-[55%] h-[50vh] ">

        <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-full p-4 mb-6 ">

          <LockKeyhole className="w-8 h-8 text-light-primary dark:text-accent" />

        </div>

        <h1 className="text-5xl font-bold text-light-text dark:text-white">

          Oops, you're not logged in

        </h1>

        <p className="mt-3 text-light-text-secondary dark:text-gray-400 max-w-md text-2xl">

          Create an account or log in to see your dashboard, track your

          progress, and a lot more.

        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none sm:w-auto text-xl">

          <Link

            to="/login"

            className="bg-light-primary dark:bg-accent text-light-surface dark:text-dark font-semibold text-center rounded-lg px-6 py-2.5 text-sm hover:brightness-95"

          >

            Log in

          </Link>

          <Link

            to="/signup"

            className="border border-light-primary dark:border-accent text-light-primary dark:text-accent font-semibold text-center rounded-lg px-6 py-2.5 text-sm hover:bg-light-primary/10 dark:hover:bg-accent/10"

          >

            Sign up

          </Link>

        </div>

      </div>

    </div>

  );

};

export default NotLoggedIn;
