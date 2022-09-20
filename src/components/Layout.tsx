import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import WalletProvider from '../context/WalletContext'
import BasicContractProvider from '../context/BasicContractContext'

interface Props {
    children?: ReactNode
}

const style = {
    wrapper: "h-screen max-h-screen h-min-screen w-screen bg-neutrals-900 font-medium text-white flex flex-col bg-justify-between items-center",
}

const Layout = ({ children }: Props) => {
    return (
        <WalletProvider>
            <BasicContractProvider>
                <Head>
                    <title>GammaSwap - Oracle-Free Volatility DEX</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={style.wrapper}>
                    <Header />
                    {children}
                </main>
            </BasicContractProvider>
        </WalletProvider>
    )
}

export default Layout

