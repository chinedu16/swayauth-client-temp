"use client"

import { useEffect } from "react";

const Social = () => {
  useEffect(() => {
    console.log(window.opener?.postMessage)
    if (window.opener) {
      window.opener.postMessage('TaskComplete', '*');
    }
  }, []);
  return <div>nice</div>;
};

export default Social;
