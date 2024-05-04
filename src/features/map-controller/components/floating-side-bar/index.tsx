import React, { PropsWithChildren } from "react";
import { CameraIcon, Circle, LogOutIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@app/components/ui/toggle-group";
import { cn } from "@app/lib/utils";

export default function MapController(props: Readonly<PropsWithChildren>) {
  return (
    <div className="px-2 absolute bottom-10 left-0 w-full flex flex-row sm:flex-col p-1 rounded-md sm:top-2 sm:left-2 sm:w-[unset] sm:bottom-[unset] overflow-x-auto">
      <ToggleGroup
        type="single"
        className="bottom-10 left-0 w-full flex flex-row sm:flex-col bg-neutral-900 p-1 rounded-md sm:top-2 sm:left-2 sm:w-[unset] sm:bottom-[unset] text-neutral-400 overflow-x-auto"
      >
        <ToggleGroupItem
          value="b"
          className={cn("hover:bg-neutral-800 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-400")}
        >
          <Circle size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="a"
          className={cn("hover:bg-neutral-800 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-400")}
        >
          <CameraIcon size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="c"
          className={cn("hover:bg-neutral-800 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-400")}
        >
          <LogOutIcon size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
