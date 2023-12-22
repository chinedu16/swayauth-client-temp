"use client"
import AddTeam from "@/components/clientarea/settings/modals/addTeam";
import App2factorEable from "@/components/clientarea/settings/modals/app2FactorEnable";
import ConfigureEmail from "@/components/clientarea/settings/modals/configureEmail";
import PreloadImage from "@/components/preloadImage";
import { SpinnerCircle2 } from "@/components/spinner";
import { CONST } from "@/lib/constant";
import { fileToBase64 } from "@/lib/media";
import { normalRequest } from "@/lib/request";
import { auth2faVerify } from "@/lib/server/form";
import useAccount from "@/store/hooks/account";
import { faBan, faCamera, faCheckCircle, faChevronLeft, faChevronRight, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import geoData from '@/lib/geodata-small.json'
import { FormData } from "@/lib/form";
import { AccountData } from "@/store/slice/account";

interface TwoFactor {
  open: boolean,
  reference?: string,
  qrcode?: string,
  token?: string,
}

const Settings = () => {
  const [isPending, startTransition] = useTransition()
  const { data, updateClientProfile } = useAccount()

  const [location, setLocation] = useState({
    state: '',
    country: ''
  });

  const [phoneFocus, setPhoneFocus] = useState(false);
  const [phone, setPhone] = useState(data?.phone || '');
  const [loaders, setLoaders] = useState({
    smtp: false,
    twoFactor: false,
    profile: false,
    password: false,
    member: false,
  });
  const [modal, setModal] = useState(false);
  const [twoFactor, setTwoFactor] = useState<TwoFactor>({ open: false, qrcode: '', reference: '', token: '' });
  const [message, setMessage] = useState('');
  const [emailModal, setEmailModal] = useState(false);
  const [image, setImage] = useState('');
  const page = useSearchParams().get('page') || '1'
  const route = useRouter()

  useEffect(() => {
    if (data?.country) {
      setLocation((p) => ({ ...p, country: data?.country || '', state: data.state || '' }))
    }
  }, [data]);

  const changeDirection = (direction: 'prev' | 'next') => {
    if (Number(page) > 0) {
      let nextRoute = '/clientarea/customers?page='
      nextRoute += direction === 'next' ? Number(page) + 1 : Number(page) - 1 > 0 ? Number(page) - 1 : Number(page)
      route.push(nextRoute)
    }
  }

  const setLoading = (key: 'smtp' | 'twoFactor' | 'profile' | 'password' | 'member', value: boolean) => {
    setLoaders(p => ({ ...p, [key]: value }))
  }

  const toggleModal = () => setModal(!modal)
  const toggleEmailModal = () => setEmailModal(!emailModal)

  const toggle2Auth = () => {
    if (loaders.twoFactor) return
    setMessage('')
    setTwoFactor(p => ({ ...p, open: !p.open }))
  }

  const handle2AuthChange = (e: string) => {
    setMessage('')
    setTwoFactor(p => ({ ...p, token: e }))
    if (e.length === 6) {
      handle2faVerify(e)
    }
  }

  const enable2fa = async () => {
    setLoading('twoFactor', true)
    const res = await normalRequest<{ qrcode: string, reference: string }>(CONST.AUTH.TWO_FACTOR_ENABLE, { type: 'app' });
    if (res.status) {
      setTwoFactor(p => ({ ...p, open: true, reference: res.data?.reference, qrcode: res.data?.qrcode }))
    } else {
      toast.error(res.message)
    }
    setLoading('twoFactor', false)
  }

  const handle2faVerify = async (e?: any) => {
    const value = typeof e === 'string' ? e : twoFactor.token
    if (value?.length === 6 && twoFactor.reference) {
      const data = { token: value, reference: twoFactor.reference }
      startTransition(() => {
        auth2faVerify(data).then((res) => {
          if (res.status) {
            toggle2Auth()
            toast.success(res.message);
          } else {
            setMessage(res.message)
          }
        })
      })
    } else {
      toggle2Auth()
    }
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    setImage(await fileToBase64(file))
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData<string>(e,
      ['company_name',
        'first_name',
        'last_name',
        'phone',
        'address',
        'city',
        'state',
        'country',
      ])
    if (phone && isValidPhoneNumber(phone)) {
      data.phone = phone
    } else {
      setPhoneFocus(true)
    }
    setLoading('profile', true)
    const res = await normalRequest<AccountData>(CONST.ACCOUNT.UPDATE_ACCOUNT, data, 'patch');
    setLoading('profile', false)
    if (res.status) {
      updateClientProfile(res.data)
      toast.success('Account updated successfully')
    } else {
      toast.error(res.message?.substring(0, 100));
    }
  }
  return <div>
    <div className="flex flex-wrap justify-between items-end shadow-md rounded-lg bg-white mt-8 p-6">
      <form onSubmit={handleFormSubmit} className="w-full lg:w-6/12 lg:pr-6">
        {
          data?.email === data?.company?.email ?
            <div className='mb-4 w-full'>
              <label>Company Name</label>
              <div className='mt-1'>
                <input
                  autoComplete='company'
                  required
                  disabled={loaders.profile}
                  defaultValue={data?.company?.name}
                  name='company_name'
                  className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g John' />
              </div>
              <div className="w-[49%]">
              </div>
            </div> :
            null
        }
        <div className='mb-4 flex w-full justify-between'>
          <div className="w-[49%]">
            <label>First Name</label>
            <div className='mt-1'>
              <input
                autoComplete='given-name'
                required
                disabled={loaders.profile}
                defaultValue={data?.first_name}
                name='first_name'
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                placeholder='e.g John' />
            </div>
          </div>
          <div className="w-[49%]">
            <label>Last Name</label>
            <div className='mt-1'>
              <input
                autoComplete='family-name'
                required
                disabled={loaders.profile}
                defaultValue={data?.last_name}
                name='last_name'
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                placeholder='e.g Doe' />
            </div>
          </div>
        </div>
        <div className='mb-4 flex flex-wrap w-full justify-between'>
          <div className="w-full sm:w-[49%]">
            <label >Email</label>
            <div className='mt-1'>
              <input
                type="email"
                disabled
                autoComplete="email"
                required
                defaultValue={data?.email}
                name='email'
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                placeholder='e.g johndoe@mail.com' />
            </div>
          </div>
          <div className="w-full mt-4 sm:mt-0 sm:w-[49%]">
            <label className="block" >
              <span className="inline-block">Phone Number</span>
              <div className='mt-1'>
                <PhoneInput
                  placeholder="eg +234..."
                  onBlur={() => setPhoneFocus(false)}
                  onFocus={() => setPhoneFocus(true)}
                  value={phone}
                  disabled={loaders.profile}
                  defaultCountry="NG"
                  className={`w-full sm:ring-offset-1 bg-slate-50 ${phoneFocus ? 'border-blue-700 ring-2 sm:ring-1' : ''} outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 border sm:border-2 py-[0.45rem] px-3 rounded-md`}
                  onChange={(e) => setPhone(e as any)} />
              </div>
            </label>
          </div>
        </div>
        <div className='mb-3'>
          <label >Address</label>
          <div className='mt-1'>
            <textarea autoComplete="address"
              required
              defaultValue={data?.address || ''}
              name='address'
              disabled={loaders.profile}
              className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
              placeholder='e.g 123, Cresent Street.' />
          </div>
        </div>
        <div className='mb-8 flex w-full flex-wrap justify-between'>
          <div className="w-full sm:w-[32%]">
            <label >City</label>
            <div className='mt-1'>
              <input type="text"
                autoComplete="city"
                required
                disabled={loaders.profile}
                name='city'
                defaultValue={data?.city || ''}
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                placeholder='e.g New York' />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 w-full sm:w-[32%]">
            <label>State</label>
            <div className='mt-1'>
              <select
                name='state'
                required
                disabled={loaders.profile}
                onChange={(e) => setLocation((p) => ({ ...p, state: e.target.value }))}
                defaultValue={data?.state || ''}
                className='w-full bg-slate-50 focus:border-blue-700 focus:border-2 focus:outline-1 focus:ring-1 ring-offset-1 border h-[2.65rem]  px-3 rounded-md' >
                {
                  location.country ?
                    geoData.find((item) => item.name == location.country)?.states?.map((item, idx) =>
                      <option key={idx} value={item.name} selected={location.state == item.name}>{item.name}</option>
                    ) :
                    <option value="" hidden>--Select state--</option>
                }
              </select>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 w-full sm:w-[32%]">
            <label>Country</label>
            <div className='mt-1'>
              <select
                name='country'
                required
                disabled={loaders.profile}
                onChange={(e) => setLocation((p) => ({ ...p, country: e.target.value }))}
                defaultValue={data?.country || ''}
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 ring-offset-1 focus:ring-1  border focus:border-2 h-[2.65rem]  px-3 rounded-md' >
                <option value="" hidden>--Select country--</option>
                {
                  geoData.map((item, i) =>
                    <option key={i} selected={item.name === location.country} value={item.name}>{item.name}</option>
                  )
                }
              </select>
            </div>
          </div>
        </div>
        <button disabled={loaders.profile} type='submit' className='my-2 disabled:cursor-wait active:bg-blue-700 w-full flex items-center justify-center px-14 bg-blue-600 py-2 rounded-lg text-white'>
          {
            loaders.profile ?
              <span className='inline-block py-[0.5px]'>
                <SpinnerCircle2 color='white' />
              </span> :
              <span>
                Save details
              </span>
          }
        </button>
      </form>
      <div className="lg:pl-6 lg:w-6/12 w-full mt-10 lg:mt-0">
        <div className='mt-4 mb-7 flex items-center'>
          <label className="inline-block relative border-2 w-[8rem] h-[8rem] cursor-pointer rounded-3xl overflow-hidden">
            <input onChange={handleImageChange} type="file" name="logo" className="hidden" accept="image/*" />
            <PreloadImage src={image} alt="" className="object-cover" />
            <span className="absolute top-[40%] left-[45%] text-blue-700"><FontAwesomeIcon icon={faCamera} /></span>
          </label>
        </div>
        <div className='mb-4'>
          <label >Current Password</label>
          <div className='mt-1'>
            <input type="password"
              required
              name='current_password'
              className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
              placeholder='******' />
          </div>
        </div>
        <div className='mb-8'>
          <label >New Password</label>
          <div className='mt-1'>
            <input type="password"
              required
              name='current_password'
              className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
              placeholder='******' />
          </div>
        </div>
        <button disabled={loaders.password} type='submit' className='my-2 active:bg-blue-700 w-full flex items-center justify-center px-10 bg-blue-600 py-2 rounded-lg text-white'>
          {
            loaders.password ?
              <span className='inline-block'>
                <SpinnerCircle2 color='white' />
              </span> :
              <span>
                Update password
              </span>
          }
        </button>
      </div>
    </div>


    <div className="relative shadow-md rounded-lg bg-white mt-8">
      <div className="px-6 py-5 text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-lg sm:text-xl font-semibold">
            SMTP Setup
          </h4>
          <button
            disabled={loaders.smtp}
            onClick={toggleEmailModal}
            className="text-white inline-flex justify-center items-center min-w-[6rem] bg-blue-600 active:[&:not(:disabled)]:bg-blue-700 disabled:bg-blue-500 py-1 rounded-md">
            {
              loaders.smtp ?
                <span className='inline-block py-[0.5px]'>
                  <SpinnerCircle2 size="sm" color='white' />
                </span> :
                <span className="inline-block">Configure</span>
            }
          </button>
        </div>
      </div>
      <div className="px-6 font-semibold text-left w-full flex justify-between">
        <div className="w-7/12">Service Email Address</div>
        <div className="w-3/12">Status</div>
      </div>
      <div className="px-6 pt-2 pb-5 text-left w-full flex justify-between">
        <div className="w-7/12">no-reply@swayauth.com</div>
        <div className="w-3/12 text-green-600">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          <span>Verified</span>
        </div>
      </div>
    </div>


    <div className="relative shadow-md rounded-lg bg-white mt-8">
      <div className="px-6 py-5 text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-lg sm:text-xl font-semibold">
            Two-Factor Authentication
          </h4>
          <button
            disabled={loaders.twoFactor}
            onClick={enable2fa} className="text-white mt-4 sm:mt-0 inline-flex justify-center items-center min-w-[6rem] bg-blue-600 active:[&:not(:disabled)]:bg-blue-700 disabled:bg-blue-500 py-1 rounded-md">
            {
              loaders.twoFactor ?
                <span className='inline-block py-[0.5px]'>
                  <SpinnerCircle2 size="sm" color='white' />
                </span> :
                <span className="inline-block">Enable</span>
            }
          </button>
        </div>
      </div>
      <div className="px-6 pt-2 pb-5 text-left w-full">
        <p>
          Two-Factor authentication is <b>enabled</b> on this account, which means that upon login, you will be
          challenge for your 6-digit token generated from your registered TOTP device.
        </p>
        <p className="mt-3">
          Learn more at our <Link className="text-blue-500" href='/helo'>two-factor authentication help page.</Link>
        </p>
      </div>

    </div>

    <div className="relative shadow-md rounded-lg bg-white pb-2 mt-8">
      <div className="px-6 py-5  text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-lg sm:text-xl font-semibold">
            Team Members
          </h4>
          <button onClick={toggleModal}
            className="text-white hover:bg-blue-800 bg-blue-700 min-w-[6rem] py-1 rounded-md">
            <span className="inline-block">Add</span>
            <FontAwesomeIcon icon={faPlus} className="ml-2" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto show-scrollbar">
        <table className="w-full text-left font-normal">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3 w-0">
                S/N
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                First Name
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Email
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 w-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody >
            <tr >
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  1.
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                John
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                Doe
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  fashanutosin7@gmail.com
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Admin
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <small className="inline-block bg-green-500 text-white py-[0.15rem] px-3 rounded-md">Active</small>
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-6 pt-4 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr >
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  2.
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                John
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                Doe
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  fashanutosin7@gmail.com
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Admin
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <small className="inline-block bg-green-500 text-white py-[0.15rem] px-3 rounded-md">Active</small>
                </div>
              </td>
              <td scope="row" className="px-6 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-6 pt-2 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex mt-3 justify-end items-center">
      <button onClick={() => changeDirection('prev')}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <span className="ml-1">Prev</span>
      </button>
      <input type="number" placeholder="1" defaultValue={page} className="w-10 mx-5 px-2 border border-slate-400 rounded-md [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" />
      <button onClick={() => changeDirection('next')}>
        <span className="mr-1">Next</span>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
    <AddTeam title="Add Team" isOpen={modal} toggle={toggleModal} />
    <App2factorEable
      message={message}
      handle2faVerify={handle2faVerify}
      loading={isPending}
      length={6}
      qrcode={twoFactor.qrcode}
      onChange={handle2AuthChange}
      isOpen={twoFactor.open}
      toggle={toggle2Auth}
    />
    <ConfigureEmail title="Email Configuration" isOpen={emailModal} toggle={toggleEmailModal} />
  </div>;
};

export default Settings;
