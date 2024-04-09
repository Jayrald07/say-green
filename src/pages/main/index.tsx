import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import amplifyconfiguration from "@/amplifyconfiguration.json";
import { getCurrentUser } from "aws-amplify/auth";
import MapContext from "@/context/map-context/components";
import MapController from "@/features/map-controller/components/floating-side-bar";
import ControllerRunner from "@/features/map-controller/components/controller-runner";
import MapControllerContext from "@/context/map-controller-context/components";
import Map from "@/features/map/components/map";

Amplify.configure(amplifyconfiguration);

export default () => {
  const [authenticated, setAuthenticated] = useState(false);

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
      <MapContext>
        <MapControllerContext>
          <ControllerRunner />
          <MapController />
        </MapControllerContext>
      </MapContext>
    </>
  );
};
