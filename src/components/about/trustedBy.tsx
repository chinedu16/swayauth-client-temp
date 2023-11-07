import Image from "next/image";

const TrustedBy = () => {
  return <div className="mt-28 mb-20">
    <h2 className="text-2xl md:text-3xl text-center font-bold">Trusted By</h2>
    <div className="flex mt-10 items-center justify-center flex-wrap">
      {
        Array(10).fill(0).map((_, i) =>
          <div className="w-full md:w-6/12 lg:w-3/12 p-4" key={i}>
            <Image src={`/trustees/L${i}.jpg`} alt="" width={2880} height={1800} />
          </div>
        )
      }
    </div>
  </div>;
};

export default TrustedBy;
