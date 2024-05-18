import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./features/map-slice";
import mapControllerSlice from "./features/map-controller-slice";

export const store = configureStore({
  reducer: {
    map: mapSlice,
    controller: mapControllerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
