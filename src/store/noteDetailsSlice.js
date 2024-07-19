import { Update } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const noteDeatailsSlice = createSlice({
  name: "label",
  initialState: {
    noteDetailsList: [],
  },
  reducers: {
    addNotes: (state, action) => {
      state.noteDetailsList= action.payload;
    //   console.log(noteDeatailsList);
    },
    addNotetoRedux: (state, action) => {
      state.noteDetailsList.push(action.payload);
    },
    removeNotes: (state, action) => {
      state.noteDetailsList = state.noteDetailsList.filter(label => label.id !== action.payload.id);
    },
    updateNoteList: (state, action) => {
      state.noteDetailsList = state.noteDetailsList.map(note => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      
    },
    clearNotes: (state) => {
      state.noteDetailsList = [];
    }
  }
});

export const { addNotes, addNotetoRedux, removeNotes, clearNotes, updateNoteList } = noteDeatailsSlice.actions;
export default noteDeatailsSlice.reducer;
