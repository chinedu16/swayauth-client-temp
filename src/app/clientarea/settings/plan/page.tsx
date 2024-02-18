"use client"

import UpgradeSubscriptionModal from "@/components/clientarea/settings/modals/upgradeModal";
import { SpinnerCircle2 } from "@/components/spinner";
import Link from "@/lib/link";
import { dateLong, money } from "@/lib/utils";
import useAccount from "@/store/hooks/account";
import useCards from "@/store/hooks/cards";
import useSubscription from "@/store/hooks/subscription";
import useWallet from "@/store/hooks/wallet";
import { useEffect, useState } from "react";

const Plan = () => {
  const [isClient, setIsClient] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: accountData } = useAccount()
  const { data: walletData, loading: walletLoading, } = useWallet();
  const { data: cards, loading: cardsLoading } = useCards();
  const { data, loading: subLoading, updateScription } = useSubscription()
  useEffect(() => {
    setIsClient(true)
  }, []);

  const toggleUpgradeModal = () => setUpgradeModal(!upgradeModal)

  return <div>
    <div className="shadow-md flex flex-wrap justify-between sm:rounded-lg bg-white mt-8 p-6">
      <div>
        <h3 className="font-bold flex items-center">Current Plan: <span className="ml-2 inline-flex items-center bg-blue-700 text-white px-3 capitalize rounded-md">
          {isClient && !subLoading ? data?.subscription : <span className="inline-block"><SpinnerCircle2 color='white' /></span>}
        </span>
        </h3>
        <p className="mt-5 mb-3"><Link className="text-blue-700 underline" href='/pricing'>Find out more</Link> about what plan works for you.</p>
        <button onClick={toggleUpgradeModal} type='button' className='my-2 active:bg-blue-700 flex items-center justify-center px-20 bg-blue-600 py-2 font-bold rounded-lg text-white'>
          <span>
            Upgrade
          </span>
        </button>
      </div>
      <div className="mt-6 sm:mt-0">
        <h2 className="text-3xl font-bold">₦{isClient && !subLoading && data?.amount}/month</h2>
      </div>
    </div>
    <h3 className="text-xl font-bold mt-8">Billing Information</h3>
    <div className="mt-3 flex flex-wrap justify-between">
      <div className="shadow-md w-full sm:w-[49%] sm:rounded-lg bg-white mb-3 p-6">
        <h4 className="font-bold text-lg">Payment Method</h4>
        <h5 className="text-slate-700 text-sm mt-2 font-light">
          {isClient && !cardsLoading && !walletLoading ?
            (walletData?.amount ?
              'Wallet Balance' : cards?.length ? 'Card Information' : 'N/A') :
            <span className="inline-block"><SpinnerCircle2 /></span>
          }
        </h5>
        <p>
          {
            isClient && !cardsLoading && !walletLoading ?
              (walletData?.amount ?
                money(walletData.amount) :
                cards?.length ?
                  cards?.[0]?.card_type + ' ending with ' + cards?.[0]?.last_4digit : 'N/A')
              :
              <span className="inline-block"><SpinnerCircle2 /></span>
          }
        </p>
        <h5 className="text-slate-700 text-sm mt-2 font-light">
          {
            isClient && !cardsLoading && !walletLoading ?
              (walletData?.amount ?
                'Company Name' :
                cards?.length ?
                  'Name on card' : 'N/A')
              :
              <span className="inline-block"><SpinnerCircle2 /></span>
          }
        </h5>
        <p>
          {
            isClient && !cardsLoading && !walletLoading ?
              (walletData?.amount ?
                accountData?.company?.name :
                cards?.length ?
                  cards?.[0]?.account_name : 'N/A')
              :
              <span className="inline-block"><SpinnerCircle2 /></span>
          }
        </p>
      </div>
      <div className="shadow-md w-full sm:w-[49%]  sm:rounded-lg bg-white mb-3 p-6">
        <h4 className="font-bold text-lg">Billing Details</h4>
        <h5 className="text-slate-700 text-sm mt-2 font-light">Last Billing Cycle</h5>
        <p >{isClient && !cardsLoading && !walletLoading ? dateLong(data?.created_at) : <span className="inline-block"><SpinnerCircle2 /></span>}</p>
        <h5 className="text-slate-700 text-sm mt-2 font-light">Next Billing Cycle</h5>
        <p >{isClient && !cardsLoading && !walletLoading && data?.created_at ?
          dateLong(new Date(new Date(data?.created_at as string)?.getTime() +
            (1000 * 60 * 60 * 24 * 30))?.toISOString()) :
          <span className="inline-block"><SpinnerCircle2 /></span>}</p>
      </div>
    </div>
    <UpgradeSubscriptionModal isOpen={upgradeModal} toggle={toggleUpgradeModal} />
  </div>;
};

export default Plan;
