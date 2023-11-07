import { pricingData } from "@/lib/home/data";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

const Pricing = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="mt-2 pt-12 pb-20">
      {children}
      <div className="flex flex-wrap align-items-center">
        <div className="w-full lg:w-4/12 lg:mt-0 lg:p-3">
          <div className=" bg-white hover:border-t shadow-sm hover:border-gray-100 hover:shadow-2xl relative transition-all hover:scale-[1.01] p-6 rounded-3xl">
            <h4 className="font-bold text-xl">Basic</h4>
            <p className="text-gray-600 my-3">
              The Basic subscription includes the following features:
            </p>
            <div>
              <span className="inline-block font-bold text-3xl">$0</span>
              <span className="inline-block ml-3 text-sm">
                Per User/ Per Year
              </span>
            </div>
            <div className="mt-10">
              {pricingData.basic.map((itm, idx) => (
                <div key={idx} className="mb-3">
                  <span className="inline-flex items-center justify-center bg-blue-50 rounded-full text-blue-600 mr-3 min-w-[1.7rem] min-h-[1.7rem] border">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className="inline-block text-gray-600">
                    {itm}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button className="w-full rounded-lg py-3 text-blue-700 bg-blue-100">
                Try for Free
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-16 lg:mt-0 lg:p-3">
          <div className=" bg-white hover:border-t shadow-sm hover:border-gray-100 hover:shadow-2xl relative transition-all hover:scale-[1.01] p-6 rounded-3xl">
            <h4 className="font-bold text-xl">Standard</h4>
            <p className="text-gray-600 my-3">
              The Standard subscription includes all of the features of the Basic
              subscription, plus the following:
            </p>
            <div>
              <span className="inline-block font-bold text-3xl">$300</span>
              <span className="inline-block ml-3 text-sm">
                Per User/ Per Year
              </span>
            </div>
            <div className="mt-10">
              {pricingData.standard.map((itm, idx) => (
                <div key={idx} className="mb-3">
                  <span className="inline-flex items-center justify-center bg-blue-50 rounded-full text-blue-600 mr-3 min-w-[1.7rem] min-h-[1.7rem] border">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className="inline-block text-gray-600">
                    {itm}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button className="w-full rounded-lg py-3 bg-blue-700 text-white">
                Start 14 Days Trial
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-16 lg:mt-0 lg:p-3">
          <div className=" bg-white hover:border-t shadow-sm hover:border-gray-100 hover:shadow-2xl relative transition-all hover:scale-[1.01] p-6 rounded-3xl">
            <h4 className="font-bold text-xl">Premium</h4>
            <p className="text-gray-600 my-3">
              The Premium subscription includes all of the features
              of the Standard subscription, plus the following:
            </p>
            <div>
              <span className="inline-block font-bold text-3xl">$600</span>
              <span className="inline-block ml-3 text-sm">
                Per User/ Per Year
              </span>
            </div>
            <div className="mt-10">
              {pricingData.premium.map((itm, idx) => (
                <div key={idx} className="mb-3">
                  <span className="inline-flex items-center justify-center bg-blue-50 rounded-full text-blue-600 mr-3 min-w-[1.7rem] min-h-[1.7rem] border">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className="inline-block text-gray-600">
                    {itm}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button className="w-full rounded-lg py-3 text-blue-700 bg-blue-100">
                Try for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
