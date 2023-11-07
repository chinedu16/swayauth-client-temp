import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";
import Link from "next/link";

const Page404 = () => {
  return <main>
    <Nav />
    <div className="max-w-7xl px-5 text-center py-28 md:px-10 mx-auto">
      <h1 className="text-9xl font-bold">404</h1>
      <h3 className="text-4xl font-bold my-3">Page Not Found</h3>
      <p className="my-10 px-10">
        The page you are looking for does not exist. Please go back 
        or click the button below to go to the homepage.
      </p>
      <div>
        <Link href='/' className="bg-blue-700 px-10 py-3 text-white rounded-full">Homepage</Link>
      </div>
    </div>
    <div className="linear-blue-1">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Footer />
      </div>
    </div>
  </main>;
};

export default Page404;
