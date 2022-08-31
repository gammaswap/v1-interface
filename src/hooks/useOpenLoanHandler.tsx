import * as React from 'react'
import { useState, useEffect, useContext, Dispatch, SetStateAction, useCallback, ChangeEvent } from 'react'
import Tokens, { Token } from '../components/Tokens'
import { WalletContext } from '../context/WalletContext'
// TODO: import Factory from '../../abis/Factory.json'
import PositionMgr from '../../abis/v0-hackathon/PositionManager.json'
import IERC20 from '../../abis/v0-hackathon/ERC20.json'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import { CollateralType } from '../components/OpenLoan/CollateralType'
import toast from 'react-hot-toast'
import { FcInfo } from 'react-icons/fc'
import { FieldValues, useForm } from 'react-hook-form'
import useNotification from './useNotification'
import { OpenLoanStyles } from '../../styles/OpenLoanStyles'
// For V1 Periphery
import PositionManager from '../../abis/v1-periphery/PositionManager.sol/PositionManager.json'

const style = OpenLoanStyles()

export const useOpenLoanHandler = () => {
  const { provider, accountInfo } = useContext(WalletContext)
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>({
    imgPath: '',
    symbol: '',
    address: '',
    decimals: 0,
  })
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [peripheryPosManager, setPeripheryPosManager] = useState<Contract | null>(null)

  const [collateralType, setCollateralType] = useState<CollateralType>(CollateralType.None)
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
  const { notifyError, notifySuccess } = useNotification()
  const [buttonText, setButtonText] = useState<string>('Confirm')
  const [collateral1Class, setCollateral1Class] = useState<string>('')
  const [tooltipText, setTooltipText] = useState<string>('')

  useEffect(() => {
    if (!provider) {
      toast('Please connect wallet.', { icon: <FcInfo /> })
      return
    }

    // Position Manager contract address
    let pairsAddress =
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
        ? process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
        : '0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b'

    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'local') {
      if (accountInfo && accountInfo?.address) {
        setPosManager(new ethers.Contract(pairsAddress, PositionMgr.abi, provider.getSigner(accountInfo?.address)))
      } else {
        setPosManager(new ethers.Contract(pairsAddress, PositionMgr.abi, provider))
      }
    } else {
      if (accountInfo && accountInfo?.address) {
        setPeripheryPosManager(
          new ethers.Contract(pairsAddress, PositionManager.abi, provider.getSigner(accountInfo?.address))
        )
      } else {
        setPeripheryPosManager(new ethers.Contract(pairsAddress, PositionManager.abi, provider))
      }
    }
  }, [provider])

  async function openLoanHandler(data: FieldValues) {
    if (!accountInfo || !accountInfo.address) {
      toast.error('Wallet not connected.')
      return
    }

    getPosMgr()
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'local') {
      if (!posManager) {
        toast.error('Position manager not found.')
        return
      }

      if (!provider) {
        toast.error('Provider not set.')
        return
      }

      // unpack
      let amt0BN = data.collateralAmt0
        ? ethers.utils.parseUnits(data.collateralAmt0, token0.decimals)
        : BigNumber.from(0)
      let amt1BN = data.collateralAmt1
        ? ethers.utils.parseUnits(data.collateralAmt1, token1.decimals)
        : BigNumber.from(0)
      let loanAmtBN = ethers.utils.parseUnits(data.loanAmt, 18) // 18 is from DepositPool.decimals
      let collateralType = data.collateralType
      let accountAddress = accountInfo.address ? accountInfo.address : ''

      try {
        let erc20
        switch (collateralType) {
          case CollateralType.LPToken:
            // TODO: currently no way to know get uniPair without factory
            // can't get it from position because there's no position yet
            break
          case CollateralType.Token0:
            erc20 = new ethers.Contract(token0.address, IERC20.abi, provider)
            await ensureAllowance(accountAddress, erc20, amt0BN, token0.decimals, token0.symbol)
            break
          case CollateralType.Token1:
            // switch the amounts because amount comes from first input
            amt1BN = amt0BN
            amt0BN = BigNumber.from(0)
            erc20 = new ethers.Contract(token1.address, IERC20.abi, provider)
            await ensureAllowance(accountAddress, erc20, amt1BN, token1.decimals, token1.symbol)
            break
          case CollateralType.Both:
            let erc20Token0 = new ethers.Contract(token0.address, IERC20.abi, provider)
            let erc20Token1 = new ethers.Contract(token1.address, IERC20.abi, provider)
            await ensureAllowance(accountAddress, erc20Token0, amt0BN, token0.decimals, token0.symbol).then(() =>
              ensureAllowance(accountAddress, erc20Token1, amt1BN, token1.decimals, token1.symbol)
            )
            break
          default:
            toast.error('Invalid collateral type.')
            return
        }
        // TODO: wait for contract to handle collateral
        let tx = await posManager.openPosition(
          token0.address,
          token1.address,
          amt0BN,
          amt1BN,
          loanAmtBN,
          accountAddress
        )
        let loading = toast.loading('Waiting for block confirmation')
        let receipt = await tx.wait()
        if (receipt.status == 1) {
          toast.dismiss(loading)
          toast.success('Position opened successfully.')
          return
        }
        toast.error('Open position was unsuccessful.')
      } catch (e) {
        if (typeof e === 'string') {
          toast.error(e)
        } else if (e instanceof Error) {
          toast.error(e.message)
        }
      }
    } else {
      if (peripheryPosManager) {
        let loading = toast.loading('Waiting for block confirmation')
        createLoan()
          .then((res) => {
            const { args } = res.events[1]
            let tokenId = args.tokenId.toNumber()
            console.log(tokenId)
            borrowLiquidity(tokenId)
              .then((result) => {
                console.log(result)
                toast.success('Open loan was successful')
                toast.dismiss(loading)
              })
              .catch((err) => {
                console.log(err)
                toast.dismiss(loading)
                toast.error('Borrow liquidity was unsuccessful')
              })
          })
          .catch((err) => {
            console.log(err)
            toast.dismiss(loading)
            toast.error('Create loan was unsuccessful')
          })
      }
    }
  }

  async function createLoan() {
    if (peripheryPosManager && accountInfo) {
      let tx = await peripheryPosManager.createLoan(
        process.env.NEXT_PUBLIC_CFMM_ADDRESS,
        1,
        accountInfo?.address,
        ethers.constants.MaxUint256
      )
      return await tx.wait()
    }
  }

  async function borrowLiquidity(tokenId: number) {
    if (peripheryPosManager && accountInfo) {
      const BorrowLiquidityParams = {
        cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
        protocol: 1,
        tokenId: tokenId,
        lpTokens: 1,
        to: accountInfo?.address,
        deadline: ethers.constants.MaxUint256,
      }
      let tx = await peripheryPosManager.borrowLiquidity(BorrowLiquidityParams)
      return await tx.wait()
    }
  }

  async function ensureAllowance(
    account: string,
    erc20: Contract,
    amountBN: BigNumber,
    decimals: number,
    symbol: string
  ) {
    try {
      let amountStr = ethers.utils.formatUnits(amountBN, decimals)

      // check enough balance
      let balanceBN = await erc20.balanceOf(account)
      if (balanceBN < amountBN) {
        toast.error(
          'Not enough funds. Requested: ' + amountStr + ' Balance ' + ethers.utils.formatUnits(balanceBN, decimals)
        )
      }
      // check enough allowance
      let allowance = await erc20.allowance(account, posManager?.address)
      if (allowance < amountBN) {
        return approve(erc20, posManager?._address)
      }
    } catch (e) {
      if (typeof e === 'string') {
        toast.error('checkAllowance: ' + e)
      } else if (e instanceof Error) {
        toast.error('checkAllowance: ' + e.message)
      }
    }
  }

  async function approve(fromTokenContract: Contract, spender: string) {
    let tx = await fromTokenContract.approve(spender, constants.MaxUint256)
    let loading = toast.loading('Waiting for approval')
    let receipt = await tx.wait()
    toast.dismiss(loading)
    if (receipt.status == 1) {
      toast.success('Approval completed')
      return
    }
    toast.success('Approval failed')
  }

  function getPosMgr() {
    if (token0 == token1) {
      toast('Token values must be different', { icon: <FcInfo /> })
      return
    }
    let pairsAddress =
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
        ? process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
        : '0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b'

    //TODO: when the factory is available need to call it to get the pair's pool address to set

    if (provider) {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'local' && !posManager) {
        if (accountInfo && accountInfo?.address) {
          setPosManager(new ethers.Contract(pairsAddress, PositionMgr.abi, provider.getSigner(accountInfo?.address)))
        } else {
          setPosManager(new ethers.Contract(pairsAddress, PositionMgr.abi, provider))
        }
      } else if (!peripheryPosManager) {
        if (accountInfo && accountInfo?.address) {
          setPeripheryPosManager(
            new ethers.Contract(pairsAddress, PositionManager.abi, provider.getSigner(accountInfo?.address))
          )
        } else {
          setPeripheryPosManager(new ethers.Contract(pairsAddress, PositionManager.abi, provider))
        }
      }
    } else {
      toast('Please connect wallet', { icon: <FcInfo /> })
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
    setCollateralButtonText(getCollateralTypeButtonText(collateralType))
    setCollateralAmt1(0)
    setCollateralAmt1Str('')
    setCollateral1Class(collateralType == CollateralType.Both ? style.numberInputContainer : style.numberInputHidden)
    validate()
  }, [collateralType])

  function resetCollateralType() {
    setCollateralType(CollateralType.None)
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
    if (collateralType == CollateralType.None) {
      setButtonText('Collateral must be selected')
      setConfirmStyle(style.confirmGrey)
      return false
    }
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
    if (collateralType == CollateralType.Both && collateralAmt1 <= 0) {
      setButtonText(token1.symbol + ' collateral amount must be positive')
      setConfirmStyle(style.confirmGrey)
      return false
    }
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
    return openLoanHandler(data)
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
    setCollateralType,
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
  }
}
