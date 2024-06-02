import { Controller } from "@app/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { controller: Controller } = {
  controller: Controller.ReceptaclePlotter,
};

const mapControllerSlice = createSlice({
  name: "map-contaoller-slice",
  initialState,
  reducers: {
    setController: (state, action: PayloadAction<Controller>) => {
      state.controller = action.payload;
    },
  },
});

export const { setController } = mapControllerSlice.actions;
export default mapControllerSlice.reducer;
