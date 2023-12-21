"use client"
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import NProgress from 'nprogress';
import { ReactNode } from "react";

const NavLink = (prop: LinkProps & { className?: string, exact?: boolean, href: string, extend?: boolean, activeColor?: string, activeClass?: string, inActiveClass?: string, children: ReactNode }) => {
  let asPath = usePathname()
  const startNProgress = () => {
    NProgress.start()
  }
  if (typeof window !== 'undefined') {
    asPath += (window?.location?.hash || '')
  }
  return <Link onClick={startNProgress} {...prop} style={{ color: ((prop.extend && !prop.exact && asPath.includes(prop.href)) || asPath === prop.href) ? (prop.activeColor || '') : '' }} className={`${prop.className ?? ''} ${(prop.exact ? prop.href?.includes(asPath) : prop.extend ? asPath.includes(prop.href) : asPath === prop.href) ? prop.activeClass : prop.inActiveClass}`} />;
};

export default NavLink;
