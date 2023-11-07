import { faBox, faChartPie, faChartSimple, faCheck, faEnvelope, faEye, faListUl, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Learn = () => {
  return <div className="mt-2 pt-10 pb-10">
    <h3 className="font-bold text-2xl md:text-3xl max-w-5xl text-center my-10">
      Learn what you get in every plan
    </h3>
    <p className="text-gray-600 pb-4 max-w-4xl mx-auto text-center">
      To choose the right subscription service for your business.
    </p>
    <div className="mt-6 flex flex-wrap">
      <div className="w-full mb-6 sm:w-6/12 md:w-4/12 p-3">
        <div>
          <div className="text-3xl mb-4 text-blue-700"><FontAwesomeIcon icon={faEnvelope} /></div>
          <h3 className="text-xl mb-4 font-bold">Email & SMS integration</h3>
          <div>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">SMS token</span>
            </p>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">Two-factor authentication</span>
            </p>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">Email token</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mb-6 sm:w-6/12 md:w-4/12 p-3">
        <div>
          <div className="text-3xl mb-4 text-blue-700"><FontAwesomeIcon icon={faLock} /></div>
          <h3 className="text-xl mb-4 font-bold">Integrate social login</h3>
          <div>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">Google login</span>
            </p>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">Facebook login</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mb-6 sm:w-6/12 md:w-4/12 p-3">
        <div>
          <div className="text-3xl mb-4 text-blue-700"><FontAwesomeIcon icon={faChartPie} /></div>
          <h3 className="text-xl mb-4 font-bold">Reporting and analytics data</h3>
          <div>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">Customer records</span>
            </p>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">Usage metrics</span>
            </p>
            <p className="mb-2">
              <span className="inline-block mr-4 text-blue-700"><FontAwesomeIcon icon={faCheck} /></span>
              <span className="text-slate-700">Manage auth flow</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Learn;
