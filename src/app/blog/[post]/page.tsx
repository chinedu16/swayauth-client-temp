import Page404 from "@/app/not-found";
import { BlogData } from "@/components/blog/articles";
import Blogs from "@/components/blog/blogs";
import PostParser from "@/components/blog/postParser";
import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";
import { CONST } from "@/lib/constant";
import { normalRequest } from "@/lib/request";
import { dateLong } from "@/lib/utils";
import Image from "next/image";

interface Prop {
  params: {
    post: string
  },
  searchParams: {
    page: string
  }
}

const getBlog = async (link: string): Promise<ResponseProp<null | { blog: BlogData, next: BlogData[] }>> => {
  return await normalRequest(CONST.BLOG.LIST + `/${link}?status=active`, undefined, 'get', false)
}
const Post = async ({ params: { post } }: Prop) => {
  const { data, status } = await getBlog(post)

  return !status ?
    <Page404 /> :
    <main>
      <Nav />
      <div className="max-w-7xl px-5 mt-14 md:px-10 mx-auto">
        <div className="pt-16">
          <div className="text-right mb-8">{dateLong(data?.blog?.created_at)}</div>
          <h1 className="text-4xl font-bold mb-3">{data?.blog?.title}</h1>
          <p className="text-lg">{data?.blog?.sub_title}</p>
          <div className="my-16 max-w-screen-sm">
            <Image src={data?.blog?.photo || '/placeholder.png'} className="rounded-lg" width={1000} height={1000} alt="" />
          </div>
          <PostParser post={data?.blog?.content} />
          <Blogs data={data?.next} />
        </div>
      </div>
      <div className="linear-blue-1">
        <div className="max-w-7xl px-5 md:px-10 mx-auto">
          <Footer />
        </div>
      </div>
    </main>;
};

export default Post;
