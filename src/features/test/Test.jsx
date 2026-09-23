/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { generate } from "../../utils/generate";
import { TypingEngine } from "./useTypingEngine";
import { calculateResult } from "../../utils/calculateRedult";
import { useDispatch, useSelector } from "react-redux";
import { setResult } from "../results/resultsSlice";

import {
  isLoggedIn as selectIsLoggedIn,
  user as selectUser,
} from "../users/userSlice";

import { saveResult } from "../history/historySlice";

const Test = () => {
  const { state, dispatch } = TypingEngine();

  const [options, setOptions] = useState({
    mainOption: "time",
    subOption: "15",
  });
  const [resetEsc, setResetEsc] = useState(false);

  const subOptions = {
    time: ["15", "30", "60", "120"],
    words: ["10", "25", "50", "100"],
    quote: ["short", "medium", "long"],
  };

  const userInp = useRef();
  const isFinished = state.status === "finished";

  const disp = useDispatch();
  const nav = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleModes = ({ type, value }) => {
    if (type === "mainOption") {
      setOptions({
        mainOption: value,
        subOption: subOptions[value][0],
      });
    }

    if (type === "subOption") {
      setOptions((prev) => ({
        ...prev,
        subOption: value,
      }));
    }
  };

  const reset = (inp) => {
    inp.current.value = "";
  };

  const handleTyping = (input) => {
    // handle start
    if (state.status === "idle") {
      dispatch({
        type: "START",
        payload: {
          mainOption: options.mainOption,
          subOption: options.subOption,
        },
      });
    }
    //  handle reset using esc

    if (resetEsc) {
      setResetEsc(false);
    }

    // handle every word
    if (input[input.length - 1] === " ") {
      dispatch({ type: "TYPEDTEXT", payload: input.trim() });
      dispatch({ type: "COMPARISON" });
      reset(userInp);
    }
  };

  const handleReset = () => {
    if (state.status == "running") {
      dispatch({ type: "RESET" });
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        dispatch({ type: "RESET" });
        setResetEsc(true);

        dispatch({
          type: "GENTEXT",
          payload: generate(options.mainOption, options.subOption),
        });
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [dispatch, options.mainOption, options.subOption]);

  useEffect(() => {
    dispatch({
      type: "GENTEXT",
      payload: generate(options.mainOption, options.subOption),
    });
  }, [options, dispatch]);

  useEffect(() => {
    if (state.status !== "running" || state.timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.status, dispatch, state.timeLeft]);

  useEffect(() => {
    if (state.status !== "running" || options.mainOption === "time") return;

    const intervalId = setInterval(() => {
      dispatch({ type: "RECORDTIME" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.status, dispatch, options.mainOption]);

  useEffect(() => {
    if (isFinished) {
      const audio = new Audio("/sounds/freesound_community-ding-36029.mp3");
      audio.play();
    }
  }, [isFinished]);

  useEffect(() => {
    if (isFinished) {
      const result = calculateResult(
        state,
        options.mainOption,
        options.subOption,
      );

      disp(setResult(result));

      if (isLoggedIn) {
        disp(saveResult({ id: user.id, result }));
      }
    }
  }, [isFinished]);

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-col items-center w-[60%]">
        {
          resetEsc&& <span className="text-2xl my-3 text-light-text-secondary dark:text-accent">Test reset — Esc pressed</span>
        }
        {/* Mode selector */}
        <div className="flex items-center gap-1 bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-lg px-2 py-1.5 text-2xl">
          <button
            className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
              options.mainOption === "time"
                ? "text-light-primary dark:text-accent"
                : "text-light-text-secondary dark:text-grLight"
            }`}
            onClick={() => {
              handleModes({ type: "mainOption", value: "time" });
              handleReset();
            }}
          >
            time
          </button>

          <button
            className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
              options.mainOption === "words"
                ? "text-light-primary dark:text-accent"
                : "text-light-text-secondary dark:text-grLight"
            }`}
            onClick={() => {
              handleModes({ type: "mainOption", value: "words" });
              handleReset();
            }}
          >
            words
          </button>

          <button
            className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
              options.mainOption === "quote"
                ? "text-light-primary dark:text-accent"
                : "text-light-text-secondary dark:text-grLight"
            }`}
            onClick={() => {
              handleModes({
                type: "mainOption",
                value: "quote",
              });
              handleReset();
            }}
          >
            quote
          </button>

          <span className="w-px h-4 bg-light-border dark:bg-white/10 mx-1"></span>

          {subOptions[options.mainOption].map((text) => (
            <button
              className={`px-3 py-1 rounded-md bg-light-muted dark:bg-white/10 font-bold cursor-pointer ${
                text == options.subOption
                  ? "text-light-primary dark:text-accent"
                  : "text-light-text-secondary dark:text-grLight"
              }`}
              key={text}
              onClick={() => {
                handleModes({ type: "subOption", value: text });
                handleReset();
              }}
            >
              {text}
              {options.mainOption == "time" ? "s" : ""}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8 mt-8 text-2xl text-light-text-secondary dark:text-gray-400">
          <span>
            {options.mainOption === "time"
              ? state.status === "idle"
                ? `Time Left :${options.subOption}s`
                : `Time Left :${state.timeLeft}s`
              : `Time Taken : ${state.timeTaken}s`}
          </span>
        </div>

        {/* Typing box */}
        <div className="mt-8 w-full bg-light-surface dark:bg-white/5 border border-light-border dark:border-white/10 rounded-xl p-8">
          <p className="font-mono text-2xl leading-relaxed text-light-text-secondary dark:text-gray-500">
            {state.textStream.map((obj, index) => (
              <span
                key={index}
                className={`text-3xl ${
                  obj.status === "idle"
                    ? "text-light-text-secondary dark:text-grDark"
                    : obj.status === "correct"
                      ? "text-green-500 dark:text-green-400"
                      : "text-warning"
                }`}
              >
                {obj.value}{" "}
              </span>
            ))}
          </p>

          <div className="flex justify-center">
            <input
              type="text"
              ref={userInp}
              onChange={(e) => {
                handleTyping(e.target.value);
              }}
              disabled={isFinished}
              className="w-[30%] rounded p-4 text-center outline-light-primary dark:outline-accent text-4xl outline-2 mt-5 bg-light-surface dark:bg-white/5 text-light-text dark:text-dark border border-light-border dark:border-white/10"
            />
          </div>
        </div>

        {/* Caption */}
        <div className="text-center mt-6 text-3xl text-light-text-secondary dark:text-grDark italic">
          {isFinished ? (
            <div className="not-italic flex flex-col">
              <span>Nice work! your results are ready</span>

              <button
                className="mt-10 bg-light-primary cursor-pointer dark:bg-accent text-lg text-light-surface dark:text-dark font-semibold z-[1000] px-6 py-2.5 w-[50%] mx-auto rounded-lg hover:brightness-95 cursor-pointer inline-block"
                onClick={() => {
                  nav("/result");
                }}
              >
                see your result
              </button>
            </div>
          ) : (
            "Start typing to begin"
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
