import React from "react";
import Map from "./components/map";
import MapController from "./components/map-controller";
import Receptacle from "../receptacle";
import ControlPanel from "@app/shared/components/ControlPanel";
import MapContextProvider from "./contexts/map-context";

const MainPanel = () => {
  return (
    <MapContextProvider>
      <ControlPanel>
        <MapController />
        <Receptacle />
      </ControlPanel>
      <Map />
    </MapContextProvider>
  );
};

export default MainPanel;
