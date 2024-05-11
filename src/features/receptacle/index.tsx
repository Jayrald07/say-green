import React, { useContext, useEffect } from "react";
import { MapControllerContext } from "../main-panel/contexts/map-controller-provider";
import { MapContext } from "../main-panel/contexts/map-provider";
import { renderReceptacle } from "@app/pages/main/utils";
import { createReceptacle } from "@app/shared/lib/receptacle";
import { useReceptacles } from "@app/shared/lib/receptacle/hooks/useReceptacle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@app/shared/components/ui/table";

export default function Receptacle() {
  const mapControllerContext = useContext(MapControllerContext);
  const mapContext = useContext(MapContext);
  const { receptacles, getReceptacles } = useReceptacles();

  const handleFocusReceptacle = (lat: number, lng: number) => {
    mapContext?.map?.flyTo({
      center: {
        lat,
        lng,
      },
      zoom: 19,
    });
  };

  useEffect(() => {
    if (!mapContext?.map) {
      return;
    }

    if (mapControllerContext?.type !== "plot-receptacle") {
      return;
    }

    if (mapContext.lat == 0 || mapContext.lng == 0) {
      return;
    }

    if (mapContext?.lat !== 0 || mapContext.lng !== 0) {
      renderReceptacle({
        map: mapContext.map,
        lat: mapContext.lat,
        lng: mapContext.lng,
      });

      createReceptacle(mapContext.lng, mapContext.lat);
    }
  }, [mapContext]);

  useEffect(() => {
    getReceptacles();
  }, []);

  if (!mapControllerContext) {
    return <></>;
  }

  if (mapControllerContext.type !== "plot-receptacle") {
    return <></>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Hash</TableHead>
          <TableHead>Longitude</TableHead>
          <TableHead>Latitude</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {receptacles.map(({ hash, longitude, latitude }) => (
          <TableRow
            key={hash}
            onClick={() => {
              handleFocusReceptacle(latitude, longitude);
            }}
          >
            <TableCell className="text-nowrap">{hash}</TableCell>
            <TableCell>{longitude}</TableCell>
            <TableCell>{latitude}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
