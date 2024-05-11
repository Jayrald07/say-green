import React from "react";
import Map from "./components/map";
import MapController from "./components/map-controller";
import MapControllerProvider from "./contexts/map-controller-provider";
import MapProvider from "./contexts/map-provider";
import Receptacle from "../receptacle";
import ControlPanel from "@app/shared/components/ControlPanel";

const MainPanel = () => {
  return (
    <MapControllerProvider>
      <MapProvider>
        <ControlPanel>
          <MapController />
          <Receptacle />
        </ControlPanel>
        <Map />
      </MapProvider>
    </MapControllerProvider>
  );
};

export default MainPanel;
