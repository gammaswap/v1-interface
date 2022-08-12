import { useState, createContext, useContext, ReactNode, useEffect } from 'react'
import { ethers, Contract } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { WalletContext } from './WalletContext'

// Uniswap contracts
const { abi: IUniswapV2PairABI } = require('@uniswap/v2-core/build/IUniswapV2Pair.json')
const { abi: IUniswapV2FactoryABI } = require('@uniswap/v2-core/build/IUniswapV2Factory.json')
const { abi: IUniswapV2Router02ABI } = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')


type BasicContractType = {
    IUniswapV2PairContract: Contract | null
    IUniswapV2FactoryContract: Contract | null
    IUniswapV2Router02Contract: Contract | null
}

type BasicContractProviderProps = {
    children: ReactNode
}

export const BasicContractContext = createContext<BasicContractType>({} as BasicContractType)

const BasicContractProvider = ({ children }: BasicContractProviderProps) => {
    const [IUniswapV2PairContract, setPairContract] = useState<Contract | null>(null)
    const [IUniswapV2FactoryContract, setFactoryContract] = useState<Contract | null>(null)
    const [IUniswapV2Router02Contract, setRouterContract] = useState<Contract | null>(null)
    const { provider, signer } = useContext(WalletContext)

    useEffect(() => {
        const newPairContract = new ethers.Contract(
            process.env.NEXT_PUBLIC_IUNISWAP_V2_PAIR_ADDR as string,
            IUniswapV2PairABI,
            provider as Provider
        )
        const newFactoryContract = new ethers.Contract(
            process.env.NEXT_PUBLIC_IUNISWAP_V2_FACTORY_ADDR as string,
            IUniswapV2FactoryABI,
            provider as Provider
        )
        const newRouterContract = new ethers.Contract(
            process.env.NEXT_PUBLIC_IUNISWAP_V2_ROUTER_02_ADDR as string,
            IUniswapV2Router02ABI,
            provider as Provider
        )

        setPairContract(newPairContract)
        setFactoryContract(newFactoryContract)
        setRouterContract(newRouterContract)
    }, [])

    return (
        <BasicContractContext.Provider
        value={{
            IUniswapV2PairContract,
            IUniswapV2FactoryContract,
            IUniswapV2Router02Contract
        }}
        >
            {children}
        </BasicContractContext.Provider>
    )
}

export default BasicContractProvider