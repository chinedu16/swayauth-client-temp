"use client";
import html from "html-react-parser";
import { replaceMent } from "./htmlReplacement";

const PostParser = ({ post }: { post?: string }) => {
  return <div className="article relative">
    {html(post as string, replaceMent)}
  </div>;
};

export default PostParser;
