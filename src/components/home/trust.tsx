import { faCircleNodes, faFingerprint, faShieldHalved, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Trust = () => {
  return <div className="mt-20 mb-20 md:mt-28">
    <h2 className="text-2xl md:text-3xl mb-6 font-bold text-center">
      Keep your Customer Trust
    </h2>
    <p className="lg:px-28 text-center mb-10">
      Manage user data and also personalize your authentication flow by choosing which authentication methods you want to offer your users from our dashboard.
    </p>
    <div className="flex flex-wrap items-stretch">
      <div className="w-full lg:w-6/12 lg:p-6">
        <div className="shadow-2xl py-6 p-4 lg:p-6 rounded-3xl h-full">
          <div className="flex">
            <div className="text-3xl flex pr-6 md:pr-9 md:pl-3">
              <span className="bg-blue-100 text-blue-700 inline-flex items-center justify-center w-14 h-14 rounded-full">
                <FontAwesomeIcon icon={faUnlockKeyhole} />
              </span>
            </div>
            <div>
              <h4 className="text-[1.3rem] font-semibold">Multiple Authentication Method</h4>
              <p className="my-2">Set up your authentication method with SwayAuth.</p>
            </div>
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="p-2 w-3/12 md:w-2/12">
              <div className="shadow-xl md:p-3 xl:p-4 rounded-xl">
                <Image src="/google.png" alt="" width={480} height={480} />
              </div>
            </div>
            <div className="p-2 w-3/12 md:w-2/12">
              <div className="shadow-xl md:p-3 xl:p-4 rounded-xl">
                <Image src="/facebook.png" alt="" width={480} height={480} />
              </div>
            </div>
            <div className="p-2 w-3/12 md:w-2/12">
              <div className="shadow-xl md:p-3 rounded-xl">
                <Image src="/2factor-auth.png" alt="" width={480} height={480} />
              </div>
            </div>
            <div className="p-2 w-3/12 md:w-2/12">
              <div className="shadow-xl md:p-3 rounded-xl">
                <Image src="/email-token.png" alt="" width={480} height={480} />
              </div>
            </div>
            <div className="p-2 w-3/12 md:w-2/12">
              <div className="shadow-xl md:p-3 rounded-xl">
                <Image src="/password-field.png" alt="" width={480} height={480} />
              </div>
            </div>
            <div className="p-2 w-3/12 md:w-2/12">
              <div className="shadow-xl md:p-3 rounded-xl">
                <Image src="/sms.png" alt="" width={480} height={480} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-6 lg:mt-0 lg:w-6/12 lg:p-6">
        <div className="shadow-2xl p-4 py-6 py lg:p-6 rounded-3xl h-full">
          <div className="flex">
            <div className="text-3xl flex pr-6 md:pr-9 md:pl-3">
              <span className="bg-blue-100 text-blue-700 inline-flex items-center justify-center w-14 h-14 rounded-full">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>
            </div>
            <div>
              <h4 className="text-[1.3rem] font-semibold">Safeguard User Data</h4>
              <p className="my-2">Personalize authentication flow through one dashboard.</p>
            </div>
          </div>
          <div className="flex mt-10 gap-6">
            <div className="w-6/12 shadow-xl py-4 px-6 text-center rounded-xl">
              <div className="text-center text-4xl">
                <FontAwesomeIcon icon={faFingerprint} />
              </div>
              <div className="mt-3">
                Introducing Passwordless key
              </div>
            </div>
            <div className="w-6/12 shadow-xl py-4 px-6 text-center rounded-xl">
              <div className="text-center text-4xl">
                <FontAwesomeIcon icon={faCircleNodes} />
              </div>
              <div className="mt-3">
                Connect with multiple providers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Trust;
