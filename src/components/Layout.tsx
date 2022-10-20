import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import WalletProvider from '../context/WalletContext'
import BasicContractProvider from '../context/BasicContractContext'
import PoolsDataProvider from '../context/PoolsDataContext'
interface Props {
  children?: ReactNode
}

const style = {
  wrapper:
    'h-screen max-h-screen h-min-screen w-screen font-medium text-white flex flex-col bg-justify-between items-center',
}

const Layout = ({ children }: Props) => {
  return (
    <WalletProvider>
      <BasicContractProvider>
        <PoolsDataProvider>
          <Head>
            <title>GammaSwap - Oracle-Free Volatility DEX</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={style.wrapper}>
            <Header />
            {children}
          </main>
        </PoolsDataProvider>
      </BasicContractProvider>
    </WalletProvider>
  )
}

export default Layout
