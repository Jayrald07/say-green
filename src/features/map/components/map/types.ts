import { MapClickEvent } from "@app/types";

export type TMap = {
  onClick?: (point: MapClickEvent) => void;
};
