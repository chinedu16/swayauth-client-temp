import { faDoorOpen, faKey, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              <p className="my-2">Your data is protected with industry standard data protection
                practices without any worry of vendor lock-in.
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
              <p className="my-2">Swayauth is your scalable and secure authentication gateway to easy
                user onboarding and user management.
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
              <p className="my-2">Swayauth supports multiple authentication strategies to give you the
                highest level of user security. This includes Multi-factor
                authentication to ensure user accounts are never compromised.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-6/12">
        <div className="py-6 md:p-6">
          <h4 className="text-[1.3rem] font-semibold">Introduction</h4>
          <div className="my-2">
            <p className="mb-2">
              Swayauth is a cutting edge technology company that aims to simplify authentication process in the tech industry.
            </p>
            <p className="">
              We know that security is important, and how to implement these features can be complex in the tech industry.
              So therefore, we offer a variety of robust secure proof methods of authentication that takes the ease of developers.
            </p>
          </div>
        </div>
        <div className="py-6 md:p-6">
          <h4 className="text-[1.3rem] font-semibold">What we offer</h4>
          <div className="my-2">
            <p className="mb-2">
              At swayauth, we offer simless authentication methods for developer and anyone who wants to use our platform.
            </p>
            <p className="mb-2">
              These offerings includes, Facebook authentication, Google authentication, SMS authentication token, Email authentication token, and 2-Factor authentication.
            </p>
            <p className="">
              Our offerings have been tested by experts in the field, ensuring that developers use the latest technology while worrying less about implementation.</p>
          </div>
        </div>
        <div className="py-6 md:p-6">
          <h4 className="text-[1.3rem] font-semibold">For developers</h4>
          <div className="my-2">
            <p className="mb-2">We welcome all developers to use our platform to manage authentication, and there application users data using our platform. </p>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Info;
