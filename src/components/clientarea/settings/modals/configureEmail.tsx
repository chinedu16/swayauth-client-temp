import Modal from "@/components/modal";
import { SpinnerCircle2 } from "@/components/spinner";
import { Validator, useForm } from "@/lib/form";
import { cropString } from "@/lib/utils";
import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ConfigureEmail = ({ isOpen, toggle, title }: { isOpen: boolean, toggle: () => void, title: string }) => {
  const [modal, setModal] = useState(false);
  const { affectedKey, data, error, loading, message, handleFormChanges, handleFormSubmit } = useForm({
    schema: {
      domain: new Validator().String,
      name: new Validator().String,
      email: new Validator().isEmail('Must be a valid url').String,
    },
    extendSubmit: async (values, { resetForm, setError, setLoading }) => {
      toggleModal();
    }
  })

  const toggleModal = () => setModal(!modal);

  return <Modal isOpen={isOpen} toggle={toggle} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center p-4 w-full border-b">
          <button onClick={toggle} className="mr-3 p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1 className='text-2xl font-bold'>{title}</h1>
        </div>
        <div className="p-7">
          <form onChange={handleFormChanges} onSubmit={handleFormSubmit}>
            <div className='mb-4 flex justify-between'>
              <div className="w-[49%]">
                <label>Domain</label>
                <div className='mt-1'>
                  <input autoFocus autoComplete="domain"
                    required
                    name='domain'
                    className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                    placeholder='e.g swayauth.com' />
                </div>
              </div>
              <div className="w-[49%]">
                <label>Company Name</label>
                <div className='mt-1'>
                  <input autoFocus autoComplete="name"
                    required
                    name='name'
                    className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                    placeholder='e.g SwayAuth' />
                </div>
              </div>
            </div>
            <div className='mb-5'>
              <label >Email Address</label>
              <div className='mt-1'>
                <input
                  autoComplete="email"
                  required
                  name='email'
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g no-reply@swayauth.com' />
              </div>
            </div>
            <div className='mb-4'>
              <button type='submit' className='my-2 active:bg-blue-700 flex items-center justify-center w-full bg-blue-600 py-3 rounded-lg text-white'>
                {
                  loading ?
                    <span className='inline-block'>
                      <SpinnerCircle2 color='white' />
                    </span> :
                    <span>
                      Save
                    </span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Modal isOpen={modal} toggle={toggleModal} center>
      <div className="mx-auto transition w-full items-center justify-center flex" >
        <div className="bg-white rounded-md w-full">
          <div className="flex items-center p-4 w-full border-b">
            <button onClick={toggleModal} className="mr-3 p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h1 className='text-2xl font-bold'>TXT Record</h1>
          </div>
          <div className="p-7">
            To verify domain ownership, and start sending email to your customers, you will need to add the value below as TXT Record in your DNS settings.
            <div className="mt-4 flex justify-between border py-2 px-3 rounded-md border-gray-300">
              <span>
                {cropString('9ede9e98ge98g9-dg9e8g89e89ghed9g8e-ege7g9gge9ge', 30)}
              </span>
              <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </Modal>;
};

export default ConfigureEmail;
