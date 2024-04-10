import React from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { PropsWithChildren, useEffect, useState } from "react";

export default function Authorization(props: PropsWithChildren) {
  const { children } = props;

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

  return <>{authenticated ? children : null}</>;
}
