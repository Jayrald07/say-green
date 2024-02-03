import React, { useCallback, useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import amplifyconfiguration from "@/amplifyconfiguration.json";
import Map from "@/components/Map";
import MapController from "@/components/MapController";
import { renderReceptacle } from "./utils";
import { MapClickEvent } from "@/types";
import { MapControllerType } from "@/components/MapController/types";
import ImageUploader from "@/components/ImageUploader";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(amplifyconfiguration);

export default function Plotter() {
  const [operation, setOperation] = useState(MapControllerType.Receptacle);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleMapClick = useCallback(
    async (event: MapClickEvent) => {
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

  const handleCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setAuthenticated(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <>
      <Map onClick={handleMapClick} />
      {authenticated && (
        <>
          <MapController onClick={handleMapControllerClick} />
          <ImageUploader open={uploadPhoto} onClose={() => setUploadPhoto(false)} />
        </>
      )}
    </>
  );
}
