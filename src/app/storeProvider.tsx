'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store'
import { Toaster } from 'react-hot-toast'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
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