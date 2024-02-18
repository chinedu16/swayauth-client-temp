import { copyText } from "@/lib/utils";
import { attributesToProps, domToReact } from "html-react-parser";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export const replaceMent = {
  replace: (domNode: any) => {
    if (domNode.name === "img") {
      return (
        <img
          loading="lazy"
          {...attributesToProps(domNode.attribs)}
          alt=""
        />
      );
    }
    if (domNode.name === "pre") {
      return (
        <div className="relative rounded-md overflow-hidden">
          <div className="flex justify-end">
            <button
              onClick={() => copyText(domNode?.firstChild?.data)}
              className="py-1 px-2 text-sm bg-slate-100 rounded-md border absolute top-0 mt-2 mr-2"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter style={nightOwl} >
            {domNode.children && domToReact(domNode.children)}
          </SyntaxHighlighter>
        </div>
      );
    }
    if (domNode.name === "iframe" && domNode.attribs.class === "ql-video") {
      return <video src={domNode.attribs.src} controls></video>;
    }
  },
};