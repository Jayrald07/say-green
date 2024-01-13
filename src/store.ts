import { Map } from "mapbox-gl";
import { createContext } from "react";

export const MapContext = createContext<Map | null>(null);
export const CurrentActionContext = createContext<{ type: string } | null>(
  null
);
