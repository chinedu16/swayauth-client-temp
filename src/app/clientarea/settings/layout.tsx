import Layout from "@/components/layout";
import NavLink from "@/lib/navLink";

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <Layout>
    <div className="py-3 md:py-6 px-4 md:px-8">
      <h3 className="text-2xl font-bold">Settings</h3>
      <div className="mt-8 flex text-center">
        <NavLink href='/clientarea/settings'
          activeClass='border-blue-700 font-bold'
          className="inline-block w-4/12 p-2 border-b-2 transition-all"
        >Account</NavLink>
        <NavLink href='/clientarea/settings/wallet'
          activeClass='border-blue-700 font-bold'
          className="inline-block w-4/12 p-2 border-b-2 transition-all"
        >Wallet</NavLink>
        <NavLink href='/clientarea/settings/plan'
          activeClass='border-blue-700 font-bold'
          className="inline-block w-4/12 p-2 border-b-2 transition-all"
        >Plan</NavLink>
      </div>
      <div className="mt-8 w-full">
        {children}
      </div>
    </div>
  </Layout>
};

export default RootLayout;
