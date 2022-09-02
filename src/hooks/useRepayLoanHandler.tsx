import {useState, useContext, useEffect} from 'react'
import { ethers, Contract } from 'ethers'
import { WalletContext } from '../context/WalletContext'
import PosManager from '../../abis/v1-periphery/PositionManager.sol/PositionManager.json'
import toast from 'react-hot-toast'

export const useRepayLoanHandler = () => {
  const { accountInfo, provider, connectWallet } = useContext(WalletContext)
  const [repayAmt, setRepayAmt] = useState<number>(0)
  const [enableRepay, setEnableRepay] = useState<Boolean>(false)
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [tokenId, setTokenId] = useState(19)
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [repayCal, setRepayCal] = useState(0)
  let percentages = [25, 50, 75, 100]

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        console.log('Please connect wallet.')
        return
      }

      // Position Manager contract address
      let address = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''

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
    }
    fetchContract()
  }, [provider])

  useEffect(() => {
    if(posManager) {
      getLoan().then((res) => setLoanAmount(res.liquidity.toString()))
    }
  }, [posManager])

  const getLoan = async () => {
    console.log(posManager)
    if(posManager) {
      try {
        return await posManager.loan(process.env.NEXT_PUBLIC_CFMM_ADDRESS, 1, tokenId)
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
      setRepayAmt(0)
      toast.success("Repay liquidity succeeded")
    }
  }

  return {
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
