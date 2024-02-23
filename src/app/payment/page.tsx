"use client"

import { useEffect } from "react";

const PaymentPage = ({ searchParams }: { searchParams: { url: string } }) => {
  
  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      window.localStorage.setItem('reloadWallet', 'true');
    });
  }, []);

  return <iframe src={searchParams?.url} className="h-[100vh] w-[100vw]" />;
};

export default PaymentPage;
