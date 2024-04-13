import MapContextProvider from "@app/context/map-context";
import MapControllerContextProvider from "@app/context/map-controller-context";
import React, { useContext, useEffect } from "react";

export default () => {
  const mapContext = useContext(MapContextProvider);
  const { activeController } = useContext(MapControllerContextProvider);

  useEffect(() => {
    const { lat, lng, map } = mapContext;

    if (lat == 0 && lng == 0) {
      return;
    }

    if (!map) {
      return;
    }

    if (!activeController?.onMap) {
      return;
    }

    activeController.onMap(mapContext);
  }, [mapContext]);

  return <></>;
};
