import React, { PropsWithChildren, useContext } from "react";
import { buttonControllers } from "../../config/controllers";
import Button from "@/components/Button";
import MapControllerContextProvider from "@/context/map-controller-context";

export default (props: PropsWithChildren) => {
  const { activeController, toggleController } = useContext(MapControllerContextProvider);

  const handleControllerClick = (buttonController: (typeof buttonControllers)[0]) => {
    if (buttonController.onClick) {
      buttonController.onClick();
    }

    toggleController(buttonController);
  };

  return (
    <section className="absolute top-2 left-2 flex flex-col bg-white rounded-lg text-slate-600 overflow-hidden shadow-lg">
      {buttonControllers.map((buttonController) => (
        <Button
          key={buttonController.id}
          data-active={buttonController.id == activeController?.id}
          className="border-0 py-3 text-xl hover:bg-slate-600 hover:text-white rounded-none data-[active=true]:bg-slate-600 data-[active=true]:text-white"
          onClick={() => {
            handleControllerClick(buttonController);
          }}
        >
          {buttonController.icon}
        </Button>
      ))}
    </section>
  );
};
