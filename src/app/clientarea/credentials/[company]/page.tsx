"use client"
import DropDown from "@/components/dropDown";
import { cropString } from "@/lib/utils";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faEllipsisV, faExpand, faPen, faPlus, faRotateRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateCredModal from "../../../../components/clientarea/credentials/modals/createCred";
import EditOrg from "../../../../components/clientarea/credentials/modals/editOrg";

const Company = () => {
  const [credModal, setCredModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const router = useRouter()
  const toggleCred = () => setCredModal(!credModal)
  const toggleEditCred = () => setEditModal(!editModal)

  return <div className="py-3 md:py-6 px-4 md:px-8">
    <div className="mb-14 flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <button onClick={() => router.back()} className="text-2xl px-[0.7rem] pt-2 pb-1 hover:bg-slate-200 rounded-full items-center text-blue-700 mr-2 sm:mr-6 justify-center "><FontAwesomeIcon icon={faArrowLeft} /></button>
        </div>
        <div className="w-16 h-16 border shadow-sm flex items-center justify-center">
          <Image src='/logo-circle.png' alt="" className='object-cover w-full' width={1232} height={1232} />
        </div>
        <div className="ml-4">
          <h2 className="leading- text-2xl font-bold">Cloutra</h2>
          <small>https://cloutra.com</small>
        </div>
      </div>
      <div>
        <button onClick={toggleEditCred} className="text-white text-lg font-semibold  hover:bg-blue-800 bg-blue-700 py-1 px-5 rounded-md"><span className="hidden sm:inline-block">Edit</span><FontAwesomeIcon icon={faPen} className="sm:ml-3" /></button>
      </div>
    </div>

    <div className="relativeshadow-md sm:rounded-lg bg-white mt-8">
      <div className="p-5 text-lg font-semibold text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-xl">
            Organization Tokens
          </h4>
          <div className="flex items-center">
            <button onClick={toggleCred} className="text-white hover:bg-blue-800 bg-blue-700 py-1 px-5 rounded-md mr-3"><span className="hidden sm:inline-block">Create</span><FontAwesomeIcon icon={faPlus} className="sm:ml-3" /></button>
            <DropDown.Container>
              <DropDown.Toggle hideCaret className="w-[2.5rem] h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full">
                <FontAwesomeIcon icon={faEllipsisV} className="text-3xl" />
              </DropDown.Toggle>
              <DropDown.Body className="inline-block right-0 top-[calc(100%+0.5rem)] min-w-[10rem] text-base font-normal">
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
      <div className="relative overflow-x-auto show-scrollbar pb-3">
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
                Type
              </th>
              <th scope="col" className="px-4 py-3">
                Client ID
              </th>
              <th scope="col" className="px-4 py-3">
                Secret Key
              </th>
              <th scope="col" className="px-4 py-3">
                Scope
              </th>
              <th scope="col" className="px-4 py-3">
                Created At
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody >
            <tr >
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
                  Cloutra Web 1
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Facebook, SMS, Google
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  {cropString('343e229h030jhp-mg36lsq9p', 20)}<button className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  {cropString('343e229h030jhp-mg36lsq9p', 20)}<button className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <span className="inline-block">
                    {cropString('Email, Delete, SMS, Edit, Authorization', 20)}
                  </span>
                  <span className="inline-block ml-2">
                    <button className="hover:bg-slate-200 px-1 rounded-full" title='expand'>
                      <FontAwesomeIcon icon={faExpand} />
                    </button>
                  </span>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-4 pt-2 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-1 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button title="delete" className="hover:bg-slate-200 px-1 mr-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faCopy} />
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
                  Cloutra iOS
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Facebook, SMS, Google
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  {cropString('343e229h030jhp-mg36lsq9p', 20)}<button className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  {cropString('343e229h030jhp-mg36lsq9p', 20)}<button className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  <span className="inline-block">
                    {cropString('Email, Delete, SMS, Edit, Authorization', 20)}
                  </span>
                  <span className="inline-block ml-2">
                    <button className="hover:bg-slate-200 px-1 rounded-full" title='expand'>
                      <FontAwesomeIcon icon={faExpand} />
                    </button>
                  </span>
                </div>
              </td>
              <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                <div className="whitespace-nowrap">
                  Oct 23, 2023
                </div>
              </td>
              <td className="px-4 pt-2 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button className="mr-1 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button title="delete" className="hover:bg-slate-200 px-1 mr-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} />
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
    <CreateCredModal isOpen={credModal} toggle={toggleCred} />
    <EditOrg title="Edit Organisation" isOpen={editModal} toggle={toggleEditCred} />
  </div>;
};

export default Company;
