"use client"
import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";

const Error = () => {
  const reload = () => {
    if (typeof window !== "undefined") {
      window?.location?.reload();
    }
  }
  return <main>
    <Nav />
    <div className="max-w-7xl px-5 flex flex-col pt-36 pb-20 md:py-28 justify-center items-center md:px-10 mx-auto">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h3 className="text-4xl mt-4">Ooops!</h3>
      <p className="text-center mt-1">Something went wrong!</p>
      <button onClick={reload} className="mt-6 bg-blue-700 text-[white] px-4 py-1">Reload</button>
    </div>
    <div className="linear-blue-1">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Footer />
      </div>
    </div>
  </main>;
};

export default Error;
