import mapboxgl, { Map } from "mapbox-gl";
import { LatLngLiteral } from "leaflet";

export const startMap = async (elementContainer: HTMLElement | null): Promise<Map> => {
  return new Promise((resolve) => {
    const boundary = getBoundary();
    navigator.geolocation.getCurrentPosition((geolocation) => {
      const { longitude, latitude } = geolocation.coords;

      const map = new Map({
        zoom: 18,
        container: elementContainer as HTMLElement,
        center: [longitude, latitude],
        style: "mapbox://styles/mapbox/dark-v11",
      });

      map.fitBounds([boundary.topLeft, boundary.bottomRight], {
        zoom: 17.8,
      });

      resolve(map);
    });
  });
};

export const createCircleCoordinates = (center: number[], radius: number, numSides: number) => {
  const coordinates = [];

  for (let i = 0; i < numSides; i++) {
    const angle = (i / numSides) * 2 * Math.PI;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    coordinates.push([x, y]);
  }

  coordinates.push(coordinates[0]); // Close the polygon
  return [coordinates];
};

export const getReceptacleSourceProperties = (longitude: number, latitude: number) => {
  return {
    id: `circle-layer-${latitude}-${longitude}`,
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: createCircleCoordinates([longitude, latitude], 0.000004, 30),
      },
      properties: {},
    },
  };
};

export const getReceptacleLayerProperties = (longitude: number, latitude: number) => {
  return {
    id: `circle-layer-${latitude}-${longitude}`,
    type: "fill-extrusion",
    source: `circle-layer-${latitude}-${longitude}`,
    paint: {
      "fill-extrusion-color": "#ccc",
      "fill-extrusion-opacity": 0.8,
      "fill-extrusion-height": 0.3,
    },
  };
};

export const renderAs3d = (map: Map) => {
  map.addLayer({
    id: "add-3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 10,
    paint: {
      "fill-extrusion-color": "#ccc",
      "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
      "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
      "fill-extrusion-opacity": 0.6,
    },
  });
};

export const removeReceptacleFromMap = (map: Map, latitude: number, longitude: number) => {
  map.removeLayer(`circle-layer-${latitude}-${longitude}`);
  map.removeSource(`circle-layer-${latitude}-${longitude}`);
};

const getBoundary = () => {
  return {
    topLeft: [
      parseFloat(process.env.BOUNDARY_COORDINATE_LNG_TOP_LEFT as string),
      parseFloat(process.env.BOUNDARY_COORDINATE_LAT_TOP_LEFT as string),
    ] as [number, number],
    topRight: [
      parseFloat(process.env.BOUNDARY_COORDINATE_LNG_TOP_RIGHT as string),
      parseFloat(process.env.BOUNDARY_COORDINATE_LAT_TOP_RIGHT as string),
    ] as [number, number],
    bottomLeft: [
      parseFloat(process.env.BOUNDARY_COORDINATE_LNG_BOTTOM_LEFT as string),
      parseFloat(process.env.BOUNDARY_COORDINATE_LAT_BOTTOM_LEFT as string),
    ] as [number, number],
    bottomRight: [
      parseFloat(process.env.BOUNDARY_COORDINATE_LNG_BOTTOM_RIGHT as string),
      parseFloat(process.env.BOUNDARY_COORDINATE_LAT_BOTTOM_RIGHT as string),
    ] as [number, number],
  };
};

export const renderReceptacle = ({ lat, lng, map }: LatLngLiteral & { map: Map | null }) => {
  if (!map) {
    return;
  }

  map.addSource(`circle-layer-${lat}-${lng}`, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: createCircleCoordinates([lng, lat], 0.000004, 30),
          },
          properties: {},
        },
      ],
    },
  });

  map.addLayer({
    id: `circle-layer-${lat}-${lng}`,
    type: "fill-extrusion",
    source: `circle-layer-${lat}-${lng}`,
    paint: {
      "fill-extrusion-color": "#ccc",
      "fill-extrusion-opacity": 0.8,
      "fill-extrusion-height": 0.3,
    },
  });
};
