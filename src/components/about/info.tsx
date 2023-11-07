import { faDoorOpen, faKey, faShieldHalved, faUnlockKeyhole, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Info = () => {
  return <div className="my-16">
    <h4 className="text-xl text-center">We build products for developers and designers. And those who aspire to become one.</h4>
    <div className="flex flex-wrap mt-10">
      <div className="w-full md:w-6/12">
        <div className="py-6 md:p-6">
          <div className="flex">
            <div className="text-3xl flex pr-6 md:pr-9 md:pl-3">
              <span className="bg-blue-100 text-blue-700 inline-flex items-center justify-center w-14 h-14 rounded-full">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>
            </div>
            <div>
              <h4 className="text-[1.3rem] font-semibold">Data Protection</h4>
              <p className="my-2">Set up your authentication method with SwayAuth.
              </p>
            </div>
          </div>
        </div>
        <div className="py-6 md:p-6">
          <div className="flex">
            <div className="text-3xl flex pr-6 md:pr-9 md:pl-3">
              <span className="bg-blue-100 text-blue-700 inline-flex items-center justify-center w-14 h-14 rounded-full">
                <FontAwesomeIcon icon={faDoorOpen} />
              </span>
            </div>
            <div>
              <h4 className="text-[1.3rem] font-semibold">Authentication Gateway</h4>
              <p className="my-2">Set up your authentication method with SwayAuth.
              </p>
            </div>
          </div>
        </div>
        <div className="py-6 md:p-6">
          <div className="flex">
            <div className="text-3xl flex pr-6 md:pr-9 md:pl-3">
              <span className="bg-blue-100 text-blue-700 inline-flex items-center justify-center w-14 h-14 rounded-full">
                <FontAwesomeIcon icon={faKey} />
              </span>
            </div>
            <div>
              <h4 className="text-[1.3rem] font-semibold">Security</h4>
              <p className="my-2">Set up your authentication method with SwayAuth.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-6/12">
        <p className="py-6 md:p-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, porro numquam odit mollitia dolore error perferendis alias recusandae quae fugiat quasi ipsum excepturi ea at repudiandae eligendi? Rerum, at debitis?
        </p>
        <p className="py-6 md:p-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, porro numquam odit mollitia dolore error perferendis alias recusandae quae fugiat quasi ipsum excepturi ea at repudiandae eligendi? Rerum, at debitis?
        </p>
        <p className="py-6 md:p-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, porro numquam odit mollitia dolore error perferendis alias recusandae quae fugiat quasi ipsum excepturi ea at repudiandae eligendi? Rerum, at debitis?
        </p>
      </div>
    </div>
  </div>;
};

export default Info;
