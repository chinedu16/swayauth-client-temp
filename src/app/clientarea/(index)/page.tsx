"use client"
import Chart from "@/components/chart";
import PieChart from "@/components/pieChart";
import { SpinnerCircle2 } from "@/components/spinner";
import { money } from "@/lib/utils";
import useGraph from "@/store/hooks/graph";
import useStatistics from "@/store/hooks/statistic";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faChartColumn, faChartPie, faCheck, faCommentSms, faEnvelope, faRetweet, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";


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
  const { data, status, message, updateOneStatistic } = useStatistics();
  const { data: {
    login:
    { duration: loginDuration,
      facebook,
      google,
      manual,
      loading: loginLoading
    }, register },
    status: graphStatus,
    message: graphMessage,
    updateLoginStatistic,
    updateRegisterStatistic } = useGraph();
  const [regUserDuration, setRegUserDuration] = useState<any>('7');

  useEffect(() => {
    if (!status && message) toast.error(message);
  }, [status]);

  const changeRegUserFormat = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const format = v[0] == '7' ? '7' : v[0] == '3' ? '30' : v[0] == '6' ? '180' : '360'
    console.log(format);
    setRegUserDuration(format);
  }

  return <div className="py-3 md:py-6 px-1 md:px-6">
    <div className="flex flex-wrap items-stretch">
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Total Users</h3>
            <select disabled={data.users.loading == 'true'} defaultValue={data.users.duration} onChange={(e) => updateOneStatistic('users', e.target.value)} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="14_days">14 days</option>
              <option value="30_days">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {
              data.users.loading == 'true' ?
                <SpinnerCircle2 size="md" /> :
                money(data.users.count, false)
            }
          </h1>
          <p className="text-sm text-slate-500">Users</p>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faCommentSms} className="mr-2" />
              SMS Sent</h3>
            <select disabled={data.sms.loading == 'true'} defaultValue={data.sms.duration} onChange={(e) => updateOneStatistic('sms', e.target.value)} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="14_days">14 days</option>
              <option value="30_days">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {
              data.sms.loading == 'true' ?
                <SpinnerCircle2 size="md" /> :
                money(data.sms.count, false)
            }
          </h1>
          <p className="text-sm text-slate-500">SMS</p>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email Sent</h3>
            <select disabled={data.mail.loading == 'true'} defaultValue={data.mail.duration} onChange={(e) => updateOneStatistic('mail', e.target.value)} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="14_days">14 days</option>
              <option value="30_days">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {
              data.mail.loading == 'true' ?
                <SpinnerCircle2 size="md" /> :
                money(data.mail.count, false)
            }
          </h1>
          <p className="text-sm text-slate-500">Email</p>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Google Usage</h3>
            <select disabled={data.google.loading == 'true'} defaultValue={data.google.duration} onChange={(e) => updateOneStatistic('google', e.target.value)} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="14_days">14 days</option>
              <option value="30_days">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {
              data.google.loading == 'true' ?
                <SpinnerCircle2 size="md" /> :
                money(data.google.count, false)
            }
          </h1>
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
            <select disabled={data.facebook.loading == 'true'} defaultValue={data.facebook.duration} onChange={(e) => updateOneStatistic('facebook', e.target.value)} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="14_days">14 days</option>
              <option value="30_days">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {
              data.facebook.loading == 'true' ?
                <SpinnerCircle2 size="md" /> :
                money(data.facebook.count, false)
            }
          </h1>
          <div className="flex justify-between flex-wrap text-sm">
            <p className="text-slate-500">Facebook</p>
            <div className="bg-green-600 rounded-md px-2 text-white"> <FontAwesomeIcon icon={faCheck} className="mr-1" />Active</div>
          </div>
        </div>
      </div>
      <div className="p-3 w-full md:w-6/12 lg:w-4/12">
        <div className="p-6 h-full bg-white border rounded-md shadow-md">
          <div className="flex justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faRetweet} className="mr-2" />
              Manual Auth</h3>
            <select disabled={data.manual.loading == 'true'} defaultValue={data.manual.duration} onChange={(e) => updateOneStatistic('manual', e.target.value)} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="14_days">14 days</option>
              <option value="30_days">30 days</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {
              data.manual.loading == 'true' ?
                <SpinnerCircle2 size="md" /> :
                money(data.manual.count, false)
            }
          </h1>
          <p className="text-sm text-slate-500">Login / Register</p>
        </div>
      </div>
    </div>
    <div className="p-3 flex flex-wrap items-stretch">
      <div className="w-full xl:w-6/12 xl:pr-3">
        <div className="bg-white overflow-hidden border h-full rounded-md shadow-md p-6">
          <div className="flex mb-6 justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faChartColumn} className="mr-2" />
              Registered Users</h3>
            <select disabled={register.loading === 'true'} defaultValue={register.duration} onChange={updateRegisterStatistic} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="30_days">1 month</option>
              <option value="6_months">6 months</option>
              <option value="1_year">1 year</option>
            </select>
          </div>
          <Chart loading={register.loading === 'true'} data={register.graph} format={register.format} height="h-[18rem]" />
        </div>
      </div>
      <div className="w-full xl:w-6/12  mt-6 xl:mt-0 xl:pl-3">
        <div className="bg-white border h-full rounded-md shadow-md p-6">
          <div className="flex mb-6 justify-between flex-wrap">
            <h3 className="text-lg">
              <FontAwesomeIcon icon={faChartPie} className="mr-2" />
              Login</h3>
            <select disabled={loginLoading === 'true'} defaultValue={loginDuration} onChange={updateLoginStatistic} className="outline-none bg-white text-sm">
              <option value="7_days">7 days</option>
              <option value="30_days">1 month</option>
              <option value="6_months">6 months</option>
              <option value="1_year">1 year</option>
            </select>
          </div>
          <PieChart loading={loginLoading === 'true'} colors={['rgb(59 130 246)', 'rgb(37 99 235)', 'rgb(29 78 216)']} height={300} width={300} data={{ facebook, google, manual }} />
        </div>
      </div>
    </div>
  </div>;
};

export default Home;
