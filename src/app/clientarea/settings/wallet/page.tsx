"use client"
import Input from "@/components/input";
import Modal from "@/components/modal";
import { SpinnerCircle2 } from "@/components/spinner";
import TableLoader from "@/components/tableLoader";
import { CONST } from "@/lib/constant";
import { FormData } from "@/lib/form";
import { normalRequest } from "@/lib/request";
import { dateShort, money } from "@/lib/utils";
import useAccount from "@/store/hooks/account";
import useCards from "@/store/hooks/cards";
import useTransactions from "@/store/hooks/transactions";
import useWallet from "@/store/hooks/wallet";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

let pageTimer: any;
const Wallet = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [fundModal, setFundModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: account, updateClientProfile } = useAccount(false)
  const { data: walletData, loading: walletLoading, fetchWallet } = useWallet();
  const { data: cards, loading: cardsLoading } = useCards();
  const searchParams = useSearchParams()
  const { data: transactions, loading: transationLoading, fetchTransactions } = useTransactions()

  useEffect(() => {
    fetchTransactions(changeRouteQuery())
  }, [searchParams]);

  const toggleFundModal = () => setFundModal(!fundModal)

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

  const pageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currPage = Number(searchParams.get('page') || 1)
    const size = Number(searchParams.get('size') || 10)
    const newPage = Number(e.target.value)
    if (newPage < 1) return
    if ((newPage > currPage) && transactions?.length !== size) return
    clearTimeout(pageTimer)
    pageTimer = setTimeout(() => {
      navigate('page', e.target.value || '1')
    }, 1500)
  }

  const changeDirection = (dir: 'prev' | 'next') => {
    const currPage = Number(searchParams.get('page') || 1)
    const size = Number(searchParams.get('size') || 10)
    if (currPage > 0) {
      if (dir == 'prev' && currPage == 1) return
      if (dir === 'next' && transactions?.length !== size) return
      const newPage = dir == 'next' ? currPage + 1 : currPage - 1
      navigate('page', String(newPage))
    }
  }

  const changeSaveCardStatus = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    updateClientProfile({ company: { save_cards: checked } })
    setLoading(true)
    const res = await normalRequest(CONST.COMPANY.CARD.SAVE_CARDS + String(checked), {}, 'put')
    setLoading(false)
    if (!res.status) {
      toast.error(res.message)
      updateClientProfile({ company: { save_cards: !checked } })
    } else {
      toast.success(res.message)
    }
  }

  const initPayment = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['amount'])
    setLoading(true)
    const res = await normalRequest<{ authorization_url?: string }>(CONST.COMPANY.WALLET.FUND_WALLET, data);
    toggleFundModal()
    if (res.status && res.data?.authorization_url) {
      const newTab = window?.open(res.data.authorization_url, '_blank');
      newTab?.addEventListener('unload', () => handleCloseEvent(newTab));
    } else {
      toast.error(res.message)
    }
    setLoading(false);
  }

  const handleCloseEvent = (e: Window | null) => {
    setTimeout(() => {
      fetchWallet();
    }, 10000)
    e?.removeEventListener('unload', () => null);
  }

  return <div>
    <div className="mt-8 flex flex-wrap items-stretch">
      <div className="w-full mb-8 xl:mb-0 xl:w-[40%] h-full shadow-md bg-blue-700 text-white p-6 rounded-md">
        <h4 className="text-slate-300">Total Balance</h4>
        <h1 className="text-4xl mt-4 mb-6">
          {
            walletLoading ?
              <div className="py-[2px]"><SpinnerCircle2 color="white" size="md" /></div>
              :
              money(walletData?.amount)
          }
        </h1>
        <div className="flex flex-wrap justify-between">
          <span className="inline-block mr-4">{dateShort()}</span>
          <button onClick={toggleFundModal} className="py-1 px-6 text-sm rounded-full text-blue-700 bg-white">Add Funds</button>
        </div>
      </div>
      {
        cardsLoading ?
          <div className="w-full mb-8 sm:mb-0 sm:w-[48%] xl:w-[30%] xl:pl-6">
            <div className="shadow-md bg-white h-full p-6 rounded-md">
              <h4 className="font-bold mb-10 flex justify-between">
                <span className="inline-block animate-pulse bg-slate-200 h-5 rounded-2xl w-28"></span>
                <span className="inline-block animate-pulse bg-slate-200 h-5 rounded-full w-5"></span>
              </h4>
              <h4 className="animate-pulse bg-slate-200 h-5 rounded-2xl w-full mb-2"></h4>
              <div className="flex justify-between">
                <span className="inline-block animate-pulse bg-slate-200 h-5 rounded-2xl w-12"></span>
                <span className="inline-block animate-pulse bg-slate-200 h-5 rounded-2xl w-16"></span>
              </div>
            </div>
          </div> :
          cards?.length ?
            cards?.map((item, i) =>
              <div key={i} className="w-full mb-8 sm:mb-0 sm:w-[48%] xl:w-[30%] xl:pl-6">
                <div className="shadow-md bg-white h-full p-6 rounded-md">
                  <h4 className="font-bold mb-10 flex justify-between">
                    <span>{item.account_name}</span>
                    <button className="text-red-700"><FontAwesomeIcon icon={faXmark} /></button>
                  </h4>
                  <h4>{item.first_6digit} XXXX {item.last_4digit}</h4>
                  <div className="flex justify-between">
                    <span className="inline-block">{item.exp_month}/{item.exp_year}</span>
                    <span className="inline-block capitalize">{item.card_type}</span>
                  </div>
                </div>
              </div>
            ) : null
      }
    </div>

    <div className="relative shadow-md rounded-lg bg-white mt-8">
      <div className="px-6 py-5  w-full">
        <h4 className="text-lg sm:text-xl font-semibold">
          Wallet Setup
        </h4>
      </div>
      <div className="px-6 pt-2 pb-5 justify-between w-full flex items-center">
        <div className="pr-10">
          Allow credit card detail to be saved and used for subsequent transactions on this account?
        </div>
        <label className="relative whitespace-nowrap inline-flex items-center cursor-pointer">
          <input onChange={changeSaveCardStatus}
            disabled={loading}
            checked={account?.company?.save_cards}
            type="checkbox" className="sr-only peer" />
          <div className={`w-11 h-6 bg-gray-200 ${loading ? 'opacity-40' : ''} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
        </label>
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
      <div className="overflow-x-auto pb-3 show-scrollbar">
        <table className="w-full text-left font-normal min-h-24">
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
            {
              transationLoading != 'done' ?
                <TableLoader row={10} /> :
                transactions?.length ?
                  transactions?.map((item, i) =>
                    <tr key={i} >
                      <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {i + 1}.
                        </div>
                      </td>
                      <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {item?.purpose}
                        </div>
                      </td>
                      <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                        <small className="bg-green-600 text-white px-3 py-1 rounded-md">{item.status}</small>
                      </td>
                      <td scope="row" className="px-6 pt-4 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {dateShort(item.created_at)}
                        </div>
                      </td>
                      <td className="px-6 pt-4 whitespace-nowrap">
                        {money(item.amount)}
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
    <Modal isOpen={fundModal} toggle={toggleFundModal} center size="max-w-sm">
      <div className="mx-auto transition w-full items-center justify-center flex" >
        <div className="bg-white rounded-md w-full">
          <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
            <button onClick={() => { if (!loading) toggleFundModal() }} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className='text-xl pl-3 font-bold'>Top Up</h2>
          </div>
          <div className="p-7">
            <form onSubmit={initPayment}>
              <input
                type="number"
                required
                disabled={loading}
                min={100}
                autoFocus
                name='amount'
                className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                placeholder='₦1000' />
              <div className="mt-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="text-white w-full mt-4 inline-flex justify-center items-center bg-blue-600 active:[&:not(:disabled)]:bg-blue-700 disabled:bg-blue-500 py-2 rounded-md">
                  {
                    loading ?
                      <span className='inline-block py-[0.5px]'>
                        <SpinnerCircle2 size="sm" color='white' />
                      </span> :
                      <span className="inline-block">Continue</span>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  </div>;
};

export default Wallet;
