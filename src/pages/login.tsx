import Input from '@/components/input';
import App2factor from '@/components/onboarding/app2factor';
import { SpinnerCircle2 } from '@/components/spinner';
import { CONST } from '@/lib/constant';
import { FormData } from '@/lib/form';
import { normalRequest } from '@/lib/request';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

interface LoginProp {
  two_factor_enabled: boolean,
  reference?: string,
  two_factor_type?: string,
}

interface TwoFactor {
  open: boolean,
  reference?: string,
  token?: string,
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [twoFactor, setTwoFactor] = useState<TwoFactor>({ open: false, reference: '', token: '' });
  const [visiblePassoword, setVisiblePassoword] = useState(false);
  const router = useRouter();

  const toggle2Auth = () => {
    if (loading) return
    setMessage('')
    setTwoFactor(p => ({ ...p, open: !p.open }))
  }
  const handleChange = () => {
    setMessage('')
  }

  const handle2AuthChange = (e: string) => {
    setMessage('')
    setTwoFactor(p => ({ ...p, token: e }))
    if (e.length === 6) {
      handle2faVerify(e)
    }
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['email', 'password'])
    setMessage('')
    setLoading(true)
    const res = await normalRequest<LoginProp>(CONST.AUTH.MANUAL_LOGIN, data, 'post', false)
    if (res.status) {
      if (res.data?.two_factor_enabled) {
        setTwoFactor(p => ({ ...p, open: true, reference: res.data.reference }))
      } else {
        router.replace(CONST.LOCATION.CLIENT_AREA)
      }
    } else {
      setMessage(res.message)
    }
    setLoading(false)
  }

  const handle2faVerify = async (e?: any) => {
    const value = typeof e === 'string' ? e : twoFactor.token
    if (value?.length === 6 && twoFactor.reference) {
      const data = { token: value, reference: twoFactor.reference }
      setLoading(true);
      const res = await normalRequest<LoginProp>(CONST.AUTH.TWO_FACTOR_VERIFY, data, 'post', false)
      if (res.status) {
        router.replace(CONST.LOCATION.CLIENT_AREA)
      } else {
        setMessage(res.message)
      }
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center p-2 md:p-12" style={{ height: '100svh' }}>
      <div className="max-w-xl w-full">
        <Link href='/' className='inline-block mb-4 mx-4'>
          <div className='md:inline-flex items-center hidden'>
            <Image src='/logo-circle.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={1232} height={1232} />
            <span className="inline-block ml-2 text-xl">swayauth</span>
          </div>
        </Link>
        <form onChange={handleChange} onSubmit={handleFormSubmit} className='p-6 md:p-10 shadow-lg border rounded-md'>
          <h1 className='text-2xl mb-3 font-bold'>Sign in to your account</h1>
          <div className='mb-4'>
            <label>Email</label>
            <div className='mt-1'>
              <Input
                disabled={loading}
                autoFocus
                type="email"
                required
                invalid={message}
                name='email'
                placeholder='e.g johndoe@mail.com'
                autoComplete="email"
              />
            </div>
          </div>
          <div className='mb-2'>
            <div className='flex justify-between items-center'>
              <label>Password</label>
              <button type='button' className='text-blue-700'>Forgot your password</button>
            </div>
            <div className='mt-1 flex items-center relative'>
              <Input
                disabled={loading}
                required
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
            <div className='text-red-500 min-h-[0.7rem]'>
              {
                message && !twoFactor.open && <small>* {message}</small>
              }
            </div>
          </div>
          <label className='flex items-center mb-6'>
            <input type="checkbox" className="checked:ring-1 w-4 h-4 border-none outline-none" />
            <span className='inline-block ml-2 text-slate-600'>Stay signed in</span>
          </label>
          <div className='mb-4'>
            <button
              disabled={loading}
              type='submit'
              className='my-2 active:[&:not(:disabled)]:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white'>
              {
                loading && !twoFactor.open ?
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
            <div><span className='inline-block text-slate-600 mr-2'>Don&apos;t have an account?</span><Link href='/sign-up' className='text-blue-700'>Sign up</Link></div>
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
      <App2factor
        message={message}
        handle2faVerify={handle2faVerify}
        loading={loading}
        length={6}
        onChange={handle2AuthChange}
        isOpen={twoFactor.open}
        toggle={toggle2Auth} />
    </main>
  );
};

export default Login;

