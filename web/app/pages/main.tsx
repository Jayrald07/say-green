import React from "react";
import { Amplify } from "aws-amplify";
import amplifyConfiguration from "@app/amplifyconfiguration.json";
import Authorization from "@app/shared/components/authorization";
import MainPanel from "@app/features/main-panel";
import { Provider } from "react-redux";
import { store } from "@app/shared/store";
import MapContextProvider from "@app/features/main-panel/contexts/map-context";
import CoordinateDetail from "@app/features/coordinate-detail";
import { Toaster } from "@app/shared/components/ui/toaster";

Amplify.configure(amplifyConfiguration);

export default function Main() {
  return (
    <Authorization>
      <Provider store={store}>
        <MapContextProvider>
          <CoordinateDetail />
          <MainPanel />
        </MapContextProvider>
      </Provider>
      <Toaster />
    </Authorization>
  );
}
