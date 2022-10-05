import { useState, useEffect, useContext } from 'react'
import { WalletContext } from '../context/WalletContext'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import PosManager from '@gammaswap/v1-periphery/artifacts/contracts/PositionManager.sol/PositionManager.json'
import IUniswapV2Pair from '@uniswap/v2-periphery/build/IUniswapV2Pair.json'
import { sqrt } from '../utils/mathFunctions'
import Tokens, { Token } from '../components/Tokens'
import GammaPool from '@gammaswap/v1-core/artifacts/contracts/GammaPool.sol/GammaPool.json'
import { notifyError, notifySuccess } from './useNotification'

const ZEROMIN = 0

export const useWithdrawLiquidityHandler = () => {
  const [depPool, setDepPool] = useState<Contract | null>(null)
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [sliderPercentage, setsliderPercentage] = useState<number>(0)
  const { provider, accountInfo } = useContext(WalletContext)
  const [liquidityAmt, setLiquidityAmt] = useState<number>(0)
  const [totalLiquidityAmt, setTotalLiquidityAmt] = useState<string>('0')
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>(Tokens[1])
  const [enableRemove, setEnableRemove] = useState<Boolean>(false)
  const [uniPrice, setUniPrice] = useState<string>('0')
  const [liqInTokB, setLiqInTokB] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  let DEPOSIT_POOL_ADDRESS = '0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152'

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
    let address =
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
        ? process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
        : DEPOSIT_POOL_ADDRESS
    if (provider) {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
        if (accountInfo?.address) {
          setPosManager(new ethers.Contract(address, PosManager.abi, provider.getSigner(accountInfo.address)))
        } else {
          setPosManager(new ethers.Contract(address, PosManager.abi, provider))
        }
      } else {
        // if (accountInfo?.address) {
        //   setDepPool(new ethers.Contract(address, DepPool.abi, provider.getSigner(accountInfo.address)))
        // } else {
        //   setDepPool(new ethers.Contract(address, DepPool.abi, provider))
        // }
      }
    } else {
      notifyError('Please connect wallet')
    }

    if (!accountInfo || !accountInfo.address) {
      notifyError('Wallet not connected.')
      return
    }
    if (accountInfo && accountInfo?.address) {
      if (posManager === null) {
        return
      }
      approveWithdraw(posManager, posManager.address)
        .then(() => {
          setEnableRemove(true)
        })
        .catch((err: any) => {
          setEnableRemove(false)
          notifyError(err)
        })
    } else {
      if (depPool === null) {
        return
      }
      approveWithdraw(depPool, depPool.address)
        .then(() => {
          setEnableRemove(true)
        })
        .catch((err: any) => {
          setEnableRemove(false)
          notifyError(err)
        })
    }
  }

  async function withdrawLiquidity(balance: number) {
    let amt = '0'
    if (balance === 100) {
      amt = totalLiquidityAmt.toString()
    } else {
      amt = ethers.utils.parseEther(((liquidityAmt * balance) / 100).toString()).toString()
    }
    // Position Manager contract address
    let address =
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
        ? process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
        : DEPOSIT_POOL_ADDRESS
    if (provider) {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
        if (accountInfo && accountInfo?.address) {
          setPosManager(new ethers.Contract(address, PosManager.abi, provider.getSigner(accountInfo?.address)))
        } else {
          setPosManager(new ethers.Contract(address, PosManager.abi, provider))
        }
      } else {
        // if (accountInfo && accountInfo?.address) {
        //   setDepPool(new ethers.Contract(address, DepPool.abi, provider.getSigner(accountInfo?.address)))
        // } else {
        //   setDepPool(new ethers.Contract(address, DepPool.abi, provider))
        // }
      }
    } else {
      notifyError('Please connect wallet')
    }

    if (!accountInfo || !accountInfo.address) {
      notifyError('Wallet not connected.')
      return
    }

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
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
    } else {
      if (depPool === null) {
        return
      }

      try {
        let tx = await depPool.removeLiquidity(amt, ZEROMIN, ZEROMIN, accountInfo.address, {
          gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT,
        })
        return await tx.wait()
      } catch (e) {
        return e
      }
    }
  }

  async function approveWithdraw(posManager: Contract | null, contractAddress: string) {
    if (!accountInfo || !accountInfo.address) {
      notifyError('Wallet not connected.')
      return
    }
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
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
                  GammaPool.abi,
                  provider.getSigner(accountInfo?.address)
                )
              } else {
                gammaPoolContract = new ethers.Contract(address, GammaPool.abi, provider)
              }
              let tx = await gammaPoolContract.approve(contractAddress, constants.MaxUint256.toString())
              return await tx.wait()
            } else {
              notifyError('Please connect wallet')
            }
          } catch (e) {
            throw e
          }
        } else {
          notifyError('Please connect wallet')
        }
      }
    } else {
      if (depPool === null) {
        return null
      } else {
        if (provider !== null) {
          try {
            let tx = await depPool.approve(contractAddress, constants.MaxUint256.toString())
            return await tx.wait()
          } catch (e) {
            throw e
          }
        } else {
          notifyError('Please connect wallet')
        }
      }
    }
  }

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        notifyError('Please connect wallet.')
        return
      }

      // Position Manager contract address
      let address =
        process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
          ? process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
          : DEPOSIT_POOL_ADDRESS

      if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
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
        let _depPool = null

        _depPool = new ethers.Contract(
          address,
          "",
          accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
        )
        if (_depPool) {
          setDepPool(_depPool)
        }
      }
    }
    fetchContract()
  }, [provider])

  useEffect(() => {
    async function fetchData() {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
        if (!posManager) {
          return
        }
        const liqBal = await posManager.balanceOf(accountInfo?.address)
        setTotalLiquidityAmt(liqBal.toString())
        setLiquidityAmt(parseFloat(ethers.utils.formatEther(liqBal)))
      } else {
        if (!depPool) {
          return
        }
        const liqBal = await depPool.balanceOf(accountInfo?.address)
        setTotalLiquidityAmt(liqBal.toString())
        setLiquidityAmt(parseFloat(ethers.utils.formatEther(liqBal)))

        const uniPair = await depPool.getUniPair()
        if (!provider) {
          return
        }

        const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider)
        const reserves = await uniPairContract.getReserves()
        const _uniPrice = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0)
        setUniPrice(_uniPrice.toString())
        const liqBalNum = BigNumber.from(liqBal.toString())

        if (liqBalNum.gt(constants.Zero) && _uniPrice.gt(constants.Zero)) {
          setLiqInTokB(
            parseFloat(
              ethers.utils.formatEther(
                sqrt(_uniPrice.mul(BigNumber.from(10).pow(18)))
                  .mul(liqBalNum)
                  .div(BigNumber.from(10).pow(18))
                  .mul(2)
              )
            )
          )
        } else {
          setLiqInTokB(0)
        }
      }
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
        let message = "Add Liquidity Success: "
          + args.pool
          + args.reservesLen.toNumber()
          + args.shares.toNumber()
        notifySuccess(message)
      })
      .catch((err) => {
        notifyError(err)
      })
  }

  return {
    selectedIndex,
    setSelectedIndex,
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
