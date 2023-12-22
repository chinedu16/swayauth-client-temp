import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import Modal from "@/components/modal";
import PreloadImage from "@/components/preloadImage";
import { Validator, useForm } from "@/lib/form";
import { fileToBase64 } from "@/lib/media";
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

const EditOrg = ({ isOpen, toggle, title }: { isOpen: boolean, toggle: () => void, title: string }) => {
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
      <div className="flex sticky top-0 bg-white items-center p-4 w-full border-b">
          <button onClick={toggle} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>{title}</h2>
        </div>
        <div className="p-7">
          <form onChange={handleFormChanges} onSubmit={handleFormSubmit}>
            <div className='mb-4 flex items-center justify-center'>
              <label className="inline-block relative border-2 w-[6rem] h-[6rem] cursor-pointer border rounded-full overflow-hidden">
                <input onChange={handleImageChange} type="file" name="logo" className="hidden" accept="image/*" />
                <PreloadImage src={image} alt="" className="object-cover" />
                <span className="absolute top-[40%] left-[40%] text-blue-700"><FontAwesomeIcon icon={faCamera} /></span>
              </label>
            </div>
            <div className='mb-4'>
              <label>Name</label>
              <div className='mt-1'>
                <input autoFocus autoComplete="name"
                  required
                  name='name'
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
