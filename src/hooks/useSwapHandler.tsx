import { ChangeEvent, Dispatch, SetStateAction, useCallback, useContext, useState } from 'react'
import Tokens, { Token } from '../components/Tokens'
import { WalletContext } from '../context/WalletContext'

export const useSwapHandler = () => {
  const { accountInfo, connectWallet } = useContext(WalletContext)

  const [tokenAInputVal, setTokenAInputVal] = useState<string>('')
  const [tokenBInputVal, setTokenBInputVal] = useState<string>('')

  const [tokenASelected, setTokenASelected] = useState<Token>(Tokens[0])
  const [tokenBSelected, setTokenBSelected] = useState<Token>({
    imgPath: '',
    symbol: '',
    address: '',
    decimals: 18,
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tokenSelected, setTokenSelected] = useState<string>('')
  const [isSlippageOpen, setIsSlippageOpen] = useState<boolean>(false)
  const [slippage, setSlippage] = useState<string>('')
  const [slippageMinutes, setSlippageMinutes] = useState<string>('')

  const openSlippage = () => {
    setIsSlippageOpen((prevState) => !prevState)
  }

  const handleSlippageMinutes = (e: ChangeEvent<HTMLInputElement> | string) => {
    let minuteInput: string
    if (typeof e !== 'string') minuteInput = (e.target as HTMLInputElement).value
    else minuteInput = e
    let strToSet = ''
    let i = minuteInput.indexOf('.')
    if (i >= 0 && i + 1 < minuteInput.length) {
      strToSet = minuteInput.substring(0, i + 1) + minuteInput.substring(i + 1).replace(/[^0-9]/g, '')
    } else {
      strToSet = minuteInput.replace(/[^0-9\.]/g, '')
    }
    if (strToSet === '') {
      setSlippageMinutes('')
    } else {
      setSlippageMinutes(strToSet)
    }
  }

  const handleSlippageInput = (e: ChangeEvent<HTMLInputElement> | string) => {
    let slippageInput: string
    if (typeof e !== 'string') slippageInput = (e.target as HTMLInputElement).value
    else slippageInput = e
    let strToSet = ''
    let i = slippageInput.indexOf('.')
    if (i >= 0 && i + 1 < slippageInput.length) {
      strToSet = slippageInput.substring(0, i + 1) + slippageInput.substring(i + 1).replace(/[^0-9]/g, '')
    } else {
      strToSet = slippageInput.replace(/[^0-9\.]/g, '')
    }
    if (strToSet === '') {
      setSlippage('')
    } else if (parseInt(strToSet) <= 100) {
      setSlippage(strToSet)
    }
  }

  const validateTokenInput = (
    e: ChangeEvent<HTMLInputElement> | string,
    setToken: Dispatch<SetStateAction<string>>
  ): void => {
    let tokenInput: string
    if (typeof e !== 'string') tokenInput = (e.target as HTMLInputElement).value
    else tokenInput = e
    let strToSet = ''
    let i = tokenInput.indexOf('.')
    if (i >= 0 && i + 1 < tokenInput.length) {
      strToSet = tokenInput.substring(0, i + 1) + tokenInput.substring(i + 1).replace(/[^0-9]/g, '')
    } else {
      strToSet = tokenInput.replace(/[^0-9\.]/g, '')
    }
    setToken(strToSet)
  }

  const handleTokenInput = useCallback(
    (
      e: ChangeEvent<HTMLInputElement> | string,
      setTokenInputVal: Dispatch<SetStateAction<string>>,
      setCounterTokenInputVal: Dispatch<SetStateAction<string>>
    ) => {
      try {
        if (e) {
          const tokenInput = typeof e !== 'string' ? e.target.value : e
          if (tokenInput === '') {
            setTokenInputVal('')
            setCounterTokenInputVal('')
            return
          }

          validateTokenInput(tokenInput, setTokenInputVal)
        }
      } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        console.log(message)
      }
      return null
    },
    [validateTokenInput]
  )

  const handleTokenSelector = (tokenSelected: string): void => {
    setTokenSelected(tokenSelected)
    setIsOpen(true)
  }

  const isTokenEmpty = (tokenToCheck: Token): boolean => {
    return Object.values(tokenToCheck).every((tokenProp) => tokenProp === '' || tokenProp === 18)
  }

  const changeSlippagePercent = (data: string) => {
    setSlippage(data)
  }

  const swapTokenInputs = () => {
    let tokenA = tokenASelected
    let tokenB = tokenBSelected
    let tokenAVal = tokenAInputVal
    let tokenBVal = tokenBInputVal
    setTokenASelected(tokenB)
    setTokenAInputVal(tokenBVal)
    setTokenBSelected(tokenA)
    setTokenBInputVal(tokenAVal)
  }

  return {
    tokenAInputVal,
    setTokenAInputVal,
    tokenBInputVal,
    setTokenBInputVal,
    handleTokenInput,
    tokenASelected,
    setTokenASelected,
    tokenBSelected,
    setTokenBSelected,
    isOpen,
    setIsOpen,
    tokenSelected,
    handleTokenSelector,
    isTokenEmpty,
    accountInfo,
    connectWallet,
    isSlippageOpen,
    openSlippage,
    slippage,
    handleSlippageInput,
    slippageMinutes,
    handleSlippageMinutes,
    changeSlippagePercent,
    swapTokenInputs,
  }
}
