import NavLink from "@/lib/navLink";
import { faAddressBook, faBriefcase, faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLeft = () => {
  return <div className="w-full md:w-[220px] nav-left  transition-all fixed h-[calc(100vh-4rem)] overflow-hidden">
    <div className="h-full w-ful md:w-full flex">
      <div className="py-6 overflow-auto h-full min-w-[220px] bg-white border-r shadow-lg">
        <NavLink href='/clientarea/'
          prefetch
          exact
          activeClass='bg-slate-100 border-blue-700 font-bold'
          inActiveClass="border-[transparent]"
          className="flex items-center border-l-[0.3rem] py-4 px-6"
        >
          <span className="inline-block w-10">
            <FontAwesomeIcon icon={faHouse} className="text-[1.5rem]" />
          </span>
          <span className="inline-block">Dashboard</span>
        </NavLink>
        <NavLink href='/clientarea/customers?page=1'
          activeClass='bg-slate-100 border-blue-700 font-bold'
          inActiveClass="border-[transparent]"
          prefetch
          className="flex items-center border-l-[0.3rem] py-4 px-6"
        >
          <span className="inline-block w-10">
            <FontAwesomeIcon icon={faAddressBook} className="text-[1.4rem]" />
          </span>
          <span className="inline-block">Customers</span>
        </NavLink>
        <NavLink href='/clientarea/credentials'
          activeClass='bg-slate-100 border-blue-700 font-bold'
          inActiveClass="border-[transparent]"
          prefetch
          extend
          className="flex items-center border-l-[0.3rem] py-4 px-6"
        >
          <span className="inline-block w-10">
            <FontAwesomeIcon icon={faBriefcase} className="text-[1.5rem]" />
          </span>
          <span className="inline-block">Credentials</span>
        </NavLink>
        <NavLink href='/clientarea/settings'
          activeClass='bg-slate-100 border-blue-700 font-bold'
          inActiveClass="border-[transparent]"
          prefetch
          extend
          className="flex items-center border-l-[0.3rem] py-4 px-6"
        >
          <span className="inline-block w-10">
            <FontAwesomeIcon icon={faGear} className="text-[1.5rem]" />
          </span>
          <span className="inline-block">Settings</span>
        </NavLink>
      </div>
      <label htmlFor="hambugger2" className="w-full h-full bg-[rgba(255,255,255,0.7)]"></label>
    </div>
  </div>;
};

export default NavLeft;
