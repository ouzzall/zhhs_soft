import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkMedicines: [],
  changingPro: 0,
};

export const medicinesSlice = createSlice({
  name: "patMedicine",
  initialState,
  reducers: {
    addMed: (state, action) => {
      // state.checkMedicines.push(action.payload);
      state.checkMedicines = action.payload;
      // console.log(state.checkMedicines);
    },
    setChangingPro: (state, action) => {
      // state.checkMedicines.push(action.payload);
      state.checkMedicines = action.payload;
      // console.log(state.checkMedicines);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMed, setChangingPro } = medicinesSlice.actions;

export default medicinesSlice.reducer;
