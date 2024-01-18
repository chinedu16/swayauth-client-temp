import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";
import NavLink from "@/lib/navLink";

const Page404 = () => {
  return <main>
    <Nav />
    <div className="max-w-7xl px-5 flex flex-col pt-36 pb-20 md:py-28 justify-center items-center md:px-10 mx-auto">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h3 className="text-4xl mt-4">Ooops!</h3>
      <p className="text-center mt-1">The page you are looking for does not exist!</p>
      <NavLink href='/' className="mt-6 bg-blue-700 text-[white] px-4 py-1">GO HOME</NavLink>
    </div>
    <div className="linear-blue-1">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Footer />
      </div>
    </div>
  </main>;
};

export default Page404;
