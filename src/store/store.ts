import { configureStore } from '@reduxjs/toolkit';
import selectedPlaceReducer from './selectedPlaceSlice';

export const store = configureStore({
    reducer: {
        selectedPlace: selectedPlaceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
