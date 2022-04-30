import { configureStore } from '@reduxjs/toolkit'
import assignMedicineReducer from 'reducers/assignMedicineSlice'

export default configureStore({
  reducer: {
      assign_medicine: assignMedicineReducer
  },
})