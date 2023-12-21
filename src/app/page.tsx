"use client";
import Comment from "@/components/home/comment";
import Dashboard from "@/components/home/dashboard";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import IntroBanner from "@/components/home/introBanner";
import Nav from "@/components/home/nav";
import Pricing from "@/components/home/pricing";
import Trust from "@/components/home/trust";

export default function Home() {

  return (
    <main>
      <Nav />
      <div className="linear-blue-2 mt-24 lg:mt-0">
        <IntroBanner />
      </div>
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Features />
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl  px-5 md:px-10 mx-auto">
          <Dashboard />
        </div>
      </div>
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Trust />
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl  px-5 md:px-10 mx-auto">
          <Pricing>
            <>
              <h2 className="text-2xl md:text-3xl my-10 font-bold text-center">
                Expand your option with a subscription
              </h2>
              <p className="text-gray-600 pb-10 text-center">
                To choose the right subscription service,
                consider your specific needs and requirements. If you are not sure
                which subscription service is right for you, contact us for a free consultation.
              </p>
            </>
          </Pricing>
        </div>
      </div>
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Comment />
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl px-5 md:px-10 mx-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
