export enum MapControllerType {
  Receptacle,
  UploadImage,
}

export type MapController = {
  onClick?: (controllerType: MapControllerType) => void;
};
