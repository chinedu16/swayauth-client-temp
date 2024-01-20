"use server"
import SettingNav from "@/components/clientarea/settings/settingNav";
import Layout from "@/components/layout";
import { scope } from "@/store/slice/account";

interface Decoded {
  permissions: ('read' | 'write' | 'delete')[]
  access: 'level_2' | 'level_3'
  scope: scope[]
}


const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return <Layout>
    <div className="py-3 md:py-6 px-4 md:px-8">
      <h3 className="text-2xl font-bold">Settings</h3>
      <SettingNav  />
      <div className="mt-8 w-full">
        {children}
      </div>
    </div>
  </Layout>
};

export default RootLayout;
