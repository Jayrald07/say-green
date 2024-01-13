import { MapControllerType } from "./types";

export function getCurrentMode(mapControllerType: MapControllerType) {
  switch (mapControllerType) {
    case MapControllerType.Receptacle:
      return "Receptacle Plotting";
    case MapControllerType.UploadImage:
      return "Image Uploading";
    default:
      return "Receptacle Plotting";
  }
}
