import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return <div className="py-10">
    <h1 className="text-3xl font-bold text-blue-700 mb-3">Blog</h1>
    <p className="">SUbscribe to our newsletters</p>
    <div className="flex mt-6">
      <form className="w-full flex items-center md:w-6/12">
        <input type="text" placeholder="Enter email" className=" mr-3 md:min-w-[20rem]
        focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700
        border px-5 py-2 border-slate-300 rounded-sm shadow-sm placeholder-slate-400
        "/>
        <button type="submit" className="px-4 rounded-sm text-white hover:bg-blue-800 py-[0.62rem] bg-blue-700">Subscribe</button>
      </form>
    </div>
    <p className="mt-3">You can unsibscribe at anytime.</p>

  </div>;
};

export default Header;
