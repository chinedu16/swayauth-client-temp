"use client";
import Input from '@/components/input';
import App2factor from '@/components/onboarding/app2factor';
import FormButton from '@/components/onboarding/button';
import { CONST } from '@/lib/constant';
import { auth2faVerify, handleLoginform, socialAuth } from '@/lib/server/form';
import { TwoFactor } from '@/lib/types';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';

const Login = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams()
  const [state, formAction] = useFormState(handleLoginform, { status: false, message: '', data: null })
  const [twoFactor, setTwoFactor] = useState<TwoFactor>({ open: false, reference: '', token: '', two_factor_type: 'app' });
  const [visiblePassoword, setVisiblePassoword] = useState(false);
  const defaultEmail = searchParams.get('email') || ''

  useEffect(() => {
    if (state.status) {
      if (state?.data?.two_factor_enabled) {
        setTwoFactor(p => ({ ...p, open: true, reference: state?.data?.reference, two_factor_type: state?.data?.two_factor_type }))
      }
    } else {
      setMessage(state.message || '')
    }
  }, [state]);

  useEffect(() => {
    window.googleInitialize = function (url: string, callback: (data: any) => void): void {
      const button = document.getElementById('google-button');
      if (!button) return callback({ status: false, message: 'Unhandled google button', data: null })
      button.addEventListener('click', function () {
        const isMobile = window.outerWidth < 650
        let windowProperties = `toolbar=no,menubar=no,directories=no,location=no,status=no,`;
        if (!isMobile) {
          let left = (screen.width - 800) / 2;
          let top = (screen.height - 600) / 2;
          windowProperties += `resizable=yes,width=800,height=600,top=${top},left=${left}`;
        }
        const popupWindow = window.open(url, 'Google Auth', windowProperties) as Window;

        // popupWindow.addEventListener('beforeunload', () => {
        //   const originUrl = new URL(url);
        //   const searchUrl = new URLSearchParams(window.location.search);
        //   const status = searchUrl.get('status');
        //   const message = searchUrl.get('message');
        //   const code = searchUrl.get('code');
        //   if (originUrl.origin == window.location.origin) {
        //     if (status && message && code) {
        //       callback({ status: false, message: 'Ok', data: { status, message, data: { code } } })
        //       popupWindow.close();
        //     }
        //   }
        // })
      })
    }

    window.addEventListener('message', function (event) {
      console.log(event.data)
    });

    window.googleInitialize('http://localhost:8000/v1/auth/google?client_id=65bf7b5d5f777b2c09d8f570', (data) => {
      console.log(data);
    })
  }, []);

  const toggle2Auth = () => {
    if (isPending) return
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

  const handle2faVerify = async (e?: any) => {
    const value = typeof e === 'string' ? e : twoFactor.token
    if (value?.length === 6 && twoFactor.reference) {
      const data = { token: value, reference: twoFactor.reference }
      startTransition(() => {
        auth2faVerify(data, true).then((res) => {
          if (res?.message) setMessage(res.message)
        })
      })
    } else {
      toggle2Auth()
    }
  }

  const handleGoogleLogin = () => {
    startTransition(() => {
      socialAuth(CONST.AUTH.GOOGLE)
    })
  }

  const handleFacebookLogin = () => {
    startTransition(() => {
      socialAuth(CONST.AUTH.FACEBOOK)
    })
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
        <form onChange={handleChange} action={formAction} className='p-6 md:p-10 shadow-lg border rounded-md'>
          <h1 className='text-2xl mb-3 font-bold'>Sign in to your account</h1>
          <div className='mb-4'>
            <label>Email</label>
            <div className='mt-1'>
              <Input
                autoFocus={!defaultEmail}
                type="email"
                required
                defaultValue={defaultEmail}
                invalid={message}
                name='email'
                placeholder='e.g johndoe@email.com'
                autoComplete="email"
              />
            </div>
          </div>
          <div className='mb-6'>
            <div className='flex justify-between items-center'>
              <label>Password</label>
              <button type='button' className='text-blue-700'>Forgot your password</button>
            </div>
            <div className='mt-1 flex items-center relative'>
              <Input
                required
                autoFocus={!!defaultEmail}
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
          <div className='mb-4'>
            {/* <FormButton title='Login' /> */}
            <button type='button' id='google-button' className='bg-blue-700 rounded-md w-full py-3 text-white'>Google Login</button>
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
            <button type='button' onClick={handleGoogleLogin} className='inline-block mr-2 active:scale-105'>
              <Image src='/google.png' className='max-w-[2rem] max-h-[2rem] p-[0.05rem]'
                alt="" width={480} height={480} />
            </button>
            <button type='button' onClick={handleFacebookLogin} className='inline-block ml-2 active:scale-105 '>
              <Image src='/facebook.png' className='max-w-[2rem] max-h-[2rem]'
                alt="" width={300} height={300} />
            </button>
          </div>
        </form>
      </div>
      <App2factor
        message={message}
        handle2faVerify={handle2faVerify}
        loading={isPending}
        length={6}
        type={twoFactor.two_factor_type}
        onChange={handle2AuthChange}
        isOpen={twoFactor.open}
        toggle={toggle2Auth} />
    </main>
  );
};

export default Login;

