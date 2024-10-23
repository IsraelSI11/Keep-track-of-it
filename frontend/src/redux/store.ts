import { configureStore } from '@reduxjs/toolkit'
import  monthSelectorSliceReducer from './features/monthSelector/monthSelectorSlice'


const store = configureStore({
  reducer: {
    monthSelector: monthSelectorSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;