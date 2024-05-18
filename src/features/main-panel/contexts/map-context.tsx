import { Map } from "mapbox-gl";
import React, { createContext, PropsWithChildren, useMemo, useState } from "react";

export const MapContext = createContext<{
  map: Map | null;
  setMap: (map: Map) => void;
}>({
  map: null,
  setMap: () => {},
});

const MapContextProvider = (props: Readonly<PropsWithChildren>) => {
  const { children } = props;
  const [map, setMap] = useState<Map | null>(null);

  const mapContextValue = useMemo(
    () => ({
      map,
      setMap,
    }),
    [map, setMap],
  );

  return <MapContext.Provider value={mapContextValue}>{children}</MapContext.Provider>;
};

export default MapContextProvider;
