"use client";

import { useFormStatus } from "react-dom";

const Input = ({
  disabled,
  autoFocus,
  required,
  name,
  autoComplete,
  invalid,
  pattern,
  title,
  type,
  placeholder
}: {
  disabled?: boolean
  autoFocus?: boolean
  required?: boolean
  name?: string,
  autoComplete?: string
  invalid?: boolean | string
  type?: string
  title?: string
  pattern?: string
  placeholder?: string
}) => {
  const { pending } = useFormStatus();

  return <input
    disabled={disabled || pending}
    autoFocus={autoFocus}
    type={type}
    required={required}
    name={name}
    title={title}
    pattern={pattern}
    autoComplete={autoComplete}
    className={`
    w-full pr-10 focus:outline-1 
    ${invalid ? 'ring-red-200 border-red-700   ring-2' : ''}
    ${disabled ? 'bg-slate-100' : ''}
    invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2
  invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200
  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 
    focus:ring-2 border py-2 px-3 rounded-md
    `}
    placeholder={placeholder} />
};

export default Input;
