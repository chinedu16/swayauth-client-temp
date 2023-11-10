import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const NavLink = (prop: LinkProps & { className?: string, exact?: boolean, href: string, extend?: boolean, activeColor?: string, activeClass?: string, inActiveClass?: string, children: ReactNode }) => {
  let { asPath } = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      asPath += (window?.location?.hash || '')
    }
  }, []);
  return <Link {...prop} style={{ color: asPath === prop.href ? (prop.activeColor || '') : '' }} className={`${prop.className ?? ''} ${(prop.exact ? prop.href?.includes(asPath) : prop.extend ? asPath.includes(prop.href) : asPath === prop.href) ? prop.activeClass : prop.inActiveClass}`} />;
};

export default NavLink;
