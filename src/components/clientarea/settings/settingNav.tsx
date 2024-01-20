"use client"
import NavLink from "@/lib/navLink";

const SettingNav = ({ isSuperAdmin }: { isSuperAdmin: boolean }) => {
  return <div className="mt-8 flex text-center sticky top-[3.9rem] bg-slate-100 z-20">
    <NavLink href='/clientarea/settings'
      activeClass='border-blue-700 font-bold'
      className={`inline-block ${isSuperAdmin ? 'w-4/12' : 'w-6/12'} p-2 border-b-2 transition-all`}
    >Account</NavLink>
    {
      isSuperAdmin ?
        <NavLink href='/clientarea/settings/wallet'
          activeClass='border-blue-700 font-bold'
          className="inline-block w-4/12 p-2 border-b-2 transition-all"
        >
          Wallet
        </NavLink> : null
    }
    <NavLink href='/clientarea/settings/plan'
      activeClass='border-blue-700 font-bold'
      className={`inline-block ${isSuperAdmin ? 'w-4/12' : 'w-6/12'} p-2 border-b-2 transition-all`}
    >Plan</NavLink>
  </div>;
};

export default SettingNav;
