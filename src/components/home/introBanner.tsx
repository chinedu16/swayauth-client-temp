import Image from "next/image";
import Link from "next/link";

const IntroBanner = () => {
  return (
    <div className="max-w-7xl mt-12 flex flex-wrap items-center justify-between px-5 md:px-10 mx-auto">
      <div className="w-full lg:w-6/12 lg:pr-12">
        <h1 className="text-4xl md:text-6xl leading-[3rem] md:leading-[5rem] font-extrabold">
          Simple and Secure Authentication for Your Application
        </h1>
        <p className="text-lg mt-5 mb-10 text-gray-600">
          The simplest, most secure way to manage authentication for your website or app, so you can focus on what matters most.
        </p>
        <Link
          prefetch
          href="/sign-up"
          className="bg-blue-700 hover:scale-[1.02] active:scale-[0.98] hover:bg-blue-600 text-white rounded-full py-3 px-5"
        >
          Start 14 Days Trial
        </Link>
      </div>
      <div className="w-full mt-28 lg:w-6/12 lg:pl-12 relative">
        <span className="absolute top-0 left-16 rounded-full min-w-[0.7rem] min-h-[0.7rem] bg-blue-600"></span>
        <Image
          src="/introBanner.png"
          width={930}
          height={852}
          alt=""
          className=""
        />
      </div>
    </div>
  );
};

export default IntroBanner;
