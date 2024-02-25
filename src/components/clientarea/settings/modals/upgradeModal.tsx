import Modal from "@/components/modal";
import Select from "@/components/select";
import { SpinnerCircle2 } from "@/components/spinner";
import { CONST } from "@/lib/constant";
import { FormData } from "@/lib/form";
import Link from "@/lib/link";
import { normalRequest } from "@/lib/request";
import useSubscription from "@/store/hooks/subscription";
import useWallet from "@/store/hooks/wallet";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpgradeSubscriptionModal = ({ isOpen, toggle, }: { isOpen: boolean, toggle: () => void }) => {
  const [payOption, setPayOption] = useState({ open: false, option: '' });
  const { fetchSubscription } = useSubscription(false)
  const { fetchWallet } = useWallet(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (window.localStorage.getItem('reloadWallet') == 'true') {
        setTimeout(() => {
          fetchSubscription()
        }, 2000)
        window.localStorage.removeItem('reloadWallet');
      }
    });
  }, []);

  const toggleOption = (opt?: 'standard' | 'premium') => {
    if (loading) return
    setPayOption(p => ({ open: !p.open, option: opt || p.option }))
  }

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['payWith', 'plan'])
    if (!payOption.option) return toggleOption()
    data.plan = payOption.option
    setLoading(true);
    const res = await normalRequest(CONST.COMPANY.SUBSCRIPTION.UPGRADE, data);
    setLoading(false);
    if (res.status) {
      if (data.payWith == 'paystack') {
        let windowProperties = 'resizable=yes,'
        if (window.outerWidth > 650) {
          let left = (screen.width - 600) / 2;
          let top = (screen.height - 700) / 2;
          windowProperties += `resizable=yes,width=600,height=700,top=${top},left=${left}`
        } else {
          windowProperties += 'fullscreen=yes'
        }
        window.open(window.location.origin + `/payment?url=${res.data.authorization_url}`, 'Swayauth Payment', windowProperties)
      }
      toggleOption()
      toggle()
      setTimeout(() => {
        fetchSubscription()
        if (data.payWith == 'wallet') {
          fetchWallet();
        }
      }, 1000)
    } else {
      toggleOption()
      toast.error(res.message as string)
    }
  }

  return <Modal isOpen={isOpen} toggle={toggle} center size="max-w-2xl">
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center p-4 w-full border-b">
          <button onClick={toggle} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>Upgrade Subscription</h2>
        </div>
        <div className="px-7 p-10 bg-gray-50">
          <div className="flex justify-between">
            <div className="w-[47%] flex flex-col justify-between p-5 rounded-2xl bg-white shadow-lg">
              <div>
                <h4 className="font-bold text-xl">Standard</h4>
                <div className="mt-3">
                  <span className="inline-block font-bold text-3xl">₦10,000</span>
                  <span className="inline-block ml-1 text-sm">
                    / Per Month
                  </span>
                </div>
                <p className="text-gray-600 mt-3">
                  The Standard subscription includes all of the features of the Free
                  subscription, plus...
                </p>
                <Link href='/pricing' className="text-blue-700 underline underline-offset-2">Read more...</Link>
              </div>
              <div className="pt-6">
                <button onClick={() => toggleOption('standard')} className="block text-center w-full rounded-lg py-3 bg-blue-700 text-white">
                  Pay
                </button>
              </div>
            </div>
            <div className="w-[47%] flex flex-col justify-between p-5 rounded-2xl bg-white shadow-lg">
              <div>
                <h4 className="font-bold text-xl">Premium</h4>
                <div className="mt-3">
                  <span className="inline-block font-bold text-3xl">₦30,000</span>
                  <span className="inline-block ml-1 text-sm">
                    / Per Month
                  </span>
                </div>
                <p className="text-gray-600 mt-3">
                  The Premium subscription includes all of the features
                  of the Standard subscription, plus...
                </p>
                <Link href='/pricing' className="text-blue-700 underline underline-offset-2">Read more...</Link>
              </div>
              <div className="pt-6">
                <button onClick={() => toggleOption('premium')} className="block text-center w-full rounded-lg py-3 bg-blue-700 text-white">
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={payOption.open} toggle={toggleOption} center size="max-w-sm">
      <div className="mx-auto transition w-full items-center justify-center flex" >
        <div className="bg-white rounded-md w-full">
          <div className="flex items-center p-4 w-full border-b">
            <button onClick={() => toggleOption()} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className='text-xl pl-3 font-bold'>Payment Option</h2>
          </div>
          <div className="px-7 p-10 bg-gray-50">
            <form onSubmit={handlePayment}>
              <Select disabled={loading} name="payWith">
                <option value="wallet">Wallet</option>
                <option value="card">Saved Card</option>
                <option value="paystack">Paystack</option>
              </Select>
              <button disabled={loading} type="submit" className="mt-5 flex items-center justify-center text-center w-full rounded-lg py-3 bg-blue-700 text-white">
                {loading ? <span className="inline-block"><SpinnerCircle2 color='white' /></span> : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  </Modal>
};


export default UpgradeSubscriptionModal