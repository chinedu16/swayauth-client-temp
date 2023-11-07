import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Articles = () => {
  return <div>
    <div className="mt-20">
      <div className="flex flex-wrap-reverse mb-20">
        <div className="w-full md:w-7/12">
          <p className="text-slate-500 mb-4">Oct 10, 2023</p>
          <Link href='/blog/introduction-to-swayauth' className="text-2xl md:text-3xl mb-4 font-bold underline-offset-4 underline block">Introduction to SwayAuth</Link>
          <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde eum repellendus rerum obcaecati ipsam, quos excepturi sunt optio fugiat recusandae ad corrupti nostrum laboriosam culpa minus voluptates, soluta quae explicabo?</p>
        </div>
        <div className="w-full md:w-5/12 md:px-6">
          <Image src="/features-3.png" width={930} height={852} alt="" />
        </div>
      </div>
      <div className="flex flex-wrap-reverse  mb-20">
        <div className="w-full md:w-7/12">
          <p className="text-slate-500 mb-4">Oct 10, 2023</p>
          <Link href='/blog/introduction-to-swayauth' className="text-2xl md:text-3xl mb-4 font-bold underline-offset-4 underline block">Introduction to SwayAuth</Link>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde eum repellendus rerum obcaecati ipsam, quos excepturi sunt optio fugiat recusandae ad corrupti nostrum laboriosam culpa minus voluptates, soluta quae explicabo?</p>
        </div>
        <div className="w-full md:w-5/12 md:px-6">
          <Image src="/features-3.png" width={930} height={852} alt="" />
        </div>
      </div>
    </div>
    <div className="text-center">
      <Link href='/blog?page=1'><FontAwesomeIcon icon={faChevronLeft} className="px-4 py-3 bg-blue-700 text-white" /></Link>
      <span className="inline-block mx-2"></span>
      <Link href='/blog?page=2'><FontAwesomeIcon icon={faChevronRight} className="px-4 py-3 bg-blue-700 text-white" /></Link>
    </div>

  </div>;
};

export default Articles;
