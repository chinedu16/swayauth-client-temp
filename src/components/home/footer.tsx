import {
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 pt-16">
      <div className="flex flex-wrap">
        <div className="w-full flex justify-between md:block md:w-4/12">
          <div className="max-w-[7rem]">
            <Image src="/swayauth.png" alt="" width={2281} height={840} />
          </div>
          <div className="md:mt-6">
            <div className="flex items-center text-gray-600 mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              <a href="mailto:info@swayauth.com" className="inline-block">info@swayauth.com</a>
            </div>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faPhone} className="mr-3" />
              <span className="inline-block">234 90 36723 177</span>
            </div>
          </div>
        </div>
        <div className="w-6/12 md:w-2/12 mt-10 md:mt-0">
          <h4 className="text-lg font-bold mb-4">Pages</h4>
          <div className="text-gray-600">
            <div className="mb-2">
              <Link className="" href="/about">
                About
              </Link>
            </div>
            <div className="mb-2">
              <Link className="" href="/doc">
                Doc
              </Link>
            </div>
            <div className="mb-2">
              <Link className="" href="/blog">
                Blog
              </Link>
            </div>
            <div className="mb-2">
              <Link className="" href="/pricing">
                Pricing
              </Link>
            </div>

          </div>
        </div>
        <div className="w-6/12 md:w-2/12 mt-10 md:mt-0">
          <h4 className="text-lg font-bold mb-4">Others</h4>
          <div className="text-gray-600">

            <div className="mb-2">
              <Link className="" href="/#videos">
                Videos
              </Link>
            </div>
            <div className="mb-2">
              <Link className="" href="/terms-and-conditions">
                Terms
              </Link>
            </div>
            <div className="mb-2">
              <Link className="" href="/privacy-policy">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/12 mt-10 md:mt-0">
          <h4 className="text-lg font-bold mb-4">Our Address</h4>
          <div className="text-gray-600">
            <div className="flex">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1 mr-3" />
              <p className="">Lagos, Lekki road 45, Nigeria.</p>
            </div>
            <div className="mt-6">
              <a href="https://linkedin.com/in/johnfash" className="inline-block px-2 py-2 mr-3">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://instagram.com/john_fash" className="inline-block px-2 py-2 mr-3">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://github.com/johnsonfash" className="inline-block px-2 py-2 mr-3">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://stackoverflow.com/users/8145332/johnson-fashanu" className="inline-block px-2 py-2 mr-3">
                <FontAwesomeIcon icon={faStackOverflow} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse flex-wrap items-center mt-4 md:mt-16 py-4 text-gray-600 justify-between align-items-center">
        <div className="flex w-full md:w-auto mb-6 md:mb-0 justify-center">
          @{new Date().getFullYear()} SwayAuth. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
