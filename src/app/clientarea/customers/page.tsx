"use client"
import DropDown from "@/components/dropDown";
import { money } from "@/lib/utils";
import { faBan, faBolt, faChevronLeft, faChevronRight, faEllipsisV, faEye, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const Customer = () => {
  const page = useSearchParams().get('page') || '1'
  const route = useRouter()

  const changeDirection = (direction: 'prev' | 'next') => {
    if (Number(page) > 0) {
      let nextRoute = '/clientarea/customers?page='
      nextRoute += direction === 'next' ? Number(page) + 1 : Number(page) - 1 > 0 ? Number(page) - 1 : Number(page)
      route.push(nextRoute)
    }
  }

  return <div className="py-3 md:py-6 px-4 md:px-8">
    <h3 className="text-2xl font-bold">Customers</h3>
    <div className="flex w-full mt-7 lg:w-auto flex-wrap justify-between">
      <div className="mb-6 w-6/12 md:w-3/12 md:pr-3 pr-2">
        <div className="px-4 pt-3 pb-2 border rounded-lg bg-white shadow-md">
          <h4>Total Users</h4>
          <h2 className="text-2xl font-bold mt-1">{money(320302, false)}</h2>
        </div>
      </div>
      <div className="mb-6 w-6/12 md:w-3/12 md:px-3 pl-2">
        <div className="shadow-md overflow-hidden border bg-white px-4 pt-3 pb-2 rounded-lg">
          <h4>Organizations</h4>
          <h2 className="text-2xl font-bold mt-1">{money(4, false)}</h2>
        </div>
      </div>
      <div className="mb-6 w-6/12 md:w-3/12 md:px-3 pr-2">
        <div className="shadow-md px-4 pt-3 pb-2 border bg-white rounded-lg">
          <h4 className="flex items-center"><span>Active</span><span className="h-[0.5rem] w-[0.5rem] rounded-full bg-green-500 inline-block ml-2"></span></h4>
          <h2 className="text-2xl font-bold mt-1">{money(320000, false)}</h2>
        </div>
      </div>
      <div className="mb-6 w-6/12 md:w-3/12 md:pl-3 pl-2">
        <div className="shadow-md px-4 pt-3 pb-2 border bg-white rounded-lg">
          <h4 className="flex items-center"><span>Disabled</span><span className="h-[0.5rem] w-[0.5rem] rounded-full bg-red-600 inline-block ml-2"></span></h4>
          <h2 className="text-2xl font-bold mt-1">{money(20, false)}</h2>
        </div>
      </div>
    </div>
    <div className="relative shadow-md rounded-lg bg-white mt-4">
      <div className="pl-5 pr-1 py-2 text-left w-full">
        <div className="w-full flex justify-between items-end">
          <div className="relative items-center mr-[10%] flex w-full">
            <label htmlFor="search-input" className="inline-block absolute text-slate-400">
              <FontAwesomeIcon icon={faSearch} />
            </label>
            <input id='search-input' type="text" placeholder="Search" className="pl-7 w-full py-2 outline-none border-[transparent] text-slate-700 border-b-[0.1rem] focus:border-slate-300" />
          </div>
          <DropDown.Container>
            <DropDown.Toggle hideCaret className="w-[2.5rem] h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full">
              <FontAwesomeIcon icon={faEllipsisV} className="text-2xl" />
            </DropDown.Toggle>
            <DropDown.Body className="inline-block right-0 top-[calc(100%+0.5rem)] min-w-[10rem] text-base font-normal">
              <ul className="py-2 text-gray-700 dark:text-gray-200 bg-black rounded-md">
                <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                  <FontAwesomeIcon icon={faBolt} className="w-[1rem]" />
                  <span className="ml-3">Activate</span>
                </li>
                <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                  <FontAwesomeIcon icon={faBan} className="w-[1rem]" />
                  <span className="ml-3">Deactivate</span>
                </li>
                <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                  <FontAwesomeIcon icon={faTrash} className="w-[1rem]" />
                  <span className="ml-3">Delete</span>
                </li>
              </ul>
            </DropDown.Body>
          </DropDown.Container>
        </div>
      </div>
      <div className="overflow-x-scroll pb-3 show-scrollbar">
        <table className="w-full text-left font-normal">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-4 py-3 w-0">
                <input type="checkbox" name="" className="w-4 h-4 md:w-5 md:h-5 mt-1" />
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                S/N
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                Image
              </th>
              <th scope="col" className="px-4 whitespace-nowrap py-3">
                First Name
              </th>
              <th scope="col" className="px-4 whitespace-nowrap py-3">
                Last Name
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Organisation
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 whitespace-nowrap py-3">
                Created At
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Array(5).fill(0).map((_, i) =>
                <tr key={i}>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      <input type="checkbox" name="" className="w-4 h-4 md:w-5 md:h-5 mt-1" />
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      {i + 1}.
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden inline-block object-cover">
                      <Image alt="" width={1742} height={2196} src='/avatar.jpg' className="object-cover" />
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      Tosin
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      Fashanu
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      fashanutosin7@gmail.com
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      Swayauth
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      <small className="inline-block px-3 bg-red-600 text-white rounded-md">Disabled</small>
                    </div>
                  </td>
                  <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                    <div className="whitespace-nowrap">
                      Oct 23, 2023
                    </div>
                  </td>
                  <td className="px-4 pt-2 whitespace-nowrap">
                    <div className="flex whitespace-nowrap items-center">
                      <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='view'>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='activate'>
                        <FontAwesomeIcon icon={faBolt} />
                      </button>
                      <button title="delete" className="hover:bg-slate-200 px-1 rounded-full">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            }
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

export default Customer;
