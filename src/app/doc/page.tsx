"use client";
import { FolderIcon } from "@/components/doc/treeview";
import Inner from "@/components/home/documentation/inner";
import Nav from "@/components/home/nav";
import useDocManager from "@/lib/doc/docManager";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import TreeView from "react-accessible-treeview";
import Markdown from 'react-markdown';
import pm from '../../lib/doc/swayauth-doc-2024.json';

const Doc = () => {
  const [isClient, setIsClient] = useState(false);
  const { handle, leftPanel, rightPanel, folderData } = useDocManager(pm)

  useEffect(() => {
    setIsClient(true)
  }, []);

  return (
    <main className="relative box-border bg-slate-900 text-slate-300">
      <Nav bg="bg-slate-900 text-slate-300 shadow-xl" maxWidth="mx-auto" />
      <div className="mt-[4.5rem] lg:mt-0 flex">
        <input type="checkbox" name="" id="doc-nav" defaultChecked className="hidden" />
        <div ref={leftPanel} className="no-scrollbar left-0 z-20 fixed rounded-t-sm py-6 px-5 bg-slate-800 treeview break-keep w-[340px] lg:w-[420px] whitespace-nowrap lg:relative overflow-auto h-[calc(100vh-4.5rem)] lg:h-[calc(100vh-5rem)]">
          <TreeView
            data={folderData}
            aria-label="directory tree"
            propagateCollapse
            defaultExpandedIds={folderData?.map((data: any) => data?.id)}
            nodeRenderer={({
              element,
              isBranch,
              isExpanded,
              getNodeProps,
              level,
            }) => (
              <div {...getNodeProps()} style={{ paddingLeft: 30 * (level - 1), marginBottom: '5px' }}>
                {isBranch ? (
                  <div className="text-[1.1rem] font-extrabold"><FolderIcon isOpen={isExpanded} />  {element.name}</div>
                ) : (
                  <div className="flex items-center border-b border-slate-600">
                    <span className={`text-[0.5rem] min-w-[37px] pb-1 uppercase pr-2 ${element.metadata?.method}`}>{element.metadata?.method || 'GET'}</span>
                    <Link className="w-full pb-1" href={'#' + element.metadata?.link}>{element.name}</Link>
                  </div>
                )}
              </div>
            )}
          />
          <span ref={handle} className="hover:bg-blue-500 rounded-full absolute top-0 w-[5px] h-full cursor-ew-resize right-0 inline-block z-10"></span>
        </div>
        <div ref={rightPanel} className="overflow-auto doc-panel w-full p-6 h-[calc(100svh-4.5rem)] lg:h-[calc(100svh-5rem)]">
          <div className="w-full">
            <h1 className='text-3xl font-bold mb-10'>
              {pm.info.name}
            </h1>
            <div>
              <div className='w-full lg:w-6/12'>
                <div className='text-slate-300 mb-10 pr-6 markdown'>
                  {
                    isClient ?
                      <Markdown>{pm.info.description}</Markdown>
                      : null
                  }
                </div>
                {
                  pm.auth ?
                    <div className='flex mb-10 border-b border-slate-500 pb-1'>
                      <h4 className='text-md'>AUTHORIZATION</h4>
                      <p className='ml-2 text-slate-500 capitalize whitespace-nowrap'>{pm.auth.type} {pm.auth?.bearer[0]?.key || 'token'}</p>
                    </div> : null
                }
                <h3 className='text-lg mb-4 pr-6'>BASE URL —<span className='text-sm ml-1'>&#123;&#123;base_url&#125;&#125;</span></h3>
                <div className='bg-slate-800 text-sm mb-10 px-3 mr-6 py-2 rounded-lg'>
                  https://api.swayauth.com/v1
                </div>
              </div>
            </div>
            {
              pm.item.map((folder, fidx) => {
                return folder?.item?.length ?
                  <>
                    <h3 className="text-2xl mb-6">{folder?.name}</h3>
                    {
                      folder?.item?.map((api, idxs) => {
                        return <Inner folder={api} key={idxs} />
                      })
                    }
                  </> :
                  <>
                    <h3 className="text-2xl mb-6">{folder?.name}</h3>
                    <Inner folder={folder} key={fidx} />
                  </>
              })
            }
          </div>
        </div>
        <label htmlFor="doc-nav"
          className="inline-flex items-center rotate-90 justify-center cursor-pointer z-40 lg:hidden fixed bottom-10 right-0 text-sm rounded-full bg-black px-3 py-[0.5rem]">
          Menu <FontAwesomeIcon icon={faBars} className="ml-2" />
        </label>
      </div>
    </main>
  )
};

export default Doc;
