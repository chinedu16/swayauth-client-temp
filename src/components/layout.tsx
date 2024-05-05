"use client";
import ErrorBoundary from "./errorBoundary";
import NavLeft from "./navLeft";
import NavTop from "./navTop";

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ErrorBoundary>
      <main className="bg-slate-50">
        <NavTop />
        <div className="flex">
          <input type="checkbox" id='hambugger2' className="hidden" />
          <div className="md:w-[calc(100%-220px)] pb-[3rem] w-full bg-slate-100 ml-auto min-h-[calc(100svh-4rem)]">
            {children}
          </div>
          <NavLeft />
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default Layout;
