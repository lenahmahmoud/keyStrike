import { Link, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import {
  validateFormInputs,
  validateInputValues,
} from "../../utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "./userSlice";
const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    usernameEmpty: "",
    passwordEmpty: "",
    confirmPasswordEmpty: "",
    usernameLength: "",
    passwordLength: "",
    passwordMatch: "",
  });
  const [show, setShow] = useState({
    password: false,
    username: false,
    confirm: false,
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const nav = useNavigate();

  const passInput = useRef();
  const confirmInput = useRef();

  const handleToggleEye = (input, inputType) => {
    input.current.type =
      input.current.type === "password" ? "text" : "password";
    setShow({ ...show, [inputType]: !show[inputType] });
  };

  const handleSaveSignUp = () => {
    const validationInputsResult = validateFormInputs(userInfo);
    const validationValuesResult = validateInputValues(userInfo);
    if (validationInputsResult.isValid && validationValuesResult.isValid) {
      dispatch(signUp(userInfo));
      setErrors(null);
    } else {
      setErrors({
        ...validationInputsResult.errors,
        ...validationValuesResult.errors,
      });
    }
  };

  useEffect(() => {
    if (status === "succeded") {
      nav("/");
    }
  }, [status, nav]);

  return (
    <div className="flex items-center justify-center px-4">
      <div className=" w-[35%] mt-20">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-xl mb-8">
          <i className="fa-solid fa-keyboard text-accent"></i>
          <span>TypeFlow</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h1 className="text-white text-xl font-semibold text-center">
            Create your account
          </h1>
          <p className="text-gray-400 text-sm text-center mt-1">
            Save your history and track progress over time
          </p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSignUp();
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
                value={userInfo.username}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, username: e.target.value });
                }}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent"
              />
              {errors?.usernameEmpty ? (
                <span className="text-warning">{errors?.usernameEmpty}</span>
              ) : errors?.usernameLength ? (
                <span className="text-warning">{errors.usernameLength}</span>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent">
                <input
                  id="password"
                  type={show.password ? "text" : "password"}
                  value={userInfo.password}
                  ref={passInput}
                  placeholder="••••••••"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, password: e.target.value });
                  }}
                  className="w-[95%] outline-0"
                />

                <i
                  onClick={() => {
                    handleToggleEye(passInput, "password");
                  }}
                  className={`fa-solid text-black cursor-pointer ${!show?.password ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </div>

              {errors?.passwordEmpty ? (
                <span className="text-warning">{errors?.passwordEmpty}</span>
              ) : errors?.passwordLength ? (
                <span className="text-warning">{errors.passwordLength}</span>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-300"
              >
                Confirm password
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent">
                <input
                  id="confirmPassword"
                  type={show.confirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={userInfo.confirmPassword}
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      confirmPassword: e.target.value,
                    });
                  }}
                  className="w-[95%] outline-0"
                  ref={confirmInput}
                />
                <i
                  onClick={() => {
                    handleToggleEye(confirmInput, "confirm");
                  }}
                  className={`fa-solid text-black cursor-pointer ${!show?.confirm ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </div>

              {errors?.confirmPasswordEmpty ? (
                <span className="text-warning">
                  {errors?.confirmPasswordEmpty}
                </span>
              ) : errors?.passwordMatch ? (
                <span className="text-warning">{errors.passwordMatch}</span>
              ) : (
                ""
              )}
            </div>
            <div>{error && <span className="text-warning ">{error}</span>}</div>
            <button
              type="submit"
              className="mt-2  cursor-pointer bg-accent text-bgdark font-semibold rounded-lg py-2.5 text-sm hover:brightness-95"
            >
              Sign up
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
