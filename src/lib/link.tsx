"use client"
import { Url } from 'next/dist/shared/lib/router/router';
import * as LinkExt from 'next/link';
import NProgress from 'nprogress';
import { ComponentProps } from 'react';

const startNProgress = (href: Url) => {
  if (typeof window !== 'undefined') {
    if ((window.location.pathname +
      window.location.search +
      window.location.hash) !== href)
      NProgress.start()
  }
}

const Link = (prop: ComponentProps<typeof LinkExt.default>) => {
  return <LinkExt.default {...prop} onClick={() => startNProgress(prop.href)} />
};

export default Link;
