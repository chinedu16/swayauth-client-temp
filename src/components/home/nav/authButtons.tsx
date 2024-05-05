"use client";
import NavLink from "@/lib/navLink";
import { isGoodToken } from "@/lib/token";
import { useEffect, useState } from "react";

const AuthButtons = () => {
  const [auth, setAuth] = useState<null | boolean>(null);

  useEffect(() => {
    setAuth(isGoodToken())
  }, []);
  return <div className="relative hambugger-close overflow-hidden">
    {
      auth === null ? <div className="min-w-32 animate-pulse bg-slate-200 h-12 rounded-full"></div> : auth ?
        <NavLink
          href="/clientarea"
          prefetch
          className="px-5 py-3 hover:bg-blue-800 bg-blue-700 inline-block mt-3 lg:mt-0 rounded-full text-white"
        >
          Dashboard
        </NavLink> :
        <>
          <NavLink
            href="/sign-up"
            prefetch
            className="px-5 py-3 hover:bg-blue-800 bg-blue-700 inline-block mt-3 lg:mt-0 rounded-full text-white"
          >
            Create account
          </NavLink>
          <NavLink
            href="/login"
            prefetch
            className="pl-0 lg:pl-5 block hover:text-blue-700 mt-2 lg:mt-0 lg:inline-block py-3"
          >
            Login
          </NavLink>

        </>
    }
  </div>
};

export default AuthButtons;
