import React from "react";
import useMap from "@app/shared/hooks/useMap";
import { Button } from "@app/shared/components/ui/button";
import { Card, CardContent } from "@app/shared/components/ui/card";

export default function CoordinateDetail() {
  const { latitude, longitude } = useMap();

  if (!latitude || !longitude) {
    return <></>;
  }

  return (
    <Card className="dark absolute left-0 top-0 z-50 h-full animate-slide-from-left overflow-hidden rounded-none border-none bg-neutral-900 text-neutral-300 shadow-md hover:overflow-y-auto lg:w-[400px]">
      <CardContent className="grid h-full w-full grid-rows-[1fr_auto] bg-neutral-900">
        <section>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </section>
        <section>
          <Button className="w-full dark:bg-neutral-100">Plot</Button>
        </section>
      </CardContent>
    </Card>
  );
}
