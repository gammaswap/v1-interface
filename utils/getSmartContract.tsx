import { Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/providers'
import useNotification from '../hooks/useNotification'
import { AccountInfo } from '../context/WalletContext'
import { Token } from '../components/Tokens'

// Uniswap contracts
const { abi: IUniswapV2PairABI } = require('@uniswap/v2-core/build/IUniswapV2Pair.json')
const { abi: IUniswapV2FactoryABI } = require('@uniswap/v2-core/build/IUniswapV2Factory.json')

export type SmartContract = {
    tokenABalance: string
    tokenBBalance: string
}

type InitializeSmartContractType = {
    tokenAContract: Contract
    tokenBContract: Contract
    IUniswapV2PairContract: Contract
    IUniswapV2FactoryContract: Contract
}

const getSmartContract = async (
    contractABI: string,
    tokenAAddr: string,
    tokenBAddr: string,
    accountInfo: AccountInfo,
    provider: Provider,
) => {
    const { notifyError, notifySuccess } = useNotification()

    try {
        const {
            tokenAContract,
            tokenBContract,
            IUniswapV2PairContract,
            IUniswapV2FactoryContract
        } = initializeSmartContracts(tokenAAddr, tokenBAddr, contractABI, provider as Provider)

        if (accountInfo) {
            const tokenABalance = await tokenAContract.balanceOf(accountInfo.address)
            const tokenBBalance = await tokenBContract.balanceOf(accountInfo.address)
            const liquidityPair = await getLiquidityPair(tokenAAddr, tokenBAddr, IUniswapV2FactoryContract)
            
            const smartContractFuncs = {
                tokenABalance: formatEther(tokenABalance),
                tokenBBalance: formatEther(tokenBBalance),
            }

            notifySuccess("WE MADE IT HERE")
            return smartContractFuncs
        }
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)

        notifyError(message)
    }

}

/**
 * Initializes all relevant smart contracts for add liquidity functionality
 * @param tokenAAddr 
 * @param tokenBAddr 
 * @param contractABI 
 * @param provider 
 * @returns An object of all initialized smart contracts to use
 */
const initializeSmartContracts = (
    tokenAAddr: string,
    tokenBAddr: string,
    contractABI: string,
    provider: Provider
): InitializeSmartContractType => {
    const tokenAContract = new ethers.Contract(tokenAAddr, contractABI, provider as Provider)
    const tokenBContract = new ethers.Contract(tokenBAddr, contractABI, provider as Provider)
    const IUniswapV2PairContract = new ethers.Contract(
        process.env.IUNISWAP_V2_PAIR_ADDR as string,
        IUniswapV2PairABI,
        provider
    )
    const IUniswapV2FactoryContract = new ethers.Contract(
        process.env.IUNISWAP_V2_FACTORY_ADDR as string,
        IUniswapV2FactoryABI,
        provider
    )
    
    const smartContracts = {
        tokenAContract,
        tokenBContract,
        IUniswapV2PairContract,
        IUniswapV2FactoryContract,
    }
    return smartContracts
}

/**
 * Gets token pair address non-negotiably,
 * creates it if doesn't exist otherwise returns exsisting pair
 * @param tokenAAddr 
 * @param tokenBAddr 
 * @param FactoryContract 
 * @returns a pair address of type string
 */
const getLiquidityPair = async (
    tokenAAddr: string,
    tokenBAddr: string,
    FactoryContract: Contract
): Promise<string> => {
    if (!await ifPairExists(tokenAAddr, tokenBAddr, FactoryContract)) {
        const pairCreated = await FactoryContract.createPair(tokenAAddr, tokenBAddr)
        return pairCreated
    }

    const existingPair = await FactoryContract.getPair(tokenAAddr, tokenBAddr)
    return existingPair
}

/**
 * Checks if the current token pair exists or not
 * @param tokenAAddr 
 * @param tokenBAddr 
 * @param FactoryContract 
 * @returns a boolean whether the pair exists or not
 */
const ifPairExists = async (
    tokenAAddr: string,
    tokenBAddr: string,
    FactoryContract: Contract
): Promise<boolean> => {
    const tokenPair = await FactoryContract.getPair(tokenAAddr, tokenBAddr)
    if (formatEther(tokenPair) == "0.0") return false
    else return true
}

/**
 * shortened function of the original format wei to ethers func
 * @param weiNumber 
 * @returns the number in ethers of type string
 */
const formatEther = (weiNumber: number): string => {
    return ethers.utils.formatEther(weiNumber)
}

export default getSmartContract