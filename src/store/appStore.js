import { configureStore } from "@reduxjs/toolkit";
import searchNoteSlice from "./searchNoteSlice";

const appStore = configureStore({
  reducer: {
    searchNote: searchNoteSlice
  },
});

export default appStore;