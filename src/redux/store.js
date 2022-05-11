import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "redux/counter";
import idReducer from "redux/patId";
import diagnosisReducer from "redux/patDiagnosis";
import medicinesReducer from "redux/patMedicines";
import reportsReducer from "redux/patReports";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    patId: idReducer,
    patDiagnosis: diagnosisReducer,
    patReports: reportsReducer,
    patMedicines: medicinesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
