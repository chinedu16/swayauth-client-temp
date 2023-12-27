"use client"
import EditOrg from "@/components/clientarea/credentials/modals/editOrg";
import TableLoader from "@/components/tableLoader";
import { CONST } from "@/lib/constant";
import Link from "@/lib/link";
import { normalRequest } from "@/lib/request";
import { copyText, cropString, dateShort, isPermission } from "@/lib/utils";
import useAppKey from "@/store/hooks/appKey";
import useOrganization from "@/store/hooks/organization";
import { OrganizationData } from "@/store/slice/organization";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faPen, faPlus, faRotateRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Credentials = () => {
  const [orgModal, setOrgModal] = useState(false);
  const [isClient, setIsClient] = useState(false)
  const [orgSelected, setOrgSelected] = useState<OrganizationData | null>(null);
  const { data: appKeyData, loading: appKetLoading, rotateAppKey } = useAppKey()
  const { data: orgData, loading: orgLoading } = useOrganization()
  const toggleOrg = () => {
    setOrgSelected(null)
    setOrgModal(!orgModal)
  };

  useEffect(() => {
    setIsClient(true)
  }, [])

  const editOrg = (obj: OrganizationData | null = null) => {
    setOrgSelected(obj)
    setOrgModal(true)
  }

  const deleteOrg = async (id: string) => {
    const res = await normalRequest(CONST.COMPANY.ORGANIZATION.DELETE + `/${id}`, {}, 'delete')
    toast[res.status ? 'success' : 'error'](res.message)
    if (res.status) {
      //update redux
    }
  }

  return <div className="py-3 md:py-6 px-4 md:px-8">
    <h3 className="text-2xl font-bold">Credentials</h3>
    <div className="relative shadow-md rounded-lg bg-white mt-8">
      <div className="px-5 py-3 text-lg font-semibold text-left mb-2 border-b-4 w-full">
        <h4 className="text-xl">
          Application Key
        </h4>
        <p className="mt-1 text-base font-normal">Your application key is used for administrative purposes only. ie. Creating a new admin account, new organization and tokens, reviewing all organization data e.t.c.</p>
      </div>
      <div className="overflow-x-auto show-scrollbar">
        <table className="w-full text-left">
          <thead className="">
            <tr>
              <th scope="col" className="px-5 pt-1 w-full">
                Key
              </th>
              <th scope="col" className="px-7 pt-1">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td scope="row" className="pl-6 font-normal whitespace-nowrap">
                <span className={`inline-block ${appKetLoading ? 'animate-pulse bg-gray-100 rounded-full' : ''} w-[12rem] sm:w-[25rem] md:w-auto truncate`}>
                  {isClient ? cropString(appKeyData?.key, 50) : null}
                </span>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="flex whitespace-nowrap items-center">
                  <button onClick={rotateAppKey} data-tooltip3="rotate" className="mr-2 active:bg-slate-200 hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faRotateRight} />
                  </button>
                  <button onClick={() => copyText(appKeyData?.key)} data-tooltip3="copy" className="active:bg-slate-200 hover:bg-slate-200 px-1 rounded-full">
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="relative shadow-md rounded-lg bg-white mt-8">
      <div className="pl-5 pr-2 py-2 text-lg font-semibold text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-xl">
            Organizations
          </h4>
          <div className="inline-flex items-center mr-3">
            <button onClick={toggleOrg}
              className="text-white text-base hover:bg-blue-800 bg-blue-700 py-1 px-5 rounded-md">
              <span className="hidden mr-2 sm:inline-block">Create</span>
              <span ><FontAwesomeIcon icon={faPlus} /></span>
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto pb-3 show-scrollbar">
        {
          isClient ?
            <table className="w-full text-left font-normal min-h-24">
              <thead className="bg-slate-100">
                <tr>
                  <th scope="col" className="px-4 py-3 w-0">
                    S/N
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Organization ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tokens
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Created At
                  </th>
                  <th scope="col" className="px-4 py-3 w-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="relative">
                {
                  orgLoading !== 'done' ?
                    <TableLoader row={7} /> :
                    orgData?.length ?
                      orgData?.map((item, i) =>
                        <tr key={i}>
                          <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {i + 1}.
                            </div>
                          </td>
                          <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              <Link href={`/clientarea/credentials/${item.id}`} className="underline underline-offset-2 hover:text-blue-700">
                                {item.name}
                              </Link>
                            </div>
                          </td>
                          <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {item.id}
                              <button onClick={() => copyText(item.id)} className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                            </div>
                          </td>
                          <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {item.organization_token?._count || '0'}
                            </div>
                          </td>
                          <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                            <div className="whitespace-nowrap">
                              {dateShort(item.created_at)}
                            </div>
                          </td>
                          <td className="px-4 pt-2 whitespace-nowrap">
                            <div className="flex whitespace-nowrap items-center">
                              {
                                isPermission('write') &&
                                <button onClick={() => editOrg(item)} className="mr-2 hover:bg-slate-200 px-1 rounded-full" title='edit'>
                                  <FontAwesomeIcon icon={faPen} />
                                </button>
                              }
                              {
                                isPermission('delete') &&
                                <button onClick={() => deleteOrg(item.id)} title="copy" className="hover:bg-slate-200 px-1 rounded-full">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              }
                            </div>
                          </td>
                        </tr>
                      ) :
                      <tr className="relative top-3">
                        <div className="absolute flex items-center justify-center top-0 left-0 text-center w-full">
                          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-lg">No records found!</span>
                        </div>
                      </tr>
                }
              </tbody>
            </table> : null
        }
      </div>
    </div>
    <EditOrg org={orgSelected} toggle={toggleOrg} isOpen={orgModal} />
  </div>;
};

export default Credentials;
