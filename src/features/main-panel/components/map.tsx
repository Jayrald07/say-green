import React, { useContext, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { renderAs3d, renderBoundary, startMap } from "../utils";
import { MapContext } from "../contexts/map-provider";
import { MapControllerContext } from "../contexts/map-controller-provider";
import { getReceptacles } from "@app/shared/lib/receptacle";
import { renderReceptacle } from "@app/pages/main/utils";

mapboxgl.accessToken = process.env.MAPBOX_GL_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapContext = useContext(MapContext);
  const mapControllerContext = useContext(MapControllerContext);

  const initializeMap = async () => {
    const mapInstance = await startMap(mapContainer.current);
    mapContext?.setMap(mapInstance);
  };

  const handleRenderReceptacles = async () => {
    const receptacles = await getReceptacles();

    if (!receptacles) {
      return;
    }

    if (!mapContext) {
      return;
    }

    if (!mapContext.map) {
      return;
    }

    receptacles.map((receptacle) => {
      renderReceptacle({ lat: receptacle.latitude, lng: receptacle.longitude, map: mapContext.map });
    });
  };

  const handleMapLoadEvent = () => {
    if (!mapContext?.map) {
      return;
    }

    renderAs3d(mapContext.map);
    renderBoundary(mapContext.map);
    handleRenderReceptacles();
  };

  useEffect(() => {
    console.log(mapContext);
  }, [mapContext]);

  useEffect(() => {
    if (mapContext) {
      mapContext.setLatLng({ lat: 0, lng: 0 });
    }
  }, [mapControllerContext]);

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (!mapContext?.map) {
      return;
    }

    mapContext.map.on("click", ({ lngLat: { lat, lng } }) => {
      mapContext?.setLatLng({
        lat,
        lng,
      });
    });

    mapContext.map.on("load", handleMapLoadEvent);
  }, [mapContext?.map]);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
};

export default Map;
