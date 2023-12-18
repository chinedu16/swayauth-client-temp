import { persistor, wrapper } from '@/store';
import '@/styles/chart.css';
import '@/styles/globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

NProgress.configure({ showSpinner: false });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      NProgress.start()
    })

    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false)
    });

    Router.events.on("routeChangeError", (url) => {
      NProgress.done(true)
    });
  }, [Router])

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {
        getLayout(<>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3500,
              success: { style: { border: '1.5px solid #2464EB', fontWeight: 600 } },
              error: { style: { border: '1.5px solid red', fontWeight: 600 } },
            }}
          />
          <Component {...props} />
        </>)
      }
    </PersistGate>
  </Provider>
}
