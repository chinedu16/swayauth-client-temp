import FaqComponent from 'react-faq-component';
const colOne = {
  rows: [
    {
      title: "What is Swayauth?",
      content: `Swayauth is a cloud platform that simplifies user onboarding 
      for your application. Easily manage your userbase and onboard users from web,
       desktop and mobile platforms seamlessly.`
    },
    {
      title: "Do you provide a free plan?",
      content: <div>
        <p>• Yes we do. Your plan automatically upgrades as your usage grows.</p>
        <p className='mt-1'>•  You can check our pricing plan here.</p>
      </div>
    },
    {
      title: "How do I integrate Swayauth into my site?",
      content: `Please check our developer documentation and blog for more details.`
    },
  ]
}
const colTwo = {
  rows: [
    {
      title: "Do you support social login?",
      content: "Yes we support registering users via a Google or Facebook account."
    },
    {
      title: "Do you support Multi-Factor Authentication?",
      content: "Yes, our platform allows you to enable multi-factor authentication for your users."
    }
  ]
}
const Faq = () => {
  return <div>
    <h3 className="font-bold text-2xl md:text-3xl max-w-5xl text-center mb-6">
      Frequently asked questions
    </h3>
    <div className='flex flex-wrap pb-6'>
      <div className='w-full md:w-6/12 md:px-3'>
        <div>
          <FaqComponent data={colOne as any} />
        </div>
      </div>
      <div className='w-full md:w-6/12 md:px-3'>
        <FaqComponent data={colTwo as any} />
      </div>
    </div>
  </div>;
};

export default Faq;
