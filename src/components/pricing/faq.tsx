import FaqComponent from 'react-faq-component';
const colOne = {
  rows: [
    {
      title: "How to buy labs",
      content: `Purchasing labs on Cloutra is a straightforward process, made even more accessible with our generous offer. When you sign up, we provide you with 30 free credits to kickstart your learning journey. You can browse our diverse range of labs, select the one that suits your interests and learning objectives, and simply use your credits to make the purchase. Your first lab is on us, thanks to the free credits! Once purchased, you can dive into the lab immediately and begin gaining hands-on experience in the tech domain of your choice. Cloutra is here to make learning both accessible and rewarding. `
    },
    {
      title: "How to purchase credits? ",
      content: "Adding credits to your Cloutra account is a quick and seamless process. After signing in, navigate to your account settings, where you'll find the option to purchase additional credits. Simply choose the credit package that suits your needs, proceed to payment, and your credits will be added to your account in no time. These credits can be used to unlock a wide variety of labs in our marketplace, enhancing your learning experience. We've made it easy to ensure you have the resources you need to explore and excel in the world of tech learning. "
    },
    {
      title: "How to request a refund? ",
      content: "At Cloutra, we value your satisfaction, and we understand that sometimes circumstances change. If you need to request a refund for a lab purchase, simply reach out to our support team through your account dashboard. Provide the necessary details, including the lab name, purchase date, and the reason for your refund request. Our dedicated support team will review your request promptly and assist you in processing your refund. Your satisfaction is our priority, and we're here to ensure you have a seamless experience with Cloutra. "
    }
  ]
}
const colTwo = {
  rows: [
    {
      title: "How to set up a creator account? ",
      content: `Setting up your creator account on Cloutra is a straightforward process. Begin by signing up for a Cloutra account if you haven't already. Once you're logged in, navigate to your account settings and select the "Become a Creator" option. Follow the step-by-step prompts to complete your creator profile, including adding your credentials, areas of expertise, and lab creation preferences. You can upload your labs, set your own prices, and gain exposure to a global audience of eager learners. Our user-friendly interface ensures a seamless experience throughout the setup process. Join our community of tech professionals and start sharing your expertise today! `
    },
    {
      title: "How to set price for labs?  ",
      content: "Setting a price for your labs on Cloutra is easy and flexible. After becoming a creator on our platform, you can access your creator dashboard. From there, select the lab you'd like to set a price for, and you'll find an option to specify the cost. You have the freedom to choose a price that reflects the value of your lab content. Whether you want to offer it for free or set a specific price, Cloutra provides you with the tools to make pricing decisions that suit your goals. Plus, you can adjust your prices at any time based on user feedback or market trends. Join us as a creator and start earning income by sharing your knowledge with our community of learners! "
    },
    {
      title: "How to check approval status of labs? ",
      content: "To check the approval status of your labs on Cloutra, simply log in to your creator dashboard. Within the dashboard, you'll find a section dedicated to lab management. There, you can view a list of all your uploaded labs, each displaying its approval status. Labs typically go through a review process to ensure they meet our quality standards and align with our guidelines. You'll be able to see whether a lab is pending review, approved, or if any revisions are required. This transparency allows you to track the progress of your labs and ensure they meet the high-quality standards we uphold at Cloutra. "
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
