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
    resetSearchQuery: (state) => {
      state.searchQuery = ""
    }
  }
});

export const { setSearchQuery, resetSearchQuery, setuserName, resetuserName } = searchNoteSlice.actions;
export default searchNoteSlice.reducer;