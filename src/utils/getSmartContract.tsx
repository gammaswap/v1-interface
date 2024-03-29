import { Dispatch, SetStateAction, useContext } from 'react'
import { BigNumber, Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { AccountInfo } from '../context/WalletContext'
import { notifyError } from '../hooks/useNotification'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import Tokens, { Token } from '../components/Tokens'
import GammaPool from '@gammaswap/v1-core/artifacts/contracts/GammaPool.sol/GammaPool.json'

const erc20ABI = require('erc-20-abi')
const { abi: IUniswapV2FactoryABI } = require('@uniswap/v2-core/build/IUniswapV2Factory.json')
const { abi: IUniswapV2Router02ABI } = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')

export type AmountsOut = Array<BigNumber>

export type TokenContracts = {
  tokenAContract: Contract | null
  tokenBContract: Contract | null
}

export const getTokenContracts = (
  tokenAAddr: string,
  tokenBAddr: string,
  provider: Provider
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
  const routerContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_IUNISWAP_V2_ROUTER_02_ADDR as string,
    IUniswapV2Router02ABI,
    provider as Provider
  )
  let convertedInput = ethers.utils.parseEther(inputAmt)
  const amountsOut = await routerContract.getAmountsOut(convertedInput, [tokenAddrs[0], tokenAddrs[1]])
  return amountsOut
}

export const calcPoolKey = (cfmm: string, protocol: number): string => {
  let abi = new ethers.utils.AbiCoder()
  let bytesData = abi.encode(['address', 'uint24'], [cfmm, protocol])
  return ethers.utils.solidityKeccak256(['bytes'], [bytesData])
}

export const getCfmmPoolAddr = async (
  tokenAAddr: string,
  tokenBAddr: string,
  provider: Provider,
  setCfmmPoolAddr: Dispatch<SetStateAction<string>>
) => {
  let tokens = tokenAAddr < tokenBAddr ?
    [tokenAAddr, tokenBAddr] :
    [tokenBAddr, tokenAAddr]
  let uniFactory = new ethers.Contract(
    process.env.NEXT_PUBLIC_IUNISWAP_V2_FACTORY_ADDR as string,
    IUniswapV2FactoryABI,
    provider
  )
  const cfmmPoolAddress = await uniFactory.getPair(tokens[0], tokens[1])
  setCfmmPoolAddr(cfmmPoolAddress)
}

export const getTokenBalance = async (
  accountAddress: string,
  tokenAddress: string,
  tokenSymbol: string,
  provider: Provider,
  setTokenBalance: Dispatch<SetStateAction<string>>
) => {
  try {
    let token = new ethers.Contract(tokenAddress, IERC20.abi, provider)
    let balance = await token.balanceOf(accountAddress)
    setTokenBalance(ethers.utils.formatEther(balance))
  } catch (err) {
    setTokenBalance('0')
    // TODO Have a loading symbol on the balance label until balance received
    console.log('An error occurred while fetching ${tokenSymbol} balance')
  }
}

export const getTokensFromPoolAddress = async (
  poolAddress: string,
  provider: Provider,
  setTokenASelected: Dispatch<SetStateAction<Token>>,
  setTokenBSelected: Dispatch<SetStateAction<Token>>
) => {
  // get them from the pool tokens()
  try {
    console.log("address ", poolAddress)
    let pool = new ethers.Contract(poolAddress, GammaPool.abi, provider)
    let tokenAddrs = await pool.tokens()
    let tokenA = Tokens.find(token => token.address == tokenAddrs[0])
    let tokenB = Tokens.find(token => token.address == tokenAddrs[1])
    if (!tokenA || !tokenB) {
      console.log("Unable to find one of the tokens")
      return
    }
    setTokenASelected(tokenA)
    setTokenBSelected(tokenB)
  } catch (err) {
    notifyError(
      'An error occurred while fetching token addresses from pool: ' + err
    )
  }

}
