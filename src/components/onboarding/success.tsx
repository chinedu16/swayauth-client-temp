import Image from "next/image";
import Modal from "../modal";
import Link from "next/link";
import { ReactNode } from "react";

const Success = ({
  isOpen,
  type = 'registration',
  showClickLink = true,
  button = <Link href='/login' className="bg-blue-700 inline-block text-white py-2 px-6 mt-4 rounded-md">Login</Link>,
  link = 'activation' }:
  {
    isOpen: boolean,
    link?: string,
    type?: string
    showClickLink?: boolean
    button?: ReactNode
  }) => {
  return <Modal size="max-w-xl" center isOpen={isOpen} toggle={() => null} >
    <div className="mx-auto transition w-full items-center justify-center flex" >
      <div className="bg-white rounded-md w-full">
        <div className="flex flex-col justify-center items-center p-10 text-center">
          <div>
            <Image src='/verified.png'
              alt=""
              className='w-[6rem] h-[6rem] max-w-[6rem]'
              width={400} height={400} />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl mb-3 font-bold">Your {type} was successful!</h3>
            {showClickLink && <p>Please click the {link} link we sent to your mailbox.</p>}
            {button}
          </div>
        </div>
      </div>
    </div>
  </Modal>
};

export default Success;
