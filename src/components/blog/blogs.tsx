"use client"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BlogData } from "./articles";

const width = typeof window !== 'undefined' ? window?.innerWidth : 400
const Blogs = ({ data }: { data?: BlogData[] }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const slide = (type: 'back' | 'front' = 'front') => {
    if (mainRef.current) {
      mainRef.current.scrollLeft += type === 'front' ? width - 10 : (width * -1) + 10;
    }
  }

  return <div className="mt-28">
    {
      data?.length ?
        <div>
          <h3 className="text-xl font-bold">Next </h3>
          <div className="mt-6 overflow-slider" ref={mainRef}>
            {
              data?.map((item, idx) =>
                <div className="max-w-[20rem] min-w-[20rem] mr-10" key={idx}>
                  <Image alt="" src={item.photo || '/placeholder.png'} width={1240} height={830} />
                  <div>
                    <Link href={`/blog/${item.url}`} className="block text-2xl font-bold my-3 underline underline-offset-4 one-line">{item?.title}</Link>
                    <p className="two-lines">{item?.sub_title}</p>
                  </div>
                </div>
              )
            }
          </div>
          <button onClick={() => slide('back')} className="min-h-[3rem] hover:bg-slate-100 relative top-[-20rem] border rounded-full bg-white  left-0 min-w-[3rem] text-gray-600 hover:text-black text-2xl transition-all">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={() => slide()} className="min-h-[3rem] relative hover:bg-slate-100 top-[-20rem] border rounded-full bg-white left-[calc(100%-6.5rem)] min-w-[3rem] text-gray-600 hover:text-black text-2xl transition-all">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div> :
        null
    }
  </div>
};

export default Blogs;
