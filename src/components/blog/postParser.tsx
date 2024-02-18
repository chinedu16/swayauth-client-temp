"use client";
import html from "html-react-parser";

const PostParser = ({ post }: { post?: string }) => {
  return <div>
    {html(post as string)}
  </div>;
};

export default PostParser;
