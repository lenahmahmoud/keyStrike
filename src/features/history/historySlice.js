import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  results: [],
  status: "idle",
  error: "",
};

export const saveResult = createAsyncThunk(
  "history/saveResult",
  async ({ id, result }) => {
    const userRes = await axios.get(`http://localhost:3000/users/${id}`);
    const currentHistory = userRes.data.history || [];
    const res = await axios.patch(`http://localhost:3000/users/${id}`, {
      history: [...currentHistory, result],
    });
    return res.data;
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(saveResult.pending, (state) => {
        state.status = "pending";
      })
      .addCase(saveResult.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.results = action.payload.history;
        state.error = "";
        console.log("thi sis ," ,action.payload.history)
      })
      .addCase(saveResult.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default historySlice.reducer;
export const results =(state)=> state.history.results