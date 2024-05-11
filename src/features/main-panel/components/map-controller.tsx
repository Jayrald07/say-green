import React, { useContext } from "react";
import { CameraIcon, Circle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@app/shared/components/ui/toggle-group";
import { cn } from "@app/shared/lib/utils";
import { MapControllerContext } from "../contexts/map-controller-provider";

const MapController = () => {
  const mapControllerContext = useContext(MapControllerContext);

  return (
    <div className="flex w-full flex-row gap-y-3 overflow-x-auto rounded-md p-1 px-2 lg:justify-center">
      <ToggleGroup
        onValueChange={mapControllerContext?.setType}
        type="single"
        className="bottom-10 left-0 flex w-full flex-row rounded-md bg-neutral-900 p-1 text-neutral-400 shadow-neutral-800 lg:w-1/3"
      >
        <ToggleGroupItem
          value="plot-receptacle"
          className={cn("hover:bg-neutral-800 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-400")}
        >
          <Circle size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="upload-image"
          className={cn("hover:bg-neutral-800 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-400")}
        >
          <CameraIcon size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default MapController;
