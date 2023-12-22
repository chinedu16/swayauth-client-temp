import Modal from "@/components/modal";
import { SpinnerCircle2 } from "@/components/spinner";
import { Validator, useForm } from "@/lib/form";
import { fileToBase64 } from "@/lib/media";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import Select from 'react-select';

const scopeOptions = [
  { value: 'View', label: 'View' },
  { value: 'Update', label: 'Update' },
  { value: 'Add', label: 'Add' },
  { value: 'Delete', label: 'Delete' },
]

const AddTeam = ({ isOpen, toggle, title }: { isOpen: boolean, toggle: () => void, title: string }) => {
  const [bioLength, setBioLength] = useState(0);
  const [image, setImage] = useState('');
  const { affectedKey, data, error, loading, message, handleFormChanges, handleFormSubmit } = useForm({
    schema: {
      name: new Validator().String,
      url: new Validator().isUrl('Must be a valid url').String,
      scope: new Validator().Array<'Facebook' | 'Google' | 'Manual' | 'Mail' | 'SMS'>,
      permissions: new Validator().Array<'Add' | 'Delete' | 'Update' | 'View'>,
    },
    extendSubmit: async (values, { resetForm, setError, setLoading }) => {
    }
  })

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    setImage(await fileToBase64(file))
  }

  return <Modal isOpen={isOpen} toggle={toggle} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center p-4 w-full border-b">
          <button onClick={toggle} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>{title}</h2>
        </div>
        <div className="p-7">
          <form onChange={handleFormChanges} onSubmit={handleFormSubmit}>
            <div className='mb-4 flex justify-between'>
              <div className="w-[49%]">
                <label>FIrst Name</label>
                <div className='mt-1'>
                  <input autoComplete="name"
                    required
                    autoFocus
                    name='name'
                    className='w-full focus:border-blue-700 pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                    placeholder='e.g John' />
                </div>
              </div>
              <div className="w-[49%]">
                <label>Last Name</label>
                <div className='mt-1'>
                  <input autoComplete="name"
                    required
                    name='name'
                    className='w-full pr-10 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                    placeholder='e.g Doe' />
                </div>
              </div>
            </div>
            <div className='mb-4'>
              <label >Role</label>
              <div className='mt-1'>
                <select
                  required
                  name='role'
                  className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border h-[2.65rem] px-3 rounded-md'>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
            <div className='mb-5'>
              <label>Permissions</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[scopeOptions[0], scopeOptions[1]]}
                  isMulti
                  name='permissions'
                  required
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any }}
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

export default AddTeam;
