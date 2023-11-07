



import { SpinnerCircle2 } from '@/components/spinner';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [visiblePassoword, setVisiblePassoword] = useState(false);

  return (
    <main className="flex justify-center items-center p-2 md:p-12" style={{ height: '100svh' }}>
      <div className="max-w-xl w-full">
        <Link href='/' className='inline-block mb-4 mx-4'>
          <div className='md:inline-flex items-center hidden'>
            <Image src='/logo-circle.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={1232} height={1232} />
            <span className="inline-block ml-2 text-xl">swayauth</span>
          </div>
        </Link>
        <form className='p-6 md:p-10 shadow-lg border rounded-md'>
          <h1 className='text-2xl mb-3 font-bold'>Sign in to your account</h1>
          <div className='mb-4'>
            <label>Email</label>
            <div className='mt-1'>
              <input autoFocus type="email" autoComplete="email"
                className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                placeholder='e.g johndoe@mail.com' />
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex justify-between items-center'>
              <label>Password</label>
              <button type='button' className='text-blue-700'>Forgot your password</button>
            </div>
            <div className='mt-1 flex items-center relative'>
              <input
                required
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$'
                title='Password must contain at least one symbol, digit, lowercase, and uppercase character.' autoComplete="new-password" type={visiblePassoword ? 'text' : 'password'}
                className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md' placeholder='*********' />
              <button onClick={() => setVisiblePassoword(!visiblePassoword)} type='button' className={`inline-block absolute right-3 ${visiblePassoword ? '' : 'opacity-40'}`}>
                <FontAwesomeIcon icon={visiblePassoword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>
          <label className='flex items-center mb-6'>
            <input type="checkbox" className="checked:ring-1 w-4 h-4 border-none outline-none" />
            <span className='inline-block ml-2 text-slate-600'>Stay signed in</span>
          </label>
          <div className='mb-4'>
            <button type='button' className='my-2 active:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white'>
              {
                loading ?
                  <span className='inline-block'>
                    <SpinnerCircle2 color='white' />
                  </span> :
                  <span>
                    Login
                  </span>
              }
            </button>
          </div>
          <div className='mt-6 text-center'>
            <div><span className='inline-block text-slate-600 mr-2'>Don't have an account?</span><Link href='/sign-up' className='text-blue-700'>Sign up</Link></div>
          </div>
          <div className='mt-4 flex justify-center items-center'>
            <span className='inline-block h-[0.1rem] bg-slate-400 w-4/12'></span>
            <span className='inline-block mx-1'>OR</span>
            <span className='inline-block h-[0.1rem] bg-slate-400 w-4/12'></span>
          </div>
          <div className='mt-4 flex justify-center items-center'>
            <button type='button' className='inline-block mr-2 active:scale-105'>
              <Image src='/google.png' className='max-w-[2rem] max-h-[2rem] p-[0.05rem]'
                alt="" width={480} height={480} />
            </button>
            <button type='button' className='inline-block ml-2 active:scale-105 '>
              <Image src='/facebook.png' className='max-w-[2rem] max-h-[2rem]'
                alt="" width={300} height={300} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

