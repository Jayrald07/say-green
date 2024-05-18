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
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setCoordinate } = mapSlice.actions;
export default mapSlice.reducer;
