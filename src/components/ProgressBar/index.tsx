import React from "react";
import { ProgressBarProps } from "./types";

export function ProgressBar(props: Readonly<ProgressBarProps>) {
  const { label, progress } = props;

  return (
    <>
      <small className="block text-xs mb-2 text-ellipsis overflow-hidden select-none">{label}</small>
      <div className="w-full h-2 overflow-hidden rounded-full shadow-inner">
        <span style={{ width: progress + "%" }} className="bg-orange-500 h-full block"></span>
      </div>
    </>
  );
}
