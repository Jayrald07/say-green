import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Coordinate {
  latitude: number;
  longitude: number;
}

const initialState: Coordinate = {
  latitude: 0,
  longitude: 0,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCoordinate: (state, action: PayloadAction<Coordinate>) => {
      state.latitude = state.latitude > 0 ? 0 : action.payload.latitude;
      state.longitude = state.longitude > 0 ? 0 : action.payload.longitude;
    },
  },
});

export const { setCoordinate } = mapSlice.actions;
export default mapSlice.reducer;
