import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wpm: 0,
  accuracy: 0,
  totalAttempted: 0,
  correctWords: 0,
};
const resultsSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResult: ( state, action) => {
      return action.payload
    },
  },
});

export default resultsSlice.reducer;
export const {setResult} = resultsSlice.actions
