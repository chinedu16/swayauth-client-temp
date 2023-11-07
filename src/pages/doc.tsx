import { FolderIcon } from "@/components/doc/treeview";
import Documentation from "@/components/home/documentation";
import Nav from "@/components/home/nav";
import useDocManager from "@/lib/doc/docManager";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import TreeView from "react-accessible-treeview";


const Doc = () => {
  const { handle, leftPanel, rightPanel, folderData } = useDocManager()

  return (
    <main className="relative box-border bg-slate-900 text-slate-300">
      <Nav bg="bg-slate-900 text-slate-300 shadow-xl" maxWidth="mx-auto" />
      <div className="mt-[4.5rem] lg:mt-0 flex">
        <input type="checkbox" name="" id="doc-nav" defaultChecked className="hidden" />
        <div ref={leftPanel} className="no-scrollbar left-0 z-20 fixed rounded-t-sm py-6 px-5 bg-slate-800 treeview break-keep w-[280px] whitespace-nowrap lg:relative overflow-auto h-[calc(100vh-4.5rem)] lg:h-[calc(100vh-5rem)]">
          <TreeView
            data={folderData}
            onLoadData={async () => console.log('Loading')}
            aria-label="directory tree"
            nodeRenderer={({
              element,
              isBranch,
              isExpanded,
              getNodeProps,
              level,
            }) => (
              <div {...getNodeProps()} style={{ paddingLeft: 30 * (level - 1), marginBottom: '5px' }}>
                {isBranch ? (
                  <><FolderIcon isOpen={isExpanded} />  {element.name}</>
                ) : (
                  <div className="flex items-center">
                    <span className={`text-[0.5rem] uppercase pr-2 ${element.metadata?.method}`}>{element.metadata?.method || 'GET'}</span>
                    <Link href={'#' + element.metadata?.link}>{element.name}</Link>
                  </div>
                )}
              </div>
            )}
          />
          <span ref={handle} className="hover:bg-blue-500 rounded-full absolute top-0 w-[5px] h-full cursor-ew-resize right-0 inline-block z-10"></span>
        </div>
        <div ref={rightPanel} className="overflow-auto doc-panel w-full p-6 h-[calc(100svh-4.5rem)] lg:h-[calc(100svh-5rem)]">
          <Documentation BASE_URL="https://pos.virtualrx.com" />
        </div>
        <label htmlFor="doc-nav" className="inline-block cursor-pointer lg:hidden fixed bottom-6 right-6 text-3xl rounded-full bg-black px-3 py-[0.5rem]">
          <FontAwesomeIcon icon={faBars} />
        </label>
      </div>
    </main>
  )
};

export default Doc;
