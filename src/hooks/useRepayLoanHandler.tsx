import { useState, useContext, useEffect } from 'react'
import { ethers, Contract, BigNumber } from 'ethers'
import Tokens, { Token } from '../components/Tokens'
import { WalletContext } from '../context/WalletContext'
import PositionManager from '@gammaswap/v1-periphery/artifacts/contracts/PositionManager.sol/PositionManager.json'
import GammaPool from '@gammaswap/v1-core/artifacts/contracts/GammaPool.sol/GammaPool.json'
import toast from 'react-hot-toast'
import { notifyError } from './useNotification'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import { validateAllowance } from '../utils/validation'

export const useRepayLoanHandler = () => {
  let POSITION_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
  let GAMMAPOOL_ADDRESS = process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS || ''
  // TODO: remove once poolDetails is finished, context data will come from there
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>(Tokens[2])

  const { accountInfo, provider, connectWallet } = useContext(WalletContext)
  const [repayAmt, setRepayAmt] = useState<number>(0)
  const [enableApprove, setEnableApprove] = useState<Boolean>(false)
  const [enableRepay, setEnableRepay] = useState<Boolean>(false)
  const [positionManager, setPositionManager] = useState<Contract | null>(null)
  const [gammaPool, setGammaPool] = useState<Contract | null>(null)
  const [tokenId, setTokenId] = useState(19)
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [repayCal, setRepayCal] = useState(0)
  const [cfmm, setCfmm] = useState()
  const [outstandingLoanAmount, setOutstandingLoanAmount] = useState<string>('')
  let percentages = [25, 50, 75, 100]

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        console.log('Please connect wallet.')
        return
      }

      let _positionManager = null
      let _gammaPool

      _gammaPool = new ethers.Contract(
        GAMMAPOOL_ADDRESS,
        GammaPool.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )
      if (_gammaPool) {
        setGammaPool(_gammaPool)
        let tx = await _gammaPool.loan(tokenId)
        setOutstandingLoanAmount(tx.liquidity.toString())
        setLoanAmount(parseFloat(tx.liquidity.toString()))
      }

      _positionManager = new ethers.Contract(
        POSITION_MANAGER_ADDRESS,
        PositionManager.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )
      if (_positionManager) {
        setPositionManager(_positionManager)
      }
    }
    fetchContract()
  }, [provider])

  useEffect(() => {
    if (gammaPool) {
      getCfmm()
        .then((res) => setCfmm(res))
        .catch((err) => console.log(err))
    }
  }, [gammaPool])

  useEffect(() => {
    if (positionManager && cfmm) {
      getLoan().then((res) => setLoanAmount(res.liquidity.toString()))
    }
  }, [positionManager, cfmm])

  const getCfmm = async () => {
    if (gammaPool) {
      try {
        return await gammaPool?.cfmm()
      } catch (err) {
        throw err
      }
    }
  }

  const getLoan = async () => {
    if (positionManager) {
      try {
        return await positionManager.loan(cfmm, 1, tokenId)
      } catch (err) {
        throw err
      }
    }
  }

  const changeSliderPercentage = (value: number) => {
    setRepayAmt(value)
    let repay = (loanAmount * value) / 100
    let remainingAmount = loanAmount - repay
    setOutstandingLoanAmount(remainingAmount.toString())
    setRepayCal(repay)
    if (repay > 0) {
      setEnableApprove(true)
    } else {
      setEnableApprove(false)
    }
  }
  const repayAmtChange = (values: number | number[]) => {
    if (typeof values === 'number') {
      setRepayAmt(values)
      let repay = (loanAmount * values) / 100
      let remainingAmount = loanAmount - repay
      setOutstandingLoanAmount(remainingAmount.toString())
      setRepayCal(repay)
      if (repay > 0) {
        setEnableApprove(true)
      } else {
        setEnableApprove(false)
      }
    }
  }

  const validateInput = () => {
    if (!repayCal) {
      notifyError('Please select a valid amount')
      return false
    }
    return true
  }

  const approveTransaction = async () => {
    if (!validateInput()) {
      return
    }

    if (accountInfo?.address && provider) {
      let approval
      let tokenContract = new ethers.Contract(
        GAMMAPOOL_ADDRESS,
        IERC20.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )

      approval = await validateAllowance(accountInfo.address, tokenContract, repayCal, POSITION_MANAGER_ADDRESS || '')

      if (!approval) {
        return
      }

      setEnableRepay(true)
    }
  }

  const repayTransaction = async () => {
    const RepayLiquidityParams = {
      cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
      protocol: 1,
      tokenId: tokenId,
      liquidity: ethers.utils.parseUnits(repayCal.toString()),
      to: accountInfo?.address,
      deadline: ethers.constants.MaxUint256,
    }
    if (positionManager) {
      let tx = await positionManager.repayLiquidity(RepayLiquidityParams)
      let res = await tx.wait()
      resetValues()
      toast.success('Repay liquidity succeeded')
    }
  }

  const resetValues = () => {
    setRepayAmt(0)
    setRepayCal(0)
  }

  return {
    token0,
    token1,
    repayAmt,
    repayAmtChange,
    changeSliderPercentage,
    percentages,
    approveTransaction,
    repayTransaction,
    enableRepay,
    loanAmount,
    repayCal,
    outstandingLoanAmount,
    setOutstandingLoanAmount,
    enableApprove,
  }
}
