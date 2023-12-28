import Input from "@/components/input";
import Modal from "@/components/modal";
import PreloadImage from "@/components/preloadImage";
import { SpinnerCircle2 } from "@/components/spinner";
import { CONST } from "@/lib/constant";
import { FormData } from "@/lib/form";
import { fileToBase64 } from "@/lib/media";
import { formRequest, normalRequest } from "@/lib/request";
import { TwoFactor } from "@/lib/types";
import useSmtp from "@/store/hooks/smtp";
import { faCamera, faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import VerifySmtp from "./verifySmtp";

const ConfigureEmail = ({ isOpen, toggle, title }: { isOpen: boolean, toggle: () => void, title: string }) => {
  const [image, setImage] = useState('');
  const { data: smtp, updateSmtpStatus } = useSmtp()
  const [twoFactor, setTwoFactor] = useState<TwoFactor>({ open: false, reference: '', token: '' });
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    setImage(await fileToBase64(file))
    setImgLoading(true)
    const res = await formRequest<{ path: string }>(CONST.COMPANY.SMTP.LOGO, { file });
    setImgLoading(false);
    if (!res.status) toast.error(res.message);
    setImage(res.data?.path || '')
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['photo', 'company_name', 'website', 'email', 'username', 'password', 'host'])
    if (image?.includes('http')) {
      data.photo = image
    }
    setLoading(true)
    const res = await normalRequest<{ reference: string }>(CONST.COMPANY.SMTP[smtp ? 'UPDATE' : 'SETUP'], data, smtp ? 'patch' : 'post')
    setLoading(false)
    if (res.status) {
      if (smtp) {
        toggle();
        toast.success(res.message);
      } else {
        setTwoFactor({ open: true, reference: res.data.reference, token: '' })
      }
    } else {
      setMessage(res.message)
    }
  }

  const toggle2Auth = () => {
    if (loading) return
    setMessage('')
    setTwoFactor(p => ({ ...p, open: !p.open }))
  }

  const handleTokenChange = (e: string) => {
    setMessage('')
    setTwoFactor(p => ({ ...p, token: e }))
    if (e.length === 6) {
      handleTokenVerify(e)
    }
  }

  const handleTokenVerify = async (e?: any) => {
    const value = typeof e === 'string' ? e : twoFactor.token
    if (value?.length === 6 && twoFactor.reference) {
      const data = { token: value, reference: twoFactor.reference }
      setLoading(true)
      const res = await normalRequest(CONST.COMPANY.SMTP.VERIFY, data, 'put')
      setLoading(false)
      if (res.status) {
        toggle2Auth()
        toggle()
        toast.success(res.message);
        updateSmtpStatus({ ...smtp, verified: true })
      } else {
        setMessage(res.message)
      }
    } else {
      toggle2Auth()
    }
  }



  return <Modal isOpen={isOpen} toggle={() => { if (!loading) toggle() }} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
          <button onClick={() => { if (!loading) toggle() }} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>{title}</h2>
        </div>
        <div className="p-7">
          <form onChange={() => setMessage('')} onSubmit={handleFormSubmit}>
            <div className='mb-6 flex items-center justify-center'>
              <label className="inline-block relative border-2 w-[6rem] h-[6rem] cursor-pointer rounded-full overflow-hidden">
                <input onChange={handleImageChange} type="file" name="logo" className="hidden" accept="image/*" />
                <PreloadImage src={image || smtp?.photo || ''} alt="" className="object-cover" />
                <span className="absolute top-[40%] left-[40%] text-blue-700"><FontAwesomeIcon className={imgLoading || loading ? 'animate-pulse' : ''} icon={faCamera} /></span>
              </label>
            </div>
            <div className='mb-4 flex justify-between'>
              <div className="w-[49%]">
                <label>Company Name</label>
                <div className='mt-1'>
                  <Input
                    autoFocus
                    required
                    defaultValue={smtp?.company_name}
                    disabled={loading}
                    invalid={message}
                    name='company_name'
                    placeholder='e.g SwayAuth'
                    autoComplete="company"
                  />
                </div>
              </div>
              <div className="w-[49%]">
                <label>Website</label>
                <div className='mt-1'>
                  <Input
                    required
                    disabled={loading}
                    type="url"
                    defaultValue={smtp?.website}
                    invalid={message}
                    name='website'
                    autoComplete="website"
                    placeholder='e.g https://swayauth.com'
                  />
                </div>
              </div>
            </div>
            <div className='mb-4'>
              <label >Service Email Address</label>
              <div className='mt-1'>
                <Input
                  type="email"
                  required
                  defaultValue={smtp?.email}
                  disabled={loading}
                  invalid={message}
                  name='email'
                  placeholder='e.g no-reply@swayauth.com'
                  autoComplete="email"
                />
              </div>
            </div>
            <div className='mb-8 flex flex-wrap justify-between'>
              <div className="w-full sm:w-[32%]">
                <label>SMTP Host</label>
                <div className='mt-1'>
                  <Input
                    required
                    disabled={loading}
                    defaultValue={smtp?.host}
                    invalid={message}
                    name='host'
                    placeholder='e.g e.g smtp.gmail.com'
                  />
                </div>
              </div>
              <div className="w-full mt-4 sm:mt-0 sm:w-[32%]">
                <label>SMTP Username</label>
                <div className='mt-1'>
                  <Input
                    required
                    invalid={message}
                    disabled={loading}
                    name='username'
                    defaultValue={smtp?.username}
                    autoComplete="username"
                    placeholder='e.g e.g smtpuser'
                  />
                </div>
              </div>
              <div className="w-full mt-4 sm:mt-0 sm:w-[32%]">
                <label>SMTP Password</label>
                <div className='mt-1 flex items-center relative'>
                  <Input
                    disabled={loading}
                    required
                    invalid={message}
                    type={showSmtpPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='*********'
                  />
                  <button onClick={() => setShowSmtpPassword(!showSmtpPassword)} type='button'
                    className={`inline-block absolute right-3 ${showSmtpPassword ? '' : 'opacity-40'}`}>
                    <FontAwesomeIcon icon={showSmtpPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>
            </div>
            <div className='text-red-500 min-h-[0.7rem]'>
              {
                message && !twoFactor.open && <small>* {message}</small>
              }
            </div>
            <div className='mb-4'>
              <button disabled={loading} type='submit' className='my-2 active:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white'>
                {
                  loading ?
                    <span className='inline-block'>
                      <SpinnerCircle2 color='white' />
                    </span> :
                    <span>
                      Save
                    </span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <VerifySmtp
      message={message}
      handle2faVerify={handleTokenVerify}
      loading={loading}
      length={6}
      onChange={handleTokenChange}
      isOpen={twoFactor.open}
      toggle={toggle2Auth}
    />
  </Modal>;
};

export default ConfigureEmail;
