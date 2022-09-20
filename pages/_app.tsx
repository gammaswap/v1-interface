import '../styles/globals.css'
import Layout from '../src/components/Layout'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </>
  )
}

export default MyApp
