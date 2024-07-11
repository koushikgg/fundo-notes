// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchNoteSlice from "./searchNoteSlice";
import userNameSlice from "./userNameSlice";

const appStore = configureStore({
  reducer: {
    searchNote: searchNoteSlice,
    userNames: userNameSlice,
  },
});

export default appStore;
