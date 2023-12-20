"use client";

import { useFormStatus } from "react-dom";
import { SpinnerCircle2 } from "../spinner";

const FormButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  return <button
    disabled={pending}
    type='submit'
    className='my-2 disabled:bg-blue-500 active:[&:not(:disabled)]:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white'>
    {
      pending ?
        <span className='inline-block'>
          <SpinnerCircle2 color='white' />
        </span> :
        <span>
          {title}
        </span>
    }
  </button>
};

export default FormButton