import { createSlice } from '@reduxjs/toolkit'

export const monthSelectorSlice = createSlice({
  name: 'monthSelector',
  initialState: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  },
  reducers: {
    changeMonth: (state, action) => {
        state.month = action.payload;
    },
    incrementYear: (state) => {
        state.year +=1;
    },
    decrementYear: (state) => {
      state.year -=1;
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeMonth, incrementYear, decrementYear } = monthSelectorSlice.actions

export default monthSelectorSlice.reducer