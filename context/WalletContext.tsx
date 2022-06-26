import { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { Web3Provider } from '@ethersproject/providers'

type AccountInfo = {
    address: string | null
    balance: string | null
}

type Provider  = Web3Provider | void

interface WalletContextInterface {
    accountInfo: AccountInfo | null
    provider: Provider
    connectWallet: () => Promise<Provider>
}

type WalletProviderProps = {
    children: ReactNode
}

const WalletContext = createContext<WalletContextInterface>({} as WalletContextInterface)

const WalletProvider = ({ children }: WalletProviderProps) => {
    const [provider, setProvider] = useState<Provider>(undefined)
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null)
    const [web3Modal, setweb3Modal] = useState<Web3Modal | null>(null)

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
            const signer = ethersProvider.getSigner()
            
            setProvider(ethersProvider)

            const userAddress = await signer.getAddress()
            const userBalance = await ethersProvider.getBalance(userAddress)
            setAccountInfo({
                address: userAddress,
                balance: ethers.utils.formatEther(userBalance).slice(0, 6)
            })
        }
    }

    return (
        <WalletContext.Provider
        value={{
            accountInfo,
            provider,
            connectWallet,
        }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext)
export default WalletProvider