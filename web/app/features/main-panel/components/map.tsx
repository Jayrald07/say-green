import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { startMap } from "../utils";
import useMap from "@app/shared/hooks/useMap";
import { MapContext } from "../contexts/map-context";
import usePoint from "@app/shared/hooks/usePoint";

mapboxgl.accessToken = process.env.MAPBOX_GL_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { latitude, longitude, setCoordinate } = useMap();
  const { map, setMap } = useContext(MapContext);
  const [currentMarker, setCurrentMarker] = useState<mapboxgl.Marker | null>(null);
  const { getPoints } = usePoint();

  const initializeMap = async () => {
    const mapInstance = await startMap(mapContainer.current);
    setMap(mapInstance);
  };

  const handleClickMap = ({ lngLat: { lat, lng } }: mapboxgl.EventData) => {
    if (!map) {
      return;
    }

    currentMarker?.remove();

    if (latitude == 0 || longitude == 0) {
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      map.flyTo({
        center: [lng, lat],
        offset: [200, 0],
        speed: 0.4,
      });

      setCurrentMarker(marker);
    }

    getPoints(lat, lng).then((response) => {
      if (!response?.data) {
        return;
      }

      const data: {
        geoJson: string;
      }[] = JSON.parse(response.data);

      for (const point of data) {
        const coordinates: { Coordinates: number[] } = JSON.parse(point.geoJson);

        new mapboxgl.Marker().setLngLat([coordinates.Coordinates[0], coordinates.Coordinates[1]]).addTo(map);
      }
    });

    setCoordinate(lat, lng);
  };

  useEffect(() => {
    initializeMap();
  }, []);

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
