import Modal from "@/components/modal";
import PreloadImage from "@/components/preloadImage";
import { copyText, dateLong } from "@/lib/utils";
import { UsersData } from "@/store/slice/users";
import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpgradeSubscriptionModal from "../settings/modals/upgradeModal";

const ViewUserModal = ({ isOpen, toggle, data }: { isOpen: boolean, data?: null | UsersData, toggle: () => void }) => {
  return <Modal isOpen={isOpen} toggle={toggle} center size="max-w-xl">
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex items-center p-4 w-full border-b">
          <button onClick={toggle} className="p-1 font-bold text-xl rounded-full hover:bg-slate-100 px-3">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 className='text-xl pl-3 font-bold'>User Details</h2>
        </div>
        <div className="p-7 bg-gray-50">
          <div className="flex items-center">
            <span className="inline-block h-16 overflow-hidden w-16 border rounded-full">
              <PreloadImage src={data?.photo || '/avatar-2.png'} className="object-cover h-full w-full" />
            </span>
            <span className="inline-block text-lg ml-3 font-normal">{data?.first_name} {data?.last_name}</span>
          </div>
          <div className="text-sm py-4">
            <div className="flex justify-between">
              <span className="inline-block pr-5">Email:</span>
              <span>{data?.email}</span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Mobile Number:</span>
              <span>{data?.phone || 'N/A'}</span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Status:</span>
              <small className={`inline-block capitalize px-3 ${data?.status == 'active' ? 'bg-green-600' : 'bg-red-600'} text-white rounded-md`}>
                {data?.status}
              </small>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Address:</span>
              <span>{data?.address}</span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">LGA:</span>
              <span>{data?.city}</span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">State:</span>
              <span>{data?.state}</span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Country:</span>
              <span>{data?.country}</span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Verified:</span>
              <small className={`inline-block capitalize px-3 ${data?.verified ? 'bg-green-600' : 'bg-red-600'} text-white rounded-md`}>
                {String(data?.verified)}
              </small>
            </div>
            <div className="flex mt-3 capitalize justify-between">
              <span className="inline-block pr-5">Scope:</span>
              <span>{data?.scope?.join(', ') ? `(${data?.scope?.join(', ')})` : 'N/A'}</span>
            </div>
            <div className="flex mt-3 capitalize justify-between">
              <span className="inline-block pr-5">Permission:</span>
              <span>{data?.permissions?.join(', ') ? `(${data?.permissions?.join(', ')})` : 'N/A'}</span>
            </div>
            <div className="flex mt-3 capitalize justify-between">
              <span className="inline-block pr-5">Two Factor Type:</span>
              <span>{data?.two_factor_type ? `(${data?.two_factor_type})` : 'N/A'}</span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Organization ID:</span>
              <span>{data?.organization_id} <span title="copy" onClick={() => copyText(data?.organization_id)} className="inline-block ml-2 cursor-pointer"><FontAwesomeIcon icon={faCopy} /></span></span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Organization Token ID:</span>
              <span>{data?.organization_token_id}  <span title="copy" onClick={() => copyText(data?.organization_token_id)} className="inline-block ml-2 cursor-pointer"><FontAwesomeIcon icon={faCopy} /></span></span>
            </div>
            <div className="flex mt-3 justify-between">
              <span className="inline-block pr-5">Joined:</span>
              <span>{dateLong(data?.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
};


export default ViewUserModal