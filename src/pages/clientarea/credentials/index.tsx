import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faPen, faPlus, faRotateRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";
import EditOrg from "../../../components/clientarea/credentials/modals/editOrg";
import { cropString } from "@/lib/utils";
import DropDown from "@/components/dropDown";
import Link from "next/link";
import Layout from "@/components/layout";

const Credentials = () => {
  const [orgModal, setOrgModal] = useState(false);
  const toggleOrg = () => setOrgModal(!orgModal);

  return <div className="py-3 md:py-6 px-4 md:px-8">
    <h3 className="text-2xl font-bold">Credentials</h3>
    <div className="relative shadow-md sm:rounded-lg bg-white mt-8">
      <div className="p-5 text-lg font-semibold text-left mb-2 border-b-4 w-full">
        <h4 className="text-xl">
          Administration Key
        </h4>
        <p className="mt-1 text-base font-normal">Your administrative key is used for administrative purposes only. ie. Creating a new admin account, new organization and APN tokens, reviewing all organization data.</p>
      </div>
      <div className="overflow-x-auto show-scrollbar">
        <table className="w-full text-left">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 pt-3 w-full">
                API Key
              </th>
              <th scope="col" className="px-6 pt-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <th scope="row" className="px-6 pb-2 font-normal whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <span className="inline-block">{cropString('7933973973-eidbeidbebiudebiuebiuebdibdeibiebu.appss.googletest.com', 50)}</span>
                  <span className="inline-block"></span>
                </div>
              </th>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='delete'>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='rotate'>
                    <FontAwesomeIcon icon={faRotateRight} />
                  </button>
                  <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="relative shadow-md sm:rounded-lg bg-white mt-8">
      <div className="px-5 pt-5 text-lg font-semibold text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-xl mb-5">
            Organisations
          </h4>
          <div className="flex w-full flex-row-reverse sm:flex-row sm:w-auto justify-between items-center mb-5">
            <button onClick={toggleOrg} className="text-white hover:bg-blue-800 bg-blue-700 py-1 px-5 rounded-md">Create<FontAwesomeIcon icon={faPlus} className="ml-2" /></button>
            <DropDown.Container>
              <DropDown.Toggle hideCaret className="w-[2.5rem] sm:ml-3 h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full">
                <FontAwesomeIcon icon={faEllipsisV} className="text-3xl" />
              </DropDown.Toggle>
              <DropDown.Body className="inline-block left-0 sm:left-auto sm:right-0 top-[calc(100%+0.5rem)] min-w-[10rem] text-base font-normal">
                <ul className="py-2 text-gray-700 dark:text-gray-200 bg-black rounded-md">
                  <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                    <FontAwesomeIcon icon={faRotateRight} className="w-[1rem]" />
                    <span className="ml-3">Rotate</span>
                  </li>
                  <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                    <FontAwesomeIcon icon={faTrash} className="w-[1rem]" />
                    <span className="ml-3">Delete</span>
                  </li>
                </ul>
              </DropDown.Body>
            </DropDown.Container>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto pb-3 show-scrollbar">
        <table className="w-full text-left font-normal">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-4 py-3 w-0">
                <input type="checkbox" name="" className="w-5 h-5 mt-1" />
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                S/N
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Org. ID
              </th>
              <th scope="col" className="px-4 py-3">
                APNs
              </th>
              <th scope="col" className="px-4 py-3">
                Created At
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <input type="checkbox" name="" className="w-5 h-5 mt-1" />
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  1.
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <Link href='/credentials/343e229h030jhp-mg36lsq9p' className="underline underline-offset-2 hover:text-blue-700">Cloutra</Link>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  343e229h030jhp-mg36lsq9p<button className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  10
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-4 pt-2 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr >
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <input type="checkbox" name="" className="w-5 h-5 mt-1" />
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  2.
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <Link href='/credentials/343e229h030jhp-mg36lsq9p' className="underline underline-offset-2 hover:text-blue-700">Roadlers</Link>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  mg36lsq9p-343e229h030jhp<button className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  3
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-4 pt-2 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr >
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <input type="checkbox" name="" className="w-5 h-5 mt-1" />
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  3.
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <Link href='/credentials/343e229h030jhp-mg36lsq9p' className="underline underline-offset-2 hover:text-blue-700">Cloutra 2</Link>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  t536lsq9p-343e229h030jhp<button className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  4
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-4 pt-2 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditOrg toggle={toggleOrg} isOpen={orgModal} title="Create Organisation" />
  </div>;
};

Credentials.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Credentials;
