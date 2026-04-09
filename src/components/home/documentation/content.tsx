import { copyText, idMaker } from '@/lib/doc/utils';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Markdown from 'react-markdown'
import { useEffect, useState } from 'react';

const DocContent = ({ folder }: { folder: any }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, []);
  const auth = (Object.values(folder?.request?.auth || {})?.[1] || []) as { key: string, value: string }[]
  const authKey = auth?.find(v => v.key == 'key')
  const authVal = auth?.find(v => v.key == 'value')
  const SH: any = SyntaxHighlighter
  return <div className='flex flex-wrap mb-14'>
    <div className='w-full lg:w-3/6 lg:pr-6 mb-10 lg:mb-0'>
      <h3 id={idMaker(folder?.request?.method + '__' + folder?.request?.url?.path?.join('__'))} className='text-lg mb-4'><span className={`${folder?.request?.method} mr-3`}>{folder?.request?.method}</span>{folder.name}</h3>
      <div className='bg-slate-800 break-words text-sm mb-5 px-3 py-2 rounded-lg'>
        {folder.request?.url?.raw}
      </div>
      <div className='flex border-b border-slate-500 pb-1'>
        <h4 className='text-md'>AUTHORIZATION</h4>
        <p className='ml-2 text-slate-500 whitespace-nowrap capitalize'>{folder?.request?.auth?.type}</p>
      </div>
      <table className='mt-3'>
        <tbody>
          {
            auth.length > 1 ?
              <>
                <tr>
                  <td className='pr-4'>Key</td>
                  <td className='pr-4'>{authKey?.value}</td>
                </tr>
                <tr>
                  <td className='pr-4'>Value</td>
                  <td className='pr-4'>{authVal?.value}</td>
                </tr>
              </>
              : null
          }
        </tbody>
      </table>
      {
        (folder.request as any)?.description ?
          <div className='text-slate-300 mb-10 markdown'>
            {
              isClient ?
                <Markdown>{(folder.request as any)?.description}</Markdown>
                :
                null
            }
          </div> : null
      }
      {
        folder.request?.header?.length ?
          <div>
            <h3 className='text-lg border-b pb-1 mb-10 border-slate-500'>HEADERS</h3>
            <div className='flex flex-wrap mb-5 text-sm'>
              {
                folder.request.header.map((header: any, hidx: any) =>
                  <div key={hidx} className='flex w-full'>
                    <div className='w-4/12 mb-4'>{header.key}</div>
                    <div className='w-8/12 mb-4'>{header.value}</div>
                  </div>
                )
              }
            </div>
          </div> : null
      }
      {
        (folder?.request?.url as any)?.query?.length ?
          <div>
            <h3 className='text-lg border-b pb-1 mb-10 border-slate-500'>PARAMS</h3>
            <div className='flex flex-wrap mb-5 text-sm'>
              {
                (folder.request.url as any)?.query?.map((header: { key: string, value: string }, hidx: number) =>
                  <div key={hidx} className='flex w-full'>
                    <div className='w-4/12 break-words mb-4'>{header.key}</div>
                    <div className='w-8/12 break-words mb-4'>{header.value}</div>
                  </div>
                )
              }
            </div>
          </div> : null
      }
      {
        folder.request?.body ?
          <>
            <div className='flex items-end border-b pb-1 mb-10 border-slate-500'>
              <h3 className='text-lg '>BODY</h3>
              <p className='ml-2 text-slate-500 whitespace-nowrap'>raw (json)</p>
            </div>
            <div className='border max-h-[20rem] overflow-auto bg-code relative border-slate-600 pt-3 rounded-md'>
              <div className='sticky top-0 left-0 text-sm w-full flex justify-between'>
                <span className='inline-block rounded-md ml-2 border border-slate-500 p-1'>JSON</span>
                <span onClick={() => copyText(folder.request.body?.raw)} title='Copy' className='inline-block mr-3 border border-slate-500 py-1 px-3 rounded-md hover:bg-slate-500 cursor-pointer'><FontAwesomeIcon icon={faClone} /></span>
              </div>
            <SH language={folder.request?.body?.options?.raw?.language || 'json'} style={nightOwl} >
                {folder.request.body?.raw}
            </SH>
            </div>
          </> : null
      }
    </div>
    <div className='w-full lg:w-3/6 bg-slate-700 rounded-md p-4'>
      {
        folder.response?.length ?
          <div>
            <p className='text-white mb-4'>Example Request</p>
            <div className='border max-h-[20rem] mb-5 overflow-auto bg-code relative border-slate-600 pt-3 rounded-md'>
              <div className='sticky top-0 left-0 text-sm w-full flex justify-between'>
                <span className='inline-block rounded-md ml-2 border border-slate-500 p-1'>HTTP</span>
                <span onClick={() => copyText(
                  `
           ${folder.response[0]?.originalRequest?.method}
           ${folder.response[0]?.originalRequest?.url?.raw}
           ${folder.response[0]?.originalRequest?.header.length ?
                    folder.response[0]?.originalRequest?.header[0].key + ': ' + folder.response[0]?.originalRequest?.header[0].value : ''}
           ${(folder.response[0]?.originalRequest as any)?.body ?
                    (folder.response[0]?.originalRequest as any)?.body?.raw : ''}
           `
                )} title='Copy' className='inline-block mr-3 border border-slate-500 py-1 px-3 rounded-md hover:bg-slate-500 cursor-pointer'><FontAwesomeIcon icon={faClone} /></span>
              </div>
              <SH language="json" style={nightOwl} >
                {
                  `
${folder.response[0]?.originalRequest?.method}
${folder.response[0]?.originalRequest?.url?.raw}
${folder.response[0]?.originalRequest?.header.length ?
                    folder.response[0]?.originalRequest?.header[0].key + ': ' + folder.response[0]?.originalRequest?.header[0].value : ''}
${(folder.response[0]?.originalRequest as any)?.body ?
                    (folder.response[0]?.originalRequest as any)?.body?.raw : ''}
`
                }
              </SH>
            </div>
            <div className='flex justify-between  mb-4'>
              <p className='text-white'>Example Response</p>
              <div className='text-sm'>Status code:
                <span className={`${folder.response[0]?.status} inline-block ml-2`}>{folder.response[0]?.code}</span>
              </div>
            </div>
            <div className='border mb-5 max-h-[20rem] overflow-auto bg-code relative border-slate-600 pt-3 rounded-md'>
              <div className='sticky top-0 left-0 text-sm w-full flex justify-between'>
                <span className='inline-block rounded-md ml-2 border border-slate-500 p-1'>JSON</span>
                <span onClick={() => copyText(folder.response[0]?.body)} title='Copy' className='inline-block mr-3 border border-slate-500 py-1 px-3 rounded-md hover:bg-slate-500 cursor-pointer'><FontAwesomeIcon icon={faClone} /></span>
              </div>
              <SH language="json" style={nightOwl} >
                {folder.response[0]?.body}
              </SH>
            </div>
          </div> : null
      }
    </div>
  </div>
};

export default DocContent;
