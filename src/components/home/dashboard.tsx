import Image from "next/image";

const ThirdSection = () => {
  return (
    <div className="pt-16 pb-24 mt-10 md:mt-14 text-center">
      <h2 className="text-2xl md:text-3xl mt-6 mb-6 md:mt-10 font-bold">
        Personalize your authenticatication flow
      </h2>
      <p className="mb-10 text-gray-600 lg:px-28">
        Manage user data and also personalize your authentication flow through our dashboard.
        We offer a verieties of methods to choose from including
        Two-factor authentication <b>(2FA)</b>, <b>SMS</b> token, <b>EMAIL</b> token, <b>SOCIAL</b> and <b>MANUAL</b> login and sign-up.
      </p>
      <div className="mx-auto text-center lg:w-4/6">
        <Image src="/dashboard.png" alt="" width={2880} height={1800} />
      </div>
    </div>
  );
};

export default ThirdSection;
