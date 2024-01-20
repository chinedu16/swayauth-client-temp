import { useEffect, useRef, useState } from "react";
import { flattenTree } from "react-accessible-treeview";
import postman from "../../lib/doc/postman-2.json";
import { idMaker } from "./utils";

// export type postManType = {
//   info: {
//     name: string,
//     description: string
//   },
//   item: {
//     name: string,
//     auth: {
//       type: string,
//       apikey: [
//         {
//           key: string,
//           value: string,
//           type: string
//         },
//         {
//           key: string,
//           value: string,
//           type: string
//         }
//       ]
//     },
//     item: {
//       name: string
//       item: {
//         name: string,
//         item: {
//           name: string,
//           request: {
//             "auth": {
//               "type": "apikey",
//               "apikey": [
//                 {
//                   "key": "value",
//                   "value": "{{application_key}}",
//                   "type": "string"
//                 },
//               ]
//             },
//             description: string,
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{base_url}}/client/statistics/count?users&sms&mail&google&facebook&manual&duration=7_days",
//               "host": [
//                 "{{base_url}}"
//               ],
//               "path": [
//                 "client",
//                 string,
//                 "count"
//               ],
//               "query": [
//                 {
//                   "key": "users",
//                   "value": null
//                 },
//               ]
//             }
//           },
//           "response": [
//             {
//               name: "Example",
//               "originalRequest": {
//                 "method": "GET",
//                 "header": [],
//                 "url": {
//                   "raw": "{{base_url}}/client/statistics/count?users&sms&mail&google&facebook&manual&duration=7_days",
//                   "host": [
//                     "{{base_url}}"
//                   ],
//                   "path": [
//                     "client",
//                     string,
//                     "count"
//                   ],
//                   "query": [
//                     {
//                       "key": "users",
//                       "value": null
//                     },
//                     {
//                       "key": "sms",
//                       "value": null
//                     },
//                     {
//                       "key": "mail",
//                       "value": null
//                     },
//                     {
//                       "key": "google",
//                       "value": null
//                     },
//                     {
//                       "key": "facebook",
//                       "value": null
//                     },
//                     {
//                       "key": "manual",
//                       "value": null
//                     },
//                     {
//                       "key": "duration",
//                       "value": "7_days",
//                       "description": "7_days, 14_days, 30_days, 6_months, 1_year"
//                     }
//                   ]
//                 }
//               },
//               "status": "OK",
//               "code": 200,
//               "_postman_previewlanguage": "json",
//               "header": [
//                 {
//                   "key": "X-Powered-By",
//                   "value": "Express"
//                 },
//                 {
//                   "key": "Access-Control-Allow-Origin",
//                   "value": "*"
//                 },
//                 {
//                   "key": "Content-Type",
//                   "value": "application/json; charset=utf-8"
//                 },
//                 {
//                   "key": "Content-Length",
//                   "value": "121"
//                 },
//                 {
//                   "key": "ETag",
//                   "value": "W/\"79-kfO7kjWEszRyTC0bFeO6eftDscE\""
//                 },
//                 {
//                   "key": "Date",
//                   "value": "Sat, 20 Jan 2024 10:39:22 GMT"
//                 },
//                 {
//                   "key": "Connection",
//                   "value": "keep-alive"
//                 },
//                 {
//                   "key": "Keep-Alive",
//                   "value": "timeout=5"
//                 }
//               ],
//               "cookie": [],
//               "body": "{\n    \"data\": {\n        \"duration\": \"7_days\",\n        \"users\": 2,\n        \"sms\": 0,\n        \"mail\": 6,\n        \"google\": 8,\n        \"facebook\": 7,\n        \"manual\": 4\n    },\n    \"status\": true,\n    \"message\": \"Ok\"\n}"
//             }
//           ]
//         }[]
//       }[]
//     }[]
//   }[],
//   auth: {
//     type: string
//     bearer: {
//       key: string
//       value: string
//       type: string
//     }[]
//   },
//   variable: {
//     key: string
//     value: string
//     type: string
//   }[]
// }

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
      let api = folder?.item[a];
      let apiObject: any = {
        name: api?.name,
      };
      if (api?.item?.length) {
        apiObject = {
          ...apiObject,
          children: [],
        }
        for (let u = 0; u < api?.item?.length; u++) {
          const api2 = api?.item[u];
          const api2Object: any = {
            name: api2?.name,
            metadata: {
              link: idMaker(api2?.request?.method + '__' + api2?.request?.url?.path?.join('__')),
              method: api2.request?.method,
            },
          }
          apiObject.children.push(api2Object)
        }
      } else {
        apiObject = {
          ...apiObject,
          metadata: {
            link: idMaker(api?.request?.method + '__' + api?.request?.url?.path?.join('__')),
            method: api.request?.method,
          },
        }
      }
      folderObj?.children?.push(apiObject);
    }
    object.children.push(folderObj);
  }
  return flattenTree(object);
};

const useDocManager = () => {
  const [folderData, setFolderData] = useState(constructFolder());
  const leftPanel = useRef<HTMLDivElement>(null!);
  const [isClient, setIsClient] = useState(false);
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
    setIsClient(true)
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
    isClient,
    folderData,
    REQUEST_COLOR,
  };
};

export default useDocManager;
