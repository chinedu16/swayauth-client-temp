import Layout from "@/components/layout";
import NavLink from "@/lib/home/navLink";
import { ReactElement } from "react";

const Plan = () => {
  return <div>
    <div className="shadow-md flex flex-wrap justify-between sm:rounded-lg bg-white mt-8 p-6">
      <div>
        <h3 className="font-bold">Current Plan: <span className="inline-block bg-blue-700 text-white px-3 rounded-md">Freemium</span></h3>
        <p className="mt-5 mb-3">Find out more about what plan works for you.</p>
        <button type='submit' className='my-2 active:bg-blue-700 flex items-center justify-center px-20 bg-blue-600 py-2 font-bold rounded-lg text-white'>
          <span>
            Upgrade
          </span>
        </button>
      </div>
      <div className="mt-6 sm:mt-0">
        <h2 className="text-3xl font-bold">$0/month</h2>
      </div>
    </div>
    <h3 className="text-xl font-bold mt-8">Billing Information</h3>
    <div className="mt-3 flex flex-wrap justify-between">
      <div className="shadow-md w-full sm:w-[49%] sm:rounded-lg bg-white mb-3 p-6">
        <h4 className="font-bold text-lg">Payment Method</h4>
        <h5 className="text-slate-700 text-sm mt-2 font-light">Card Information</h5>
        <p >Mastercard ending in 4092</p>
        <h5 className="text-slate-700 text-sm mt-2 font-light">Name on card</h5>
        <p>Tosin Fashanu</p>
      </div>
      <div className="shadow-md w-full sm:w-[49%]  sm:rounded-lg bg-white mb-3 p-6">
        <h4 className="font-bold text-lg">Billing Details</h4>
        <h5 className="text-slate-700 text-sm mt-2 font-light">Next Billing Cycle</h5>
        <p >Apr 7, 2023</p>
        <h5 className="text-slate-700 text-sm mt-2 font-light">Billing Address</h5>
        <p>75, Cresent street, USA</p>
      </div>
    </div>
  </div>;
};



Plan.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div className="py-3 md:py-6 px-4 md:px-8">
        <h3 className="text-2xl font-bold">Settings</h3>
        <div className="mt-8 flex text-center">
          <NavLink href='/clientarea/settings'
            activeClass='border-blue-700 font-bold'
            className="inline-block w-4/12 p-2 border-b-2 transition-all"
          >Account</NavLink>
          <NavLink href='/clientarea/settings/wallet'
            activeClass='border-blue-700 font-bold'
            className="inline-block w-4/12 p-2 border-b-2 transition-all"
          >Wallet</NavLink>
          <NavLink href='/clientarea/settings/plan'
            activeClass='border-blue-700 font-bold'
            className="inline-block w-4/12 p-2 border-b-2 transition-all"
          >Plan</NavLink>
        </div>
        <div className="mt-8 w-full">
          {page}
        </div>
      </div>
    </Layout>
  )
}

export default Plan;
