import React, { PropsWithChildren, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@app/shared/components/ui/card";
import { LogOutIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { signOut } from "aws-amplify/auth";

export default function ControlPanel(props: Readonly<PropsWithChildren>) {
  const { children } = props;

  return (
    <Card className="absolute left-0 top-0 z-50 h-full animate-slide-from-left overflow-hidden rounded-none border-none bg-neutral-900 text-neutral-300 shadow-md hover:overflow-y-auto lg:w-[400px]">
      <CardContent className="w-full bg-neutral-900">{children}</CardContent>
    </Card>
  );
}

const ControllerPanelLogout = () => {
  const [showPopover, setShowPopover] = useState(false);

  const handleLogout = async () => {
    await signOut({
      global: true,
    });

    location.href = "/login";
  };

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger>
        <LogOutIcon size={16} />
      </PopoverTrigger>
      <PopoverContent className="grid gap-y-3 border border-neutral-700 bg-neutral-800">
        <Label className="text-neutral-200">Are you sure to logout?</Label>
        <div className="flex justify-end gap-x-3">
          <Button className="bg-transparent" onClick={handleLogout}>
            Yes
          </Button>
          <Button onClick={() => setShowPopover(false)}>No</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
