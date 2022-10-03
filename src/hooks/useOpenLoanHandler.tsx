import * as React from 'react'
import { useState, useEffect, useContext, Dispatch, SetStateAction, ChangeEvent } from 'react'
import Tokens, { Token } from '../components/Tokens'
import { WalletContext } from '../context/WalletContext'
// TODO: import Factory from '../../abis/Factory.json'
import IERC20 from '../../abis/v1-periphery/interfaces/external/IERC20.sol/IERC20.json'
import { ethers, Contract, BigNumber } from 'ethers'
import toast from 'react-hot-toast'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { FieldValues, useForm } from 'react-hook-form'
// For V1 Periphery
import PositionManager from '../../abis/v1-periphery/PositionManager.sol/PositionManager.json'
import GammaPoolFactory from '../../abis/v1-core/GammaPoolFactory.sol/GammaPoolFactory.json'
import { notifyDismiss, notifyError, notifyLoading, notifySuccess } from './useNotification'
import { calcPoolKey, getTokenBalance } from '../utils/getSmartContract'
import { validateAllowance } from '../utils/validation'
import Protocols, { Protocol } from '../components/Protocols'
import GammaPool from '../../abis/v1-core/GammaPool.sol/GammaPool.json'

const style = {
  invalidatedButton:
    ' w-full disabled my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700',
  confirmButton:
    'w-full bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300',
  confirmGrey: 'bg-[#274060] w-full rounded-2xl text-gray-500 inline-flex place-content-center py-2 font-semibold',
  confirmInsuffBal: 'bg-red-400 w-full rounded-2xl text-slate-200 inline-flex place-content-center py-2 font-semibold',
  confirmGreen: 'bg-green-300 w-full rounded-2xl text-slate-200 inline-flex place-content-center py-2 font-semibold',
  confirmButtonContainer: 'pb-4 w-full',
  numberInputContainer:
    'bg-gray-800 rounded-2xl p-4 border-2 border-gray-800 hover:border-gray-600 flex justify-between w-full',
  numberInputHidden: 'p-4 border-2 invisible',
  numberInput: 'bg-transparent placeholder:text-gray-600 outline-none w-full text-3xl text-gray-300',
}

enum CollateralType {
  None,
  LPToken,
  Token0,
  Token1,
  Both,
}

// TODO: need to figure whether to use this or enums
const collateralTypes = [
  { id: 1, type: 'Liquidity Pool Tokens', unavailable: false },
  { id: 2, type: 'Token A', unavailable: false },
  { id: 3, type: 'Token B', unavailable: false },
  { id: 5, type: 'Both Tokens', unavailable: false },
]

