import { Link } from "react-router";
import { useSelector } from "react-redux";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4  ">
        <div className="flex items-center gap-2 text-white font-bold text-3xl">
          <span>
            <i className="fa-solid fa-keyboard text-accent"></i>
          </span>
          <span className="text-grLight">
            <Link to="/">keyStrike</Link>
          </span>
        </div>

        <div className="flex items-center gap-8 text-2xl ">
          <Link to="test" className=" hover:text-white text-grLight ">
            Go to the test
          </Link>
          <Link to="howitworks" className=" hover:text-white text-grLight ">
            How it works
          </Link>

          <Link to="dashboard" className=" text-grLight hover:text-white ">
            DashBoard
          </Link>
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="border border-accent text-accent rounded-md px-4 py-1.5  hover:bg-accent/10 cursor-pointer"
            >
              Log In
            </Link>
          ) : (
            <Link to="#">
              <i class="fa-solid fa-circle-user text-accent text-2xl"></i>{" "}
            </Link>
          )}

          <button
            aria-label="Toggle theme"
            className="text-accent cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
