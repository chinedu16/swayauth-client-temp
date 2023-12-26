import Modal from "@/components/modal";
import PreloadImage from "@/components/preloadImage";
import { SpinnerCircle2 } from "@/components/spinner";
import { FormData } from "@/lib/form";
import { fileToBase64 } from "@/lib/media";
import { OrganizationData } from "@/store/slice/organization";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";

const EditOrg = ({ isOpen, org, toggle }: { org: OrganizationData | null, isOpen: boolean, toggle: () => void }) => {
  const [bioLength, setBioLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    setImage(await fileToBase64(file))
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = FormData(e, [])
  }

  return <Modal isOpen={isOpen} toggle={toggle} center>
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
          <button onClick={toggle} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>{org ? 'Edit' : 'Create'} Organisation</h2>
        </div>
        <div className="p-7">
          <form onSubmit={handleFormSubmit}>
            <div className='mb-4 flex items-center justify-center'>
              <label className="inline-block relative border-2 w-[6rem] h-[6rem] cursor-pointer rounded-full overflow-hidden">
                <input onChange={handleImageChange} type="file" name="logo" className="hidden" accept="image/*" />
                <PreloadImage src={image || org?.photo} alt="" className="object-cover" />
                <span className="absolute top-[40%] left-[40%] text-blue-700"><FontAwesomeIcon icon={faCamera} /></span>
              </label>
            </div>
            <div className='mb-4'>
              <label>Name</label>
              <div className='mt-1'>
                <input autoFocus autoComplete="name"
                  required
                  name='name'
                  defaultValue={org?.name}
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g SwayAuth' />
              </div>
            </div>
            <div className='mb-4'>
              <label >Url</label>
              <div className='mt-1'>
                <input type="url" autoComplete="url"
                  required
                  name='url'
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
                  maxLength={300}
                  onChange={(e) => setBioLength(e.target.value.length)}
                  rows={3}
                  className='w-full pr-10 focus:outline-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-700 focus:ring-2  border py-2 px-3 rounded-md'
                  placeholder='e.g https://swayauth.com' />
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
