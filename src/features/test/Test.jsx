import { useEffect, useState, useRef } from "react";
import { generate } from "../../utils/generate";
import { TypingEngine } from "./useTypingEngine";
const Test = () => {
  const { state, dispatch } = TypingEngine();

  const [options, setOptions] = useState({
    mainOption: "time",
    subOption: "15",
  });
  const subOptions = {
    time: ["15", "30", "60", "120"],
    words: ["10", "25", "50", "100"],
    quote: ["short", "medium", "long"],
  };
  const userInp = useRef();

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
    if (state.status === "idle") {
      dispatch({ type: "START" });
    }
    if (input[input.length - 1] === " ") {
      dispatch({ type: "TYPEDTEXT", payload: input.trim() });
      dispatch({ type: "COMPARISON" });
      reset(userInp);
    }
  };

  useEffect(() => {
    dispatch({
      type: "GENTEXT",
      payload: generate(options.mainOption, options.subOption),
    });
  }, [options, dispatch]);

  return (
    <div className="min-h-[90vh] flex justify-center  items-center  ">
      <div className="flex flex-col items-center w-[60%] ">
        {/* Mode selector + sub-options */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-2xl">
          <button
            className={`px-3 py-1 rounded-md  efont-medium cursor-pointer ${options.mainOption === "time" ? `text-accent` : ""} `}
            onClick={() => {
              handleModes({ type: "mainOption", value: "time" });
            }}
          >
            time
          </button>
          <button
            className={`px-3 py-1 rounded-md  efont-medium cursor-pointer ${options.mainOption === "words" ? `text-accent` : ""} `}
            onClick={() => {
              handleModes({ type: "mainOption", value: "words" });
            }}
          >
            words
          </button>
          <button
            className={`px-3 py-1 rounded-md  efont-medium cursor-pointer   ${options.mainOption === "quote" ? `text-accent` : ""}  `}
            onClick={() => {
              handleModes({
                type: "mainOption",
                value: "quote",
              });
            }}
          >
            quote
          </button>

          <span className="w-px h-4 bg-white/10 mx-1"></span>
          {subOptions[options.mainOption].map((text) => (
            <button
              className={`px-3 py-1 rounded-md bg-white/10 font-bold  cursor-pointer ${text == options.subOption ? `text-accent` : ""}`}
              key={text}
              onClick={() => {
                handleModes({ type: "subOption", value: text });
              }}
            >
              {text}
              {options.mainOption == "time" ? "s" : ""}
            </button>
          ))}
        </div>

        {/* Live stats */}
        <div className="flex items-center gap-8 mt-8 text-2xl text-gray-400">
          <span>
            WPM: <span className="text-white">—</span>
          </span>
          <span>
            Accuracy: <span className="text-white">—</span>
          </span>
          <span>
            {options.mainOption.slice(0, 1).toUpperCase()}
            {options.mainOption.slice(1)}:{" "}
            <span className="text-white text-xl font-semibold">
              {options.subOption}
            </span>
          </span>
        </div>

        {/* Typing box */}
        <div className="mt-8  w-full bg-white/5 border border-white/10 rounded-xl p-8 ">
          <p className="font-mono text-2xl leading-relaxed text-gray-500 ">
            {state.textStream.map((obj, index) => (
              <span
                key={index}
                className={`text-3xl ${
                  obj.status === "idle"
                    ? "text-grDark"
                    : obj.status === "correct"
                      ? "text-green-400"
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
              className="w-[30%]  rounded p-4  text-center outline-accent  text-4xl outline-2 mt-5  "
            />
          </div>
        </div>

        {/* Caption */}
        <p className="mt-6 text-xl text-grDark italic">Start typing to begin</p>
      </div>
    </div>
  );
};

export default Test;