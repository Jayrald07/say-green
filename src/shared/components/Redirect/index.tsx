import React, { useEffect } from "react";

type RedirectProps = {
  path: string;
};

export default function Redirect(props: Readonly<RedirectProps>) {
  const { path } = props;

  useEffect(() => {
    location.href = path;
  }, []);

  return <></>;
}
