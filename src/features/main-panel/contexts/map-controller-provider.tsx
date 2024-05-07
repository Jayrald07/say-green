import React, { createContext, PropsWithChildren, useState, useMemo } from "react";

export const MapControllerContext = createContext<{ type: string; setType: (type: string) => void } | null>(null);

export default function MapControllerProvider(props: Readonly<PropsWithChildren>) {
  const { children } = props;

  const [type, setType] = useState("");

  const mapControllerContextValue = useMemo(
    () => ({
      type,
      setType,
    }),
    [type, setType],
  );

  return <MapControllerContext.Provider value={mapControllerContextValue}>{children}</MapControllerContext.Provider>;
}
