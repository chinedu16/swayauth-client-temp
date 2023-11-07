import { whatOurCustomerSays } from "@/lib/home/data";
import {
  faArrowLeft,
  faArrowRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRef } from "react";

const width = typeof window !== 'undefined' ? window?.innerWidth : 400
const FourthSection = () => {
  
  const mainRef = useRef<HTMLDivElement>(null);
  
  const slide = (type: 'back' | 'front' = 'front') => {
    if (mainRef.current) {
      mainRef.current.scrollLeft += type === 'front' ? width - 10 : (width * -1) + 10;
    }
  }

  return (
    <div className="mt-24 mb-16 md:mt-28">
      <h2 className="font-[500] text-2xl md:text-3xl relative">
        <span className="inline-flex items-center justify-center rounded-full absolute z-index-0 left-[-1.85rem] top-[-1.85rem] min-h-[3rem] min-w-[3rem] opacity-80 bg-blue-300">
          <FontAwesomeIcon icon={faQuoteLeft} />
        </span>
        <span className="inline-block relative z-index-1">
          What Our Customers <br />
          are Saying
        </span>
      </h2>
      <div className="overflow-slider" ref={mainRef}>
        {
          whatOurCustomerSays.map((what, idx) =>
            <div key={idx} className="w-full slides md:w-3/6 mt-6">
              <div className="md:border-r md:pr-10">
                <p className="text-gray-600 py-6">
                  ❝{what.text}❞
                </p>
                <div className="flex items-center">
                  <div className="max-w-[2.5rem] mr-3 min-w-[2.5rem] min-h-[2.5rem] max-h-[2.5rem] rounded-full overflow-hidden">
                    <Image src="/avatar.jpg" alt="" width={1742} height={2199} />
                  </div>
                  <div className="mt-2">
                    <h6 className="my-0 py-0 font-bold text-sm leading-3">
                      {what.name}
                    </h6>
                    <small className="text-gray-500">{what.org}</small>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <button onClick={() => slide('back')} className="min-h-[3rem] relative top-[-10rem] border rounded-full   left-0 min-w-[3rem] text-gray-600 hover:text-black text-2xl transition-all">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button onClick={() => slide()} className="min-h-[3rem] relative top-[-10rem] border rounded-full  left-[calc(100%-6.5rem)] min-w-[3rem] text-gray-600 hover:text-black text-2xl transition-all">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default FourthSection;
