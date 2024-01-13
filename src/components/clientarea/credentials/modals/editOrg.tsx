import ImageUpload from "@/components/imageUpload";
import Modal from "@/components/modal";
import { SpinnerCircle2 } from "@/components/spinner";
import { CONST } from "@/lib/constant";
import { FormData } from "@/lib/form";
import { normalRequest } from "@/lib/request";
import useOrganization from "@/store/hooks/organization";
import { OrganizationData } from "@/store/slice/organization";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const EditOrg = ({ isOpen, org, toggle, getEditOrg }: { getEditOrg?: (data: OrganizationData) => void, org: OrganizationData | null, isOpen: boolean, toggle: () => void }) => {
  const [bioLength, setBioLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addOrganization } = useOrganization(false)
  const [image, setImage] = useState('');

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = FormData(e, ['name', 'website', 'bio', 'photo'])
    if (!image && !org?.photo) return toast.error('Please include an image')
    formData.photo = image || org?.photo as string
    setLoading(true)
    const res = await normalRequest<OrganizationData>(CONST.COMPANY.ORGANIZATION[org?.id ? 'LIST' : 'CREATE'] + (org?.id ? `/${org?.id}` : ''), formData, org?.id ? 'patch' : 'post')
    setLoading(false)
    toast[res.status ? 'success' : 'error'](res.message);
    if (res.status) {
      addOrganization(res.data)
      getEditOrg && getEditOrg(res.data)
      toggle()
    }
  }

  return <Modal isOpen={isOpen} toggle={() => { if (!loading) toggle() }} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
          <button onClick={() => { if (!loading) toggle() }} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>{org ? 'Edit' : 'Create'} Organisation</h2>
        </div>
        <div className="p-7">
          <form onSubmit={handleFormSubmit}>
            <div className='mb-4 flex items-center justify-center'>
              <ImageUpload disabled={loading} image={image || org?.photo} setImage={setImage} />
            </div>
            <div className='mb-4'>
              <label>Name</label>
              <div className='mt-1'>
                <input
                  autoFocus
                  autoComplete="name"
                  required
                  disabled={loading}
                  name='name'
                  defaultValue={org?.name}
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g SwayAuth' />
              </div>
            </div>
            <div className='mb-4'>
              <label >Url</label>
              <div className='mt-1'>
                <input
                  type="url"
                  autoComplete="url"
                  required
                  disabled={loading}
                  name='website'
                  defaultValue={org?.website}
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g https://swayauth.com' />
              </div>
            </div>
            <div className='mb-4'>
              <label >Bio</label>
              <div className='mt-1'>
                <textarea autoComplete="bio"
                  required
                  name='bio'
                  defaultValue={org?.bio}
                  disabled={loading}
                  maxLength={300}
                  onChange={(e) => setBioLength(e.target.value.length)}
                  rows={3}
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='Write bio here...' />
                <div className="text-end">
                  <small >{bioLength}/300</small>
                </div>
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

export default EditOrg;
