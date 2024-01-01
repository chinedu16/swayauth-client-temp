import CodeInput from "@/components/codeInput";
import Modal from "@/components/modal";
import { SpinnerCircle2 } from "@/components/spinner";
import Image from "next/image";

const App2factorEable = ({ isOpen, message, type = 'app', qrcode = '', toggle, handle2faVerify, onChange, loading, length = 6 }: { handle2faVerify?: () => void, message?: string, loading?: boolean, type?: 'app' | 'sms' | 'mail', isOpen: boolean, qrcode?: string, length?: number, onChange?: (v: string) => void, toggle: () => void }) => {
  return <Modal size="max-w-xl" isOpen={isOpen} toggle={toggle} center >
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center px-4 py-2 w-full border-b">
          <h2 className='text-xl pl-3 font-bold capitalize'>
            {
              type == 'app' ?
                'Scan QR Code' : `${type} Verification`
            }
          </h2>
        </div>
        <div className="px-7 pt-7 pb-6">
          {
            type == 'app' ?
              <>
                <div className="text-center">You will need a <span className='text-blue-700 inline-block font-semibold'>Google Authenticator</span> to complete this process</div>
                <div className="text-center mt-4">
                  <small>Scan the <b> QR code</b> into your app</small>
                </div>
                <div className="text-center">
                  <Image src={qrcode} alt="" width={400} height={400} className="w-[12rem] h-[12rem] max-w-[12rem] inline-block" />
                </div>
              </> : null
          }
          <div className="text-center mt-4">
            <p>Enter the 6-digit authentication code generated from your {type}:</p>
          </div>
          <div className="mt-2 text-center">
            <CodeInput loading={loading} onChange={onChange} length={length} />
          </div>
          <div className='text-red-500 min-h-[1.5rem]'>
            {
              message && <small>* {message}</small>
            }
          </div>
        </div>
        <div className="border-t px-4 py-2 flex justify-end">
          <button onClick={toggle} disabled={loading} className="bg-slate-200 disabled:opacity-60 disabled:bg-slate-300 min-w-[5rem] border py-1 px-4 rounded-md mr-2">
            Cancel
          </button>
          <button onClick={handle2faVerify} disabled={loading} className="bg-blue-700 disabled:opacity-80 disabled:bg-blue-600 flex items-center justify-center text-white min-w-[5rem] border py-1 px-4 rounded-md">
            {
              loading ?
                <span className='inline-block'>
                  <SpinnerCircle2 size="sm" color='white' />
                </span> :
                <span>
                  Verify
                </span>
            }
          </button>
        </div>
      </div>
    </div>
  </Modal>
};

export default App2factorEable;
