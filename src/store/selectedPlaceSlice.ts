import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedPlace {
    name: string;
    lat: number;
    lng: number;
    address: string;
}

interface SelectedPlaceState {
    selected: SelectedPlace | null;
}

const initialState: SelectedPlaceState = {
    selected: null
}

const selectedPlaceSlice = createSlice({
    name: "selectedPlace",
    initialState,
    reducers: {
        setSelectedPlace(state, action: PayloadAction<SelectedPlace | null>) {
            console.log("Setting selected place:", action.payload);
            state.selected = action.payload;
        },
        clearSelectedPlace(state) {
            state.selected = null;
        }
    }
})

export const { setSelectedPlace, clearSelectedPlace } = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;