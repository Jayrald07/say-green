import React from "react";
import { Amplify } from "aws-amplify";
import amplifyconfiguration from "@/amplifyconfiguration.json";
import MapContext from "@/context/map-context/components";
import MapControllerContext from "@/context/map-controller-context/components";
import ControllerRunner from "@/features/map-controller/components/controller-runner";
import MapController from "@/features/map-controller/components/floating-side-bar";
import Authorization from "@/components/authorization";

Amplify.configure(amplifyconfiguration);

export default () => {
  return (
    <>
      <MapContext>
        <MapControllerContext>
          <Authorization>
            <ControllerRunner />
            <MapController />
          </Authorization>
        </MapControllerContext>
      </MapContext>
    </>
  );
};
