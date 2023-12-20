import Blogs from "@/components/blog/blogs";
import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";
import Image from "next/image";

const Post = () => {
  return <main>
    <Nav />
    <div className="max-w-7xl px-5 mt-14 md:px-10 mx-auto">
      <div className="pt-16">
        <div className="text-right">Oct 12, 2023</div>
        <h1 className="text-4xl font-bold mb-3">Introduction to SwayAuth</h1>
        <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Veniam incidunt dicta quisquam. Maiores mollitia ab, maxime error obcaecati minima,
          soluta ea ipsam placeat optio tenetur cumque consequuntur nobis corrupti veniam.
        </p>
        <div className="my-10">
          <Image src="/dashboard.png" width={930} height={852} alt="" />
        </div>
        <div>
          <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsam expedita voluptates perspiciatis excepturi, dolorum eligendi ipsa, obcaecati praesentium distinctio quis natus quae! Quae eveniet mollitia est suscipit ea laboriosam.</p>
          <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsam expedita voluptates perspiciatis excepturi, dolorum eligendi ipsa, obcaecati praesentium distinctio quis natus quae! Quae eveniet mollitia est suscipit ea laboriosam.</p>
          <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsam expedita voluptates perspiciatis excepturi, dolorum eligendi ipsa, obcaecati praesentium distinctio quis natus quae! Quae eveniet mollitia est suscipit ea laboriosam.</p>
          <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsam expedita voluptates perspiciatis excepturi, dolorum eligendi ipsa, obcaecati praesentium distinctio quis natus quae! Quae eveniet mollitia est suscipit ea laboriosam.</p>
          <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsam expedita voluptates perspiciatis excepturi, dolorum eligendi ipsa, obcaecati praesentium distinctio quis natus quae! Quae eveniet mollitia est suscipit ea laboriosam.</p>
        </div>
        <Blogs />
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
