import { faCamera, faDotCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { MapController, MapControllerType } from "./types";
import { getCurrentMode } from "./utils";
import { signOut } from "aws-amplify/auth";

export default function MapController(props: Readonly<MapController>) {
  const { onClick } = props;
  const [controllerType, setControllerType] = useState(MapControllerType.Receptacle);

  const handleClickController = (controllerType: MapControllerType) => {
    if (onClick) {
      onClick(controllerType);
      setControllerType(controllerType);
    }
  };

  const handleLogout = async () => {
    await signOut({ global: true });
    location.href = "/login";
  };

  return (
    <>
      <div className="absolute left-12 shadow-md top-2 z-10 p-2 rounded-md bg-slate-100 border text-sm">
        <h1>{getCurrentMode(controllerType)}</h1>
      </div>
      <section className="absolute top-0 left-0 mapboxgl-ctrl mapboxgl-ctrl-group m-2 text-slate-600">
        <button onClick={() => handleClickController(MapControllerType.Receptacle)}>
          <FontAwesomeIcon icon={faDotCircle} />
        </button>
        <button onClick={() => handleClickController(MapControllerType.UploadImage)}>
          <FontAwesomeIcon icon={faCamera} />
        </button>
        <button onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} />
        </button>
      </section>
    </>
  );
}
