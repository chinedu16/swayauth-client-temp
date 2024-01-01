import Input from "@/components/input"
import TeamSignup from "@/components/onboarding/teamSignup"
import { CONST } from "@/lib/constant"
import { normalRequest } from "@/lib/request"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface SearchParamsProp {
  token?: string
  intent?: 'register' | 'team' | 'two-factor'
  as?: 'client' | 'user',
  account?: 'old' | 'new'
  email?: string
  reference?: string
}

const getVerifyReq = async (query: SearchParamsProp): Promise<ResponseProp<null | { require_password?: boolean, email?: string, purpose?: SearchParamsProp['intent'] }>> => {
  console.log(query)
  if (query.token && query.reference && Number(query.token)) {
    const header = {
      "x-api-key": process.env.SWAYAUTH_IDENTITY
    }
    let url = CONST.AUTH.MANUAL_REGISTER_VERIFY
    if (query?.intent === 'team' && query?.account === 'new') {
      let url = CONST.AUTH.TOKEN_VERIFY + `?token=${query.token}&reference=${query.reference}`
      return await normalRequest(url, {}, 'get', false, header)
    }
    return await normalRequest(url, { token: query.token, reference: query.reference }, 'post', false, header)
  }
  return { message: 'Invalid token', status: false, data: null }
}

const Verify = async ({ searchParams }: { searchParams: SearchParamsProp }) => {
  const { message, status, data } = await getVerifyReq(searchParams);

  return <div className="flex items-center justify-center h-screen">
    <Head>
      <title>Swayauth - Verification</title>
    </Head>
    {
      data?.require_password ?
        <div className="w-full mx-2 sm:mx-0 sm:w-8/12 md:w-6/12 lg:w-[500px] p-6 border">
          <p className="text-center font-semibold mb-3">Sign Up to continue</p>
          <TeamSignup email={data.email} />
          <Link href="/login" className="text-[13px] text-blue-700 text-center underline mt-8 block">
            Go to Swayauth login page
          </Link>
        </div>
        :
        <div className="w-full md:w-5/12 text-center px-3">
          <Image src={status ? '/verified.png' : '/alert-1.png'} alt="verify" width={100} height={100} className="m-auto" />
          <h1 className="text-[25px] font-[600] mt-6">{status ? 'Congratulations!' : 'Error Occurred!'}</h1>
          <div className="mt-2 block ">{`${message}`}.</div>
          <div className="mt-3"> You can also contact the support team for any technical assistance.</div>
          <Link href="/login" className="text-[13px] text-blue-700 underline mt-6 block">
            Go to Swayauth login page
          </Link>
        </div>
    }
  </div>
};

export default Verify;