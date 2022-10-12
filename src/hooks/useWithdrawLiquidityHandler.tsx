import { useState, useEffect, useContext } from 'react'
import { WalletContext } from '../context/WalletContext'
import { ethers, Contract, constants, BigNumber } from 'ethers'
import PositionManagerJSON from '@gammaswap/v1-periphery/artifacts/contracts/PositionManager.sol/PositionManager.json'
import GammaPool from '@gammaswap/v1-core/artifacts/contracts/GammaPool.sol/GammaPool.json'
import { notifyDismiss, notifyError, notifyLoading, notifySuccess } from './useNotification'
import { useRouter } from 'next/router'
import { validateAllowance } from '../utils/validation'

export const useWithdrawLiquidityHandler = () => {
  const router = useRouter()
  const { poolAddress } = router.query
  const POSITION_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS

  const [positionManager, setPositionManager] = useState<Contract | null>(null)
  const [sliderPercentage, setsliderPercentage] = useState<number>(0)
  const { provider, accountInfo } = useContext(WalletContext)
  const [liquidityAmt, setLiquidityAmt] = useState<number>(0)
  const [totalLiquidityAmt, setTotalLiquidityAmt] = useState<string>('0')
  const [enableRemove, setEnableRemove] = useState<Boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [gammaPoolContract, setGammaPoolContract] = useState<Contract | null>(null)
  const [enableApprove, setEnableApprove] = useState<Boolean>(false)
  const [invalidBtnText, setInvalidBtnText] = useState<String>('Confirm')

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
      setInvalidBtnText('Confirm')
      if (!positionManager && POSITION_MANAGER_ADDRESS) {
        setPositionManager(
          new ethers.Contract(
            POSITION_MANAGER_ADDRESS,
            PositionManagerJSON.abi,
            accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
          )
        )
      }

      if (!gammaPoolContract && poolAddress) {
        setGammaPoolContract(
          new ethers.Contract(
            poolAddress.toString(),
            GammaPool.abi,
            accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
          )
        )
      }
    }
  }, [provider])

  async function approveTransaction() {
    try {
      let approval

      if (!gammaPoolContract) {
        await initializeGammaPoolContract()
      }

      if (gammaPoolContract && poolAddress && accountInfo?.address && provider) {
        let amt = '0'
        if (sliderPercentage === 0) {
          throw new Error('Please select a valid amount to withdraw')
        }
        if (sliderPercentage === 100) {
          amt = totalLiquidityAmt.toString()
        } else {
          amt = ((liquidityAmt * sliderPercentage) / 100).toString().toString()
        }
        approval = await validateAllowance(
          accountInfo.address,
          gammaPoolContract,
          BigNumber.from(amt.toString()),
          POSITION_MANAGER_ADDRESS || ''
        )
      }

      if (approval) {
        setEnableRemove(true)
      } else {
        setEnableRemove(false)
      }
    } catch (e: any) {
      notifyError(e.toString())
    }
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
      setInvalidBtnText('Connect Wallet')
      setEnableRemove(false)
      setEnableApprove(false)
      throw new Error('Wallet not connected')
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

  useEffect(() => {
    async function fetchData() {
      try {
        if (!gammaPoolContract) {
          return
        }
        if (!accountInfo) {
          console.log("Please connect wallet.")
          return
        }
        const liqBal = await gammaPoolContract.balanceOf(accountInfo.address)
        console.log(liqBal.toString())
        setEnableApprove(liqBal.toString() > 0)
        setTotalLiquidityAmt(liqBal.toString())
        setLiquidityAmt(parseFloat(ethers.utils.formatEther(liqBal)))
      } catch (e) {
        notifyError('Balance not found. Please provide correct pool address')
      }
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
        setInvalidBtnText('Confirm')
        if (!gammaPoolContract && poolAddress) {
          setGammaPoolContract(
            new ethers.Contract(
              poolAddress.toString(),
              GammaPool.abi,
              accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
            )
          )
        }
      } else {
        setInvalidBtnText('Connect Wallet')
        notifyError('Please connect wallet')
      }
    } catch (err) {
      notifyError('An error occurred while initializing contract')
    }
  }

  const initializePositionManagerContract = async () => {
    try {
      if (provider && accountInfo && accountInfo?.address) {
        setInvalidBtnText('Confirm')
        if (!positionManager && POSITION_MANAGER_ADDRESS) {
          setPositionManager(
            new ethers.Contract(
              POSITION_MANAGER_ADDRESS,
              PositionManagerJSON.abi,
              accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
            )
          )
        }
      } else {
        setInvalidBtnText('Connect Wallet')
        setEnableRemove(false)
        setEnableApprove(false)
        throw new Error('Wallet not connected')
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
    invalidBtnText,
  }
}
