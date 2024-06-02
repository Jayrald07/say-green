import { getCurrentUser } from "aws-amplify/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";

export default function Authorization(props: Readonly<PropsWithChildren>) {
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
    handleCurrentUser().then(response => console.log(response))
  }, []);

  return <>{authenticated ? children : null}</>;
}
