import { CONST } from "@/lib/constant"
import { normalRequest } from "@/lib/request"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

interface SearchParamsProp {
  token?: string
  intent?: 'register' | 'team' | 'two-factor' | 'switch-account'
  as?: 'client' | 'user',
  account?: 'old' | 'new'
  email?: string
  reference?: string
}

const getVerifyReq = async (query: SearchParamsProp) => {
  if (query.token && query.reference && Number(query.token)) {
    const header = {
      "x-api-key": process.env.SWAYAUTH_IDENTITY
    }
    let url = CONST.AUTH.MANUAL_REGISTER_VERIFY
    switch (query.intent) {
      case 'team':
        url = CONST.AUTH.MANUAL_REGISTER
        break;
      case 'two-factor':
        url = CONST.AUTH.MANUAL_REGISTER
        break;
    }
    return await normalRequest(url, { token: query.token, reference: query.reference }, 'post', false, header)
  }
  return { message: 'Invalid token', status: false, data: null }
}

const Verify = async ({ searchParams }: { searchParams: SearchParamsProp }) => {
  const { message, status } = await getVerifyReq(searchParams);

  return <div className="flex items-center justify-center h-screen">
    <Head>
      <title>Swayauth - Email verification</title>
    </Head>
    <div className="w-full md:w-5/12 text-center px-3">
      <Image src={status ? '/verified.png' : '/alert-1.png'} alt="verify" width={100} height={100} className="m-auto" />
      <h1 className="text-[25px] font-[600] mt-6">{status ? 'Congratulations!' : 'Error Occurred!'}</h1>
      <div className="mt-2 block ">{`${message}`}.</div>
      <div className="mt-3"> You can also contact the support team for any technical assistance.</div>
      <Link href="/login" className="text-[13px] text-blue-700 underline mt-6 block">
        Go to Swayauth login page
      </Link>
    </div>
  </div>
};

export default Verify;