export const useOpenLoanHandler = () => {
  const POSITION_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
  const GAMMAFACTORY_ADDR = process.env.NEXT_PUBLIC_GAMMAFACTORY_ADDR || ''
  const [collateralType, setCollateralType1] = useState(collateralTypes[0])
  const { provider, accountInfo } = useContext(WalletContext)
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>({
    imgPath: '',
    symbol: '',
    address: '',
    decimals: 0,
  })
  const [peripheryPosManager, setPeripheryPosManager] = useState<Contract | null>(null)
  const [protocol, setProtocol] = useState<Protocol>(Protocols[0])
  const [gammaPoolFactory, setGammaPoolFactory] = useState<Contract | null>(null)
  const [lpTokenBalance, setLpTokenBalance] = useState<string>('0')

  // const [collateralType, setCollateralType] = useState<CollateralType>(CollateralType.None)
  const [collateralButtonText, setCollateralButtonText] = useState<string>('Select collateral type')
  const [confirmStyle, setConfirmStyle] = useState<string>(style.invalidatedButton)
  const [loanAmt, setLoanAmt] = useState<number>(0)
  const [loanAmtStr, setLoanAmtStr] = useState<string>('')
  const [collateralAmt0, setCollateralAmt0] = useState<number>(0)
  const [collateralAmt0Str, setCollateralAmt0Str] = useState<string>('')
  const [collateralAmt1, setCollateralAmt1] = useState<number>(0)
  const [collateralAmt1Str, setCollateralAmt1Str] = useState<string>('')
  const { register, handleSubmit, setValue } = useForm()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Confirm')
  const [collateral1Class, setCollateral1Class] = useState<string>('')
  const [tooltipText, setTooltipText] = useState<string>('')
  const [token0Balance, setToken0Balance] = useState<string>('0')
  const [token1Balance, setToken1Balance] = useState<string>('0')
  const [isApproved, setIsApproved] = useState<boolean>(false)

  useEffect(() => {
    if (!provider) {
      toast('Please connect wallet.', { icon: <InformationCircleIcon /> })
      return
    }

    if (accountInfo && accountInfo?.address) {
      setPeripheryPosManager(
        new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider.getSigner(accountInfo?.address))
      )
      setGammaPoolFactory(
        new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider.getSigner(accountInfo?.address))
      )
    } else {
      setPeripheryPosManager(new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider))
      setGammaPoolFactory(new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider))
    }
  }, [provider])

  useEffect(() => {
    let accountAddress = accountInfo?.address || ''
    if (provider && token0.address) {
      getTokenBalance(accountAddress, token0.address, token0.symbol, provider, setToken0Balance)
    }
  }, [provider, token0])

  useEffect(() => {
    let accountAddress = accountInfo?.address || ''
    if (provider && token1.address) {
      getTokenBalance(accountAddress, token1.address, token1.symbol, provider, setToken1Balance)
    }
  }, [provider, token1])

  useEffect(() => {
    const getPoolData = async (cfmm: string, protocolId: number) => {
      if (gammaPoolFactory && provider) {
        let pool = await gammaPoolFactory.getPool(calcPoolKey(cfmm, protocolId))
        if (pool && pool !== ethers.constants.AddressZero) {
          let _gammaPool = null
          if (accountInfo && accountInfo?.address) {
            _gammaPool = new ethers.Contract(pool, GammaPool.abi, provider.getSigner(accountInfo.address))
          } else {
            _gammaPool = new ethers.Contract(pool, GammaPool.abi, provider)
          }

          if (_gammaPool) {
            let res = await _gammaPool.balanceOf(accountInfo?.address)
            console.log(res.toString())
          }
        }
      }
    }
    if (token0.address && token1.address) {
      getPoolData(process.env.NEXT_PUBLIC_CFMM_ADDRESS || '', protocol.id)
    }
  }, [token0, token1])

  async function openLoanHandler() {
    if (!collateralAmt0Str || !collateralAmt1Str || !loanAmtStr) {
      notifyError('Please enter a valid amount and the amount must be positive')
      return
    }
    if (!accountInfo || !accountInfo.address) {
      notifyError('Wallet not connected.')
      return
    }

    if (!gammaPoolFactory) {
      await getGammaPoolFactory()
    }

    if (gammaPoolFactory) {
      let pool = await gammaPoolFactory.getPool(calcPoolKey(process.env.NEXT_PUBLIC_CFMM_ADDRESS || '', protocol.id))
      if (pool === ethers.constants.AddressZero) {
        notifyError('Please create a pool before continuing')
        return
      }
    }

    if (!peripheryPosManager) {
      await getPosMgr()
    }
    if (peripheryPosManager) {
      let loan = await createLoan()
      if (loan) {
        const { args } = loan.events[1]
        let tokenId = args.tokenId
        console.log(tokenId)
        if (tokenId) {
          let collateral = await increaseCollateral(tokenId)
          console.log(collateral)
          if (collateral) {
            let borrow = await borrowLiquidity(tokenId)
            console.log(borrow)
            if (borrow) {
              notifySuccess('Successful')
            }
          }
        }
      }
    }
  }

  async function createLoan() {
    let loading = notifyLoading('Waiting for create loan')
    try {
      if (peripheryPosManager && accountInfo) {
        let tx = await peripheryPosManager.createLoan(
          process.env.NEXT_PUBLIC_CFMM_ADDRESS,
          1,
          accountInfo?.address,
          ethers.constants.MaxUint256,
          { gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT }
        )
        notifyDismiss(loading)
        return await tx.wait()
      } else {
        notifyDismiss(loading)
        notifyError(
          'An error occurred while fetching contract and user information. Please check you wallet is connected and try again'
        )
        return false
      }
    } catch (err) {
      notifyDismiss(loading)
      notifyError('An error occurred while trying to create loan. Please try again.')
      return false
    }
  }

  const increaseCollateral = async (tokenId: string) => {
    let loading = notifyLoading('Waiting for increase collateral')
    try {
      let amounts = ['0']
      switch (collateralType.type) {
        case 'Liquidity Pool Tokens':
          amounts = [collateralAmt0Str]
          break
        case 'Token A':
          amounts = [collateralAmt0Str]
          break
        case 'Token B':
          amounts = [collateralAmt1Str]
          break
        case 'Both Tokens':
          amounts = [collateralAmt0Str, collateralAmt1Str]
          break
      }
      if (peripheryPosManager && accountInfo) {
        const AddRemoveCollateralParams = {
          cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
          protocol: protocol.id,
          tokenId: tokenId,
          amounts: amounts,
          to: accountInfo?.address,
          deadline: ethers.constants.MaxUint256,
        }

        let tx = await peripheryPosManager.increaseCollateral(AddRemoveCollateralParams, {
          gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT,
        })
        notifyDismiss(loading)
        return await tx.wait()
      } else {
        notifyDismiss(loading)
        notifyError(
          'An error occurred while fetching contract and user information. Please check you wallet is connected and try again'
        )
        return false
      }
    } catch (err) {
      notifyDismiss(loading)
      notifyError('An error occurred while trying to increase collateral. Please try again.')
      return false
    }
  }

  async function borrowLiquidity(tokenId: string) {
    let loading = notifyLoading('Waiting for increase collateral')
    try {
      if (peripheryPosManager && accountInfo) {
        const BorrowLiquidityParams = {
          cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
          protocol: protocol.id,
          tokenId: tokenId,
          lpTokens: loanAmtStr,
          to: accountInfo?.address,
          deadline: ethers.constants.MaxUint256,
        }
        let tx = await peripheryPosManager.borrowLiquidity(BorrowLiquidityParams)
        notifyDismiss(loading)
        return await tx.wait()
      } else {
        notifyDismiss(loading)
        notifyError(
          'An error occurred while fetching contract and user information. Please check you wallet is connected and try again'
        )
        return false
      }
    } catch (err) {
      notifyDismiss(loading)
      notifyError('An error occurred while trying to borrow liquidity. Please try again.')
      return false
    }
  }

  const getPosMgr = async () => {
    if (token0 == token1) {
      toast('Token values must be different', { icon: <InformationCircleIcon /> })
      return
    }

    //TODO: when the factory is available need to call it to get the pair's pool address to set

    if (provider) {
      if (!peripheryPosManager) {
        if (accountInfo && accountInfo?.address) {
          await setPeripheryPosManager(
            new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider.getSigner(accountInfo?.address))
          )
        } else {
          await setPeripheryPosManager(new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider))
        }
      }
    } else {
      toast('Please connect wallet', { icon: <InformationCircleIcon /> })
    }
  }

  const getGammaPoolFactory = async () => {
    if (provider) {
      if (!gammaPoolFactory) {
        if (accountInfo && accountInfo?.address) {
          await setGammaPoolFactory(
            new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider.getSigner(accountInfo?.address))
          )
        } else {
          await setGammaPoolFactory(new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider))
        }
      }
    } else {
      toast('Please connect wallet', { icon: <InformationCircleIcon /> })
    }
  }

  function getCollateralTypeButtonText(collateralType: CollateralType) {
    switch (collateralType) {
      case CollateralType.None:
        return 'Select collateral type'
      case CollateralType.LPToken:
        return 'Liquidity pool tokens'
      case CollateralType.Token0:
        return token0.symbol
      case CollateralType.Token1:
        return token1.symbol
      case CollateralType.Both:
        return 'Both'
      default:
        return 'Select collateral type'
    }
    return ''
  }

  useEffect(() => {
    resetCollateralType()
    validate()
  }, [token0, token1])

  useEffect(() => {
    setIsOpen(false)
    // setCollateralButtonText(getCollateralTypeButtonText(collateralType))
    setCollateralAmt1(0)
    setCollateralAmt1Str('')
    // setCollateral1Class(collateralType == CollateralType.Both ? style.numberInputContainer : style.numberInputHidden)
    validate()
  }, [collateralType])

  function resetCollateralType() {
    // setCollateralType(CollateralType.None)
    setCollateralButtonText(getCollateralTypeButtonText(CollateralType.None))
    setConfirmStyle(style.invalidatedButton)
    setCollateral1Class(style.numberInputHidden)
    setCollateralAmt1(0)
  }

  function validate() {
    if (token0 == token1) {
      setButtonText('Tokens must be different')
      setConfirmStyle(style.confirmGrey)
      return false
    }
    if (isTokenEmpty(token1)) {
      setButtonText('Token must be selected')
      setConfirmStyle(style.confirmGrey)
      return false
    }
    // if (collateralType == CollateralType.None) {
    //   setButtonText('Collateral must be selected')
    //   setConfirmStyle(style.confirmGrey)
    //   return false
    // }
    if (loanAmt <= 0) {
      setButtonText('Loan amount must be positive')
      setConfirmStyle(style.confirmGrey)
      return false
    }
    if (collateralAmt0 <= 0) {
      setButtonText(token0.symbol + ' collateral amount must be positive')
      setConfirmStyle(style.confirmGrey)
      return false
    }
    // if (collateralType == CollateralType.Both && collateralAmt1 <= 0) {
    //   setButtonText(token1.symbol + ' collateral amount must be positive')
    //   setConfirmStyle(style.confirmGrey)
    //   return false
    // }
    setButtonText('Confirm')
    setConfirmStyle(style.confirmGreen)
    return true
  }

  function isTokenEmpty(tokenToCheck: Token): boolean {
    return Object.values(tokenToCheck).every((tokenProp) => tokenProp === '')
  }

  async function validateBeforeSubmit(data: FieldValues): Promise<void> {
    if (!validate()) {
      return
    }
    // return openLoanHandler(data)
  }

  // checks for non-numeric value inputs
  const validateNumberInput = (
    e: ChangeEvent<HTMLInputElement> | string,
    setNumberInputStr: Dispatch<SetStateAction<string>>,
    setNumberInputval: Dispatch<SetStateAction<number>>
  ): void => {
    let numberInputStr: string
    if (typeof e !== 'string') numberInputStr = (e.target as HTMLInputElement).value
    else numberInputStr = e

    let strToSet = ''
    let i = numberInputStr.indexOf('.')
    if (i >= 0 && i + 1 < numberInputStr.length) {
      strToSet = numberInputStr.substring(0, i + 1) + numberInputStr.substring(i + 1).replace(/[^0-9]/g, '')
    } else {
      strToSet = numberInputStr.replace(/[^0-9\.]/g, '')
    }
    setNumberInputStr(strToSet)

    // clamp the value
    let inputVal = parseFloat(strToSet)
    if (!isNaN(inputVal)) {
      setNumberInputval(inputVal)
    }
  }

  const handleNumberInput = (
    e: ChangeEvent<HTMLInputElement> | string,
    setNumberInputStr: Dispatch<SetStateAction<string>>,
    setNumberInputval: Dispatch<SetStateAction<number>>
  ) => {
    try {
      if (e) {
        const numberInput = typeof e !== 'string' ? e.target.value : e
        if (numberInput === '') {
          setNumberInputStr('')
        } else {
          validateNumberInput(numberInput, setNumberInputStr, setNumberInputval)
        }
      }
      validate()
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)

      notifyError(message)
    }
  }

  setValue('collateralType', collateralType)

  const approveTransaction = async () => {
    if (collateralType.type === 'Token A' && !collateralAmt0Str) {
      notifyError('Please enter a valid amount')
      return
    }

    if (collateralType.type === 'Token B' && !collateralAmt1Str) {
      notifyError('Please enter a valid amount')
      return
    }

    if (collateralType.type === 'Both Tokens' && (!collateralAmt0Str || !collateralAmt1Str)) {
      notifyError('Please enter a valid amount')
      return
    }

    if (collateralType.type === 'Liquidity Pool Tokens' && !collateralAmt0Str) {
      notifyError('Please enter a valid amount')
      return
    }

    if (accountInfo?.address && provider) {
      let approvalA, approvalB, approvalCFMM
      if (collateralType.type === 'Token A' || collateralType.type === 'Both Tokens') {
        let token0Contract = new ethers.Contract(
          token0.address,
          IERC20.abi,
          accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
        )

        approvalA = await validateAllowance(
          accountInfo.address,
          token0Contract,
          BigNumber.from(collateralAmt0Str),
          POSITION_MANAGER_ADDRESS || ''
        )

        if (!approvalA) {
          return
        }
      }

      if (collateralType.type === 'Token B' || collateralType.type === 'Both Tokens') {
        let token1Contract = new ethers.Contract(
          token1.address,
          IERC20.abi,
          accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
        )

        approvalB = await validateAllowance(
          accountInfo.address,
          token1Contract,
          BigNumber.from(collateralAmt1Str),
          POSITION_MANAGER_ADDRESS || ''
        )

        if (!approvalB) {
          return
        }
      }

      if (collateralType.type === 'Liquidity Pool Tokens') {
        let cfmmContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CFMM_ADDRESS || '',
          IERC20.abi,
          accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
        )

        approvalCFMM = await validateAllowance(
          accountInfo.address,
          cfmmContract,
          BigNumber.from(collateralAmt0Str),
          POSITION_MANAGER_ADDRESS || ''
        )

        if (!approvalCFMM) {
          return
        }
      }
      setIsApproved(true)

      // if (collateralType.type === 'Liquidity Pool Tokens' && approvalCFMM) {
      // } else if (collateralType.type === 'Both Tokens' && approvalA && approvalB) {
      //   setIsApproved(true)
      // } else if (collateralType.type === 'Token A' && approvalA) {
      //   setIsApproved(true)
      // } else if (collateralType.type === 'Token B' && approvalB) {
      //   setIsApproved(true)
      // }
    }
  }

  return {
    token0,
    token1,
    setToken0,
    setToken1,
    validateBeforeSubmit,
    handleNumberInput,
    handleSubmit,
    register,
    setIsOpen,
    loanAmtStr,
    setLoanAmtStr,
    setLoanAmt,
    collateralButtonText,
    isOpen,
    collateralType,
    setCollateralType1,
    collateralAmt0Str,
    setCollateralAmt0Str,
    setCollateralAmt0,
    collateral1Class,
    collateralAmt1Str,
    setCollateralAmt1Str,
    setCollateralAmt1,
    confirmStyle,
    buttonText,
    tooltipText,
    setTooltipText,
    token0Balance,
    token1Balance,
    approveTransaction,
    isApproved,
    collateralTypes,
    openLoanHandler,
    lpTokenBalance,
  }
}
