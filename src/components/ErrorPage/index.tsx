import React from "react";
import { ErrorResponse, isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound statusText={error.statusText} />;
    }
  }

  if (error instanceof Error) {
    return (
      <div className="h-full flex justify-center items-center flex-col gap-y-5 bg-slate-50">
        <h1 className=" text-2xl">Something&apos;s Wrong</h1>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return <></>;
}

const NotFound = (props: Partial<ErrorResponse>) => {
  const { statusText } = props;
  return (
    <div className="h-full flex justify-center items-center flex-col gap-y-5 bg-slate-50">
      <h1 className=" text-2xl">Something&apos;s Wrong</h1>
      <h1>{statusText}</h1>
    </div>
  );
};
