import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

function Button(props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { className, children, ...rest } = props;

  return (
    <button
      {...rest}
      className={`text-sm border px-3 py-1 rounded-md bg-white disabled:bg-slate-50 disabled:text-slate-200 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
