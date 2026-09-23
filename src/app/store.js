import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import resultReducer from "../features/results/resultsSlice";
import historyReducer from "../features/history/historySlice";
import settingsReudcer from "../features/settings/settingsSlics";
const store = configureStore({
  reducer: {
    user: userReducer,
    result: resultReducer,
    history: historyReducer,
    settings: settingsReudcer,
  },
});

export default store;
