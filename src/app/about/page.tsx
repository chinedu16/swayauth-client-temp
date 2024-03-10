"use client";
import Banner from "@/components/about/banner";
import Info from "@/components/about/info";
import TrustedBy from "@/components/about/trustedBy";
import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";

const About = () => {
  return (
    <main>
      <Nav />
      <div className="linear-blue-1 mt-24 lg:mt-0">
        <div className="max-w-7xl  px-5 md:px-10 mx-auto">
          <Banner />
        </div>
      </div>
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Info />
        {/* <TrustedBy /> */}
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl px-5 md:px-10 mx-auto">
          <Footer />
        </div>
      </div>
    </main>);
};

export default About;
