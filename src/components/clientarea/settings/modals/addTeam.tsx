import Modal from "@/components/modal";
import { SpinnerCircle2 } from "@/components/spinner";
import { CONST } from "@/lib/constant";
import { FormData } from "@/lib/form";
import { normalRequest } from "@/lib/request";
import useTeam from "@/store/hooks/team";
import { TeamData } from "@/store/slice/team";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Select from 'react-select';

const scopeOptions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete' },
]

const AddTeam = ({ isOpen, toggle, title }: { isOpen: boolean, toggle: () => void, title: string }) => {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { addTeam } = useTeam(false)
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [phone, setPhone] = useState('');

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['first_name', 'last_name', 'email', 'phone', 'access', 'permissions']) as TeamData;
    if (phone && isValidPhoneNumber(phone)) {
      data.phone = phone
    } else {
      setPhoneFocus(true);
    }
    setLoading(true)
    const res = await normalRequest(CONST.COMPANY.TEAM.CREATE, data)
    setLoading(false)
    if (res.status) {
      data.verified = false
      data.created_at = new Date().toISOString()
      addTeam(data)
      toggle()
      toast.success(res.message)
    } else {
      setMessage(res.message)
    }
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
          <form onChange={() => setMessage('')} onSubmit={handleFormSubmit}>
            <div className='mb-4 flex justify-between'>
              <div className="w-[49%]">
                <label>FIrst Name</label>
                <div className='mt-1'>
                  <input
                    required
                    autoFocus
                    name="first_name"
                    autoComplete='given-name'
                    className='w-full focus:border-blue-700 pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                    placeholder='e.g John' />
                </div>
              </div>
              <div className="w-[49%]">
                <label>Last Name</label>
                <div className='mt-1'>
                  <input
                    required
                    name='last_name'
                    autoComplete='family-name'
                    className='w-full pr-10 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                    placeholder='e.g Doe' />
                </div>
              </div>
            </div>
            <div className='mb-4 flex justify-between'>
              <div className="w-[49%]">
                <label>Email</label>
                <div className='mt-1'>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    name='email'
                    className='w-full focus:border-blue-700 pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                    placeholder='e.g John' />
                </div>
              </div>
              <div className="w-[49%]">
                <label>Phone</label>
                <div className='mt-1'>
                  <PhoneInput
                    placeholder="eg +234..."
                    onBlur={() => setPhoneFocus(false)}
                    onFocus={() => setPhoneFocus(true)}
                    value={phone}
                    disabled={loading}
                    defaultCountry="NG"
                    className={`w-full sm:ring-offset-1 bg-slate-50 ${phoneFocus ? 'border-blue-700 ring-2 sm:ring-1' : ''} outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 border sm:border-2 py-[0.45rem] px-3 rounded-md`}
                    onChange={(e) => setPhone(e as any)} />
                </div>
              </div>
            </div>
            <div className='mb-4'>
              <label >Role</label>
              <div className='mt-1'>
                <select
                  required
                  name='access'
                  className='w-full bg-slate-50 focus:border-blue-700 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border h-[2.65rem] px-3 rounded-md'>
                  <option value="level_2">Admin</option>
                  <option value="level_3">Super Admin</option>
                </select>
              </div>
            </div>
            <div className='mb-4'>
              <label>Permissions</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[scopeOptions[0]]}
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
            <div className='text-red-500 min-h-[1.5rem]'>
              {
                message && <small>* {message}</small>
              }
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
