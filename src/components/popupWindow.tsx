4

import { useEffect } from "react";

let timer: any;
const usePopupWindow = ({
  title = 'Swayauth',
  isFullScreenMobile = true,
  popupProperties: { width, height } = {
    width: 300,
    height: 300,
  },
}: {
  title?: string,
  isFullScreenMobile?: boolean
  popupProperties?: {
    width: number
    height: number
  }
}) => {

  const handleWindowPopup = (url: string) => new Promise((resolve) => {
    let windowProperties = 'toolbar=no,menubar=no,directories=no,location=no,status=no,';
    if (isFullScreenMobile && window.innerWidth < 650) {
      windowProperties += 'fullscreen=yes,'
    } else {
      let left = (screen.width - width) / 2;
      let top = (screen.height - height) / 2;
      windowProperties += `resizable=yes,width=${width},height=${height},top=${top},left=${left}`
    }
    const windowPopup = window.open('', title + Math.random().toFixed(4), windowProperties) as Window;
    // windowPopup?.addEventListener('unload', () => console.log('nice one'))
    // timer = setInterval(() => {
    //   console.log(windowPopup?.closed)
    //   // if (windowPopup) {
    //   //   clearInterval(timer);
    //   //   resolve(true);
    //   // }
    // }, 2000);
  })

  useEffect(() => {
    // return () => clearInterval(timer);
  }, []);

  return { handleWindowPopup };
};

export default usePopupWindow;