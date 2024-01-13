import React, { ChangeEvent, useRef } from "react";
import { InputFileProps } from "./types";
import Button from "../Button";

export function InputFile(props: Readonly<InputFileProps>) {
  const { onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    onChange(event.target.files);
  };

  const handleChooseFile = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  return (
    <div>
      <input ref={inputRef} onChange={handleOnChange} type="file" accept="image/*" multiple hidden />
      <Button className="text-sm border px-3 py-1 rounded-md" onClick={handleChooseFile}>
        Choose Files
      </Button>
    </div>
  );
}
