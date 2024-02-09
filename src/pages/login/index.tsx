import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import amplifyConfig from "@/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import Redirect from "@/components/Redirect";

Amplify.configure(amplifyConfig);

export function Login() {
  return (
    <div className="h-full justify-center flex">
      <Authenticator hideSignUp>
        <Redirect path="/" />
      </Authenticator>
    </div>
  );
}
