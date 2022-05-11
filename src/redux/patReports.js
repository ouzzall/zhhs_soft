import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientReports: [],
};

export const reportsSlice = createSlice({
  name: "patReports",
  initialState,
  reducers: {
    setReports: (state, action) => {
      state.patientReports = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReports } = reportsSlice.actions;

export default reportsSlice.reducer;
