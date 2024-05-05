import { handleForgotPasswordForm } from "@/lib/server/form";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Input from "../input";
import Modal from "../modal";
import FormButton from "./button";
import Success from "./success";

const ForgotPassword = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [state, formAction] = useFormState(handleForgotPasswordForm, { status: false, message: '', data: null })

  useEffect(() => {
    if (state.data) {
      setSuccessOpen(true);
    }
  }, [state]);

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    toggle()
  }

  return <Modal size="max-w-xl" isOpen={isOpen} toggle={() => !loading && toggle()} center >
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex justify-between items-center px-4 py-2 w-full border-b">
          <h2 className='text-xl pl-3 font-bold'>Forgot Password</h2>
          <button onClick={() => !loading && toggle()} className="px-3 py-1"><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <form action={formAction} className="px-7 py-5">
          <p className="text-center">Remember your password? <button type='button' onClick={toggle} className="text-blue-700">Login</button></p>
          <div className='mt-4 mb-6'>
            <label>Email</label>
            <div className='mt-1'>
              <Input
                autoFocus
                type="email"
                required
                disabled={loading}
                name='email'
                placeholder='e.g johndoe@email.com'
                autoComplete="email"
              />
            </div>
            <div className='text-red-500 min-h-[0.7rem]'>
              {
                message && !loading && <small>* {message}</small>
              }
            </div>
          </div>
          <div onClick={() => setMessage('')} >
            <FormButton loadAction={(v) => setLoading(v)} title='Reset Password' />
          </div>
        </form>
      </div>
    </div>
    <Success
      type='request'
      link="reset"
      button={<button onClick={handleSuccessClose} className="bg-blue-700 inline-block text-white py-2 px-6 mt-4 rounded-md">Login</button>}
      isOpen={successOpen} />
  </Modal>
};

export default ForgotPassword;
