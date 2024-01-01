"use client"
import AddTeam from "@/components/clientarea/settings/modals/addTeam";
import App2factorEable from "@/components/clientarea/settings/modals/app2FactorEnable";
import ConfigureEmail from "@/components/clientarea/settings/modals/configureEmail";
import Input from "@/components/input";
import Modal from "@/components/modal";
import PreloadImage from "@/components/preloadImage";
import { SpinnerCircle2 } from "@/components/spinner";
import TableLoader from "@/components/tableLoader";
import { CONST } from "@/lib/constant";
import { FormClear, FormData } from "@/lib/form";
import geoData from '@/lib/geodata-small.json';
import { fileToBase64 } from "@/lib/media";
import { formRequest, normalRequest } from "@/lib/request";
import { auth2faVerify } from "@/lib/server/form";
import { dateShort, isScope } from "@/lib/utils";
import useAccount from "@/store/hooks/account";
import useSmtp from "@/store/hooks/smtp";
import useTeam from "@/store/hooks/team";
import useTwoFa from "@/store/hooks/twoFa";
import { AccountData } from "@/store/slice/account";
import { TeamData } from "@/store/slice/team";
import { faBan, faBolt, faCamera, faCheckCircle, faEye, faEyeSlash, faPlus, faTrash, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

interface TwoFactor {
  open: boolean,
  reference?: string,
  two_factor_type?: 'app' | 'sms' | 'mail',
  qrcode?: string,
  token?: string,
}

const Settings = () => {
  const [isPending, startTransition] = useTransition()
  const [isClient, setIsClient] = useState(false)
  const [twoFaTypeModal, setTwoFaTypeModal] = useState(false);
  const { data: team, loading: teamLoading } = useTeam()
  const { data: smtp, loading: smtpLoading } = useSmtp()
  const { data: twoFa } = useTwoFa()
  const { data, loading, updateClientProfile } = useAccount()
  const [visiblePassoword, setVisiblePassoword] = useState(false);
  const [visiblePassoword2, setVisiblePassoword2] = useState(false);

  const [location, setLocation] = useState({
    state: '',
    country: ''
  });

  const [phoneFocus, setPhoneFocus] = useState(false);
  const [phone, setPhone] = useState(data?.phone || '');
  const [loaders, setLoaders] = useState({
    twoFactor: false,
    team: false,
    profile: false,
    photo: false,
    password: false,
    member: false,
  });
  const [modal, setModal] = useState(false);
  const [twoFactor, setTwoFactor] = useState<TwoFactor>({ open: false, qrcode: '', reference: '', token: '', two_factor_type: 'app' });
  const [message, setMessage] = useState('');
  const [emailModal, setEmailModal] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (data?.country) {
      setLocation((p) => ({ ...p, country: data?.country || '', state: data.state || '' }))
    }
  }, [data]);

  const setLoading = (key: 'photo' | 'team' | 'twoFactor' | 'profile' | 'password' | 'member', value: boolean) => {
    setLoaders(p => ({ ...p, [key]: value }))
  }

  const toggleModal = () => setModal(!modal)
  const toggleEmailModal = () => setEmailModal(!emailModal)

  const toggle2Auth = () => {
    if (loaders.twoFactor) return
    setMessage('')
    setTwoFactor(p => ({ ...p, open: !p.open }))
    setTwoFaTypeModal(false)
  }

  const handle2AuthChange = (e: string) => {
    setMessage('')
    setTwoFactor(p => ({ ...p, token: e }))
    if (e.length === 6) {
      handle2faVerify(e)
    }
  }

  const toggle2faTypes = () => setTwoFaTypeModal(!twoFaTypeModal);

  const enable2fa = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['type'])
    setLoading('twoFactor', true)
    const res = await normalRequest<{ qrcode: string, reference: string, two_factor_type: TwoFactor['two_factor_type'] }>(CONST.AUTH.TWO_FACTOR_ENABLE, { type: data.type });
    if (res.status) {
      setTwoFactor(p => ({ ...p, open: true, two_factor_type: res.data?.two_factor_type, reference: res.data?.reference, qrcode: res.data?.qrcode }))
    } else {
      toast.error(res.message)
    }
    setLoading('twoFactor', false)
  }

  const handle2faVerify = async (e?: any) => {
    const value = typeof e === 'string' ? e : twoFactor.token
    if (value?.length === 6 && twoFactor.reference) {
      const obj = { token: value, reference: twoFactor.reference }
      startTransition(() => {
        auth2faVerify(obj).then((res) => {
          if (res.status) {
            toggle2Auth()
            updateClientProfile({
              ...data,
              scope: (data?.scope?.indexOf('two_factor') ?? -1) > -1 ? data?.scope : data?.scope?.concat(['two_factor']),
              two_factor_type: twoFactor.two_factor_type
            })
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
    setLoading('photo', true)
    const res = await formRequest<{ path: string }>(CONST.ACCOUNT.PHOTO, { file }, null, 'patch');
    setLoading('photo', false)
    if (res.status) {
      updateClientProfile({ ...data, photo: res.data?.path })
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }

  }

  const handleAccountForm = async (e: FormEvent<HTMLFormElement>) => {
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

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['old_password', 'new_password'])
    if (data.new_password == data.old_password) {
      setMessage('Password is identical');
      toast.error('Password is identical')
      return
    }
    setLoading('password', true)
    const res = await normalRequest(CONST.ACCOUNT.UPDATE_PASSWORD, data, 'patch')
    setLoading('password', false)
    if (res.status) {
      toast.success(res.message?.substring(0, 100))
      FormClear(e, ['old_password', 'new_password'])
    } else {
      toast.error(res.message?.substring(0, 100))
    }
  }

  const changeTeamStatus = (team: TeamData) => {
    const status = team.status == 'disabled' ? 'active' : 'disabled'
  }

  return <div>
    <div className="flex flex-wrap justify-between items-end shadow-md rounded-lg bg-white mt-8 p-6">
      <form onSubmit={handleAccountForm} className="w-full lg:w-6/12 lg:pr-6">
        {
          data?.email === data?.company?.email ?
            <div className='mb-4 w-full'>
              <label>Company Name</label>
              <div className='mt-1'>
                <input
                  autoComplete='company'
                  required
                  disabled={loaders.profile || loading}
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
                disabled={loaders.profile || loading}
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
                disabled={loaders.profile || loading}
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
                  disabled={loaders.profile || loading}
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
              disabled={loaders.profile || loading}
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
                disabled={loaders.profile || loading}
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
                disabled={loaders.profile || loading}
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
                disabled={loaders.profile || loading}
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
        <button disabled={loaders.profile || loading} type='submit' className='my-2 disabled:cursor-wait active:bg-blue-700 w-full flex items-center justify-center px-14 bg-blue-600 py-2 rounded-lg text-white'>
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
            <PreloadImage src={image || data?.photo} alt="" className="object-cover" />
            <span className={`absolute ${loaders.photo ? 'animate-pulse' : ''} z-10 top-[40%] left-[45%] text-blue-700`}><FontAwesomeIcon icon={faCamera} /></span>
          </label>
        </div>
        <form onSubmit={handlePasswordChange} onChange={() => setMessage('')}>
          <div className='mb-4'>
            <label >Current Password</label>
            <div className='mt-1 flex items-center relative'>
              <Input
                required
                invalid={message}
                disabled={loaders.password || loading}
                type={visiblePassoword ? 'text' : 'password'}
                name='old_password'
                pattern='^(.*).{6,}$'
                title='Password must be at least 6 character.'
                placeholder='*********'
              />
              <button onClick={() => setVisiblePassoword(!visiblePassoword)} type='button' className={`inline-block absolute right-3 ${visiblePassoword ? '' : 'opacity-40'}`}>
                <FontAwesomeIcon icon={visiblePassoword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>
          <div className='mb-8'>
            <label >New Password</label>
            <div className='mt-1 flex items-center relative'>
              <Input
                required
                invalid={message}
                disabled={loaders.password || loading}
                type={visiblePassoword ? 'text' : 'password'}
                name='new_password'
                pattern='^(.*).{6,}$'
                title='Password must be at least 6 character.'
                placeholder='*********'
              />
              <button onClick={() => setVisiblePassoword2(!visiblePassoword2)} type='button' className={`inline-block absolute right-3 ${visiblePassoword2 ? '' : 'opacity-40'}`}>
                <FontAwesomeIcon icon={visiblePassoword2 ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>
          <button disabled={loaders.password || loading} type='submit' className='my-2 active:bg-blue-700 w-full flex items-center justify-center px-10 bg-blue-600 py-2 rounded-lg text-white'>
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
        </form>
      </div>
    </div>


    <div className="relative shadow-md rounded-lg bg-white mt-8">
      <div className="px-6 py-5 text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-lg sm:text-xl font-semibold">
            SMTP Setup
          </h4>
          <button
            disabled={smtpLoading}
            onClick={toggleEmailModal}
            className="text-white inline-flex justify-center items-center min-w-[6rem] bg-blue-600 active:[&:not(:disabled)]:bg-blue-700 disabled:bg-blue-500 py-1 rounded-md">
            {
              smtpLoading ?
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
        <div className="w-7/12">
          {
            smtpLoading || !isClient ?
              <span className="h-5 w-6/12 rounded-lg inline-block animate-pulse bg-slate-200"></span>
              :
              smtp?.email
          }
        </div>
        <div className={`w-3/12 ${smtpLoading || !isClient ? '' : smtp?.verified ? 'text-green-600' : 'text-red-600'} `}>
          {
            smtpLoading || !isClient ?
              <span className="h-5 w-6/12 rounded-lg inline-block animate-pulse bg-slate-200"></span>
              :
              <>
                <FontAwesomeIcon icon={smtp?.verified ? faCheckCircle : faXmarkCircle} className="mr-2" />
                <span>{smtp?.verified ? 'Verified' : 'Pending'}</span>
              </>
          }

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
            onClick={toggle2faTypes} className="text-white mt-4 sm:mt-0 inline-flex justify-center items-center min-w-[6rem] bg-blue-600 active:[&:not(:disabled)]:bg-blue-700 disabled:bg-blue-500 py-1 rounded-md">
            {
              loaders.twoFactor ?
                <span className='inline-block py-[0.5px]'>
                  <SpinnerCircle2 size="sm" color='white' />
                </span> :
                <span className="inline-block">Configure</span>
            }
          </button>
        </div>
      </div>
      <div className="px-6 pt-2 pb-5 text-left w-full">
        {
          isClient ?
            <p>
              Two-Factor authentication is {isScope('two_factor', data) ? <b>enabled</b> : <b>disabled</b>} on this account.
              {isScope('two_factor', data) ? ` Which means that upon login, you will be
          challenge for your 6-digit token generated from your ${data?.two_factor_type}.` : `
          Which means you will not be prompted to complete the 6-digit authentication procedure required to log into your account.
          `}
            </p>
            : <p className="animate-pulse bg-slate-200 h-6 rounded-full"></p>
        }
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
      <div className="overflow-x-auto pb-3 show-scrollbar">
        {
          isClient ?
            <table className="w-full text-left font-normal min-h-24">
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
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Verified
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 w-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="relative" >
                {
                  teamLoading !== 'done' ?
                    <TableLoader row={9} /> :
                    team?.length ?
                      team?.map((item, i) =>
                        <tr key={i}>
                          <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {i + 1}.
                            </div>
                          </td>
                          <td scope="row" className="px-6 whitespace-nowrap">
                            {item.first_name}
                          </td>
                          <td scope="row" className="px-6 whitespace-nowrap">
                            {item.last_name}
                          </td>
                          <td scope="row" className="px-6 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {item.email}
                            </div>
                          </td>
                          <td scope="row" className="px-6 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              <small className={`inline-block ${item.status == 'active' ? 'bg-green-500' : 'bg-red-500'} text-white py-[0.15rem] px-3 rounded-md`}>
                                {item.status}
                              </small>
                            </div>
                          </td>
                          <td scope="row" className="px-6 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {item.association?.access == 'level_2' ? 'Admin' : 'Super Admin'}
                            </div>
                          </td>
                          <td scope="row" className="px-6 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              <small className={`inline-block ${item.verified ? 'bg-green-500' : 'bg-red-500'} text-white py-[0.15rem] px-3 rounded-md`}>
                                {item.verified?.toString() || 'false'}
                              </small>
                            </div>
                          </td>
                          <td scope="row" className="px-6 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {dateShort(item.created_at)}
                            </div>
                          </td>
                          <td className="px-6 pt-4 whitespace-nowrap">
                            {

                            }
                            <div className="flex whitespace-nowrap items-center">
                              <button disabled={loaders.team} onClick={() => changeTeamStatus(item)}
                                className={`mr-2 hover:bg-slate-200 px-1 rounded-full ${loaders.team ? 'opacity-20 cursor-wait' : ''}`}
                                title={item.status == 'active' ? 'deactivate' : 'activate'}>
                                <FontAwesomeIcon icon={item.status == 'active' ? faBan : faBolt} />
                              </button>
                              <button disabled={loaders.team} title="remove"
                                className={`hover:bg-slate-200 px-1 rounded-full ${loaders.team ? 'opacity-20 cursor-wait' : ''}`}>
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) :
                      <tr className="relative top-3">
                        <div className="absolute flex items-center justify-center top-0 left-0 text-center w-full">
                          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-lg">No records found!</span>
                        </div>
                      </tr>
                }
              </tbody>
            </table> :
            <table className="w-full text-left font-normal min-h-24">
              <tbody className="relative">
                <TableLoader row={9} col={6} />
              </tbody>
            </table>
        }
      </div>
    </div>
    <AddTeam title="Add Team" isOpen={modal} toggle={toggleModal} />
    <App2factorEable
      message={message}
      handle2faVerify={handle2faVerify}
      loading={isPending}
      length={6}
      type={twoFactor.two_factor_type}
      qrcode={twoFactor?.qrcode}
      onChange={handle2AuthChange}
      isOpen={twoFactor.open}
      toggle={toggle2Auth}
    />
    <ConfigureEmail title="Email Configuration" isOpen={emailModal} toggle={toggleEmailModal} />
    <Modal isOpen={twoFaTypeModal} toggle={toggle2faTypes} center size="max-w-sm">
      <div className="mx-auto transition w-full items-center justify-center flex" >
        <div className="bg-white rounded-md w-full">
          <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
            <button onClick={() => { if (!loading) toggle2faTypes() }} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className='text-xl pl-3 font-bold'>2FA Authentication</h2>
          </div>
          <div className="p-7">
            <form onSubmit={enable2fa}>
              <select
                name='type'
                required
                disabled={loaders.twoFactor || loading || !twoFa?.length}
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 ring-offset-1 focus:ring-1  border focus:border-2 h-[2.65rem]  px-3 rounded-md' >
                {
                  twoFa?.length ?
                    twoFa?.map((val, id) =>
                      <option key={id} value={val} className="capitalize">{val}</option>
                    ) : null
                }
              </select>
              <div className="mt-3">
                <button
                  disabled={loaders.twoFactor}
                  type="submit"
                  className="text-white w-full mt-4 inline-flex justify-center items-center bg-blue-600 active:[&:not(:disabled)]:bg-blue-700 disabled:bg-blue-500 py-2 rounded-md">
                  {
                    loaders.twoFactor ?
                      <span className='inline-block py-[0.5px]'>
                        <SpinnerCircle2 size="sm" color='white' />
                      </span> :
                      <span className="inline-block">Continue</span>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  </div>;
};

export default Settings;
