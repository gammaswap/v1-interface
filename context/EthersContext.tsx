import { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react'
import { Signer } from 'ethers'
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers'

type EthersContextType = {
    provider: Web3Provider | null,
    setProvider: Dispatch<SetStateAction<Web3Provider | null>>
    signer: Signer | null,
    setSigner: Dispatch<SetStateAction<Signer | null>>
}

type EthersProviderProps = {
    children: ReactNode
}

export const EthersContext = createContext({} as EthersContextType)

const EthersProvider = ({ children }: EthersProviderProps) => {
    const [provider, setProvider] = useState<Web3Provider | null>(null)
    const [signer, setSigner] = useState<Signer | null>(null)

    return (
        <EthersContext.Provider
        value={{
            provider,
            setProvider,
            signer,
            setSigner
        }}
        >
            {children}
        </EthersContext.Provider>
    )
}

export default EthersProvider