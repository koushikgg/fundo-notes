import { createSlice } from "@reduxjs/toolkit";

const searchNoteSlice = createSlice({
  name: "cart",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetSearchQuery: (state, action) => {
      state.searchQuery.length=0
    }
  },
});

export const { setSearchQuery, resetSearchQuery } = searchNoteSlice.actions;
export default searchNoteSlice.reducer;