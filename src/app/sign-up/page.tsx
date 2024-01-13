"use client";
import Input from '@/components/input';
import FormButton from '@/components/onboarding/button';
import Success from '@/components/onboarding/success';
import { googleAuth, handleRegisterForm } from '@/lib/server/form';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';

const SignUp = () => {
  const [isPending, startTransition] = useTransition()
  const [successMessage, setSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [visiblePassoword, setVisiblePassoword] = useState(false);
  const [state, formAction] = useFormState(handleRegisterForm, { status: false, message: '', data: null })

  useEffect(() => {
    if (state.status) {
      setSuccessMessage(true)
    } else {
      setMessage(state.message)
    }
  }, [state]);

  const handleChange = () => {
    setMessage('')
  }


  const handleGoogleRegister = () => {
    startTransition(() => {
      googleAuth()
    })
  }


  return (
    <main className="flex justify-center items-center p-2 py-24 md:p-12" style={{ height: '100svh' }}>
      <div className="max-w-xl w-full">
        <Link href='/' className='inline-block mb-4 mx-4'>
          <div className='md:inline-flex items-center hidden'>
            <Image src='/logo-circle.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={1232} height={1232} />
            <span className="inline-block ml-2 text-xl">swayauth</span>
          </div>
        </Link>
        <form onChange={handleChange} action={formAction} className='p-6 md:p-10 shadow-lg border rounded-md'>
          <h1 className='text-2xl mb-6 font-bold'>Create an account</h1>
          <div className='mb-6 flex items-center justify-between'>
            <button type='button' className='inline-flex w-[48%] shadow-sm hover:bg-slate-50 active:bg-slate-100 rounded-md py-2 px-3 border items-center active:scale-105'>
              <Image src='/facebook.png' className='max-w-[2rem] p-[0.1rem] max-h-[2rem]'
                alt="" width={300} height={300} />
              <span className='inline-block ml-2'><span className='hidden md:inline-block mr-1'>Create with</span>facebook</span>
            </button>
            <button onClick={handleGoogleRegister} type='button' className='inline-flex w-[48%] shadow-sm hover:bg-slate-50 active:bg-slate-100 rounded-md py-2 px-3 border items-center active:scale-105'>
              <span className='inline-block'>
                <Image src='/google.png' className='max-w-[2rem] p-[0.2rem] max-h-[2rem]'
                  alt="" width={480} height={480} />
              </span>
              <span className='inline-block ml-2'><span className='hidden md:inline-block mr-1'>Create with</span>google</span>
            </button>
          </div>
          <div className='mb-4 flex justify-center items-center'>
            <span className='inline-block h-[0.1rem] bg-slate-400 w-4/12'></span>
            <span className='inline-block mx-1'>OR</span>
            <span className='inline-block h-[0.1rem] bg-slate-400 w-4/12'></span>
          </div>
          <div className='flex justify-between items-center'>
            <div className='mb-4  w-[48%]'>
              <label>First Name</label>
              <div className='mt-1'>
                <Input
                  invalid={message}
                  required
                  autoFocus
                  name='first_name'
                  autoComplete='given-name'
                  type="text"
                  placeholder='e.g John'
                />
              </div>
            </div>
            <div className='mb-4 w-[48%]'>
              <label>Last Name</label>
              <div className='mt-1'>
                <Input
                  invalid={message}
                  required
                  name='last_name'
                  type="text"
                  autoComplete='family-name'
                  placeholder='e.g Doe'
                />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <label>Email</label>
            <div className='mt-1'>
              <Input
                type="email"
                required
                invalid={message}
                name='email'
                placeholder='e.g johndoe@mail.com'
                autoComplete="email"
              />
            </div>
          </div>
          <div className='mb-1'>
            <label>Password</label>
            <div className='mt-1 flex items-center relative'>
              <Input
                required
                autoComplete="new-password"
                invalid={message}
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
          </div>
          <div className='text-red-500 min-h-[2rem]'>
            {
              message && <small>* {message}</small>
            }
          </div>
          <div className='mb-4'>
            <FormButton title='Create account' />
          </div>
          <div className='mt-6 text-center'>
            <div><span className='inline-block text-slate-600 mr-2'>Already have an account?</span><Link href='/login' className='text-blue-700'>Login</Link></div>
          </div>
        </form>
      </div>
      <Success isOpen={successMessage} />
    </main>
  );
};

export default SignUp;
