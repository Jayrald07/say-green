import React from "react";
import { Amplify } from "aws-amplify";
import amplifyconfiguration from "@app/amplifyconfiguration.json";
import Authorization from "@app/shared/components/authorization";
import MainPanel from "@app/features/main-panel";
import { Provider } from "react-redux";
import { store } from "../../shared/store/index";

Amplify.configure(amplifyconfiguration);

export default function Main() {
  return (
    <Authorization>
      <Provider store={store}>
        <MainPanel />
      </Provider>
    </Authorization>
  );
}
