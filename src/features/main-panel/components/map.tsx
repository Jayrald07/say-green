import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MBMap } from "mapbox-gl";
import { renderAs3d, renderBoundary, startMap } from "../utils";
import { MapContext } from "../contexts/map-provider";

mapboxgl.accessToken = process.env.MAPBOX_GL_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MBMap | null>(null);
  const mapContext = useContext(MapContext);

  const initializeMap = async () => {
    const mapInstance = await startMap(mapContainer.current);
    setMap(mapInstance);
  };

  const handleMapLoadEvent = () => {
    if (!map) {
      return;
    }

    renderAs3d(map);
    renderBoundary(map);
  };

  useEffect(() => {
    console.log(mapContext);
  }, [mapContext]);

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on("click", ({ lngLat: { lat, lng } }) => {
      mapContext?.setLatLng({
        lat,
        lng,
      });
    });
    map.on("load", handleMapLoadEvent);
  }, [map]);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
};

export default Map;
