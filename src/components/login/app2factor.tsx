import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../modal";
import CodeInput from "../codeInput";
import { SpinnerCircle2 } from "../spinner";

const App2factor = ({ isOpen, message, toggle, handle2faVerify, onChange, loading, length = 6 }: { handle2faVerify?: () => void, message?: string, loading?: boolean, isOpen: boolean, length?: number, onChange?: (v: string) => void, toggle: () => void }) => {
  return <Modal size="xl" isOpen={isOpen} toggle={toggle} className="pt-[15%]" >
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center px-4 py-2 w-full border-b">
          <button onClick={toggle} className="mr-3 p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl font-bold'>Two-Factor Authentication</h2>
        </div>
        <div className="px-7 pt-7 pb-6">
          <div>Verification Code</div>
          <div className="mt-4">
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

export default App2factor;
