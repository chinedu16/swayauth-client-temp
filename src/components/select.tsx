"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

const Select = ({ invalid, ...rest }: { invalid?: boolean | string } & ComponentProps<'select'>) => {

  const { pending } = useFormStatus();

  return <select
    disabled={rest.disabled || pending}
    {...rest}
    className={`
    ${rest?.className ? rest?.className : ''}
    w-full pr-10 focus:outline-1 min-h-10 focus:outline-blue-600 ring-blue-200
    ${invalid ? 'ring-red-200 border-red-700 ring-offset-1 ring-2' : ''}
    ${rest?.disabled ? 'bg-slate-100' : ''}
    invalid:[&:not(:placeholder-shown):not(:focus)]:ring-1
    invalid:[&:not(:placeholder-shown):not(:focus)]:ring-offset-1
  invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200
  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 
    focus:ring-2 border-2 py-2 px-3 rounded-md
    `}
  >
    {rest?.children}
  </select>
};

export default Select;
