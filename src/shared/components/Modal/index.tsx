import React, { PropsWithChildren } from "react";
import { Modal } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export function Modal(props: PropsWithChildren<Modal>) {
  const { title, children, size, footers, onClose, open } = props;

  if (!open) {
    return <></>;
  }

  let modalSize = "w-1/6";

  switch (size) {
    case "MEDIUM":
      modalSize = "w-full sm:w-2/6 md:w-3/6 lg:w-1/3";
      break;
    case "LARGE":
      modalSize = "w-4/6";
      break;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 z-10 w-full h-full py-10 flex justify-center items-center bg-[#00000023]"
      onClick={onClose}
    >
      <div
        className={`relative bg-white ${modalSize} mx-5 rounded-md shadow-lg`}
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b py-3 px-4 bg-slate-50">
          <h1 className="text-sm">{title}</h1>
          <button className="absolute right-4 top-1/3 text-xs text-slate-400" onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">{children}</div>
        <div className="border-t p-2 flex items-center justify-end gap-x-2 bg-slate-50">{footers}</div>
      </div>
    </div>
  );
}
