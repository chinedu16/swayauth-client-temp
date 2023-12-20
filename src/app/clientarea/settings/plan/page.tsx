"use client"

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

export default Plan;
