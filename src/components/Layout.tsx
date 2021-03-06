import React, { ReactNode } from 'react'
import Head from 'next/head'
import WalletProvider from '../context/WalletContext'
import BasicContractProvider from '../context/BasicContractContext'

interface Props {
    children?: ReactNode
}

const style = {
    wrapper: "h-screen max-h-screen h-min-screen w-screen flex flex-col justify-between",
}

const Layout = ({ children }: Props) => {
    return (
        <WalletProvider>
            <BasicContractProvider>
                <Head>
                    <title>GammaSwap</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={style.wrapper}>{children}</main>
            </BasicContractProvider>
        </WalletProvider>
    )
}

export default Layout

