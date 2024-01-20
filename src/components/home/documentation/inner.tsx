import DocContent from './content';

const Inner = ({ folder }: { folder: any, }) => {
  return <div className='mt-3'>
    {
      folder.item?.length ?
        <>
          <h3 className="text-xl text-slate-400 mb-6">{folder?.name}</h3>
          {
            folder.item?.map((api: any, aidx: number) => {
              return <DocContent folder={api} key={aidx} />
            })
          }
        </> :
        <>
          <h3 className="text-xl text-slate-400 mb-6">{folder?.name}</h3>
          <DocContent folder={folder} />
        </>
    }
  </div>;
};

export default Inner;
