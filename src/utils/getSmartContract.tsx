import { useContext } from 'react'
import { BigNumber, Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/providers'
import useNotification from '../hooks/useNotification'
import { AccountInfo } from '../context/WalletContext'


const erc20ABI = require('erc-20-abi')
const { abi: IUniswapV2FactoryABI } = require('@uniswap/v2-core/build/IUniswapV2Factory.json')
const { abi: IUniswapV2Router02ABI } = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')
const { notifyError, notifySuccess } = useNotification()

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
  provider: Provider
): Promise<AmountsOut | undefined> => {
  const routerContract = new ethers.Contract(process.env.NEXT_PUBLIC_IUNISWAP_V2_ROUTER_02_ADDR as string, IUniswapV2Router02ABI, provider as Provider)
  let convertedInput = ethers.utils.parseEther(inputAmt)
  const amountsOut = await routerContract.getAmountsOut(convertedInput, [tokenAddrs[0], tokenAddrs[1]])
  return amountsOut
}

export const calcPoolKey = (cfmm: string, protocol: number): string => {
  let abi = new ethers.utils.AbiCoder()
  let bytesData = abi.encode(["address", "uint24"], [cfmm, protocol])
  return ethers.utils.solidityKeccak256(['bytes'], [bytesData])
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