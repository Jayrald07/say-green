import React, { useContext, useEffect } from "react";
import { renderReceptacle } from "@app/pages/main/utils";
import { createReceptacle } from "@app/shared/lib/receptacle";
import { useReceptacles } from "@app/shared/lib/receptacle/hooks/useReceptacle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@app/shared/components/ui/table";
import { Button } from "@app/shared/components/ui/button";
import { RefreshCwIcon, Trash2Icon } from "lucide-react";
import useMap from "@app/shared/hooks/useMap";
import useController from "@app/shared/hooks/useController";
import { Controller } from "@app/shared/types";
import { MapContext } from "../main-panel/contexts/map-context";
import { removeReceptacleFromMap } from "../main-panel/utils";

export default function Receptacle() {
  const { receptacles, getReceptacles, deleteReceptacle, appendReceptacle } = useReceptacles();
  const { latitude, longitude } = useMap();
  const { controller } = useController();
  const { map } = useContext(MapContext);

  const handleFocusReceptacle = (lat: number, lng: number) => {
    map?.flyTo({
      center: {
        lat,
        lng,
      },
      zoom: 19,
    });
  };

  const handlePlotReceptacle = async () => {
    if (!map) {
      return;
    }

    if (controller !== Controller.ReceptaclePlotter) {
      return;
    }

    if (latitude == 0 || longitude == 0) {
      return;
    }

    renderReceptacle({
      map,
      lat: latitude,
      lng: longitude,
    });

    const receptacle = await createReceptacle(longitude, latitude);

    if (!receptacle) {
      return;
    }

    appendReceptacle(receptacle.hash, longitude, latitude);
  };

  const handleRemoveReceptacle = async (hash: string, latitude: number, longitude: number) => {
    deleteReceptacle(hash);

    if (!map) {
      return;
    }

    removeReceptacleFromMap(map, latitude, longitude);
  };

  useEffect(() => {
    handlePlotReceptacle();
  }, [longitude, latitude]);

  useEffect(() => {
    getReceptacles();
  }, []);

  if (!controller) {
    return <></>;
  }

  if (controller !== Controller.ReceptaclePlotter) {
    return <></>;
  }

  return (
    <section>
      <Button className="text-neutral-400">
        <RefreshCwIcon size={16} onClick={getReceptacles} />
      </Button>
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
              className="group"
            >
              <TableCell className="text-nowrap">{hash}</TableCell>
              <TableCell>{longitude}</TableCell>
              <TableCell>{latitude}</TableCell>
              <TableCell className="sticky right-0 hidden bg-neutral-900 group-hover:block">
                <Trash2Icon
                  size={20}
                  className="cursor-pointer text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveReceptacle(hash, latitude, longitude);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
