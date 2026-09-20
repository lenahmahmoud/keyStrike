import { useReducer } from "react";
import { countCorrectChars } from "../../utils/countCorrectChar";
const reducer = (state, action) => {
  switch (action.type) {
    case "GENTEXT":
      return {
        ...state,
        textStream: action.payload.split(" ").map((word) => {
          return { value: word, status: "idle", correctChars: 0 };
        }),
        status: "idle",
      };
    case "START":
      return { ...state, status: "running" };
    case "TYPEDTEXT":
      return { ...state, typedText: action.payload };
    case "COMPARISON":
      return {
        ...state,
        textStream: state.textStream.map((obj, index) => {
          if (index !== state.currentWord) return obj;

          const correctChars = countCorrectChars(state.typedText, obj.value);
          const isCorrect = correctChars === obj.value.length;

          return {
            ...obj,
            status: isCorrect ? "correct" : "wrong",
            correctChars,
          };
        }),
        currentWord: state.currentWord + 1,
      };
    default:
      return state;
  }
};

const initialState = {
  status: "idle",
  textStream: [],
  typedText: "",
  currentWord: 0,
};

export function TypingEngine() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
