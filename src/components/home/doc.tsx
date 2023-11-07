import { copyText } from '@/lib/doc/utils';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import pm from '../../lib/doc/postman.json';

const Documentation = (
  {
    BASE_URL,
  }: {
    BASE_URL: string
  }) => {
  return (
    <div className="w-full">
      <h1 className='text-3xl font-bold mb-10'>{pm.info.name}</h1>
      <div>
        <div className='w-6/12'>
          <p className='text-slate-300 mb-10 pr-6'>
            {pm.info.description}
          </p>
          {
            pm.auth &&
            <div className='flex mb-10 border-b border-slate-500 pb-1'>
              <h4 className='text-md'>AUTHORIZATION</h4>
              <p className='ml-2 text-slate-500 capitalize whitespace-nowrap'>{pm.auth.type} {pm.auth?.bearer[0]?.key || 'token'}</p>
            </div>
          }
          <h3 className='text-lg mb-4 pr-6'>BASE URL —<span className='text-sm ml-1'>&#123;&#123;base_url&#125;&#125;</span></h3>
          <div className='bg-slate-800 text-sm mb-10 px-3 mr-6 py-2 rounded-lg'>
            {BASE_URL}
          </div>
        </div>
      </div>

      {
        pm.item.map((folder, fidx) => {
          return <div key={fidx}>
            <div className='flex mb-14'>
              <div className='w-3/6 pr-6'>
                <div>
                  <h3 className='text-2xl mb-3 font-bold'>{folder.name}</h3>
                  <p className='text-slate-300 mb-10'>
                    {folder.description}
                  </p>
                  <div className='flex border-b border-slate-500 pb-1'>
                    <h4 className='text-md'>AUTHORIZATION</h4>
                    <p className='ml-2 text-slate-500 whitespace-nowrap'>{pm.auth.type} {pm.auth?.bearer[0]?.key || 'token'}</p>
                  </div>
                  <p className='text-slate-500 mt-2'>This folder is using {pm.auth.type} {pm.auth?.bearer[0]?.key || 'token'} from collection {pm.info.name}</p>
                </div>
              </div>
            </div>
            {
              folder.item.map((api, aidx) => {
                return <div key={aidx} className='flex mb-14'>
                  <div className='w-3/6 pr-6'>
                    <h3 id='auth-token' className='text-lg mb-4'><span className={`${api.request.method} mr-3`}>{api.request.method}</span>{api.name}</h3>
                    <div className='bg-slate-800 text-sm mb-5 px-3 py-2 rounded-lg'>
                      {api.request.url.raw}
                    </div>
                    {
                      (api.request as any).description &&
                      <p className='text-slate-300 mb-10'>
                        {(api.request as any).description}
                      </p>
                    }
                    {
                      api.request.header?.length &&
                      <div>
                        <h3 className='text-lg border-b pb-1 mb-10 border-slate-500'>HEADERS</h3>
                        <div className='flex flex-wrap mb-5 text-sm'>
                          {
                            api.request.header.map((header, hidx) =>
                              <div key={hidx} className='flex w-full'>
                                <div className='w-4/12 mb-4'>{header.key}</div>
                                <div className='w-8/12 mb-4'>{header.value}</div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    }
                    {
                      (api.request.url as any)?.query?.length &&
                      <div>
                        <h3 className='text-lg border-b pb-1 mb-10 border-slate-500'>PARAMS</h3>
                        <div className='flex flex-wrap mb-5 text-sm'>
                          {
                            (api.request.url as any)?.query?.map((header: { key: string, value: string }, hidx: number) =>
                              <div key={hidx} className='flex w-full'>
                                <div className='w-4/12 mb-4'>{header.key}</div>
                                <div className='w-8/12 mb-4'>{header.value}</div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    }
                    {
                      api.request.body &&
                      <>
                        <div className='flex items-end border-b pb-1 mb-10 border-slate-500'>
                          <h3 className='text-lg '>BODY</h3>
                          <p className='ml-2 text-slate-500 whitespace-nowrap'>raw (json)</p>
                        </div>
                        <div className='border max-h-[20rem] overflow-auto bg-code relative border-slate-600 pt-3 rounded-md'>
                          <div className='sticky top-0 left-0 text-sm w-full flex justify-between'>
                            <span className='inline-block rounded-md ml-2 border border-slate-500 p-1'>JSON</span>
                            <span onClick={() => copyText(api.request.body?.raw)} title='Copy' className='inline-block mr-3 border border-slate-500 py-1 px-3 rounded-md hover:bg-slate-500 cursor-pointer'><FontAwesomeIcon icon={faClone} /></span>
                          </div>
                          <SyntaxHighlighter language={api.request?.body?.options?.raw?.language || 'json'} style={nightOwl} >
                            {api.request.body?.raw}
                          </SyntaxHighlighter>
                        </div>
                      </>
                    }
                  </div>
                  <div className='w-3/6 bg-slate-700 rounded-md p-4'>
                    {
                      api.response.length &&
                      <div>
                        <p className='text-white mb-4'>Example Request</p>
                        <div className='border max-h-[20rem] mb-5 overflow-auto bg-code relative border-slate-600 pt-3 rounded-md'>
                          <div className='sticky top-0 left-0 text-sm w-full flex justify-between'>
                            <span className='inline-block rounded-md ml-2 border border-slate-500 p-1'>HTTP</span>
                            <span onClick={() => copyText(
                              `
                                 ${api.response[0]?.originalRequest?.method}
                                 ${api.response[0]?.originalRequest?.url?.raw}
                                 ${api.response[0]?.originalRequest?.header.length ?
                                api.response[0]?.originalRequest?.header[0].key + ': ' + api.response[0]?.originalRequest?.header[0].value : ''}
                                 ${(api.response[0]?.originalRequest as any)?.body ?
                                (api.response[0]?.originalRequest as any)?.body?.raw : ''
                              }
                                 `
                            )} title='Copy' className='inline-block mr-3 border border-slate-500 py-1 px-3 rounded-md hover:bg-slate-500 cursor-pointer'><FontAwesomeIcon icon={faClone} /></span>
                          </div>
                          <SyntaxHighlighter language="json" style={nightOwl} >
                            `
                            ${api.response[0]?.originalRequest?.method}
                            ${api.response[0]?.originalRequest?.url?.raw}
                            ${api.response[0]?.originalRequest?.header.length ?
                              api.response[0]?.originalRequest?.header[0].key + ': ' + api.response[0]?.originalRequest?.header[0].value : ''}
                            ${(api.response[0]?.originalRequest as any)?.body ?
                              (api.response[0]?.originalRequest as any)?.body?.raw : ''
                            }
                            `
                          </SyntaxHighlighter>
                        </div>
                        <div className='flex justify-between  mb-4'>
                          <p className='text-white'>Example Response</p>
                          <div className='text-sm'>Status code:
                            <span className={`${api.response[0]?.status} inline-block ml-2`}>{api.response[0]?.code}</span>
                          </div>
                        </div>
                        <div className='border mb-5 max-h-[20rem] overflow-auto bg-code relative border-slate-600 pt-3 rounded-md'>
                          <div className='sticky top-0 left-0 text-sm w-full flex justify-between'>
                            <span className='inline-block rounded-md ml-2 border border-slate-500 p-1'>JSON</span>
                            <span onClick={() => copyText(api.response[0]?.body)} title='Copy' className='inline-block mr-3 border border-slate-500 py-1 px-3 rounded-md hover:bg-slate-500 cursor-pointer'><FontAwesomeIcon icon={faClone} /></span>
                          </div>
                          <SyntaxHighlighter language="json" style={nightOwl} >
                            {api.response[0]?.body}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              })
            }
          </div>
        })
      }
    </div>
  );
};

export default Documentation;
