import { flattenTree } from "react-accessible-treeview";

export const pricingData = {
  free: [
    "Manual Login",
    "User onboarding (1000)",
    "Organization (1)",
    "Organization Token (2)",
  ],
  standard: [
    "User onboarding (5,000)",
    "Organization Limit (5)",
    "Organization Token  Limit (1,000)",
    "Social Login and Signup (10000)",
    "Email Integration - Swayauth (5,000)",
    "Email Integration - Personal (50,000)",
    "Two-factor authentication (2FA)",
    "Team members (5)",
    "SNS Integration (1000)",
    "Regular support",
  ],
  premium: [
    "User onboarding (50,000)",
    "Organization Limit (20)",
    "Organization Token  Limit (10,000)",
    "Social Login and Signup (100,000)",
    "Email Integration - Swayauth (50,000)",
    "Email Integration - Personal (500,000)",
    "Two-factor authentication (2FA)",
    "Team members (20)",
    "SNS Integration (5000)",
    "Dedicated support",
  ],
};

export const whatOurCustomerSays = [
  {
    name: "Evan Smith",
    image: "",
    text: "SwayAuth has made it so easy for us to manage our authentication and user data. The client dashboard is intuitive and easy to use, and the support team is always responsive and helpful.",
    org: "CEO of ACM Corporation",
  },
  {
    name: "Patrick",
    text: "They helped us to improve the user experience on our website and app. Our users appreciate the convenience of social login and the security of 2FA.",
    org: "CTO of Maxi Company",
    image: "",
  },
  {
    text: "They are reliable and scalable solution. We have been using SwayAuth for over a year, and we have never had any problems.",
    name: "Johnson Scott",
    image: "",
    org: "CFO of GH Enterprises",
  },
  {
    text: "We have reduce our support costs by 20% using Swayauth. We get fewer tickets from our users about authentication and user data issues.",
    name: "Sarah Taylor",
    org: "Customer Support Manager at SRU Corporation",
    image: "",
  },
  {
    text: "SwayAuth is a great partner. The team is responsive and helpful, and they are always willing to go the extra mile to help us succeed.",
    name: "James Taylor",
    image: "",
    org: "Founder of Onize Foundation",
  },
];

const folder = {
  name: "POS",
  children: [
    {
      name: "Auth",
      children: [
        { name: "Auth Token", metadata: { link: "auth-token", req: "DELETE" } },
        { name: "List Users", metadata: { link: "list-users", req: "GET" } },
      ],
    },
    {
      name: "User",
      children: [
        {
          name: "Get User Details",
          metadata: { link: "get-user-details", req: "GET" },
        },
        { name: "Clock In", metadata: { link: "clock-in", req: "POST" } },
      ],
    },
    {
      name: "Product",
      children: [
        {
          name: "List Products",
          metadata: { link: "list-products", req: "GET" },
        },
        {
          name: "Product Stock Report",
          metadata: { link: "product-stock-report", req: "GET" },
        },
        {
          name: "Get One Product",
          metadata: { link: "get-one-product", req: "GET" },
        },
      ],
    },
    {
      name: "Customer",
      children: [
        {
          name: "List Customer",
          metadata: { link: "list-customer", req: "GET" },
        },
        {
          name: "Create Customer",
          metadata: { link: "create-customer", req: "POST" },
        },
      ],
    },
    {
      name: "Sales",
      children: [
        {
          name: "List Sales",
          metadata: { link: "list-sales", req: "GET" },
        },
        {
          name: "Update One Sales",
          metadata: { link: "update-one-sales", req: "PATCH" },
        },
      ],
    },
    {
      name: "Payment",
      children: [
        {
          name: "Payment Methods",
          metadata: { link: "payment-methods", req: "GET" },
        },
      ],
    },
    {
      name: "Customer",
      children: [
        {
          name: "List Customer",
          metadata: { link: "list-customer", req: "GET" },
        },
        {
          name: "Create Customer",
          metadata: { link: "create-customer", req: "POST" },
        },
      ],
    },
  ],
};

export const treeviewData = flattenTree(folder);
