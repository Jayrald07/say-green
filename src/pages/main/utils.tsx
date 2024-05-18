import { LatLngLiteral } from "leaflet";
import { Map } from "mapbox-gl";

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
