import { Link } from "react-router";

import { useSelector, useDispatch } from "react-redux";

import {
  toggleTheme,
  selectTheme,
} from "../../features/settings/settingsSlics";
import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");

    if (favicon) {
      favicon.href =
        theme === "dark" ? "/icons/dark-icon.svg" : "/icons/light-icon.svg";
    }
  }, [theme]);
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 text-light-text dark:text-white font-bold text-3xl">
          <span>
            <i className="fa-solid fa-keyboard text-light-primary dark:text-accent"></i>
          </span>

          <span className="text-light-text-secondary dark:text-grLight">
            <Link to="/">keyStrike</Link>
          </span>
        </div>

        <div className="flex items-center gap-8 text-2xl">
          <Link
            to="test"
            className="text-light-text-secondary dark:text-grLight hover:text-light-primary dark:hover:text-white"
          >
            Go to the test
          </Link>

          <Link
            to="howitworks"
            className="text-light-text-secondary dark:text-grLight hover:text-light-primary dark:hover:text-white"
          >
            How it works
          </Link>

          <Link
            to="dashboard"
            className="text-light-text-secondary dark:text-grLight hover:text-light-primary dark:hover:text-white"
          >
            DashBoard
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="border border-light-primary dark:border-accent text-light-primary dark:text-accent rounded-md px-4 py-1.5 hover:bg-light-secondary dark:hover:bg-accent/10 cursor-pointer"
            >
              Log In
            </Link>
          ) : (
            ""
          )}

          <button
            aria-label="Toggle theme"
            onClick={() => dispatch(toggleTheme())}
            className="cursor-pointer"
          >
            {theme === "light" ? (
              <Sun className="text-light-primary dark:text-accent" />
            ) : (
              <Moon className="text-light-primary dark:text-accent" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
