"use client"
import Link from "@/lib/link";
import { handleResetPassword } from "@/lib/server/form";
import { SearchParamsProp } from "@/lib/types";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Input from "../input";
import FormButton from "./button";
import Success from "./success";

const ResetPassword = ({ params }: { params: SearchParamsProp }) => {
  const [message, setMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [visiblePassoword1, setVisiblePassoword1] = useState(false);
  const [visiblePassoword2, setVisiblePassoword2] = useState(false);
  const [state, formAction] = useFormState<Promise<ResponseProp<SearchParamsProp | null>>, any>(handleResetPassword, { status: false, message: '', data: params })

  useEffect(() => {
    if (state.status) {
      setSuccessOpen(true)
    } else {
      setMessage(state.message || '')
    }
  }, [state]);

  const handleChange = () => {
    setMessage('');
  }

  return <div className="max-w-xl w-full">
    <Link href='/' className='inline-block mb-4 mx-4'>
      <div className='md:inline-flex items-center hidden'>
        <Image src='/logo-circle.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={1232} height={1232} />
        <span className="inline-block ml-2 text-xl">swayauth</span>
      </div>
    </Link>
    <form onChange={handleChange} action={formAction} className='p-6 md:p-10 shadow-lg border rounded-md'>
      <h1 className='text-2xl mb-3 font-bold'>Create new password</h1>
      <div className='mb-4'>
        <label>New Password</label>
        <div className='mt-1 flex items-center relative'>
          <Input
            required
            autoFocus
            invalid={message}
            type={visiblePassoword1 ? 'text' : 'password'}
            name='password'
            pattern='^(.*).{6,}$'
            title='Password must be at least 6 character.'
            placeholder='*********'
          />
          <button onClick={() => setVisiblePassoword1(!visiblePassoword1)} type='button' className={`inline-block absolute right-3 ${visiblePassoword1 ? '' : 'opacity-40'}`}>
            <FontAwesomeIcon icon={visiblePassoword1 ? faEye : faEyeSlash} />
          </button>
        </div>
      </div>
      <div className='mb-4'>
        <label>Confirm New Password</label>
        <div className='mt-1 flex items-center relative'>
          <Input
            required
            invalid={message}
            type={visiblePassoword2 ? 'text' : 'password'}
            name='confirm_password'
            pattern='^(.*).{6,}$'
            title='Password must be at least 6 character.'
            placeholder='*********'
          />
          <button onClick={() => setVisiblePassoword2(!visiblePassoword2)} type='button' className={`inline-block absolute right-3 ${visiblePassoword2 ? '' : 'opacity-40'}`}>
            <FontAwesomeIcon icon={visiblePassoword2 ? faEye : faEyeSlash} />
          </button>
        </div>
        <div className='text-red-500 min-h-[0.7rem]'>
          {
            message && <small>* {message}</small>
          }
        </div>
      </div>
      <div onClick={() => setMessage('')} className='mb-4'>
        <FormButton title='Change' />
      </div>
    </form>
    <Success isOpen={successOpen} showClickLink={false} type="password reset" />
  </div>
};

export default ResetPassword;
