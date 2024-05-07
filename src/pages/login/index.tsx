import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import amplifyConfig from "@app/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import Redirect from "@app/shared/components/Redirect";

Amplify.configure(amplifyConfig);

export function Login() {
  return (
    <div className="flex h-full justify-center">
      <Authenticator hideSignUp>
        <Redirect path="/" />
      </Authenticator>
    </div>
  );
}
