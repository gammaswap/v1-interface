import { useContext } from 'react'
import { BigNumber, Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/providers'
import useNotification from '../hooks/useNotification'
import { AccountInfo } from '../context/WalletContext'

const erc20ABI = require('erc-20-abi')
const { abi: IUniswapV2FactoryABI } = require('@uniswap/v2-core/build/IUniswapV2Factory.json')
const { abi: IUniswapV2Router02ABI } = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')
const { notifyError, notifySuccess } = useNotification()

export type Misc = (Contract | Provider)[]

export type AmountsOut = Array<BigNumber>

export type TokenContracts = {
    tokenAContract: Contract | null
    tokenBContract: Contract | null
}

export const getTokenContracts = (
    tokenAAddr: string,
    tokenBAddr: string,
    provider: Provider,
): TokenContracts | null => {
    try {
        const tokenAContract = new ethers.Contract(tokenAAddr, erc20ABI, provider)
        const tokenBContract = new ethers.Contract(tokenBAddr, erc20ABI, provider)

        return {
            tokenAContract: tokenAContract,
            tokenBContract: tokenBContract,
        }
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)

        notifyError(message)
    }
    return null
}

export const getEstimatedOutput = async (
    tokenAddrs: Array<string>,
    inputAmt: string,
    contract: Contract,
    misc: Misc
): Promise<AmountsOut | undefined> => {

    const FactoryContract = misc[0]
    // console.log('FactoryContract: ', FactoryContract);
    const routerContract = new ethers.Contract("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", IUniswapV2Router02ABI, misc[1] as Provider)
    const tokenAAddr = tokenAddrs[0]
    const tokenBAddr = tokenAddrs[1]
    const amountsOut = await routerContract.getAmountsOut(ethers.utils.parseEther("1"), [tokenAAddr, tokenBAddr])
    return amountsOut
    // try {
    //     if (contract && inputAmt !== "") {
    //         const amountsOut = await contract.getAmountsOut(1, tokenAddrs)
    //     }
    // } catch (error) {
    //     let message
    //     if (error instanceof Error) message = error.message
    //     else message = String(error)

    //     notifyError(message)
    // }
    // return
}


// /**
//  * Gets token pair address non-negotiably,
//  * creates it if doesn't exist otherwise returns exsisting pair
//  * @param tokenAAddr 
//  * @param tokenBAddr 
//  * @param FactoryContract 
//  * @returns a pair address of type string
//  */
// const getLiquidityPair = async (
//     tokenAAddr: string,
//     tokenBAddr: string,
//     FactoryContract: Contract
// ): Promise<string> => {
//     if (!await ifPairExists(tokenAAddr, tokenBAddr, FactoryContract)) {
//         const pairCreated = await FactoryContract.createPair(tokenAAddr, tokenBAddr)
//         return pairCreated
//     }

//     const existingPair = await FactoryContract.getPair(tokenAAddr, tokenBAddr)
//     return existingPair
// }

// /**
//  * Checks if the current token pair exists or not
//  * @param tokenAAddr 
//  * @param tokenBAddr 
//  * @param FactoryContract 
//  * @returns a boolean whether the pair exists or not
//  */
// const ifPairExists = async (
//     tokenAAddr: string,
//     tokenBAddr: string,
//     FactoryContract: Contract
// ): Promise<boolean> => {
//     const tokenPair = await FactoryContract.getPair(tokenAAddr, tokenBAddr)
//     if (formatEther(tokenPair) == "0.0") return false
//     else return true
// }

/**
 * shortened function of the original format wei to ethers func
 * @param weiNumber 
 * @returns the number in ethers of type string
 */
const formatEther = (weiNumber: number | BigNumber): string => {
    return ethers.utils.formatEther(weiNumber)
}

// const getEstimatedOutput = async (
//     tokenAddr: string,
//     tokenBAddr: string,
//     inputValue: string,
// ): Promise<string> => {
//     const amountsOut = await 
// }