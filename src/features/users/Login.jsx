import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { validateFormInputs } from "../../utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";

const Login = () => {
  const [userinfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => state.user);
  const nav = useNavigate();

  const passInput = useRef();

  const handleToggleEye = (input) => {
    input.current.type =
      input.current.type === "password" ? "text" : "password";
    setShowPassword(!showPassword);
  };

  const handleSaveLogIn = () => {
    const validationResult = validateFormInputs(userinfo);
    if (validationResult.isValid) {
      console.log("valid");
      setErrors(null);
      dispatch(fetchUsers(userinfo));
    } else {
      console.log("not valid");
      setErrors(validationResult.errors);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      nav("/");
    }
  }, [isLoggedIn, nav]);
  return (
    <div className="bg-dark flex justify-center  mt-20 ">
      <div className="w-[35%] ">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-xl mb-8">
          <span>
            <i className="fa-solid fa-keyboard text-accent"></i>
          </span>{" "}
          <span>TypeFlow</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h1 className="text-white text-xl font-semibold text-center">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm text-center mt-1">
            Log in to track your progress
          </p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveLogIn();
            }}
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-sm text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="yourname"
                value={userinfo.username}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, username: e.target.value });
                }}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent"
              />
              {errors && (
                <span className="text-red-600 "> {errors.usernameEmpty}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={userinfo.password}
                  onChange={(e) => {
                    setUserInfo({ ...userinfo, password: e.target.value });
                  }}
                  ref={passInput}
                  className="w-[95%] outline-0"
                />
                  <i
                  onClick={() => {
                    handleToggleEye(passInput);
                  }}
                  className={`fa-solid text-black cursor-pointer ${!showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </div>
              {errors && (
                <span className="text-red-600 ">{errors.passwordEmpty}</span>
              )}
            </div>
            <div>{error && <span className="text-warning">{error}</span>}</div>

            <button
              type="submit"
              className="mt-2 bg-accent cursor-pointer text-bgdark font-semibold rounded-lg py-2.5 text-sm hover:brightness-95"
            >
              Log in
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-grDark mt-6 ">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-accent hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
