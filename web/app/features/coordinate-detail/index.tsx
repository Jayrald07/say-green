import React from "react";
import useMap from "@app/shared/hooks/useMap";
import { Button } from "@app/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@app/shared/components/ui/card";
import usePoint from "@app/shared/hooks/usePoint";
import { Loader2Icon, LucideCircleX } from "lucide-react";

export default function CoordinateDetail() {
  const { latitude, longitude, setCoordinate } = useMap();
  const { createPoint, loading } = usePoint();

  if (!latitude || !longitude) {
    return <></>;
  }

  return (
    <Card className="dark absolute left-0 top-0 z-50 flex h-full animate-slide-from-left flex-col overflow-hidden rounded-none border-none bg-neutral-900 text-neutral-300 shadow-md hover:overflow-y-auto lg:w-[400px]">
      <CardHeader className="w-full items-end">
        <LucideCircleX size={16} className="cursor-pointer" onClick={() => setCoordinate(0, 0)} />
      </CardHeader>
      <CardContent className="grid h-full w-full grid-rows-[1fr] bg-neutral-900">
        <section className="self-end">
          <Button
            disabled={loading}
            className="w-full dark:bg-neutral-100"
            onClick={() => {
              createPoint(latitude, longitude);
            }}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Plot"}
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
