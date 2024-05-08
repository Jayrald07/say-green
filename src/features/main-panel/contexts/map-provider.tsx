import { LatLngLiteral } from "leaflet";
import { Map } from "mapbox-gl";
import React, { createContext, PropsWithChildren, useState, useMemo } from "react";

export const MapContext = createContext<
  (LatLngLiteral & { map?: Map } & { setLatLng: (latLng: LatLngLiteral) => void; setMap: (map: Map) => void }) | null
>(null);

export default function MapProvider(props: Readonly<PropsWithChildren>) {
  const { children } = props;

  const [latLng, setLatLng] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<Map>();

  const mapContextValue = useMemo(
    () => ({
      ...latLng,
      setLatLng,
      setMap,
      map,
    }),
    [latLng, setLatLng, setMap, map],
  );

  return <MapContext.Provider value={mapContextValue}>{children}</MapContext.Provider>;
}
