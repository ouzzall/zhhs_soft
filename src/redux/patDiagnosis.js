import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientDiagnosis:
    "<p><strong>Symptoms:</strong><br><br><br><strong>Findings:</strong><br><br><br><strong>Care:</strong><br><br><br><strong>Suggestions:</strong><br><br><br><strong><em><u>By: Hakeem M. Ashraf</u></em></strong></p>",
};

export const diagnosisSlice = createSlice({
  name: "patDiagnosis",
  initialState,
  reducers: {
    setDiagnosis: (state, action) => {
      state.patientDiagnosis = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDiagnosis } = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
