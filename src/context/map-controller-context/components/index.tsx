import React, { PropsWithChildren, useState } from "react";
import MapControllerContextProvider from "..";
import { Controller } from "@app/features/map-controller/config/controllers";

export default function (props: PropsWithChildren) {
  const { children } = props;

  const [activeController, setActiveController] = useState<Controller | null>(null);

  return (
    <>
      <MapControllerContextProvider.Provider
        value={{
          activeController,
          toggleController: setActiveController,
        }}
      >
        {children}
      </MapControllerContextProvider.Provider>
    </>
  );
}
