import {useState, useContext, useEffect} from 'react'
import { ethers, Contract } from 'ethers'
import Tokens, { Token } from '../components/Tokens'
import { WalletContext } from '../context/WalletContext'
import PosManager from '@gammaswap/v1-periphery/artifacts/contracts/PositionManager.sol/PositionManager.json'
import GammaPool from '@gammaswap/v1-core/artifacts/contracts/GammaPool.sol/GammaPool.json'
import toast from 'react-hot-toast'

export const useRepayLoanHandler = () => {
  // TODO: remove once poolDetails is finished, context data will come from there
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>(Tokens[2])

  const { accountInfo, provider, connectWallet } = useContext(WalletContext)
  const [repayAmt, setRepayAmt] = useState<number>(0)
  const [enableRepay, setEnableRepay] = useState<Boolean>(false)
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [gammaPool, setGammaPool] = useState<Contract | null>(null)
  const [tokenId, setTokenId] = useState(19)
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [repayCal, setRepayCal] = useState(0)
  const [cfmm, setCfmm] = useState()
  let percentages = [25, 50, 75, 100]

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        console.log('Please connect wallet.')
        return
      }

      // Position Manager contract address
      let address = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
      let gammaPoolAddress = process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS || ''

      // Variable to hold Position Manager contract
      let _posManager = null
      let _gammaPool

      _gammaPool = new ethers.Contract(
        gammaPoolAddress,
        GammaPool.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )
      if (_gammaPool) {
        setGammaPool(_gammaPool)
      }

      _posManager = new ethers.Contract(
        address,
        PosManager.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )
      if (_posManager) {
        setPosManager(_posManager)
      }
    }
    fetchContract()
  }, [provider])

  useEffect(() => {
    if(gammaPool) {
      getCfmm().then((res) => setCfmm(res)).catch((err) => console.log(err))
    }
  }, [gammaPool])

  useEffect(() => {
    console.log(cfmm)
    if(posManager && cfmm) {
      getLoan().then((res) => setLoanAmount(res.liquidity.toString()))
    }
  }, [posManager, cfmm])

  const getCfmm = async () => {
    if(gammaPool) {
      try {
        return await gammaPool?.cfmm()
      } catch (err) {
        throw err
      }
    }
  }

  const getLoan = async () => {
    if(posManager) {
      try {
        return await posManager.loan(cfmm, 1, tokenId)
      } catch (err) {
        throw err
      }
    }
  } 

  const changeSliderPercentage = (value: number) => {
    setRepayAmt(value)
    let repay = (loanAmount * value)/100
    setRepayCal(repay)
  }
  const repayAmtChange = (values: number | number[]) => {
    if (typeof values === 'number') {
      setRepayAmt(values)
      let repay = (loanAmount * values)/100
      setRepayCal(repay)
    }
  }

  const approveTransaction = () => {
    setEnableRepay(true)
  }

  const repayTransaction = async () => {
    const RepayLiquidityParams = {
        cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
        protocol: 1,
        tokenId: tokenId,
        liquidity: ethers.utils.parseUnits(repayCal.toString()),
        to: accountInfo?.address,
        deadline: ethers.constants.MaxUint256
    }
    if(posManager) {
      let tx = await posManager.repayLiquidity(RepayLiquidityParams)
      let res = await tx.wait()
      resetValues()
      toast.success("Repay liquidity succeeded")
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
    repayCal
  }
}
