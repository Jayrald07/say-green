import React, { useCallback, useState } from "react";
import { Amplify } from "aws-amplify";
import amplifyconfiguration from "@/amplifyconfiguration.json";
import Map from "@/components/Map";
import MapController from "@/components/MapController";
import { renderReceptacle } from "./utils";
import { MapClickEvent } from "@/types";
import { MapControllerType } from "@/components/MapController/types";
import ImageUploader from "@/components/ImageUploader";

Amplify.configure(amplifyconfiguration);

export default function Plotter() {
  const [operation, setOperation] = useState(MapControllerType.Receptacle);
  const [uploadPhoto, setUploadPhoto] = useState(false);

  const handleMapClick = useCallback(
    (event: MapClickEvent) => {
      if (operation == MapControllerType.UploadImage) {
        setUploadPhoto(true);

        return;
      }

      renderReceptacle(event);
    },
    [operation]
  );

  const handleMapControllerClick = (type: MapControllerType) => {
    setOperation(type);
  };

  return (
    <>
      <Map onClick={handleMapClick} />
      <MapController onClick={handleMapControllerClick} />
      <ImageUploader open={uploadPhoto} onClose={() => setUploadPhoto(false)} />
    </>
  );
}
