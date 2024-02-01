import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";

const Privacy = () => {
  return <main>
    <Nav />
    <div className="linear-blue-1 mt-24 lg:mt-0">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <div className="py-10">
          <h4 className="text-lg text-blue-700 mb-3 text-center">PRIVACY</h4>
          <h1 className="text-4xl md:text-6xl text-center leading-[3rem] md:leading-[5rem] font-extrabold">
            Privacy Policy
          </h1>
        </div>
      </div>
    </div>
    <div className="max-w-7xl py-16 px-5 md:px-10 mx-auto">
      <h3 className="text-xl font-bold mb-3">What information does Swayauth collect about you?</h3>
      <ul>
        <li>Name</li>
        <li>Email</li>
        <li>Phone Number</li>
        <li>Ip Address</li>
        <li>Photo</li>
        <li>Address</li>
      </ul> <br />
      <p>
        To help keep our databases current and to provide you the most relevant content and experiences, we may combine information provided by you with information from third party sources, in accordance with applicable law. For example, the size, industry, and other information about the company you work for (where you have provided company name) will be obtained from sources including, professional networking sites and information service providers. We may also collect and receive information from third parties, including partners, and from publicly accessible sources, for purposes that include to deter prevent, or otherwise address fraud, security or technical issues, as well as to protect against harm to the rights, property or safety of Adobe and our employees, our users, children, or the public.
      </p>
      <h5 className="text-md font-bold my-3"> Private information provided by you</h5>
      <p>
        Registration. If you desire to have access to certain restricted sections of the Site or request to receive marketing materials, you may be required to become a
        registered user, and to submit the following types of Personal Information to Buffer:
        your name, email address, phone number, full user name, password, and city.
      </p>
      <p>
        Customer Support. We may collect information through your communications with our customer support team or other communications that you may send us and their contents.
      </p>
      <p>
        Making a Purchase. When you make payments through the Service, you will need to provide Personal Information such as your credit card number and billing address.
      </p>
      <h5 className="text-md font-bold my-3">Private information collect from connected social media account</h5>
      <p>
        If you connect your third party social media account to your Buffer account, we may collect certain information
        stored in your social media account such as:
      </p>
      <p>
        Facebook Buffer may allow you to connect a Facebook page or profile to your Buffer
        account, in which case we will access certain information from Facebook regarding
        your account. In particular, we may collect profile image, display name,
        username / page ID or profile ID, access pokens, to the extent permitted by applicable law. This data will only be used by Buffer to provide you with the Service you expect and will not be shared with any third parties.
      </p>
      <h3 className="text-xl font-bold mt-10 mb-3">What device and useage data do we process</h3>
      <p>
        As is true of most websites, we gather certain information automatically when individual
        users visit our websites. This information may include identifiers, commercial
        information, and internet activity information such as IP address
        (or proxy server information), device and application information,
        identification numbers and features, location, browser type, plug-ins,
        integrations, Internet service provider, mobile carrier,
        operating system, system configuration information, language preferences,
        date and time stamps associated with your usage, and frequency of visits to the websites.
        This Information is used to analyze overall performance, help us provide and improve our websites and secure and maintain our websites.
      </p>
      <h3 className="text-xl font-bold mt-10 mb-3">Security</h3>
      <p>
        We take reasonable steps, including physical, technical and organisational measures, to protect your personal information from unauthorised access and against unlawful processing, accidental loss, destruction and damage. Unfortunately, transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information submitted to us.
      </p>
      <h3 className="text-xl font-bold mt-10 mb-3">Data Security</h3>
      <p>
        We employ commercially reasonable security measures to protect your information;
        however, no system is impenetrable. If you create an account on the Services,
        you are responsible for protecting the security of your account, its content,
        and all activities that occur under the account or in connection
        with the Services. You must immediately notify Swayauth of any
        unauthorized uses of your account or any other breaches of security by
        emailing us at support@swayauth.com.
      </p>
      <h3 className="text-xl font-bold mt-10 mb-3">Information retention</h3>
      <p>
        Your personal information will be retained by Swayauth for the duration of your
        account and may be retained for a certain period after this time as necessary and relevant
        to our legitimate interests, our terms of agreement with you and in
        accordance with applicable legal obligations. This may include retention
        necessary to meet our tax reporting requirements as well as time required to enforce the relevant
        terms of agreement or to identify, issue or resolve legal proceedings.
      </p>
      <h3 className="text-md font-bold my-3">Cookies and other tracking technology</h3>
      <p>
        We may use cookies and other information-gathering technologies for a variety of purposes,
        such as providing us with information about how you interact with our Websites
        and assisting us in our marketing efforts. We may also use cookies
        and similar technologies to provide you advertising based upon your browsing activities
        and interests.
      </p>

    </div>
    <div className="linear-blue-1">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Footer />
      </div>
    </div>
  </main>;
};

export default Privacy;
