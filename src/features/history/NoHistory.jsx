import { Link } from "react-router"

import { Keyboard } from "lucide-react"

const NoHistory = () => {

  return (

        <div className="flex items-center justify-center min-h-[90vh]">

              <div className="flex flex-col items-center text-center w-[55%] h-[50vh]">

                <div className="bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-full p-4 mb-6">

                  <Keyboard className="w-8 h-8 text-light-primary dark:text-accent" />

                </div>

                <h1 className="text-5xl font-bold text-light-text dark:text-white">No tests yet</h1>

                <p className="mt-3 text-light-text-secondary dark:text-gray-400 max-w-md text-2xl">

                  Take your first typing test to start tracking your WPM,

                  accuracy, and progress over time.

                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none sm:w-auto text-xl">

                  <Link

                    to="/test"

                    className="bg-light-primary dark:bg-accent text-light-surface dark:text-dark font-semibold text-center rounded-lg px-6 py-2.5 text-sm hover:brightness-95"

                  >

                    Start typing

                  </Link>

                </div>

              </div>

            </div>

  )

}

export default NoHistory
