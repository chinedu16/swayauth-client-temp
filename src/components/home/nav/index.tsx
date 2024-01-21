import NavLink from "@/lib/navLink";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import AuthButtons from "./authButtons";

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
          <NavLink href='/' className="w-[2.5rem] h-[2.5rem] flex items-center">
            <Image src={icon} alt="" width={1232} height={1232} />
            <span className="inline-block ml-2 text-xl ">swayauth</span>
          </NavLink>
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
            extend
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
        <AuthButtons />
      </div>
    </div>
  );
};

export default Nav;
