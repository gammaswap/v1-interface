import '../styles/globals.css'
import Layout from '../components/Layout'
import Header from '../components/Header'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Header />
        <Component {...pageProps} />
        <footer>Something</footer>
      </Layout>
    </>
  )
}

export default MyApp
