import { ReactNode } from "react";

export type Modal = {
  title: string;
  footers: ReactNode[];
  size?: "SMALL" | "MEDIUM" | "LARGE";
  onClose: () => void;
  open: boolean;
};
