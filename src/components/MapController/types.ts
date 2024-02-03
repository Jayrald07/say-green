export enum MapControllerType {
  Receptacle,
  UploadImage,
  SignOut,
}

export type MapController = {
  onClick?: (controllerType: MapControllerType) => void;
};
