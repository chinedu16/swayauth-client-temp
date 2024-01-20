"use server"
import SettingNav from "@/components/clientarea/settings/settingNav";
import Layout from "@/components/layout";
import { CONST } from "@/lib/constant";
import NavLink from "@/lib/navLink";
import { scope } from "@/store/slice/account";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface Decoded {
  permissions: ('read' | 'write' | 'delete')[]
  access: 'level_2' | 'level_3'
  scope: scope[]
}

const isAccess = (access?: 'level_2' | 'level_3') => {
  try {
    const tk = cookies().get(CONST.ACCESS_TOKEN)?.value as never ?? ''
    return jwtDecode<Decoded>(tk).access == access
  } catch (error: any) {
    return false
  }
}

const isSuperAdmin = isAccess('level_3')

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return <Layout>
    <div className="py-3 md:py-6 px-4 md:px-8">
      <h3 className="text-2xl font-bold">Settings</h3>
      <SettingNav isSuperAdmin={isSuperAdmin} />
      <div className="mt-8 w-full">
        {children}
      </div>
    </div>
  </Layout>
};

export default RootLayout;
