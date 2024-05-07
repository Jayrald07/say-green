import React from "react";
import Map from "./components/map";
import MapController from "./components/map-controller";
import MapControllerProvider from "./contexts/map-controller-provider";
import MapProvider from "./contexts/map-provider";

const MainPanel = () => {
  return (
    <MapControllerProvider>
      <MapController />
      <MapProvider>
        <Map />;
      </MapProvider>
    </MapControllerProvider>
  );
};

export default MainPanel;
