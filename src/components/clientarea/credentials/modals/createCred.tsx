import { faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { MultiValue } from 'react-select';
import Modal from "@/components/modal";
import { Validator, useForm } from "@/lib/form";
import { SpinnerCircle2 } from "@/components/spinner";
import { useState } from "react";

const typeOptions = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google' },
  { value: 'manual', label: 'Manual' },
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
]

const scopeOptions = [
  { value: 'read', label: 'Read' },
  { value: 'create', label: 'Create' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
]

const CreateCredModal = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {

  const [manual, setManual] = useState(false);

  const { affectedKey, data, error, loading, message, handleFormChanges, handleFormSubmit } = useForm({
    schema: {
      name: new Validator().String,
      redirect_url: new Validator().isUrl('Must be a valid url').String,
      scope: new Validator().Array<'Facebook' | 'Google' | 'Manual' | 'Email' | 'SMS'>,
      permissions: new Validator().Array<'Add' | 'Delete' | 'Update' | 'View'>,
    },
    extendSubmit: async (values, { resetForm, setError, setLoading }) => {
    }
  })

  const handleScopeChanges = (e: MultiValue<{
    value: string;
    label: string;
  }>) => {
    setManual(e.findIndex(s => s.label === 'Manual') > -1 ? true : false)
  }

  return <Modal isOpen={isOpen} toggle={toggle} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center p-4 w-full border-b">
          <button onClick={toggle} className="mr-3 p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1 className='text-2xl font-bold'>Create Token</h1>
        </div>
        <div className="p-7">
          <form onChange={handleFormChanges} onSubmit={handleFormSubmit}>
            <div className='mb-4'>
              <label>Name</label>
              <div className='mt-1'>
                <input autoFocus autoComplete="name"
                  required
                  name='name'
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g SwayAuth Facebook Auth' />
              </div>
            </div>
            <div className='mb-4'>
              <label data-tooltip2={`Facebook & Google scope ONLY!`} >Redirect Url
                <span className="inline-block ml-1">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>
              </label>
              <div className='mt-1'>
                <input type="url" autoComplete="url"
                  required
                  name='redirect_url'
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g https://swayauth.com/verify-login' />
              </div>
            </div>
            <div className='mb-4'>
              <label>Scope</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[typeOptions[0], typeOptions[1]]}
                  isMulti
                  onChange={handleScopeChanges}
                  required
                  name="scope"
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any}}
                  options={typeOptions}
                  classNamePrefix="select"
                />
              </div>
            </div>
            {
              manual ?
                <div >
                  <div className="mb-4 flex items-center flex-wrap justify-between">
                    <div className="w-6/12 mt-1">
                      <label className="relative flex justify-between items-center cursor-pointer">
                        <span className="me-3 text-gray-600">Two-Factor Authentication</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                    </div>
                    <div className="w-4/12 mt-1">
                      <select name="2factor" required className='w-full focus:outline-1 focus:outline-blue-700 focus:ring-2 border py-2 px-3 rounded-md'>
                        <option value="app">Authenticator App</option>
                        <option value="sms">SMS Token</option>
                        <option value="email">Email Token</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center flex-wrap justify-between">
                    <div className="w-6/12 mt-1">
                      <label className="relative flex justify-between items-center cursor-pointer">
                        <span className="me-3 text-gray-600">Verify Registeration</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                    </div>
                    <div className="w-4/12 mt-1">
                      <select name="2factor" required className='w-full focus:outline-1 focus:outline-blue-700 focus:ring-2 border py-2 px-3 rounded-md'>
                        <option value="email">Email {data.redirect_url ? 'Link' : 'Token'}</option>
                        <option value="sms">SMS Token</option>
                      </select>
                    </div>
                  </div>
                </div> : null
            }
            <div className='mb-5'>
              <label>Permissions</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[scopeOptions[3]]}
                  isMulti
                  name='permissions'
                  required
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any }}
                  options={scopeOptions}
                  classNamePrefix="select"
                />
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
  </Modal>;
};

export default CreateCredModal;
