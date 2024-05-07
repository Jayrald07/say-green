import React, { useContext } from "react";
import { CameraIcon, Circle, LogOutIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@app/shared/components/ui/toggle-group";
import { cn } from "@app/shared/lib/utils";
import { signOut } from "aws-amplify/auth";
import { Popover, PopoverContent, PopoverTrigger } from "@app/shared/components/ui/popover";
import { Button } from "@app/shared/components/ui/button";
import { Label } from "@app/shared/components/ui/label";
import { MapControllerContext } from "../contexts/map-controller-provider";

const MapController = () => {
  const mapControllerContext = useContext(MapControllerContext);

  const handleLogout = async () => {
    await signOut({
      global: true,
    });

    location.href = "/login";
  };

  return (
    <div className="absolute bottom-10 left-0 z-50 flex w-full flex-row overflow-x-auto rounded-md p-1 px-2 sm:bottom-[unset] sm:left-2 sm:top-2 sm:w-[unset] sm:flex-col">
      <ToggleGroup
        onValueChange={mapControllerContext?.setType}
        type="single"
        className="bottom-10 left-0 flex w-full flex-row overflow-x-auto rounded-md bg-neutral-900 p-1 text-neutral-400 shadow-sm shadow-neutral-800 sm:bottom-[unset] sm:left-2 sm:top-2 sm:w-[unset] sm:flex-col"
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
        <Popover>
          <PopoverTrigger asChild>
            <ToggleGroupItem
              value="logout"
              className={cn("hover:bg-neutral-800 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-400")}
            >
              <LogOutIcon size={16} />
            </ToggleGroupItem>
          </PopoverTrigger>
          <PopoverContent side="right" className="grid gap-y-3 border border-neutral-700 bg-neutral-800">
            <Label className="text-neutral-200">Are you sure to logout?</Label>
            <div className="flex justify-end gap-x-3">
              <Button className="bg-transparent" onClick={handleLogout}>
                Yes
              </Button>
              <Button>No</Button>
            </div>
          </PopoverContent>
        </Popover>
      </ToggleGroup>
    </div>
  );
};

export default MapController;
