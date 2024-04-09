import { MapClickEvent } from "@/types";
import React from "react";

const MapContextProvider = React.createContext<MapClickEvent>({ lat: 0, lng: 0, map: null });

export default MapContextProvider;
