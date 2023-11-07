import { SpinnerCircle2 } from '@/components/spinner';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [visiblePassoword, setVisiblePassoword] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
        <form onSubmit={handleSubmit} className='p-6 md:p-10 shadow-lg border rounded-md'>
          <h1 className='text-2xl mb-6 font-bold'>Create an account</h1>
          <div className='mb-6 flex items-center justify-between'>
            <button type='button' className='inline-flex w-[48%] shadow-sm hover:bg-slate-50 active:bg-slate-100 rounded-md py-2 px-3 border items-center active:scale-105'>
              <Image src='/google.png' className='max-w-[2rem] p-[0.2rem] max-h-[2rem]'
                alt="" width={480} height={480} />
              <span className='inline-block ml-2'><span className='hidden md:inline-block mr-1'>Create with</span>facebook</span>
            </button>
            <button type='button' className='inline-flex w-[48%] shadow-sm hover:bg-slate-50 active:bg-slate-100 rounded-md py-2 px-3 border items-center active:scale-105'>
              <span className='inline-block'>
                <Image src='/facebook.png' className='max-w-[2rem] p-[0.1rem] max-h-[2rem]'
                  alt="" width={300} height={300} />
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
                <input required autoFocus autoComplete='given-name' type="text" className='w-full focus:outline-1 focus:outline-blue-700 focus:ring-2 border py-2 px-3 rounded-md' placeholder='e.g John' />
              </div>
            </div>
            <div className='mb-4 w-[48%]'>
              <label>Last Name</label>
              <div className='mt-1'>
                <input required type="text" autoComplete='family-name' className='w-full focus:outline-1 focus:outline-blue-700 focus:ring-2 border py-2 px-3 rounded-md' placeholder='e.g Doe' />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <label>Email</label>
            <div className='mt-1'>
              <input required type="email" autoComplete="email"
                className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                placeholder='e.g johndoe@mail.com' />
            </div>
          </div>
          <div className='mb-8'>
            <label>Password</label>
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
          <div className='mb-4'>
            <button type='submit' className='my-2 active:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white'>
              {
                loading ?
                  <span className='inline-block'>
                    <SpinnerCircle2 color='white' />
                  </span> :
                  <span>
                    Create account
                  </span>
              }
            </button>
          </div>
          <div className='mt-6 text-center'>
            <div><span className='inline-block text-slate-600 mr-2'>Already have an account?</span><Link href='/login' className='text-blue-700'>Login</Link></div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
