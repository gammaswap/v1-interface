import React, { useState, useEffect } from 'react'
import '../styles/globals.css'
import Layout from '../components/Layout'
import Header from '../components/Header'
import type { AppProps } from 'next/app'
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers"
import { EthersContext } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = useState<JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  useEffect(() => {
    console.log("provider set in app:", provider, provider?.getSigner().getAddress())
    console.log("signer set in app:", signer, provider?.getSigner().getAddress())
  }, [provider, signer])

  return (
    <>
      <Layout>
        <EthersContext.Provider value={{provider: provider, setProvider: setProvider, signer: signer, setSigner: setSigner}}>
          <Header />
          <Component {...pageProps} />
        </EthersContext.Provider>
        <footer>Something</footer>
      </Layout>
    </>
  )
}

export default MyApp
