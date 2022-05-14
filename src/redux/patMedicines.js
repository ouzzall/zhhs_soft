import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shelfMedList: [],
  selfMedList: [],
};

export const medicinesSlice = createSlice({
  name: "patMedicine",
  initialState,
  reducers: {
    setShelfList: (state, action) => {
      // state.checkMedicines.push(action.payload);
      // console.log(action.payload);
      state.shelfMedList = action.payload;
      // console.log(state.shelfMedList);
    },
    setSelfList: (state, action) => {
      // state.checkMedicines.push(action.payload);
      // console.log(action.payload);
      state.selfMedList = action.payload;
      // console.log(state.shelfMedList);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShelfList, setSelfList } = medicinesSlice.actions;

export default medicinesSlice.reducer;
