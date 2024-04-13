import React, { PropsWithChildren, useContext } from "react";
import { buttonControllers } from "../../config/controllers";
import Button from "@app/components/Button";
import MapControllerContextProvider from "@app/context/map-controller-context";

export default function MapController(props: PropsWithChildren) {
  const { activeController, toggleController } = useContext(MapControllerContextProvider);

  const handleControllerClick = (buttonController: (typeof buttonControllers)[0]) => {
    if (buttonController.onClick) {
      buttonController.onClick();
    }

    toggleController(buttonController);
  };

  return (
    <section
      data-testid="controller"
      className="absolute top-2 left-2 flex flex-col bg-white rounded-lg text-slate-600 overflow-hidden shadow-lg"
    >
      {buttonControllers.map((buttonController) => (
        <Button
          data-testid="controller-button"
          key={buttonController.id}
          data-active={buttonController.id == activeController?.id}
          className="border-0 py-3 text-xl hover:bg-slate-200 hover:text-slate-600 rounded-none data-[active=true]:bg-slate-600 data-[active=true]:text-white"
          onClick={() => {
            handleControllerClick(buttonController);
          }}
        >
          {buttonController.icon}
        </Button>
      ))}
    </section>
  );
}
