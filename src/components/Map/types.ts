import { MapClickEvent } from "@/types";

export type TMap = {
  onClick?: (point: MapClickEvent) => void;
};
