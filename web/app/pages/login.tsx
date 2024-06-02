import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import amplifyConfig from "@app/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { Navigate } from "react-router-dom";

Amplify.configure(amplifyConfig);

export function Login() {
  return (
    <div className="flex h-full justify-center">
      <Authenticator hideSignUp>
        <Navigate to="/" />
      </Authenticator>
    </div>
  );
}
