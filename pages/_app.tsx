import '../styles/globals.css'
import Layout from '../components/Layout'
import Header from '../components/Header'
import type { AppProps } from 'next/app'
import * as React from 'react';
import { Provider, JsonRpcSigner } from "@ethersproject/providers"

function MyApp({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = React.useState<Provider | null>(null);
  const [signer, setSigner] = React.useState<JsonRpcSigner | null>(null);

  React.useEffect(() => {
    console.log("provider set:", provider)
    console.log("signer set:", signer)
  }, [provider, signer])

  function web3connected(provider: Provider, signer: JsonRpcSigner) {
    setProvider(provider)
    setSigner(signer)
  }

  return (
    <>
      <Layout>
        <Header onConnect={web3connected} />
        <Component {...pageProps} />
        <footer>Something</footer>
      </Layout>
    </>
  )
}

export default MyApp
