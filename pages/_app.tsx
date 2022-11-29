import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      <Toaster position="bottom-center" reverseOrder={false} />
    </AuthProvider>
  )
}
