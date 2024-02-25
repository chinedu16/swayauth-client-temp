"use client"

import { useEffect, useState } from "react";


const PaymentPage = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(location.search)) as { url: string }
    setUrl(searchParams?.url||'')
    window.addEventListener('beforeunload', (event) => {
      window.localStorage.setItem('reloadWallet', 'true');
    });
  }, []);

  return <iframe src={url} className="h-[100vh] w-[100vw]" />;
};

export default PaymentPage;
