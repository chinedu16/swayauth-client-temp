import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./modal";
import { SpinnerCircle2 } from "./spinner";
import { ReactNode } from "react";

const AlertAction = ({ isOpen, toggle, title, message, loading, action }: { action: () => void, isOpen: boolean, loading?: boolean, toggle: () => void, title: string, message: string | ReactNode }) => {
  return <Modal isOpen={isOpen} toggle={toggle} center size="max-w-md">
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
          <button onClick={() => { if (!loading) toggle() }} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>{title}</h2>
        </div>
        <div className="p-7 text-center">
          <p>{message}</p>
        </div>
        <div className="border-t px-4 py-2 flex justify-between">
          <button onClick={toggle} disabled={loading} className="bg-slate-200 disabled:opacity-60 disabled:bg-slate-300 min-w-[5rem] border py-1 px-4 rounded-md mr-2">
            Cancel
          </button>
          <button onClick={action} disabled={loading} className="bg-blue-700 disabled:opacity-80 disabled:bg-blue-600 flex items-center justify-center text-white min-w-[5rem] border py-1 px-4 rounded-md">
            {
              loading ?
                <span className='inline-block px-4'>
                  <SpinnerCircle2 size="sm" color='white' />
                </span> :
                <span>
                  Confirm
                </span>
            }
          </button>
        </div>
      </div>
    </div>
  </Modal>
};

export default AlertAction;
