"use client"

import { CONST } from "@/lib/constant";
import { useEffect } from "react";

const testUrl = `${CONST.BASE_URL}/auth/google?client_id=65da91b31c1f6515540001e1`

const SamplePage = () => {

  useEffect(() => {
    window.swayauthInitialize(testUrl, 'GOOGLE-BUTTON', (data) => {
      console.log(data);
    })
  }, []);

  const handleLogin = () => {

  }

  return <div className="h-screen text-center w-screen flex items-center justify-center">
    <div>
      <div className="text-2xl mb-3">Test Login</div>
      <button id="GOOGLE-BUTTON" onClick={handleLogin} className="py-2 px-4 bg-blue-700 text-white rounded-md">Google Login</button>
    </div>
  </div>;
};

export default SamplePage;
