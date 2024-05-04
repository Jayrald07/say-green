import React from "react";
import { Amplify } from "aws-amplify";
import amplifyconfiguration from "@app/amplifyconfiguration.json";
import MapContext from "@app/context/map-context/components";
import MapControllerContext from "@app/context/map-controller-context/components";
import ControllerRunner from "@app/features/map-controller/components/controller-runner";
import MapController from "@app/features/map-controller/components/floating-side-bar";
import Authorization from "@app/components/authorization";

Amplify.configure(amplifyconfiguration);

export default () => {
  return (
    <MapContext>
      <MapControllerContext>
        <Authorization>
          <ControllerRunner />
          <MapController />
        </Authorization>
      </MapControllerContext>
    </MapContext>
  );
};
