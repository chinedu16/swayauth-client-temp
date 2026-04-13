import Modal from "@/components/modal";
import { SpinnerCircle2 } from "@/components/spinner";
import { CONST } from "@/lib/constant";
import { FormData, isValidUrl } from "@/lib/form";
import { normalRequest } from "@/lib/request";
import { OrganizationTokenData } from "@/store/hooks/organizationToken";
import { faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Select, { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const typeOptions = [
  { value: 'manual', label: 'Manual' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google' },
  { value: 'two_factor', label: 'Two Factor Authentication' },
  { value: 'mail', label: 'Email' },
  { value: 'sms', label: 'SMS' },
]

const permissionOptions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete' },
]

const twoFaOptions = [
  { value: 'app', label: 'App' },
  { value: 'mail', label: 'Email' },
  { value: 'sms', label: 'SMS' },
]

const templateOptions = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
]

const CreateCredModal = ({ isOpen, addToken, editToken, toggle, token, organization }: { addToken?: (d: OrganizationTokenData) => void, editToken?: (d: OrganizationTokenData) => void, organization?: string, isOpen: boolean, token?: OrganizationTokenData | null, toggle: () => void }) => {
  const [manual, setManual] = useState(token?.scope?.includes('manual') ? true : false);
  const [redirect_url, setRedirect_url] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScopeChanges = (e: MultiValue<{
    value: string;
    label: string;
  }>) => {
    setManual(e.findIndex(s => s.value === 'two_factor') > -1 ? true : false)
  }

  const handleAddOrganizationToken = async (e: FormEvent<HTMLFormElement>) => {
    const body = FormData(e, ['name', 'origins', 'redirect_url', 'scope',
      'two_factor_type', 'verify_registration', 'verify_registration_type', 'permissions'])
    for (let i = 0; i < (body.origins as unknown as string[]).length; i++) {
      if (!isValidUrl((body.origins as unknown as string[])[i])) {
        return toast.error('Invalid origin')
      }
    }
    setLoading(true)
    const res = await normalRequest(CONST.COMPANY.ORGANIZATION.TOKEN.LIST + `/${token?.id ? `tokens/${token.id}` : organization}${token?.id ? '' : '/tokens'}`, body, token?.id ? 'patch' : 'post')
    setLoading(false)
    toast[res.status ? 'success' : 'error'](res.message)
    if (res.status && addToken && editToken) {
      token?.id ? editToken(res.data) : addToken(res.data)
      toggle()
    }
  }

  return <Modal isOpen={isOpen} toggle={toggle} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
          <button onClick={toggle} className="mr-3 p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1 className='text-2xl font-bold'>Create Token</h1>
        </div>
        <div className="p-7">
          <form onSubmit={handleAddOrganizationToken}>
            <div className='mb-4'>
              <label>Name</label>
              <div className='mt-1'>
                <input autoFocus autoComplete="name"
                  required
                  defaultValue={token?.name}
                  name='name'
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g SwayAuth Facebook Auth' />
              </div>
            </div>
            <div className='mb-4'>
              <label data-tooltip2={`Type & click ENTER to add javascript origin`}>
                Origins
                <span className="inline-block ml-1">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>
              </label>
              <div className='mt-1'>
                <CreatableSelect
                  closeMenuOnSelect={true}
                  isMulti
                  defaultValue={token?.origins?.map(v => ({ value: v, label: v }))}
                  placeholder='e.g https://google.com, http://....'
                  name="origins"
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any }}
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className='mb-4'>
              <label data-tooltip2={`For Facebook, Google or Registration`} >Redirect Url
                <span className="inline-block ml-1">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>
              </label>
              <div className='mt-1'>
                <input
                  type="url"
                  autoComplete="url"
                  onChange={(e) => setRedirect_url(e.target.value)}
                  name='redirect_url'
                  defaultValue={token?.redirect_url}
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g https://swayauth-client.netlify.app/verify-login' />
              </div>
            </div>

            <div className='mb-4'>
              <label>Scope</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={token?.scope ? typeOptions.filter(v => token.scope?.join('').includes(v.value)) : [typeOptions[0], typeOptions[1], typeOptions[2]]}
                  isMulti
                  onChange={handleScopeChanges}
                  required
                  name="scope"
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any }}
                  options={typeOptions}
                  classNamePrefix="select"
                />
              </div>
            </div>

            {
              manual ?
                <div >
                  <div className='mb-4'>
                    <label>Two Factor Authentication</label>
                    <div className='mt-1'>
                      <Select
                        closeMenuOnSelect={false}
                        defaultValue={token?.two_factor_type ? twoFaOptions.filter(v => token.two_factor_type?.join('').includes(v.value)) : [twoFaOptions[0]]}
                        isMulti
                        required
                        name="two_factor_type"
                        styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any }}
                        options={twoFaOptions}
                        classNamePrefix="select"
                      />
                    </div>
                  </div>

                </div> : null
            }
            <div className='mb-4'>
              <label>Token Permissions</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={token?.permissions ? permissionOptions.filter(v => token.permissions?.join('').includes(v.value)) : [permissionOptions[0], permissionOptions[1], permissionOptions[2]]}
                  isMulti
                  id="array"
                  name='permissions'
                  required
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any }}
                  options={permissionOptions}
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className='mb-4'>
              <label>Hosted Template</label>
              <div className='mt-1'>
                <Select
                  closeMenuOnSelect={true}
                  defaultValue={token?.template ? templateOptions.filter(v => v.value === token.template) : templateOptions.filter(v => v.value === 'minimal')}
                  name='template'
                  styles={{ control: (styles) => ({ ...styles, borderColor: '#E5E7EB', borderRadius: 6, paddingTop: 3, paddingBottom: 3 }) as any }}
                  options={templateOptions}
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className="mb-5 flex items-center flex-wrap justify-between">
              <div className="w-6/12 mt-1">
                <label className="relative flex justify-between items-center cursor-pointer">
                  <span className="me-3 text-gray-600">Verify Registeration</span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked={token?.verify_registration} name="verify_registration" type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                </label>
              </div>
              <div className="w-4/12 mt-1">
                <select defaultValue={token?.verify_registration_type} name="verify_registration_type" required className='w-full focus:outline-1 focus:outline-blue-700 focus:ring-2 border py-2 px-3 rounded-md'>
                  {
                    redirect_url && <option value="mail_link">Email Link</option>
                  }
                  <option value="mail_token">Email Token</option>
                  <option value="sms">SMS Token</option>
                </select>
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
