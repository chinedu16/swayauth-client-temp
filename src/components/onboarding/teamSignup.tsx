"use client"

import { newTeamRegister } from "@/lib/server/form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFormState } from "react-dom";
import Input from "../input";
import FormButton from "./button";
import { useSearchParams } from "next/navigation";
import Success from "./success";

const TeamSignup = ({ email }: { email?: string }) => {
  const [visiblePassoword, setVisiblePassoword] = useState(false);
  const searchParams = useSearchParams();
  const [state, formAction] = useFormState(newTeamRegister, {
    status: true,
    message: '',
    data:
    {
      reference: searchParams.get('reference'),
      token: searchParams.get('token')
    }
  } as ResponseProp)

  return <div>
    <form action={formAction}>
      <Input
        type="email"
        required
        className="opacity-50 text-sm py-3"
        disabled
        invalid={!state.status}
        value={email}
        name='email'
      />
      <div className='mt-4 flex items-center relative'>
        <Input
          required
          invalid={!state.status}
          type={visiblePassoword ? 'text' : 'password'}
          name='password'
          pattern='^(.*).{6,}$'
          title='Password must be at least 6 character.'
          placeholder='*********'
        />
        <button onClick={() => setVisiblePassoword(!visiblePassoword)} type='button' className={`inline-block absolute right-3 ${visiblePassoword ? '' : 'opacity-40'}`}>
          <FontAwesomeIcon icon={visiblePassoword ? faEye : faEyeSlash} />
        </button>
      </div>
      <div className='text-red-500 min-h-[0.7rem]'>
        {
          !state.status && <small>* {state.message}</small>
        }
      </div>
      <div className="mt-4">
        <FormButton title='Create account' />
      </div>
    </form>
    <Success isOpen={state.status && !!state.message} />
  </div>
};

export default TeamSignup;
