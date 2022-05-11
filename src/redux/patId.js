import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientId: 0,
};

export const idSlice = createSlice({
  name: "patId",
  initialState,
  reducers: {
    setId: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.patientId = action.payload;
      // console.log(state.patientId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setId } = idSlice.actions;

export default idSlice.reducer;
