import '../styles/globals.css'
import Layout from '../src/components/Layout'
import Header from '../src/components/Header'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Header />
        <Component {...pageProps} />
        <footer>Something</footer>
      </Layout>
      <Toaster />
    </>
  )
}

export default MyApp
