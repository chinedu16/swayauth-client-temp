import Image from "next/image";
import Link from "next/link";

const SecondSection = () => {
  return (
    <div className="mt-24 md:mt-28">
      <h2 className="text-2xl md:text-3xl mb-6 md:10 font-bold text-center">
        Powerful authentication features with <span className="inline-block md:block">easy-to-use API integrations</span>
      </h2>
      <div className="flex flex-wrap align-items-center">
        <div className="w-full lg:w-4/12 lg:mt-0 p-3">
          <div className="text-center hover:border-t hover:border-gray-100 hover:shadow-2xl hover:bg-gray-50 relative transition-all hover:scale-[1.01] px-6 py-10 rounded-3xl">
            <div className="">
              <Image src="/features-3.png" width={930} height={852} alt="" />
            </div>
            <h5 className="font-bold text-xl my-4">Social Login</h5>
            <p className="mb-3 text-gray-600">
              A convenient and easy way for users to log in to
              your websites and apps using Facebook or Google.
            </p>
            <Link
              className="underline hover:text-blue-700  underline-offset-2"
              href=""
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-10 lg:mt-0 p-3">
          <div className="text-center hover:border-t hover:border-gray-100 hover:bg-gray-50 hover:shadow-2xl transition-all relative hover:scale-[1.01] px-6 py-10 rounded-3xl">
            <div>
              <Image
                src="/features-2.png"
                width={930}
                height={852}
                alt=""
                className=""
              />
            </div>
            <h5 className="font-bold text-xl my-4">Manage User Data</h5>
            <p className="mb-3 text-gray-600">
              Manage users data securely. We make it easy to protect sensitive users
              data and comply with regulations.
            </p>
            <Link
              className="underline hover:text-blue-700  underline-offset-2"
              href=""
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-10 lg:mt-0 p-3">
          <div className="text-center hover:border-t hover:border-gray-100 hover:bg-gray-50 hover:shadow-2xl transition-all hover:scale-[1.01] relative px-6 py-10 rounded-3xl">
            <div>
              <Image
                src="/features-1.png"
                width={930}
                height={852}
                alt=""
                className=""
              />
            </div>
            <h5 className="font-bold text-xl my-4">Manual Authentication</h5>
            <p className="mb-3 text-gray-600">
              Integrate manual authentication such as Login, Signup and OTP on your website or app with few simple steps.
            </p>
            <Link
              className="underline hover:text-blue-700 underline-offset-2"
              href=""
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
