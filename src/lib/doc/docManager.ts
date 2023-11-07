import { useEffect, useRef, useState } from "react";
import { flattenTree } from "react-accessible-treeview";
import postman from "../../lib/doc/postman.json";
import { idMaker } from "./utils";

export const constructFolder = (pm: any = postman) => {
  const object: any = {
    name: pm?.info?.name || "API Documentation",
    children: [],
  };
  if (!pm?.item) return object;
  for (let f = 0; f < pm?.item?.length; f++) {
    const folder = pm?.item[f];
    const folderObj: any = {
      name: folder?.name,
      children: [],
    };
    for (let a = 0; a < folder?.item?.length; a++) {
      const api = folder?.item[a];
      const apiObject: any = {
        name: api?.name,
        metadata: {
          link: idMaker(api?.request?.method + api?.request?.url?.raw),
          method: api.request?.method,
        },
      };
      folderObj?.children?.push(apiObject);
    }
    object.children.push(folderObj);
  }
  return flattenTree(object);
};

const useDocManager = () => {
  const [folderData, setFolderData] = useState(constructFolder());
  const leftPanel = useRef<HTMLDivElement>(null!);
  const rightPanel = useRef<HTMLDivElement>(null!);
  const handle = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    const width = window?.screen?.width;
    if (width < 992) return;
    let resizing = false;
    const maxWidth = width / 3;
    if (handle.current) {
      handle.current.onmousedown = () => {
        if (rightPanel.current?.style && leftPanel.current?.style) {
          rightPanel.current.style.userSelect = "none";
          leftPanel.current.style.userSelect = "none";
          resizing = true;
        }
      };
    }
    document.onmousemove = (e) => {
      const width = e.clientX;
      if (!resizing || width < 150 || width > maxWidth) {
        return;
      }
      if (
        rightPanel.current?.style &&
        leftPanel.current?.style &&
        handle.current?.style
      ) {
        rightPanel.current.style.width = `calc(100% - ${width}px)`;
        leftPanel.current.style.width = `${width}px`;
        handle.current.style.backgroundColor = `#3C82F6`;
      }
    };
    document.onmouseup = function () {
      if (
        rightPanel.current?.style &&
        leftPanel.current?.style &&
        handle.current?.style
      ) {
        rightPanel.current.style.userSelect = "auto";
        leftPanel.current.style.userSelect = "auto";
        handle.current.style.backgroundColor = ``;
        resizing = false;
      }
    };
  }, []);

  const REQUEST_COLOR: any = {
    POST: "text-yellow-400",
    DELETE: "text-red-700",
    PATCH: "text-purple-900",
    GET: "text-green-500",
    "": "",
  };

  return {
    leftPanel,
    rightPanel,
    handle,
    folderData,
    REQUEST_COLOR,
  };
};

export default useDocManager;
