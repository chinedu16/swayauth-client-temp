import Chart from "@/components/chart";
import Layout from "@/components/layout";
import PieChart from "@/components/pieChart";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faChartColumn, faChartPie, faCheck, faCommentSms, faEnvelope, faRetweet, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";


const thirthyDays = [3, 2, 9, 10, 4, 3, 14]
const thirthyDays2 = [3, 2, 9, 10, 4, 3, 14, 23, 23, 12, 5, 3,]
const thirthyDays3 = [3, 2, 9, 10, 4, 3,]
const thirthyDays4 = [3, 2, 2, 10, 4, 3, 12, 34, 23, 23, 12, 5, 3, 19, 14, 17, 9, 6, 5, 13, 2, 5, 18, 10, 7, 8, 2, 25]
const pieData = {
  facebook: 1,
  google: 4,
  manual: 8
}

const Home = () => {
  return <div className="py-3 md:py-6 px-1 md:px-6">
    <div className="flex flex-wrap items-stretch">
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Total Users</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="">7 days</option>
              <option value="">14 days</option>
              <option value="">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">344</h1>
          <p className="text-sm text-slate-500">Users</p>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faCommentSms} className="mr-2" />
              SMS Sent</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="">7 days</option>
              <option value="">14 days</option>
              <option value="">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">210</h1>
          <p className="text-sm text-slate-500">SMS</p>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email Sent</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="">7 days</option>
              <option value="">14 days</option>
              <option value="">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">34</h1>
          <p className="text-sm text-slate-500">Email</p>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Google Usage</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="">7 days</option>
              <option value="">14 days</option>
              <option value="">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">34</h1>
          <div className="flex justify-between flex-wrap text-sm">
            <p className="text-slate-500">Google</p>
            <div className="bg-green-600 rounded-md px-2 text-white"> <FontAwesomeIcon icon={faCheck} className="mr-1" />Active</div>
          </div>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faFacebook} className="mr-2 text-[1.2rem]" />
              Facebook Usage</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="">7 days</option>
              <option value="">14 days</option>
              <option value="">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">34</h1>
          <div className="flex justify-between flex-wrap text-sm">
            <p className="text-slate-500">Facebook</p>
            <div className="bg-red-600 rounded-md px-2 text-white"> <FontAwesomeIcon icon={faXmark} className="mr-1" />Disabled</div>
          </div>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faRetweet} className="mr-2" />
              Manual Auth</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="">7 days</option>
              <option value="">14 days</option>
              <option value="">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">34</h1>
          <p className="text-sm text-slate-500">Manual</p>
        </div>
      </div>
    </div>
    <div className="p-3 flex flex-wrap items-stretch">
      <div className="w-full xl:w-6/12 xl:pr-3">
        <div className="bg-white border h-full rounded-md shadow-md p-6">
          <div className="flex mb-6 justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faChartColumn} className="mr-2" />
              Registered Users</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="">7 days</option>
              <option value="">1 month</option>
              <option value="">6 months</option>
              <option value="">1 year</option>
            </select>
          </div>
          <Chart data={thirthyDays4} format={'180'} height="h-[18rem]" />
        </div>
      </div>
      <div className="w-full xl:w-6/12  mt-6 xl:mt-0 xl:pl-3">
        <div className="bg-white border h-full rounded-md shadow-md p-6">
          <div className="flex mb-6 justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faChartPie} className="mr-2" />
              Login</h3>
            <select name="" id="" className="outline-none bg-white text-sm">
              <option value="" >7 days</option>
              <option value="">1 month</option>
              <option value="">6 months</option>
              <option value="">1 year</option>
            </select>
          </div>
          <PieChart colors={['rgb(59 130 246)', 'rgb(37 99 235)', 'rgb(29 78 216)']} height={300} width={300} data={pieData} />
        </div>
      </div>
    </div>
  </div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home;
