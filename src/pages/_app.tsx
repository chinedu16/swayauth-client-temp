import '@/styles/globals.css';
import '@/styles/chart.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          success: { style: { border: '1.5px solid #28A845' } },
          error: { style: { border: '1.5px solid red' } },
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
