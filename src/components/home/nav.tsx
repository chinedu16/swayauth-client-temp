import NavLink from "@/lib/navLink";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Nav = ({
  bg = 'bg-white',
  maxWidth = 'max-w-7xl',
  icon = '/logo-circle.png'
}: {
  bg?: string,
  icon?: string,
  maxWidth?: string
}) => {
  return (
    <div className={`fixed w-full  transition-all lg:sticky z-50 top-0 w-100 ${bg}`}>
      <div className={`${maxWidth} px-5 md:px-10 py-4 items-center lg:flex justify-between mx-auto`}>
        <div className="flex items-center justify-between">
          <Link href='/' className="w-[2.5rem] h-[2.5rem] flex items-center">
            <Image src={icon} alt="" width={1232} height={1232} />
            <span className="inline-block ml-2 text-xl ">swayauth</span>
          </Link>
          <label
            htmlFor="hambugger"
            className="block text-3xl text-blue-700 cursor-pointer lg:hidden"
          >
            <FontAwesomeIcon icon={faBars} />
          </label>
        </div>
        <input type="checkbox" id="hambugger" className="hidden" />
        <div className="pt-6 hambugger-close relative overflow-hidden lg:pt-0">
          <NavLink
            href="/doc"
            prefetch
            activeColor="#1C4ED8"
            className="px-5 pl-0 lg:pl-5 hover:text-blue-700 block lg:inline-block py-3"
          >
            Doc
          </NavLink>
          <NavLink
            href="/pricing"
            activeColor="#1C4ED8"
            className="px-5 pl-0 lg:pl-5 hover:text-blue-700 block lg:inline-block py-3"
          >
            Pricing
          </NavLink>
          <NavLink
            href="/blog"
            prefetch
            activeColor="#1C4ED8"
            className="px-5 pl-0 lg:pl-5 hover:text-blue-700 block lg:inline-block py-3"
          >
            Blog
          </NavLink>
          <NavLink
            href="/about"
            prefetch
            activeColor="#1C4ED8"
            className="px-5 pl-0 lg:pl-5 hover:text-blue-700 block lg:inline-block py-3"
          >
            About
          </NavLink>
        </div>
        <div className="relative hambugger-close overflow-hidden">
          <Link
            href="/login"
            prefetch
            className="px-5 pl-0 lg:pl-5 block hover:text-blue-700 lg:inline-block py-3"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            prefetch
            className="px-5 py-3 hover:bg-blue-800 bg-blue-700 inline-block mt-3 lg:mt-0 rounded-full text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
