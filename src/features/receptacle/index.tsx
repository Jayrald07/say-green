import React, { useContext, useEffect } from "react";
import { MapControllerContext } from "../main-panel/contexts/map-controller-provider";
import { MapContext } from "../main-panel/contexts/map-provider";
import { renderReceptacle } from "@app/pages/main/utils";
import { createReceptacle } from "@app/shared/lib/receptacle";

export default function Receptacle() {
  const mapControllerContext = useContext(MapControllerContext);
  const mapContext = useContext(MapContext);

  useEffect(() => {
    if (!mapContext?.map) {
      return;
    }

    if (mapControllerContext?.type !== "plot-receptacle") {
      return;
    }

    if (mapContext.lat == 0 || mapContext.lng == 0) {
      return;
    }

    if (mapContext?.lat !== 0 || mapContext.lng !== 0) {
      renderReceptacle({
        map: mapContext.map,
        lat: mapContext.lat,
        lng: mapContext.lng,
      });

      createReceptacle(mapContext.lng, mapContext.lat);
    }
  }, [mapContext]);

  if (!mapControllerContext) {
    return <></>;
  }

  if (mapControllerContext.type !== "plot-receptacle") {
    return <></>;
  }

  if (mapContext?.lat == 0 || mapContext?.lng == 0) {
    return <></>;
  }

  return <></>;
}
