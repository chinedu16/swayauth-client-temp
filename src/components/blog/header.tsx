"use client"

import { CONST } from "@/lib/constant";
import { FormData } from "@/lib/form";
import { normalRequest } from "@/lib/request";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { SpinnerCircle2 } from "../spinner";
import Input from "../input";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const data = FormData(e, ['email'])
    setLoading(true)
    const res = await normalRequest(CONST.NEWSLETTER.JOIN, data, 'post', false)
    toast[res.status ? 'success' : 'error'](res.message);
    setLoading(false)
  }
  return <div className="py-10">
    <h1 className="text-3xl font-bold text-blue-700 mb-3">Blog</h1>
    <p className="">Subscribe to our newsletters</p>
    <div className="flex mt-6">
      <form onSubmit={handleSubmit} className="w-full flex items-center md:w-6/12">
        <Input disabled={loading} type="email" placeholder="Enter email" name='email'
          className="mr-3 md:min-w-[20rem]"
        />
        <button disabled={loading} type="submit" className="px-4 inline-flex min-w-28 justify-center items-center rounded-sm text-white hover:bg-blue-800 py-[0.62rem] bg-blue-700">
          {loading ? <span className="inline-block"><SpinnerCircle2 color="white" /></span> : 'Subscribe'}
        </button>
      </form>
    </div>
    <p className="mt-3">You can unsubscribe at anytime.</p>

  </div>;
};

export default Header;
