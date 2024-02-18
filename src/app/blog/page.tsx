import Articles from "@/components/blog/articles";
import Header from "@/components/blog/header";
import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";

const Blog = ({ searchParams }: { searchParams?: any }) => {
  return <main>
    <Nav />
    <div className="max-w-7xl px-5 mt-14 md:px-10 mx-auto">
      <Header />
      <Articles s={searchParams} />
    </div>
    <div className="linear-blue-1">
      <div className="max-w-7xl px-5 md:px-10 mx-auto">
        <Footer />
      </div>
    </div>
  </main>;
};

export default Blog;
