import { Controller } from "@/features/map-controller/config/controllers";
import React from "react";

type MapControllerContext = {
  activeController: Controller | null;
  toggleController: (controller: Controller) => void;
};

const MapControllerContextProvider = React.createContext<MapControllerContext>({
  activeController: null,
  toggleController: () => {},
});

export default MapControllerContextProvider;
