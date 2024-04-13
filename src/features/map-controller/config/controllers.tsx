import React from "react";
import { faCamera, faDotCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "aws-amplify/auth";
import { createReceptacle } from "@app/lib/receptacle";
import { renderReceptacle } from "@app/pages/main/utils";
import { MapClickEvent } from "@app/types";

export type Controller = {
  id: string;
  icon: JSX.Element;
  onMap?: (point: MapClickEvent) => void | Promise<void>;
  onClick?: () => void | Promise<void>;
};

export const buttonControllers: Controller[] = [
  {
    id: "trash-bin-plotter",
    icon: <FontAwesomeIcon icon={faDotCircle} />,
    onMap: async (point) => {
      const { lat, lng, map } = point;

      if (map) {
        renderReceptacle({ lat, lng, map });
        await createReceptacle(lat, lng);
      }
    },
  },
  {
    id: "image-uploader",
    icon: <FontAwesomeIcon icon={faCamera} />,
    onMap: () => {
      console.log("image-uploader");
    },
  },
  {
    id: "sign-out",
    icon: <FontAwesomeIcon icon={faSignOut} />,
    onClick: async () => {
      await signOut({ global: true });

      location.href = "/login";
    },
  },
];
