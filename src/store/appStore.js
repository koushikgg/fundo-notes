// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchNoteSlice from "./searchNoteSlice";
import labelNameSlice from "./labelNameSlice";
import noteDetailsSlice from "./noteDetailsSlice";


const appStore = configureStore({
  reducer: {
    searchNote: searchNoteSlice,
    noteDetails: noteDetailsSlice,
    labelNames: labelNameSlice
  },
});

export default appStore;
