import { createSlice } from "@reduxjs/toolkit";

const labelNameSlice = createSlice({
  name: "label",
  initialState: {
    labelsName: [],
  },
  reducers: {
    addLabelName: (state, action) => {
      state.labelsName.push(action.payload);
    },
    removeLabelName: (state, action) => {
      state.labelsName = state.labelsName.filter(label => label !== action.payload);
    },
    clearLabels: (state) => {
      state.labelsName = [];
    }
  }
});

export const { addLabelName, removeLabelName, clearLabels } = labelNameSlice.actions;
export default labelNameSlice.reducer;
