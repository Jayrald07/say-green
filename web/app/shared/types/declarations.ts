export type LatLng = {
  hash: string;
  longitude: number;
  latitude: number;
};

export type DeleteReceptacle = {
  delete: (hash: string) => Promise<void>;
};

export type Image = {
  id: string;
  blob: ArrayBuffer;
  progress: number;
  uploading: boolean;
};
