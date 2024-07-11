import { createSlice } from "@reduxjs/toolkit";

const userNameSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
  },
  reducers: {
    setUserNameSlice: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetUserNameSlice: (state, action) => {
      state.searchQuery.length = 0
    }
  }
});

export const { setuserNameSlice, resetuserName } = userNameSlice.actions;
export default userNameSlice.reducer;