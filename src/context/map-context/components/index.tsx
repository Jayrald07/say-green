import React, { PropsWithChildren, useState } from "react";
import MapContextProvider from "..";
import Map from "@/features/map/components/map";
import { MapClickEvent } from "@/types";

export default function MapContext(props: PropsWithChildren) {
  const { children } = props;

  const [coordinates, setCoordinates] = useState<MapClickEvent>({ lat: 0, lng: 0, map: null });

  return (
    <>
      <Map onClick={setCoordinates} />
      <MapContextProvider.Provider value={coordinates}>{children}</MapContextProvider.Provider>
    </>
  );
}
