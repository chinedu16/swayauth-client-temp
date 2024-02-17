"use client"
import AlertAction from "@/components/alert";
import DropDown from "@/components/dropDown";
import TableLoader from "@/components/tableLoader";
import { CONST } from "@/lib/constant";
import { normalRequest } from "@/lib/request";
import { copyText, cropString, dateLong } from "@/lib/utils";
import useOneOrganization from "@/store/hooks/oneOrganization";
import useOrganzationToken, { OrganizationTokenData } from "@/store/hooks/organizationToken";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faEllipsisV, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NProgress from 'nprogress';
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import CreateCredModal from "../../../../components/clientarea/credentials/modals/createCred";
import EditOrg from "../../../../components/clientarea/credentials/modals/editOrg";

const Company = ({ params }: { params: { organization: string } }) => {
  const [credModal, setCredModal] = useState<{ open: boolean, data: OrganizationTokenData | null }>({ open: false, data: null });
  const [editModal, setEditModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean, token_ids: string[] }>({ open: false, token_ids: [] });
  const router = useRouter()
  const { data, loading, message, updateData } = useOneOrganization(params.organization)
  const { data: token, loading: tokenLoading, addToTokenData, removeTokenData, updateTokenData } = useOrganzationToken(params.organization)

  const back = () => {
    NProgress.start()
    router.back()
  }

  const toggleDeleteTokens = (token_ids?: string[]) => setDeleteModal(p => ({ token_ids: token_ids || p.token_ids, open: !p.open }))
  const toggleCred = (data: OrganizationTokenData | null) => setCredModal(p => ({ data, open: !p.open }))
  const toggleEditCred = () => setEditModal(!editModal)

  const deleteTokens = async (token_ids: string[]) => {
    if (token_ids.length) {
      setDeleteLoading(true)
      const res = await normalRequest(CONST.COMPANY.ORGANIZATION.TOKEN.DELETE, { token_ids }, 'delete');
      setDeleteLoading(false)
      toast[res.status ? 'success' : 'error'](res.message)
      toggleDeleteTokens([])
      if (res.status) {
        removeTokenData(token_ids);
      }
    } else {
      toast.error('Please select a token to delete')
    }
  }

  const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
    setDeleteModal(p => {
      if (e.target.checked) {
        return { ...p, token_ids: (token ? token?.map(d => d.id) : []) as string[] }
      } else {
        return { ...p, token_ids: [] }
      }
    })
  }

  const checkAToken = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
    setDeleteModal(p => {
      if (p.token_ids.indexOf(id) > -1) {
        return { ...p, token_ids: p.token_ids.filter(c => c != id) }
      } else {
        return { ...p, token_ids: [id] }
      }
    })
  }

  return <div className="py-3 md:py-6 px-4 md:px-8">
    <div className="mb-14 flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <button onClick={back} className="text-2xl px-[0.7rem] pt-2 pb-1 active:bg-slate-200 rounded-full items-center text-blue-700 mr-2 sm:mr-6 justify-center "><FontAwesomeIcon icon={faArrowLeft} /></button>
        </div>
        <div className="w-14 h-14 border shadow-sm flex items-center justify-center">
          {
            loading ? <span className="animate-pulse w-full h-full bg-slate-200 relative"></span> :
              <Image src={data?.photo || ''} alt="" className="bg-white object-cover w-full" width={400} height={400} />
          }
        </div>
        <div className="ml-4">
          <h2 className="block truncate max-w-[10rem] md:max-w-[30rem] sm:max-w-[20rem] xs:max-w-[15rem] xxs:max-w-[10rem] text-2xl font-bold">
            {
              loading ?
                <span className="animate-pulse bg-slate-200 h-5 inline-block w-36 rounded-full"></span>
                :
                <span>{data?.name || 'N/A'}</span>
            }
          </h2>
          {
            loading ?
              <span className="animate-pulse bg-slate-200 h-3 inline-block w-24 rounded-full"></span> :
              <small className="inline-block truncate max-w-[10rem] md:max-w-[30rem] sm:max-w-[20rem] xs:max-w-[15rem] xxs:max-w-[10rem]">{data?.website || message?.substring(0, 50)}</small>
          }
        </div>
      </div>
      <div>
        <button disabled={loading} onClick={toggleEditCred} className="text-white disabled:opacity-60 text-base font-semibold  hover:bg-blue-800 bg-blue-700 py-1 px-4 sm:min-w-[6rem] rounded-md"><span className="hidden sm:inline-block">Edit</span><FontAwesomeIcon icon={faPen} className="sm:ml-3" /></button>
      </div>
    </div>

    <div className="relativeshadow-md sm:rounded-lg bg-white mt-8">
      <div className="pl-5 pr-2 py-2 text-lg font-semibold text-left w-full">
        <div className="w-full flex justify-between flex-wrap items-center">
          <h4 className="text-xl">
            Tokens
          </h4>
          <div className="inline-flex items-center">
            <button onClick={() => toggleCred(null)} className="text-white sm:min-w-[6rem] text-base hover:bg-blue-800 bg-blue-700 py-1 px-5 rounded-md">
              <span className="hidden mr-2 sm:inline-block">Create</span>
              <span ><FontAwesomeIcon icon={faPlus} /></span>
            </button>
            <DropDown.Container>
              <DropDown.Toggle hideCaret className="w-[2.5rem] ml-3 h-[2.5rem] inline-flex items-center justify-center overflow-hidden rounded-full">
                <FontAwesomeIcon icon={faEllipsisV} className="text-2xl" />
              </DropDown.Toggle>
              <DropDown.Body className="inline-block right-0 sm:left-auto sm:right-0 top-[calc(100%+0.5rem)] min-w-[10rem] text-base font-normal">
                <ul className="py-2 text-gray-700 dark:text-gray-200 bg-black rounded-md">
                  <li onClick={() => {
                    if (!deleteModal.token_ids.length) {
                      toast.error('Please mark tokens to proceed.');
                    } else {
                      toggleDeleteTokens()
                    }
                  }} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
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
        <table className="w-full text-left font-normal min-h-24">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-4 py-3 w-0">
                <input onChange={checkAll} type="checkbox" name="" className="w-5 h-5 mt-1" />
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                S/N
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Scope
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Client ID
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Secret Key
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Two Factor Types
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Created At
              </th>
              <th scope="col" className="px-4 py-3 w-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody >
            {
              tokenLoading ?
                <TableLoader row={9} /> :
                token?.length ?
                  token?.map((item, i) =>
                    <tr key={i}>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          <input id={item.id} onChange={checkAToken} checked={deleteModal.token_ids.indexOf(item.id as string) > -1} type="checkbox" name="" className="w-5 h-5 mt-1" />
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {i + 1}.
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {item.name}
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap capitalize">
                          {item.scope?.length ? item.scope?.join(', ') : 'N/A'}
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {cropString(item.id, 20)}<button onClick={() => copyText(item.id)} className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {cropString(item.api_key, 20)}<button onClick={() => copyText(item.api_key)} className="inline-block ml-2" title='copy'><FontAwesomeIcon icon={faCopy} /></button>
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap capitalize">
                          {item.two_factor_type?.length ? item.two_factor_type?.join(', ') : 'N/A'}
                        </div>
                      </td>
                      <td scope="row" className="px-4 pt-2 whitespace-nowrap">
                        <div className="whitespace-nowrap">
                          {dateLong(item.created_at)}
                        </div>
                      </td>
                      <td className="px-4 pt-2 whitespace-nowrap">
                        <div className="flex whitespace-nowrap items-center">
                          <button disabled={deleteLoading} onClick={() => toggleCred(item)} className="mr-1 hover:bg-slate-200 disabled:opacity-60 px-1 rounded-full" title='edit'>
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button disabled={deleteLoading} onClick={() => toggleDeleteTokens([item.id as string])} title="delete" className="hover:bg-slate-200 disabled:opacity-60 px-1 mr-1 rounded-full">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button disabled={deleteLoading} onClick={() => copyText(JSON.stringify(item, null, 2))} title="copy" className="hover:bg-slate-200 px-1 disabled:opacity-60 rounded-full">
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                  :
                  <tr className="relative top-3">
                    <div className="absolute flex items-center justify-center top-0 left-0 text-center w-full">
                      <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-lg">No records found!</span>
                    </div>
                  </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
    <CreateCredModal
      addToken={addToTokenData}
      token={credModal.data}
      editToken={updateTokenData}
      organization={params.organization}
      isOpen={credModal.open}
      toggle={() => toggleCred(null)} />

    <EditOrg getEditOrg={updateData} org={data} isOpen={editModal} toggle={toggleEditCred} />

    <AlertAction
      isOpen={deleteModal.open}
      loading={deleteLoading}
      title="Delete Tokens"
      toggle={() => toggleDeleteTokens([])}
      message={<span>Are you sure you want to <b className="text-red-500">delete</b> token(s)? <br /> This action cannot be undone!!!</span>}
      action={() => deleteTokens(deleteModal.token_ids)}
    />

  </div>;
};

export default Company;
