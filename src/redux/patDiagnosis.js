import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientDiagnosis:
    "<p><strong>Weight: <u>___________</u> Blood Pressure: <u>__________</u> Sugar: <u>_____________</u></strong></p><p><br></p><p><strong>Symptoms:</strong></p><p><br></p><p><strong>Findings:</strong></p><p><br></p><p><strong>Care:</strong></p><p><br></p><p><strong>Suggestions:</strong></p><p><br></p><p><br></p><p><strong><em><u>By: Hakeem M. Ashraf</u></em></strong></p>",
  medicineComposition: "",
};

export const diagnosisSlice = createSlice({
  name: "patDiagnosis",
  initialState,
  reducers: {
    setDiagnosis: (state, action) => {
      state.patientDiagnosis = action.payload;
    },
    setComposition: (state, action) => {
      // console.log(action.payload);
      state.medicineComposition = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDiagnosis, setComposition } = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
