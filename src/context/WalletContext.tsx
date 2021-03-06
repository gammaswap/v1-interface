import { createContext, useState, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers'
import useNotification from '../hooks/useNotification'

export type AccountInfo = {
    address: string | null
    balance: string | null
}

export type Provider  = Web3Provider | null

interface WalletContextInterface {
    accountInfo: AccountInfo | null
    provider: Provider | null
    signer: JsonRpcSigner | null
    connectWallet: () => Promise<Provider>
}

type WalletProviderProps = {
    children: ReactNode
}

export const WalletContext = createContext<WalletContextInterface>({} as WalletContextInterface)

const WalletProvider = ({ children }: WalletProviderProps) => {
    const [provider, setProvider] = useState<Provider | null>(null)
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null)
    const [web3Modal, setweb3Modal] = useState<Web3Modal | null>(null)

    const { notifyError } = useNotification()

    // initiates web3modal
    useEffect(() => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: process.env.INFURA_ID // save this to env file LATER
                }
            },
            coinbasewallet: {
                package: CoinbaseWalletSDK,
                options: {
                    appName: "GammaSwap",
                    infuraId: process.env.INFURA_ID,
                    chainId: process.env.ETH_CHAIN_ID
                }
            },
            binancechainwallet: {
                package: true
            }
        }
        
        const newWeb3Modal = new Web3Modal({
            network: process.env.ETH_CHAIN,
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

    const initializeProvider = async (provider: Web3Provider) => {
        const userAddress = await provider.getSigner().getAddress()
        const signer = provider.getSigner()

        // if no accounts connected to wallet, ignore the provider
        if (!userAddress) return

        const userBalance = await provider.getBalance(userAddress)

        const network = await provider.getNetwork()

        if (network.chainId !== parseInt(process.env.ETH_CHAIN_ID || "3")) {
            notifyError("Please switch to the Ropsten network to use the app.")
        }

        setProvider(provider)
        setSigner(signer)
        setAccountInfo({
            address: userAddress,
            balance: ethers.utils.formatEther(userBalance)
        })
    }

    // instantiates a new connection and sets a new provider
    const connectWallet = async () => {
        if (web3Modal !== null) {
            try {
                const connection = await web3Modal.connect()
                const provider = new Web3Provider(connection)
                
                initializeProvider(provider)
            } catch (err: any) {
                notifyError(err.message ||  "Failed to connect to wallet")
            }
        }
        return null
    }

    return (
        <WalletContext.Provider
        value={{
            accountInfo,
            provider,
            signer,
            connectWallet,
        }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider