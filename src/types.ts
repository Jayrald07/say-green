import { Map } from "mapbox-gl";

export enum ApiCallStatus {
  Standby,
  Requesting,
  Completed,
  ErrorOccured,
}

export type MapClickEvent = {
  lat: number;
  lng: number;
  map: Map | null;
};
