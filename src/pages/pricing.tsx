import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";
import Pricing from "@/components/home/pricing";
import Faq from "@/components/pricing/faq";
import Learn from "@/components/pricing/learn";

const PricingPage = () => {
  return <main>
    <Nav />
    <div className="linear-blue-1">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Pricing>
          <>
            <h1 className="text-3xl md:text-5xl max-w-4xl mx-auto my-10 font-bold text-center">
              Pricing plan for all your needs.
            </h1>
            <p className="text-gray-600 pb-10 max-w-4xl mx-auto text-center">
              To choose the right subscription service for your business,
              consider your specific needs and requirements. If you are not sure
              which subscription service is right for you, contact us for a free consultation.
            </p>
          </>
        </Pricing>
      </div>
    </div>
    <div className="max-w-7xl  px-5 md:px-10 mx-auto">
      <Learn />
      <Faq />
    </div>
    <div className="linear-blue-1">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Footer />
      </div>
    </div>
  </main>;
};

export default PricingPage;
