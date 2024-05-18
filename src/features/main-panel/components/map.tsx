import React, { useContext, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { renderAs3d, renderBoundary, startMap } from "../utils";
import { getReceptacles } from "@app/shared/lib/receptacle";
import { renderReceptacle } from "@app/pages/main/utils";
import useMap from "@app/shared/hooks/useMap";
import useController from "@app/shared/hooks/useController";
import { MapContext } from "../contexts/map-context";

mapboxgl.accessToken = process.env.MAPBOX_GL_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { setCoordinate } = useMap();
  const { controller } = useController();
  const { map, setMap } = useContext(MapContext);

  const initializeMap = async () => {
    const mapInstance = await startMap(mapContainer.current);
    setMap(mapInstance);
  };

  const handleRenderReceptacles = async () => {
    const receptacles = await getReceptacles();

    if (!receptacles) {
      return;
    }

    if (!map) {
      return;
    }

    receptacles.map((receptacle) => {
      renderReceptacle({ lat: receptacle.latitude, lng: receptacle.longitude, map });
    });
  };

  const handleMapLoadEvent = () => {
    if (!map) {
      return;
    }

    renderAs3d(map);
    renderBoundary(map);
    handleRenderReceptacles();
  };

  useEffect(() => {
    if (map) {
      setCoordinate(0, 0);
    }
  }, [controller]);

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on("click", ({ lngLat: { lat, lng } }) => {
      setCoordinate(lat, lng);
    });

    map.on("load", handleMapLoadEvent);
  }, [map]);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
};

export default Map;
