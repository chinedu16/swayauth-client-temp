import NavLink from "@/lib/navLink";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Component, ReactNode } from "react";
import NavLeft from "./navLeft";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }, any> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <div>
        <nav className="sticky max-h-[4rem] z-40 bg-white top-0 shadow-sm w-full p-2 border-b flex items-center">
          <div className="md:min-w-[220px] select-none md:px-4 flex items-center">
            <label htmlFor="hambugger2" className="md:hidden inline-block px-2 mr-2 text-2xl py-1 cursor-pointer">
              <FontAwesomeIcon icon={faBars} />
            </label>
            <NavLink href='/' className='md:inline-flex items-center hidden'>
              <Image src='/logo-circle.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={400} height={400} />
              <span className="inline-block ml-2 text-xl">swayauth</span>
            </NavLink>
          </div>
          <div className="w-full md:px-6 pr-2 flex justify-end items-center">
            <span className='w-[2.5rem] border max-w-[2.5rem] h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full'>
              <Image src='/avatar-2.png' alt="" className='w-[2rem] h-[2rem] max-w-[2.5rem]' width={400} height={400} />
            </span>
          </div>
        </nav>
        <div className="flex">
          <input type="checkbox" id='hambugger2' className="hidden" />
          <div className="md:w-[calc(100%-220px)] flex items-center justify-center pb-[3rem] w-full bg-slate-100 ml-auto min-h-[calc(100svh-4rem)]">
            <div className="max-w-7xl px-5 flex flex-col pt-36 pb-20 md:py-28 justify-center items-center md:px-10 mx-auto">
              <h1 className="text-6xl font-extrabold">Error</h1>
              <h3 className="text-4xl mt-4">Ooops!</h3>
              <p className="text-center mt-1">An error just occured!</p>
              <button onClick={() => window?.location?.reload()} className="mt-6 bg-blue-700 rounded-md text-[white] px-4 py-1">Reload</button>
            </div>
          </div>
          <NavLeft />
        </div>
      </div>
    }
    return this.props.children
  }
}

export default ErrorBoundary;
