import { createSlice } from '@reduxjs/toolkit'

export const assignMedicineSlice = createSlice({
    name: 'assign_medicine',
    initialState: {
        selfMedicines: [],
        shelfMedicines: [],
    },
    reducers: {
        setShelfMedicines: (state, action) => {
            state.shelfMedicines = action.payload
        },
        setSelfMedicines: (state, action) => {
            state.selfMedicines = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSelfMedicines, setShelfMedicines } = assignMedicineSlice.actions

export default assignMedicineSlice.reducer