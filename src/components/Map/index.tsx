import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { renderAs3d, renderBoundary, startMap } from "./utils";
import { TMap } from "./types";

mapboxgl.accessToken = process.env.MAPBOX_GL_ACCESS_TOKEN as string;

const CMap = (props: PropsWithChildren<TMap>) => {
  const { onClick } = props;

  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  const initializeMap = async () => {
    const mapInstance = await startMap(mapContainer.current);
    setMap(mapInstance);
  };

  const handleMapClickEvent = useCallback(
    (event: mapboxgl.MapMouseEvent) => {
      if (!map) return;

      const {
        lngLat: { lat, lng },
      } = event;

      if (onClick) {
        onClick({ lat, lng, map });
      }
    },
    [map, onClick]
  );

  const handleMapLoadEvent = () => {
    if (!map) {
      return;
    }

    renderAs3d(map);
    renderBoundary(map);
  };

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on("click", handleMapClickEvent);
    map.on("load", handleMapLoadEvent);

    return () => {
      map.off("click", handleMapClickEvent);
    };
  }, [map, handleMapClickEvent]);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
};

export default CMap;
