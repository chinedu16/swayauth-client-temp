"use client"
import { CONST } from "@/lib/constant";
import { saveAccessToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SpinnerBall } from "../spinner";

interface DataProp {
  access_token?: string,
  require_password?: boolean,
  email?: string,
  purpose?: 'register' | 'team' | 'two-factor' | 'login'
}

const SocialLogin = ({ data }: { data: DataProp }) => {
  const router = useRouter()

  useEffect(() => {
    if (data?.purpose == 'login' && data?.access_token && typeof window !== 'undefined') {
      saveAccessToken(data.access_token);
      router.replace(CONST.LOCATION.CLIENT_AREA)
    }
  }, []);

  return <div className="w-full h-[100svh] flex items-center justify-center">
    <SpinnerBall size="xl" />
  </div>
};

export default SocialLogin;
