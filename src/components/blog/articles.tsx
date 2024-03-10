import { CONST } from "@/lib/constant";
import Link from "@/lib/link";
import { normalRequest } from "@/lib/request";
import { dateLong } from "@/lib/utils";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface SearchParams {
  count?: string;
  page?: string;
}

export interface BlogData {
  photo?: string
  title?: string
  sub_title?: string
  url?: string
  content?: string
  status?: 'active' | 'disabled'
  created_at?: string
}

const getBlogList = async (query?: SearchParams): Promise<ResponseProp<null | BlogData[]> & { total?: number }> => {
  let countRes = { data: Number(query?.count) || 0 }
  if (!query?.count) {
    countRes = await normalRequest(CONST.BLOG.COUNT + '?status=active', undefined, 'get', false)
  }
  const blogRes = await normalRequest(CONST.BLOG.LIST + '?status=active' + (Number(query?.page) ? `&page=${query?.page}` : ''), undefined, 'get', false)
  return { ...blogRes, total: countRes?.data }
}

const Articles = async ({ s: { page = '1', count } }: { s: SearchParams }) => {
  const { status, data, total } = await getBlogList({ page, count });

  return <div>
    <div className="mt-20">
      {
        status && data?.length ?
          data?.map((item, idx) =>
            <div className="flex flex-wrap-reverse mb-28" key={idx}>
              <div className="w-full md:w-7/12 md:pr-10">
                <p className="text-slate-500 mb-4">{dateLong(item.created_at)}</p>
                <Link href={`/blog/${item.url}`} className="text-2xl md:text-3xl mb-4 font-bold underline-offset-4 underline block">
                  {item.title}
                </Link>
                <p >
                  {item.sub_title}
                </p>
              </div>
              <div className="w-full border aspect-square md:w-5/12 rounded-lg overflow-hidden">
                <Image src={item.photo || '/placeholder.png'} className="object-cover h-full w-full" width={500} height={500} alt="" />
              </div>
            </div>

          ) :
          <div className="text-4xl text-center my-20">
            <span className="inline-block text-white bg-blue-700 px-4 py-2 rounded-md">Blog is coming soon!</span>
          </div>
      }
    </div>
    <div className="text-center">
      <Link href={`/blog?page=${Number(page) > 1 ? Number(page) - 1 : page}&count=${total}`}><FontAwesomeIcon icon={faChevronLeft} className="px-4 py-3 bg-blue-700 rounded-md text-white" /></Link>
      <span className="inline-block mx-2"></span>
      <Link href={`/blog?page=${(((data?.length || 0) == 10) && ((total || 0) > (Number(page) * 10))) ? Number(page) + 1 : page
        }&count=${total}`}><FontAwesomeIcon icon={faChevronRight} className="px-4 py-3 bg-blue-700 rounded-md text-white" /></Link>
    </div>

  </div>;
};

export default Articles;
