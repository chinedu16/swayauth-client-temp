"use client"

import { SpinnerCircle2 } from "@/components/spinner";
import Image from "next/image";
import { useEffect, useState } from "react";

const Social = () => {
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      window.opener.postMessage('TaskComplete-opener', 'http://localhost:3000');
    } catch (error: any) {
      console.log(error);
    }
    try {
      window.parent.postMessage('TaskComplete-parent', '*');
    } catch (error: any) {
      console.log(error);
    }
    try {
      window.parent.localStorage.setItem('trial-parent', 'trial');
    } catch (error: any) {
      console.log(error);

    }
    try {
      window.opener.localStorage.setItem('trial-opener', 'trial');
    } catch (error: any) {

      console.log(error);
    }
    try {
      window.opener.postMessage('TaskComplete-opener*', '*');
    } catch (error: any) {
      console.log(error);
    }
    try {
      const searchParams = Object.fromEntries(new URLSearchParams(location.search)) as { status: 'true' | 'false', message: string, origins?: string }
      setError(!searchParams?.origins)
      console.log(window.opener)
      window.opener.postMessage('TestComplete-last', '*');
      if (window.opener) {
        console.log(searchParams);
        (window.opener || window.parent).postMessage({
          body: searchParams,
          title: "SWAYAUTH-SOCIAL-AUTHENTICATION"
        }, '*');
        setError(null)
      }

    } catch (error: any) {
      console.log(error);

    }
  }, []);

  return <div className="flex items-center justify-center h-screen">
    {
      error ?
        <div className="w-full md:w-5/12 text-center px-3">
          <Image src='/alert-1.png' alt="verify" width={100} height={100} className="m-auto" />
          <h1 className="text-[25px] font-[600] mt-6">Error Occurred!</h1>
          <div className="mt-2 block ">Invalid server setup.</div>
          <div className="mt-3"> You can also contact the support team for any technical assistance.</div>
        </div> :
        <SpinnerCircle2 size="lg" />
    }
  </div>;
};

export default Social;
