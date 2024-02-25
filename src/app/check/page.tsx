"use client";
import { CONST } from "@/lib/constant";
import { useEffect } from "react";

const CheckPage = () => {

  useEffect(() => {
    try {
      const url = `${CONST.BASE_URL}/auth/google?client_id=65da91b31c1f6515540001e1`
      window?.swayauthInitialize(url, 'GOOGLE-BUTTON', (data) => {
        console.log(data);
      })
    } catch (error: any) { }
  }, []);

  return <main className="h-screen text-center w-screen flex items-center justify-center">
    <div>
      <div className="text-2xl mb-3">Test Login</div>
      <button id="GOOGLE-BUTTON" className="py-2 px-4 bg-blue-700 text-white rounded-md">Google Login</button>
    </div>
  </main>;
};

export default CheckPage;
