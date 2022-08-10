import { useState, useEffect, useContext } from 'react'
import { WalletContext } from '../context/WalletContext'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import PosManager from '../../abis/v1-periphery/PositionManager.sol/PositionManager.json'
import IUniswapV2Pair from '../../abis/v0-hackathon/IUniswapV2Pair.json'
import IERC20 from '../../abis/v0-hackathon/ERC20.json'
import { sqrt } from '../utils/mathFunctions'
import Tokens, { Token } from '../components/Tokens'
import TestGammaPool from '../../abis/v1-periphery/test/TestGammaPool.sol/TestGammaPool.json'

const ZEROMIN = 0

export const useWithdrawLiquidityHandler = () => {
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [sliderPercentage, setsliderPercentage] = useState<number>(0)
  const { provider, accountInfo } = useContext(WalletContext)
  const [liquidityAmt, setLiquidityAmt] = useState<number>(0)
  const [totalLiquidityAmt, setTotalLiquidityAmt] = useState<string>('0')
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>(Tokens[1])
  const [enableRemove, setEnableRemove] = useState<Boolean>(false)

  async function changeSliderPercentage(percentage: number) {
    setsliderPercentage(percentage)
  }

  async function sliderPercentChange(value: number | number[]) {
    if (typeof value === 'number') {
      setsliderPercentage(value)
    }
  }

  async function approveTransaction() {
    // Position Manager contract address
    let address = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS
    if (provider && address) {
      if (accountInfo && accountInfo?.address) {
        setPosManager(new ethers.Contract(address, PosManager.abi, provider.getSigner(accountInfo?.address)))
      } else {
        setPosManager(new ethers.Contract(address, PosManager.abi, provider))
      }
    } else {
      console.log('Please connect wallet')
    }

    if (!accountInfo || !accountInfo.address) {
      console.log('Wallet not connected.')
      return
    }

    if (posManager === null) {
      return
    }
    approveWithdraw(posManager, posManager.address)
      .then(() => {
        setEnableRemove(true)
      })
      .catch((err: any) => {
        setEnableRemove(false)
        console.log(err)
      })
  }

  async function withdrawLiquidity(balance: number) {
    let amt = '0'
    if (balance === 100) {
      amt = totalLiquidityAmt.toString()
    } else {
      amt = ethers.utils.parseEther(((liquidityAmt * balance) / 100).toString()).toString()
    }
    // Position Manager contract address
    let address = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS
    if (provider && address) {
      if (accountInfo && accountInfo?.address) {
        setPosManager(new ethers.Contract(address, PosManager.abi, provider.getSigner(accountInfo?.address)))
      } else {
        setPosManager(new ethers.Contract(address, PosManager.abi, provider))
      }
    } else {
      console.log('Please connect wallet')
    }

    if (!accountInfo || !accountInfo.address) {
      console.log('Wallet not connected.')
      return
    }

    if (posManager === null) {
      return
    }

    try {
      const WithdrawReservesParams = {
        cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
        protocol: 1,
        amount: amt,
        amountsMin: [100, 200, 300],
        to: accountInfo.address,
        deadline: ethers.constants.MaxUint256,
      }
      let tx = await posManager.withdrawReserves(WithdrawReservesParams)
      return await tx.wait()
    } catch (e) {
      return e
    }
  }

  async function approveWithdraw(posManager: Contract | null, positionManagerAddr: string) {
    if (!accountInfo || !accountInfo.address) {
      console.log('Wallet not connected.')
      return
    }
    if (posManager === null) {
      return null
    } else {
      if (provider !== null) {
        try {
          let address = process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS
          let gammaPoolContract
          if (provider && address) {
            if (accountInfo && accountInfo?.address) {
              gammaPoolContract = new ethers.Contract(
                address,
                TestGammaPool.abi,
                provider.getSigner(accountInfo?.address)
              )
            } else {
              gammaPoolContract = new ethers.Contract(address, TestGammaPool.abi, provider)
            }
            let tx = await gammaPoolContract.approve(positionManagerAddr, constants.MaxUint256.toString())
            return await tx.wait()
          } else {
            console.log('Please connect wallet')
          }
        } catch (e) {
          throw e
        }
      } else {
        console.log('Please connect wallet')
      }
    }
  }

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        console.log('Please connect wallet.')
        return
      }

      // Position Manager contract address
      let address = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS

      if (provider && address) {
        // Variable to hold Position Manager contract
        let _posManager = null

        _posManager = new ethers.Contract(
          address,
          PosManager.abi,
          accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
        )
        if (_posManager) {
          setPosManager(_posManager)
        }
      } else {
        console.log('Please connect wallet')
      }
    }
    fetchContract()
  }, [provider])

  useEffect(() => {
    async function fetchData() {
      if (!posManager) {
        return
      }
      const liqBal = await posManager.balanceOf(accountInfo?.address)
      setTotalLiquidityAmt(liqBal.toString())
      setLiquidityAmt(parseFloat(ethers.utils.formatEther(liqBal)))
    }

    // TODO: This section is commented because we do not have a factory of all the tokens. Once that is integrated then we will add the logic to get the tokens from the contract. For now we are getting the tokens from the token file
    // async function initializeTokens() {
    //   if (posManager !== null && provider !== null) {
    //     // Variable to hold address of token0
    //     let token0Addr = null

    //     // Variable to hold address of token1
    //     let token1Addr = null

    //     // Variable to hold contract token0
    //     let _token0: Contract

    //     // Variable to hold contract token0
    //     let _token1: Contract

    //     // Variable to hold symbol of token0
    //     let symbol0 = null

    //     // Variable to hold symbol of token1
    //     let symbol1 = null

    //     token0Addr = await posManager.token0()
    //     token1Addr = await posManager.token1()

    //     if (token0Addr) {
    //       _token0 = new ethers.Contract(token0Addr, IERC20Metadata.abi, accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider)
    //       symbol0 = await _token0.symbol()
    //       setToken0({address: token0Addr, symbol: symbol0, contract: _token0})
    //     }

    //     if (token1Addr) {
    //       _token1 = new ethers.Contract(token1Addr, IERC20Metadata.abi, accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider)
    //       symbol1 = await _token1.symbol()
    //       setToken1({address: token1Addr, symbol: symbol1, contract: _token1})
    //     }
    //   }
    // }

    // initializeTokens()
    fetchData()
  }, [posManager])

  const withdraw = (amount: number) => {
    withdrawLiquidity(amount)
      .then((res) => {
        const { args } = res.events[1]
        console.log(args)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    sliderPercentage,
    changeSliderPercentage,
    sliderPercentChange,
    approveTransaction,
    token0,
    token1,
    enableRemove,
    withdraw,
  }
}
