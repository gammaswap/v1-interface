import { useState, useEffect, useContext } from 'react'
import { WalletContext } from '../context/WalletContext'
import { ethers, Contract, constants } from 'ethers'
import PositionManager from '../../abis/v1-periphery/PositionManager.sol/PositionManager.json'
import GammaPool from '@gammaswap/v1-core/artifacts/contracts/GammaPool.sol/GammaPool.json'
import { notifyDismiss, notifyError, notifyLoading, notifySuccess } from './useNotification'

export const useWithdrawLiquidityHandler = () => {
  const POSITION_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS
  const GAMMA_POOL_ADDRESS = process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS

  const [positionManager, setPositionManager] = useState<Contract | null>(null)
  const [sliderPercentage, setsliderPercentage] = useState<number>(0)
  const { provider, accountInfo } = useContext(WalletContext)
  const [liquidityAmt, setLiquidityAmt] = useState<number>(0)
  const [totalLiquidityAmt, setTotalLiquidityAmt] = useState<string>('0')
  const [enableRemove, setEnableRemove] = useState<Boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [gammaPoolContract, setGammaPoolContract] = useState<Contract | null>(null)
  const [enableApprove, setEnableApprove] = useState<Boolean>(false)

  async function changeSliderPercentage(percentage: number) {
    try {
      setEnableApprove(percentage > 0 && parseInt(totalLiquidityAmt) > 0)
      setsliderPercentage(percentage)
    } catch (err: any) {
      notifyError(err.toString())
    }
  }

  async function sliderPercentChange(value: number | number[]) {
    try {
      if (typeof value === 'number') {
        setEnableApprove(value > 0 && parseInt(totalLiquidityAmt) > 0)
        setsliderPercentage(value)
      }
    } catch (err: any) {
      notifyError(err.toString())
    }
  }

  useEffect(() => {
    if (provider) {
      if (!positionManager && POSITION_MANAGER_ADDRESS) {
        setPositionManager(
          new ethers.Contract(
            POSITION_MANAGER_ADDRESS,
            PositionManager.abi,
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
    let amt = '0'
    if (balance === 0) {
      throw new Error('Please select a valid amount to withdraw')
    }
    if (balance === 100) {
      amt = totalLiquidityAmt.toString()
    } else {
      amt = ethers.utils.parseEther(((liquidityAmt * balance) / 100).toString()).toString()
    }
    if (!accountInfo || !accountInfo.address) {
      notifyError('Wallet not connected.')
      return
    }
    try {
      if (parseInt(amt) === 0) {
        const error: any = new Error('User does not have enough reserves to withdraw')
        error.code = '4001'
        throw error
      }

      if (!positionManager) {
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

      if (positionManager) {
        let tx = await positionManager.withdrawReserves(WithdrawReservesParams)
        return await tx.wait()
      }
    } catch (e: any) {
      if (e?.code && e?.code === '4001') {
        throw new Error(e.message)
      } else {
        throw new Error('An error occurred while whithdrawing reserves')
      }
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

    try {
      if (parseInt(totalLiquidityAmt) === 0) {
        const error: any = new Error('User does not have reserves to withdraw')
        error.code = '4002'
        throw error
      }
      if (!gammaPoolContract) {
        await initializeGammaPoolContract()
      }
      if (provider && gammaPoolContract) {
        let tx = await gammaPoolContract.approve(POSITION_MANAGER_ADDRESS, constants.MaxUint256.toString())
        return await tx.wait()
      } else {
        notifyError('Please connect wallet')
      }
    } catch (e: any) {
      if (e?.code && e?.code === '4002') {
        throw new Error(e.message)
      } else {
        throw new Error('An error occurred while approval')
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!gammaPoolContract) {
        return
      }
      const liqBal = await gammaPoolContract.balanceOf(accountInfo?.address)
      console.log(liqBal.toString())
      setEnableApprove(liqBal.toString() > 0)
      setTotalLiquidityAmt(liqBal.toString())
      setLiquidityAmt(parseFloat(ethers.utils.formatEther(liqBal)))
    }
    fetchData()
  }, [gammaPoolContract])

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
    try {
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
    } catch (err) {
      notifyError('An error occurred while initializing contract')
    }
  }

  const initializePositionManagerContract = async () => {
    try {
      if (provider && accountInfo && accountInfo?.address) {
        if (!positionManager && POSITION_MANAGER_ADDRESS) {
          setPositionManager(
            new ethers.Contract(
              POSITION_MANAGER_ADDRESS,
              PositionManager.abi,
              accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
            )
          )
        }
      } else {
        notifyError('Please connect wallet')
      }
    } catch (err) {
      notifyError('An error occurred while initializing contract')
    }
  }

  return {
    selectedIndex,
    setSelectedIndex,
    sliderPercentage,
    changeSliderPercentage,
    sliderPercentChange,
    approveTransaction,
    enableRemove,
    withdraw,
    enableApprove,
  }
}
