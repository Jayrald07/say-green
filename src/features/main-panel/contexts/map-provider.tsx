import { LatLngLiteral } from "leaflet";
import React, { createContext, PropsWithChildren, useState, useMemo } from "react";

export const MapContext = createContext<(LatLngLiteral & { setLatLng: (latLng: LatLngLiteral) => void }) | null>(null);

export default function MapProvider(props: Readonly<PropsWithChildren>) {
  const { children } = props;

  const [latLng, setLatLng] = useState<LatLngLiteral>({ lat: 0, lng: 0 });

  const mapContextValue = useMemo(
    () => ({
      ...latLng,
      setLatLng,
    }),
    [latLng, setLatLng],
  );

  return <MapContext.Provider value={mapContextValue}>{children}</MapContext.Provider>;
}
