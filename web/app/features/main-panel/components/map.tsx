import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { startMap } from "../utils";
import useMap from "@app/shared/hooks/useMap";
import { MapContext } from "../contexts/map-context";
import usePoint from "@app/shared/hooks/usePoint";
import { LatLngLiteral } from "leaflet";

mapboxgl.accessToken = process.env.MAPBOX_GL_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { latitude, longitude, setCoordinate, addMarker, isFocused } = useMap();
  const { map, setMap } = useContext(MapContext);
  const [currentMarker, setCurrentMarker] = useState<mapboxgl.Marker | null>(null);
  const { getPoints } = usePoint();

  const initializeMap = async () => {
    const mapInstance = await startMap(mapContainer.current);
    setMap(mapInstance);
  };

  const handleLoadPoints = async () => {
    if (!map) {
      return;
    }

    const lat = map.getCenter().lat;
    const lng = map.getCenter().lng;

    const points = await getPoints(lat, lng);

    if (!points || !points.length) {
      return;
    }

    for (const { lat, lng } of points) {
      addMarker(lat, lng);
    }
  };

  const handleClickMap = ({ lngLat: { lat, lng }, ...rest }: mapboxgl.EventData) => {
    if (!map) {
      return;
    }

    if (rest.originalEvent.target !== map.getCanvas()) {
      handleClickMarker({ lat, lng });
      return;
    }

    handleClickCanvas({ lat, lng });
  };

  const handleClickMarker = ({ lat, lng }: LatLngLiteral) => {
    if (!map) {
      return;
    }

    currentMarker?.remove();

    if (isFocused) {
      map.flyTo({
        center: [map.getCenter().lng, map.getCenter().lat],
        offset: [-200, 0],
        speed: 0.4,
      });
      setCoordinate(0, 0);
      return;
    }

    setCoordinate(lat, lng);

    map.flyTo({
      center: [lng, lat],
      offset: [200, 0],
      speed: 0.4,
    });
  };

  const handleClickCanvas = ({ lat, lng }: LatLngLiteral) => {
    if (!map) {
      return;
    }

    currentMarker?.remove();

    if (isFocused) {
      map.flyTo({
        center: [map.getCenter().lng, map.getCenter().lat],
        offset: [-200, 0],
        speed: 0.4,
      });
      setCoordinate(0, 0);
      return;
    }

    setCurrentMarker(addMarker(lat, lng));

    map.flyTo({
      center: [lng, lat],
      offset: [200, 0],
      speed: 0.4,
    });

    setCoordinate(lat, lng);
  };

  useLayoutEffect(() => {
    (async () => {
      await initializeMap();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await handleLoadPoints();
    })();
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on("click", handleClickMap);

    return () => {
      map.off("click", handleClickMap);
    };
  }, [map, currentMarker, longitude, latitude]);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
};

export default Map;
