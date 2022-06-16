import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientId: 0,
  discountGlobal: 0,
  checkUpCostGlobal: 0,
  feeGlobal: 0,
  pWBillId: 0,
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
    setCheckUpCostGlobal: (state, action) => {
      state.checkUpCostGlobal = action.payload;
    },
    setDiscountGlobal: (state, action) => {
      state.discountGlobal = action.payload;
    },
    setFeeGlobal: (state, action) => {
      state.feeGlobal = action.payload;
    },
    setPWBillId: (state, action) => {
      state.pWBillId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setId, setDiscountGlobal, setCheckUpCostGlobal, setFeeGlobal, setPWBillId } =
  idSlice.actions;

export default idSlice.reducer;
