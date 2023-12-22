'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '../store'

NProgress.configure({ showSpinner: false });

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  const pathname = usePathname()
  const search = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, search]);

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3500,
        style: { maxWidth: '600px', borderRadius: '5rem', background: '#333', color: '#fff' },
        success: { iconTheme: { primary: '#2563EB', secondary: 'white' } },
        error: { style: { background: 'red' } },
      }}
    />
    {children}
  </Provider>
}