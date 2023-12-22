"use client"
import { Url } from "next/dist/shared/lib/router/router";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import NProgress from 'nprogress';
import { ReactNode } from "react";

const startNProgress = (href: Url) => {
  if (typeof window !== 'undefined') {
    if ((window.location.pathname +
      window.location.search +
      window.location.hash) !== href)
      NProgress.start()
  }
}

const NavLink = (prop: LinkProps & { className?: string, exact?: boolean, href: string, extend?: boolean, activeColor?: string, activeClass?: string, inActiveClass?: string, children: ReactNode }) => {
  let asPath = usePathname()
  if (typeof window !== 'undefined') {
    asPath += (window?.location?.hash || '')
  }
  return <Link onClick={() => startNProgress(prop.href)} {...prop} style={{ color: ((prop.extend && !prop.exact && asPath.includes(prop.href)) || asPath === prop.href) ? (prop.activeColor || '') : '' }} className={`${prop.className ?? ''} ${(prop.exact ? prop.href?.includes(asPath) : prop.extend ? asPath.includes(prop.href) : asPath === prop.href) ? prop.activeClass : prop.inActiveClass}`} />;
};

export default NavLink;
