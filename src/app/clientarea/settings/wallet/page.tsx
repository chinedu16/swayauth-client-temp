"use client"
import { money } from "@/lib/utils";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";

const Wallet = () => {
  const page = useSearchParams().get('page') || '1'
  const route = useRouter()

  const changeDirection = (direction: 'prev' | 'next') => {
    if (Number(page) > 0) {
      let nextRoute = '/clientarea/customers?page='
      nextRoute += direction === 'next' ? Number(page) + 1 : Number(page) - 1 > 0 ? Number(page) - 1 : Number(page)
      route.push(nextRoute)
    }
  }
  return <div>
    <div className="mt-8 flex flex-wrap justify-between items-stretch">
      <div className="w-full mb-8 xl:mb-0 xl:w-[40%] h-full shadow-md bg-blue-700 text-white p-6 rounded-md">
        <h4 className="text-slate-300">Total Balance</h4>
        <h1 className="text-4xl mt-4 mb-6">
          {money(467280)}
        </h1>
        <div className="flex flex-wrap justify-between">
          <span className="inline-block mr-4">Oct 9, 2023</span>
          <button className="py-1 px-6 text-sm rounded-full text-blue-700 bg-white">Add Funds</button>
        </div>
      </div>
      <div className="w-full mb-8 sm:mb-0 sm:w-[48%] xl:w-[30%] xl:pl-6">
        <div className="shadow-md bg-white h-full p-6 rounded-md">
          <h4 className="font-bold mb-10 flex justify-between">
            <span>John Fash</span>
            <button className="text-red-700"><FontAwesomeIcon icon={faXmark} /></button>
          </h4>
          <h4>2688 379373 393979 3937</h4>
          <div className="flex justify-between">
            <span className="inline-block">09/23</span>
            <span className="inline-block">Master Card</span>
          </div>
        </div>
      </div>
      <div className="w-full mb-8 sm:mb-0 sm:w-[48%] xl:w-[30%] xl:pl-6">
        <div className="shadow-md bg-white h-full p-6 rounded-md">
          <h4 className="font-bold mb-10 flex justify-between">
            <span>John Fashanu</span>
            <button className="text-red-700"><FontAwesomeIcon icon={faXmark} /></button>
          </h4>
          <h4>2688 379373 393979 3937</h4>
          <div className="flex justify-between">
            <span className="inline-block">09/23</span>
            <span className="inline-block">Visa Card</span>
          </div>
        </div>
      </div>
    </div>

    <div className="relative shadow-md pb-2 rounded-lg bg-white mt-8">
      <div className="p-5 text-lg font-semibold text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-xl">
            Transaction History
          </h4>
        </div>
      </div>
      <div className="overflow-x-auto show-scrollbar">
        <table className="w-full text-left font-normal">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3 w-0">
                S/N
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody >
            <tr >
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  1.
                </div>
              </td>
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Account Renewal
                </div>
              </td>
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <small className="bg-green-600 text-white px-3 py-1 rounded-md">Completed</small>
              </td>
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-6 pt-4 whitespace-nowrap">
                {money(49489)}
              </td>
            </tr>
            <tr >
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  2.
                </div>
              </td>
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Account Credited
                </div>
              </td>
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <small className="bg-red-700 text-white px-3 py-1 rounded-md">Failed</small>
              </td>
              <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-6 pt-4 whitespace-nowrap">
                {money(49489)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex mt-3 justify-end items-center">
      <button onClick={() => changeDirection('prev')}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <span className="ml-1">Prev</span>
      </button>
      <input type="number" placeholder="1" defaultValue={page} className="w-10 mx-5 px-2 border border-slate-400 rounded-md [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" />
      <button onClick={() => changeDirection('next')}>
        <span className="mr-1">Next</span>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  </div>;
};

export default Wallet;
