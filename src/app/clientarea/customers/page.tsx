"use client"
import DropDown from "@/components/dropDown";
import { SpinnerCircle2 } from "@/components/spinner";
import TableLoader from "@/components/tableLoader";
import { CONST } from "@/lib/constant";
import { normalRequest } from "@/lib/request";
import { dateShort, money } from "@/lib/utils";
import useCustomerStats from "@/store/hooks/customerStats";
import useOrganization from "@/store/hooks/organization";
import useUsers from "@/store/hooks/users";
import { faArrowDown, faArrowUp, faBan, faBolt, faChevronLeft, faChevronRight, faEllipsisV, faEye, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

let timer: any;
let pageTimer: any;
const Customer = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const { data, loading } = useCustomerStats()
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const { data: orgData, loading: orgLoading } = useOrganization()
  const { data: users, loading: usersLoading, fetchUsers } = useUsers(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') || 'id'
  const currPage = Number(searchParams.get('page') || 1)
  const size = Number(searchParams.get('size') || 10)
  const direction = searchParams.get('direction') || 'asc'

  useEffect(() => {
    fetchUsers(changeRouteQuery())
  }, [searchParams]);

  const changeRouteQuery = (...args: string[]) => {
    const params = new URLSearchParams(searchParams)
    args.forEach((key, idx, arr) => {
      if (idx % 2 == 0) {
        if (key) params.set(key, arr[idx + 1] || '')
      }
    })
    return params.toString()
  }

  const navigate = async (...args: string[]) => {
    router.push(pathname + '?' + changeRouteQuery(...args))
  }

  const changeDirection = (dir: 'prev' | 'next') => {
    if (currPage > 0) {
      if (dir == 'prev' && currPage == 1) return
      if (dir === 'next' && users?.length !== size) return
      const newPage = dir == 'next' ? currPage + 1 : currPage - 1
      navigate('page', String(newPage))
    }
  }

  const searchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    clearTimeout(timer)
    setSearchLoading(true)
    timer = setTimeout(() => {
      navigate('size', value)
      setSearchLoading(false)
    }, 1500)
  }

  const pageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPage = Number(e.target.value)
    if (newPage < 1) return
    if ((newPage > currPage) && users?.length !== size) return
    clearTimeout(pageTimer)
    pageTimer = setTimeout(() => {
      navigate('page', e.target.value || '1')
    }, 1500)
  }

  const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedUsers(p => {
      if (e.target.checked) {
        return users?.map(user => user.id) || []
      } else {
        return []
      }
    })
  }


  const checkAUser = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
    setCheckedUsers(p => {
      if (p.indexOf(id) > -1) {
        return p.filter(c => c != id)
      } else {
        return [...p, id]
      }
    })
  }

  const activateUsers = async (ids?: string[]) => {
    ids = ids || checkedUsers
    if (!ids.length) return toast.error('Please select a user')
    const res = await normalRequest(CONST.COMPANY.USERS.ACTIVATE_USERS, ids, 'put')
    toast[res.status ? 'success' : 'error'](res.message)
    if (res.status) {
      //update redux
    }
  }

  const deactivateUsers = async (ids?: string[]) => {
    ids = ids || checkedUsers
    if (!ids.length) return toast.error('Please select a user')
    const res = await normalRequest(CONST.COMPANY.USERS.ACTIVATE_USERS, ids, 'put')
    toast[res.status ? 'success' : 'error'](res.message)
    if (res.status) {
      //update redux
    }
  }

  const deleteUser = async (id: string) => {
    const res = await normalRequest(CONST.COMPANY.USERS.DELETE_USERS + `/${id}`, {}, 'delete')
    toast[res.status ? 'success' : 'error'](res.message)
    if (res.status) {
      //update redux
    }
  }

  const sortAction = (key: string) => {
    if (!users?.length || users?.length < 1) return
    let dir = 'asc'
    if (sort == key) {
      dir = direction == 'asc' ? 'desc' : 'asc'
    }
    navigate('sort', key, 'direction', dir)
  }

  return <div className="py-3 md:py-6 px-4 md:px-8">
    <h3 className="text-2xl font-bold">Customers</h3>
    <div className="flex w-full mt-7 lg:w-auto flex-wrap justify-between">
      <div className="mb-6 w-6/12 md:w-3/12 md:pr-3 pr-2">
        <div className="px-4 pt-3 pb-2 border rounded-lg bg-white shadow-md">
          <h4>Total Users</h4>
          <h2 className="text-2xl font-bold mt-1">
            {
              loading ?
                <span className="inline-block pt-[1px]"><SpinnerCircle2 size="sm" /></span> :
                money(data?.users, false)
            }
          </h2>
        </div>
      </div>
      <div className="mb-6 w-6/12 md:w-3/12 md:px-3 pl-2">
        <div className="shadow-md overflow-hidden border bg-white px-4 pt-3 pb-2 rounded-lg">
          <h4>Organizations</h4>
          <h2 className="text-2xl font-bold mt-1">
            {
              loading ?
                <span className="inline-block pt-[1px]"><SpinnerCircle2 size="sm" /></span> :
                money(data?.organizations, false)
            }
          </h2>
        </div>
      </div>
      <div className="mb-6 w-6/12 md:w-3/12 md:px-3 pr-2">
        <div className="shadow-md px-4 pt-3 pb-2 border bg-white rounded-lg">
          <h4 className="flex items-center"><span>Active</span><span className="h-[0.5rem] w-[0.5rem] rounded-full bg-green-500 inline-block ml-2"></span></h4>
          <h2 className="text-2xl font-bold mt-1">
            {
              loading ?
                <span className="inline-block pt-[1px]"><SpinnerCircle2 size="sm" /></span> :
                money(data?.active, false)
            }
          </h2>
        </div>
      </div>
      <div className="mb-6 w-6/12 md:w-3/12 md:pl-3 pl-2">
        <div className="shadow-md px-4 pt-3 pb-2 border bg-white rounded-lg">
          <h4 className="flex items-center"><span>Disabled</span><span className="h-[0.5rem] w-[0.5rem] rounded-full bg-red-600 inline-block ml-2"></span></h4>
          <h2 className="text-2xl font-bold mt-1">
            {
              loading ?
                <span className="inline-block pt-[1px]"><SpinnerCircle2 size="sm" /></span> :
                money(data?.disabled, false)
            }
          </h2>
        </div>
      </div>
    </div>
    <div className="relative shadow-md rounded-lg bg-white mt-4">
      <div className="pl-5 pr-1 py-2 text-left w-full">
        <div className="w-full flex-wrap flex justify-between items-end">
          <div className="relative items-center flex w-full md:w-7/12 lg:w-8/12">
            {
              searchLoading ?
                <span className="inline-block absolute left-[-5px]">
                  <SpinnerCircle2 />
                </span>
                : <label htmlFor="search-input" className="inline-block absolute text-slate-400">
                  <FontAwesomeIcon icon={faSearch} />
                </label>
            }
            <input onChange={searchTerm} type="text" placeholder="Search" className="pl-7 w-full py-2 outline-none border-[transparent] text-slate-700 border-b-[0.1rem] focus:border-slate-300" />
          </div>
          <div className="w-10/12 flex items-center relative md:w-3/12 mt-4 md:mt-0 lg:w-3/12">
            <select
              onChange={(e) => navigate('organization', e.target.value)}
              className='bg-white w-full focus:border-blue-700 focus:border-2 focus:outline-1 focus:ring-1 ring-offset-1 border h-[2.65rem]  px-3 rounded-md' >
              <option value="" hidden>--Select organization--</option>
              {
                orgData?.length ?
                  orgData.map((org, i) =>
                    <option key={i} value={org.id}>{org.name}</option>
                  ) : null
              }
            </select>
            {
              orgLoading == 'true' &&
              <span className="inline-block absolute right-5">
                <SpinnerCircle2 />
              </span>
            }
          </div>
          <DropDown.Container>
            <DropDown.Toggle hideCaret className="w-[2.5rem] h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full">
              <FontAwesomeIcon icon={faEllipsisV} className="text-2xl" />
            </DropDown.Toggle>
            <DropDown.Body className="inline-block right-0 top-[calc(100%+0.5rem)] min-w-[10rem] text-base font-normal">
              <ul className="py-2 text-gray-700 dark:text-gray-200 bg-black rounded-md">
                <li onClick={() => activateUsers()} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                  <FontAwesomeIcon icon={faBolt} className="w-[1rem]" />
                  <span className="ml-3">Activate</span>
                </li>
                <li onClick={() => deactivateUsers()} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                  <FontAwesomeIcon icon={faBan} className="w-[1rem]" />
                  <span className="ml-3">Deactivate</span>
                </li>
              </ul>
            </DropDown.Body>
          </DropDown.Container>
        </div>
      </div>
      <div className="overflow-x-scroll pb-3 show-scrollbar">
        <table className="w-full text-left font-normal min-h-24">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-4 py-3 w-0">
                <input onChange={checkAll} type="checkbox" name="" className="w-4 cursor-pointer h-4 md:w-5 md:h-5 mt-1" />
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                S/N
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                Image
              </th>
              <th scope="col" className="px-4 whitespace-nowrap py-3">
                <div className="flex whitespace-nowrap items-center">
                  <span className="inline-block mr-1">
                    First Name
                  </span>
                  <button data-tooltip3="sort" onClick={() => sortAction('first_name')} className="inline-flex cursor-pointer hover:bg-slate-300 rounded-full justify-center items-center text-sm w-[1.5rem] h-[1.5rem]">
                    <FontAwesomeIcon icon={direction == 'desc' && sort == 'first_name' ?
                      faArrowUp : faArrowDown} className={sort == 'first_name' ? ''
                        : 'opacity-40'} />
                  </button>
                </div>
              </th>
              <th scope="col" className="px-4 whitespace-nowrap py-3">
                <div className="flex whitespace-nowrap items-center">
                  <span className="inline-block mr-1">
                    Last Name
                  </span>
                  <button data-tooltip3="sort" onClick={() => sortAction('last_name')} className="inline-flex cursor-pointer hover:bg-slate-300 rounded-full justify-center items-center text-sm w-[1.5rem] h-[1.5rem]">
                    <FontAwesomeIcon icon={direction == 'desc' && sort == 'last_name' ?
                      faArrowUp : faArrowDown} className={sort == 'last_name' ? ''
                        : 'opacity-40'} />
                  </button>
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                <div className="flex whitespace-nowrap items-center">
                  <span className="inline-block mr-1">
                    Email
                  </span>
                  <button data-tooltip3="sort" onClick={() => sortAction('email')} className="inline-flex cursor-pointer hover:bg-slate-300 rounded-full justify-center items-center text-sm w-[1.5rem] h-[1.5rem]">
                    <FontAwesomeIcon icon={direction == 'desc' && sort == 'email' ?
                      faArrowUp : faArrowDown} className={sort == 'email' ? ''
                        : 'opacity-40'} />
                  </button>
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                Organisation
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 whitespace-nowrap py-3">
                <div className="flex whitespace-nowrap items-center">
                  <span className="inline-block mr-1">
                    Created At
                  </span>
                  <button data-tooltip3="sort" onClick={() => sortAction('id')} className="inline-flex cursor-pointer hover:bg-slate-300 rounded-full justify-center items-center text-sm w-[1.5rem] h-[1.5rem]">
                    <FontAwesomeIcon icon={direction == 'desc' && sort == 'id' ?
                      faArrowUp : faArrowDown} className={sort == 'id' ? ''
                        : 'opacity-40'} />
                  </button>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {
              usersLoading !== 'done' ?
                <TableLoader row={10} /> :
                users?.length ?
                  users?.map((item, i) =>
                    <tr key={i}>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          <input id={item.id} onChange={checkAUser} checked={checkedUsers.indexOf(item.id) > -1} type="checkbox" name="" className="w-4 cursor-pointer h-4 md:w-5 md:h-5 mt-1" />
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {((currPage * size) - size) + i + 1}.
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden inline-block object-cover">
                          <Image alt="" width={400} height={400} src={item.photo || '/avatar-2.png'} className="object-cover" />
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {item.first_name}
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {item.last_name}
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {item.email}
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {item.organization?.name}
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          <small className="inline-block px-3 bg-red-600 text-white rounded-md">Disabled</small>
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {dateShort(item.created_at)}
                        </div>
                      </td>
                      <td className="px-4 pt-2 whitespace-nowrap">
                        <div className="flex whitespace-nowrap items-center">
                          <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='view'>
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          {
                            item.status === 'active' ?
                              <button onClick={() => deactivateUsers([item.id])} className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='deactivate'>
                                <FontAwesomeIcon icon={faBan} />
                              </button> :
                              <button onClick={() => activateUsers([item.id])} className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='activate'>
                                <FontAwesomeIcon icon={faBolt} />
                              </button>
                          }
                          <button onClick={() => deleteUser(item.id)} title="delete" className="hover:bg-slate-200 px-1 rounded-full">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) :
                  <tr className="relative top-3">
                    <div className="absolute flex items-center justify-center top-0 left-0 text-center w-full">
                      <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-lg">No records found!</span>
                    </div>
                  </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex mt-3 justify-between items-center">
      <select
        onChange={(e) => navigate('size', e.target.value)}
        className='bg-white w-auto focus:border-blue-700 focus:border-2 focus:outline-1 focus:ring-1 ring-offset-1 border h-[1.9rem]  px-3 rounded-md' >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      <div>
        <button onClick={() => changeDirection('prev')}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span className="ml-1">Prev</span>
        </button>
        <input min={1} onChange={pageChange} type="number" placeholder="1" defaultValue={searchParams.get('page') || 1} className="w-10 mx-5 px-2 border border-slate-400 rounded-md [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" />
        <button onClick={() => changeDirection('next')}>
          <span className="mr-1">Next</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  </div>;
};

export default Customer;
