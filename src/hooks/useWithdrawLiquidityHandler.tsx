import { useState, useEffect, useContext } from 'react'
import { WalletContext } from '../context/WalletContext'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import PosManager from '../../abis/v1-periphery/PositionManager.sol/PositionManager.json'
import Tokens, { Token } from '../components/Tokens'
import GammaPool from '../../abis/v1-core/GammaPool.sol/GammaPool.json'
import { notifyError, notifySuccess, notifyLoading, notifyDismiss } from './useNotification'

export const useWithdrawLiquidityHandler = () => {
  const POSITION_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS
  const GAMMA_POOL_ADDRESS = process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS

  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [sliderPercentage, setsliderPercentage] = useState<number>(0)
  const { provider, accountInfo } = useContext(WalletContext)
  const [liquidityAmt, setLiquidityAmt] = useState<number>(0)
  const [totalLiquidityAmt, setTotalLiquidityAmt] = useState<string>('0')
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>(Tokens[1])
  const [enableRemove, setEnableRemove] = useState<Boolean>(false)
  const [gammaPoolContract, setGammaPoolContract] = useState<Contract | null>(null)
  const [enableApprove, setEnableApprove] = useState<Boolean>(false)

  async function changeSliderPercentage(percentage: number) {
    if (percentage > 0) {
      setEnableApprove(true)
    } else {
      setEnableApprove(false)
    }
    setsliderPercentage(percentage)
  }

  async function sliderPercentChange(value: number | number[]) {
    if (typeof value === 'number') {
      if (value > 0) {
        setEnableApprove(true)
      } else {
        setEnableApprove(false)
      }
      setsliderPercentage(value)
    }
  }

  useEffect(() => {
    if (provider) {
      if (!posManager && POSITION_MANAGER_ADDRESS) {
        setPosManager(
          new ethers.Contract(
            POSITION_MANAGER_ADDRESS,
            PosManager.abi,
            accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
          )
        )
      }

      if (!gammaPoolContract && GAMMA_POOL_ADDRESS) {
        setGammaPoolContract(
          new ethers.Contract(
            GAMMA_POOL_ADDRESS,
            GammaPool.abi,
            accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
          )
        )
      }
    }
  }, [provider])

  async function approveTransaction() {
    let loading = notifyLoading('Waiting for block confirmation')
    approveWithdraw()
      .then(() => {
        setEnableRemove(true)
        notifyDismiss(loading)
      })
      .catch((err) => {
        notifyDismiss(loading)
        setEnableRemove(false)
        notifyError(err.toString())
      })
  }

  async function withdrawLiquidity(balance: number) {
    if (balance === 0) {
      throw new Error('Please select a valid amount to withdraw')
    }
    let amt = '0'
    if (balance === 100) {
      amt = totalLiquidityAmt.toString()
    } else {
      amt = ethers.utils.parseEther(((liquidityAmt * balance) / 100).toString()).toString()
    }
    if (!accountInfo || !accountInfo.address) {
      notifyError('Wallet not connected.')
      return
    }

    if (parseInt(amt) === 0) {
      throw new Error('User does not have enough reserves to withdraw')
    }

    try {
      if (!posManager) {
        await initializePositionManagerContract()
      }

      const WithdrawReservesParams = {
        cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
        protocol: 1,
        amount: amt,
        amountsMin: [100, 200, 300],
        to: accountInfo.address,
        deadline: ethers.constants.MaxUint256,
      }

      if (posManager) {
        let tx = await posManager.withdrawReserves(WithdrawReservesParams)
        return await tx.wait()
      }
    } catch (e) {
      throw new Error('An error occurred while whithdrawing reserves')
    }
  }

  async function approveWithdraw() {
    if (!provider) {
      notifyError('Please connect wallet')
      return
    }

    if (!accountInfo || !accountInfo.address) {
      notifyError('User wallet not found.')
      return
    }

    if (parseInt(totalLiquidityAmt) === 0) {
      throw new Error('User does not have reserves to withdraw')
    }

    try {
      if (!gammaPoolContract) {
        await initializeGammaPoolContract()
      }
      if (provider && gammaPoolContract) {
        let tx = await gammaPoolContract.approve(POSITION_MANAGER_ADDRESS, constants.MaxUint256.toString())
        return await tx.wait()
      } else {
        notifyError('Please connect wallet')
      }
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!posManager) {
        return
      }
      const liqBal = await posManager.balanceOf(accountInfo?.address)
      if (liqBal.toString() > 0) {
        setEnableApprove(true)
      }
      setTotalLiquidityAmt(liqBal.toString())
      setLiquidityAmt(parseFloat(ethers.utils.formatEther(liqBal)))
    }
    fetchData()
  }, [posManager])

  const withdraw = (amount: number) => {
    let loading = notifyLoading('Waiting for withdraw reserves')
    withdrawLiquidity(amount)
      .then((res) => {
        notifyDismiss(loading)
        // const { args } = res.events[1]
        // let message = 'Withdraw Liquidity Success: ' + args.pool + args.reservesLen.toNumber() + args.shares.toNumber()
        notifySuccess('Success')
      })
      .catch((err) => {
        notifyDismiss(loading)
        notifyError(err.toString())
      })
  }

  const initializeGammaPoolContract = async () => {
    if (provider && accountInfo && accountInfo?.address) {
      if (!gammaPoolContract && GAMMA_POOL_ADDRESS) {
        setGammaPoolContract(
          new ethers.Contract(
            GAMMA_POOL_ADDRESS,
            GammaPool.abi,
            accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
          )
        )
      }
    } else {
      notifyError('Please connect wallet')
    }
  }

  const initializePositionManagerContract = async () => {
    if (provider && accountInfo && accountInfo?.address) {
      if (!posManager && POSITION_MANAGER_ADDRESS) {
        setPosManager(
          new ethers.Contract(
            POSITION_MANAGER_ADDRESS,
            PosManager.abi,
            accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
          )
        )
      }
    } else {
      notifyError('Please connect wallet')
    }
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
    enableApprove,
  }
}
