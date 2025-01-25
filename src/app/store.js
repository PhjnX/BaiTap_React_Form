import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../features/studentsSlice";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});
