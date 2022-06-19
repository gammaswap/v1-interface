import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import truncateEthAddress from 'truncate-eth-address'

const style = {
    wrapper: "border p-4 w-screen flex justify-between items-center",
    headerLogo: "border w-1/4 flex",
    nav: "border flex-1 flex justify-center items-center",
    navItemsContainer: "flex bg-red-400 rounded-3xl",
    navItem: "px-4 py-2 m-1 text-lg font-semibold cursor-pointer rounded-3xl",
    activeNavItem: "bg-gray-400",
    buttonsContainer: "border flex w-1/4 justify-end items-center",
    button: "border flex items-center bg-red-400 mx-2 text-md font-semibold cursor-pointer rounded-2xl",
    buttonPadding: "p-2",
    balanceContainer: "mx-2 text-md flex items-center",
    buttonTextContainer: "bg-gray-400 rounded-lg px-4 py-2 text-md h-8 flex items-center",
    buttonAccent: "bg-blue-600 border border-[#163256] text-blue-200 h-full flex justify-center items-center rounded-xl",
}

const Header = () => {
    const [selectedNavItem, setSelectedNavItem] = useState("positions")
    const [web3Modal, setweb3Modal] = useState<Web3Modal | null>(null)
    const [address, setAddress] = useState<string>("")
    const [balance, setBalance] = useState<string>()

    // initiates web3modal
    useEffect(() => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "6094a319cdce47e0a440b67fdf3c5a96" // save this to env file LATER
                }
            },
            coinbasewallet: {
                package: CoinbaseWalletSDK,
                options: {
                    appName: "GammaSwap",
                    infuraId: "6094a319cdce47e0a440b67fdf3c5a96",
                    chainId: 3
                }
            },
            binancechainwallet: {
                package: true
            }
        }
        
        const newWeb3Modal = new Web3Modal({
            network: "ropsten",
            cacheProvider: true,
            providerOptions
        })

        setweb3Modal(newWeb3Modal)
    }, [])

    // connects automatically if user was previously signed in
    useEffect(() => {
        if (web3Modal && web3Modal.cachedProvider){
            connectWallet()
        }
    }, [web3Modal])

    const connectWallet = async () => {
        if (web3Modal !== null) {
            const provider = await web3Modal.connect()
            const ethersProvider = new ethers.providers.Web3Provider(provider)
            const userAddress = await ethersProvider.getSigner().getAddress()
            const userBalance = await ethersProvider.getBalance(userAddress)
            setAddress(userAddress)
            setBalance(ethers.utils.formatEther(userBalance).slice(0, 6))
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.headerLogo}>
                <Image src="/gsLogo.png" alt="GammaSwap logo" width={40} height={40} />
            </div>
            <nav className={style.nav}>
                <div className={style.navItemsContainer}>
                    <Link href={'/swap'}>
                        <div
                        onClick={() => setSelectedNavItem('swap')}
                        className={`${style.navItem} ${
                            selectedNavItem === 'swap' && style.activeNavItem
                        }`}
                        >
                            Swap
                        </div>
                    </Link>
                    <Link href={'/positions'}>
                        <div
                        onClick={() => setSelectedNavItem("positions")}
                        className={`${style.navItem} ${
                            selectedNavItem === "positions" && style.activeNavItem
                        }`}
                        >
                        Positions
                        </div>
                    </Link>
                    <Link href={'/pools'}>
                        <div
                        onClick={() => setSelectedNavItem("pools")}
                        className={`${style.navItem} ${
                            selectedNavItem === "pools" && style.activeNavItem
                        }`}
                        >
                            Pools
                        </div>
                    </Link>
                </div>
            </nav>
            <div className={style.buttonsContainer}>
                <Link href={'/buyeth'}>
                    <div className={`${style.button} ${style.buttonPadding}`}>
                        Buy ETH
                    </div>
                </Link>
                { address ? (
                    <div
                    onClick={() => connectWallet()}
                    className={`${style.button} ${style.buttonPadding}`}
                    >
                        <div className={style.balanceContainer}>
                            {balance}
                        </div>
                        <div className={style.buttonTextContainer}>
                            {truncateEthAddress(address)}
                        </div>
                    </div>
                ) : (
                    <div
                    onClick={() => connectWallet()}
                    className={`${style.button} ${style.buttonPadding}`}
                    >
                        <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                            Connect Wallet
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;