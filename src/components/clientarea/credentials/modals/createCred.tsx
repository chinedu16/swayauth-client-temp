import { faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select';
import Modal from "@/components/modal";
import { Validator, useForm } from "@/lib/form";
import { SpinnerCircle2 } from "@/components/spinner";

const typeOptions = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Google', label: 'Google' },
  { value: 'Manual', label: 'Manual' },
  { value: 'Mail', label: 'Mail' },
  { value: 'SMS', label: 'SMS' },
]

const scopeOptions = [
  { value: 'View', label: 'View' },
  { value: 'Add', label: 'Add' },
  { value: 'Update', label: 'Update' },
  { value: 'Delete', label: 'Delete' },
]

const CreateCredModal = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {

  const { affectedKey, data, error, loading, message, handleFormChanges, handleFormSubmit } = useForm({
    schema: {
      name: new Validator().String,
      url: new Validator().isUrl('Must be a valid url').String,
      scope: new Validator().Array<'Facebook' | 'Google' | 'Manual' | 'Mail' | 'SMS'>,
      permissions: new Validator().Array<'Add' | 'Delete' | 'Update' | 'View'>,
    },
    extFormSubmit: async (values, { resetForm, setError, setLoading }) => {
    }
  })


  return <Modal isOpen={isOpen} toggle={toggle} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center p-4 w-full border-b">
          <button onClick={toggle} className="mr-3 p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1 className='text-2xl font-bold'>Create APN</h1>
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
                  name='url'
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
                  required
                  name="scope"
                  styles={{ control: (styles, state) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) }}
                  options={typeOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className='mb-5'>
              <label>Permissions</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[scopeOptions[3]]}
                  isMulti
                  name='permissions'
                  required
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) }}
                  options={scopeOptions}
                  className="basic-multi-select"
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
