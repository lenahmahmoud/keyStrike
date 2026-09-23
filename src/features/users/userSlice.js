import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoggedIn: false,
  error: "",
  status: "idle",
  id: "",
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (user, { rejectWithValue }) => {
    const { username, password } = user;
    const res = await axios.get("http://localhost:3000/users");
    const existed = res.data.find(
      (u) => u.username === username && u.password === password,
    );
    if (!existed) {
      return rejectWithValue("invalid login ");
    }

    return existed;
  },
);
export const signUp = createAsyncThunk(
  "user/signUp",
  async (user, { rejectWithValue }) => {
    const { username, password } = user;
    const users = await axios.get("http://localhost:3000/users");
    const existed = users.data.find((user) => user.username === username);
    if (existed) {
      return rejectWithValue("user already existes");
    }
    const res = await axios.post("http://localhost:3000/users", {
      username,
      password,
    });
    return res.data;
  },
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeded";
        state.isLoggedIn = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeded";
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
export default userSlice.reducer;
export const isLoggedIn = (state) => state.user.isLoggedIn;
export const user = (state) => state.user.user;
