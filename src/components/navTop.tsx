import { CONST } from "@/lib/constant";
import { FormData } from "@/lib/form";
import Link from "@/lib/link";
import { normalRequest } from "@/lib/request";
import { isAccess, money } from "@/lib/utils";
import { logOut, useAppDispatch } from "@/store";
import useAccount from "@/store/hooks/account";
import useAssociation from "@/store/hooks/association";
import useWallet from "@/store/hooks/wallet";
import { faBars, faBell, faChevronDown, faGear, faRepeat, faRightFromBracket, faWallet, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import DropDown from "./dropDown";
import Modal from "./modal";
import { SpinnerCircle2 } from "./spinner";
import PreloadImage from "./preloadImage";
import NavLink from "@/lib/navLink";
import { removeRemember } from "@/lib/token";

const isSuperAdmin = isAccess('level_3')

const NavTop = () => {
  const { data, loading } = useAccount();
  const { data: walletData, loading: walletLoading } = useWallet();
  const { data: assocData, loading: assocLoading } = useAssociation();
  const [switchAccoutModal, setSwitchAccoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const [switchLoading, setSwitchLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, []);

  const toggleSwitchAccount = () => {
    if (switchLoading || assocLoading) return
    setSwitchAccoutModal(!switchAccoutModal)
  }

  const logMeOut = (link?: any) => {
    removeRemember();
    dispatch(logOut(typeof link == 'string' ? link : undefined)())
  }

  const switchAccount = async (e: FormEvent<HTMLFormElement>) => {
    const sData = FormData(e, ['company_id'])
    if (sData?.company_id === data?.company?.id) return toast.error('Account is already active!')
    setSwitchLoading(true)
    const res = await normalRequest(CONST.ACCOUNT.SWITCH_ACCOUNT + `/${sData.company_id}`, {}, 'put')
    setSwitchLoading(false)
    toggleSwitchAccount()
    toast[res.status ? 'success' : 'error'](res.message)
    if (res.status) logMeOut(CONST.LOCATION.LOGIN + `?email=${data?.email}`)
  }

  return <nav className="sticky max-h-[4rem] z-40 bg-white top-0 shadow-sm w-full p-2 border-b flex items-center">
    <div className="md:min-w-[220px] select-none md:px-4 flex items-center">
      <label htmlFor="hambugger2" className="md:hidden inline-block px-2 mr-2 text-2xl py-1 cursor-pointer">
        <FontAwesomeIcon icon={faBars} />
      </label>
      <NavLink href='/' className='md:inline-flex items-center hidden'>
        <Image src='/logo-circle.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={400} height={400} />
        <span className="inline-block ml-2 text-xl">swayauth</span>
      </NavLink>
    </div>
    <div className="w-full md:px-6 pr-2 flex justify-end items-center">
      {isSuperAdmin && isClient ? <NavLink href='/clientarea/settings/wallet' className="mr-4 flex items-center money whitespace-nowrap bg-slate-200 font-bold 0 py-1 md:my-2 px-2 md:px-4 rounded-md text-xl md:text-2xl">
        <FontAwesomeIcon icon={faWallet} className="mr-3" />
        {
          walletLoading ?
            <span className="inline-flex justify-center py-1 min-w-[3rem]">
              <SpinnerCircle2 size="sm" />
            </span> :
            money(walletData?.amount)
        }
      </NavLink> : null}
      
      <DropDown.Container className="mr-4">
        <DropDown.Toggle className="w-[2.5rem] border h-[2.5rem] inline-flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative">
          <FontAwesomeIcon icon={faBell} className="text-gray-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </DropDown.Toggle>
        <DropDown.Body className="inline-block right-0 top-[calc(100%+0.5rem)] min-w-[20rem] shadow-xl border border-gray-100">
          <div className="bg-white rounded-md overflow-hidden">
            <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">Notifications</h3>
              <span className="text-xs text-blue-600 cursor-pointer hover:underline">Mark all as read</span>
            </div>
            <ul className="max-h-[24rem] overflow-y-auto">
              <li className="px-4 py-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faBell} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">Welcome to SwayAuth!</p>
                    <p className="text-xs text-gray-500 mt-1">Start by creating your first organization credential.</p>
                    <p className="text-[10px] text-gray-400 mt-2">Just now</p>
                  </div>
                </div>
              </li>
              <li className="px-4 py-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faXmark} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">Login Attempt Failed</p>
                    <p className="text-xs text-gray-500 mt-1">A failed login attempt was detected on your account.</p>
                    <p className="text-[10px] text-gray-400 mt-2">2 hours ago</p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="px-4 py-2 border-t text-center bg-gray-50">
              <Link href="/clientarea/notifications" className="text-sm text-blue-600 font-medium hover:underline">View all notifications</Link>
            </div>
          </div>
        </DropDown.Body>
      </DropDown.Container>

      <DropDown.Container>
        <DropDown.Toggle className={`w-[2.5rem] ${loading ? 'opacity-50' : ''} border max-w-[2.5rem] h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full`}>
          <PreloadImage src={data?.photo || '/avatar-2.png'} className="object-cover" />
        </DropDown.Toggle>
        <DropDown.Body className="inline-block right-0 top-[calc(100%+0.5rem)] min-w-[10rem]">
          <ul className="py-2  bg-black rounded-md">
            <li onClick={toggleSwitchAccount} className="flex relative z-30 items-center justify-between px-4 py-2 text-white hover:bg-gray-600 cursor-pointer">
              <span>
                <FontAwesomeIcon icon={faRepeat} className="w-[1rem]" />
                <span className="ml-3">Account</span>
              </span>
              <span>
                {
                  assocLoading ?
                    <SpinnerCircle2 color="white" /> :
                    <FontAwesomeIcon icon={faChevronDown} className="w-[1rem] text-slate-500" />
                }
              </span>
            </li>
            <Link href='/clientarea/settings?name=iubduieu' className="block px-4 py-2 text-white hover:bg-gray-600 cursor-pointer">
              <FontAwesomeIcon icon={faGear} className="w-[1rem] scale-110 text-[1rem]" />
              <span className="ml-3">Settings</span>
            </Link>
            <Link href='/clientarea/settings/wallet' className="block text-white px-4 py-2 hover:bg-gray-600 cursor-pointer">
              <FontAwesomeIcon icon={faWallet} className="w-[1rem]" />
              <span className="ml-3">Wallet</span>
            </Link>
            <li onClick={logMeOut} className="block px-4 py-2 text-white hover:bg-gray-600 cursor-pointer">
              <FontAwesomeIcon icon={faRightFromBracket} className="w-[1rem]" />
              <span className="ml-3">Sign out</span>
            </li>
          </ul>
        </DropDown.Body>
      </DropDown.Container>
    </div>

    <Modal isOpen={switchAccoutModal} toggle={toggleSwitchAccount} center size="max-w-md">
      <div className="mx-auto transition w-full items-center justify-center flex" >
        <div className="bg-white rounded-md w-full">
          <div className="flex items-center px-4 py-2 w-full border-b">
            <button onClick={toggleSwitchAccount} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className='text-xl pl-3 font-bold'>Switch Account</h2>
          </div>
          <div className="p-7">
            <form onSubmit={switchAccount}>
              <select
                name='company_id'
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border h-[2.65rem]  px-3 rounded-md' >
                {
                  assocData?.length ?
                    assocData.map((item, idx) =>
                      <option key={idx} value={item.company_id}>{item.company?.name} {item.creator ? '(owner)' : null} {item.company_id == data?.company?.id ? ' - active' : null}</option>
                    ) :
                    <option value="Lagos">--Select aaccount--</option>
                }
              </select>
              <button
                type='submit'
                className='mt-4 active:bg-blue-700 w-full flex items-center justify-center px-14 bg-blue-600 py-2 rounded-lg text-white'>
                {
                  switchLoading ?
                    <span className='inline-block'>
                      <SpinnerCircle2 color='white' />
                    </span> :
                    <span>
                      Continue
                    </span>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  </nav>;
};

export default NavTop;
