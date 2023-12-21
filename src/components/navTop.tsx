import { money } from "@/lib/utils";
import { faBars, faGear, faRightFromBracket, faSearch, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import DropDown from "./dropDown";
import { logOut, useAppDispatch } from "@/store";
import useAccount from "@/store/hooks/account";

const NavTop = () => {
  const { data, loading } = useAccount();

  const dispatch = useAppDispatch();

  const logMeOut = () => {
    dispatch(logOut())
  }

  return <nav className="sticky max-h-[4rem] z-40 bg-white top-0 shadow-sm w-full p-2 border-b flex items-center">
    <div className="md:min-w-[220px] select-none md:px-4 flex items-center">
      <label htmlFor="hambugger2" className="md:hidden inline-block px-2 mr-2 text-2xl py-1 cursor-pointer">
        <FontAwesomeIcon icon={faBars} />
      </label>
      <div className='md:inline-flex items-center hidden'>
        <Image src='/logo-circle.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={400} height={400} />
        <span className="inline-block ml-2 text-xl">swayauth</span>
      </div>
    </div>
    <div className="w-full md:px-6 flex items-center">
      <label htmlFor="search-input" className="inline-block absolute text-slate-400">
        <FontAwesomeIcon icon={faSearch} />
      </label>
      <input id='search-input' type="text" placeholder="Search" className="mr-4 md:mr-10 pl-7 w-full py-2 outline-none border-[transparent] text-slate-700 border-b-[0.1rem] focus:border-slate-300" />
      <h3 className="mr-4 money whitespace-nowrap bg-slate-200 font-bold 0 py-1 md:my-2 px-2 md:px-4 rounded-md text-xl md:text-2xl">
        <FontAwesomeIcon icon={faWallet} className="mr-3" />
        {money(10000)}
      </h3>
      <DropDown.Container>
        <DropDown.Toggle className={`w-[2.5rem] ${loading ? 'opacity-50' : ''} border max-w-[2.5rem] h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full`}>
          <Image src={data?.photo ? data.photo : '/avatar-2.png'} alt="" width={400} height={400} className="object-cover" />
        </DropDown.Toggle>
        <DropDown.Body className="inline-block right-0 top-[calc(100%+0.5rem)] min-w-[10rem]">
          <ul className="py-2 dark:text-gray-200 bg-black rounded-md">
            <li className="block px-4 py-2 text-white hover:bg-gray-600 cursor-pointer">
              <FontAwesomeIcon icon={faGear} className="w-[1rem] text-[1rem]" />
              <span className="ml-3">Settings</span>
            </li>
            <Link href='/settings/wallet' className="block text-white px-4 py-2 hover:bg-gray-600 cursor-pointer">
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
  </nav>;
};

export default NavTop;
