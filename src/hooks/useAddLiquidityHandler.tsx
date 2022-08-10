import { useState, useEffect, useContext, ChangeEvent, SetStateAction, Dispatch, useCallback } from 'react'
import AddLiquiditySubmitButton from '../../src/components/AddLiquiditySubmitButton'
import Tokens, { Token } from '../../src/components/Tokens'
import { AccountInfo, WalletContext } from '../../src/context/WalletContext'
import { Provider } from '@ethersproject/providers'
import { BigNumber, Contract } from 'ethers'
import { getTokenContracts, getEstimatedOutput, TokenContracts, AmountsOut } from '../../src/utils/getSmartContract'
import { BasicContractContext } from '../../src/context/BasicContractContext'
import useNotification from '../../src/hooks/useNotification'
import { formatEther } from 'ethers/lib/utils'
import { AddLiquidityStyles } from '../../styles/AddLiquidityStyles'

export const useAddLiquidityHandler = () => {
  const style = AddLiquidityStyles()
  // holds state of user amount inputted for each of the token input fields
  const [tokenAInputVal, setTokenAInputVal] = useState<string>('')
  const [tokenBInputVal, setTokenBInputVal] = useState<string>('')

  // holds state of token selected for both token A and B input fields
  const [tokenASelected, setTokenASelected] = useState<Token>(Tokens[0])
  const [tokenBSelected, setTokenBSelected] = useState<Token>({
    imgPath: '',
    symbol: '',
    address: '',
    decimals: 18,
  })

  // holds state of what token input field was selected for modal opening
  const [tokenSelected, setTokenSelected] = useState<string>('')

  // holds state of token contracts from selected tokens
  const [tokenContracts, setTokenContracts] = useState<TokenContracts | null>(null)

  // holds state of modal open and close
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // holds global state of user info and ethers provider for contract calls
  const { accountInfo, provider, signer } = useContext(WalletContext)

  // holds basic smart contracts for uniswap functions
  const { IUniswapV2Router02Contract, IUniswapV2FactoryContract } = useContext(BasicContractContext)

  // error-handling
  const { notifyError, notifySuccess } = useNotification()

  // checks for non-numeric value inputs
  const validateTokenInput = (
    e: ChangeEvent<HTMLInputElement> | string,
    setToken: Dispatch<SetStateAction<string>>
  ): void => {
    let tokenInput: string
    if (typeof e !== 'string') tokenInput = (e.target as HTMLInputElement).value
    else tokenInput = e
    setToken(tokenInput.replace(/[^0-9.]/g, ''))
  }

  // checks which tokenSelector element was selected and opens modal
  const handleTokenSelector = (tokenSelected: string): void => {
    setTokenSelected(tokenSelected)
    setIsOpen(true)
  }

  // validates add liquidity submit transaction button
  const validateSubmit = (): JSX.Element | undefined => {
    if (isTokenEmpty(tokenBSelected)) {
      return <AddLiquiditySubmitButton buttonStyle={style.invalidatedButton} buttonText={'Select Token'} />
    }
    if (tokenAInputVal === '' || tokenBInputVal === '') {
      return <AddLiquiditySubmitButton buttonStyle={style.invalidatedButton} buttonText={'Enter an Amount'} />
    }
    if (!isTokenEmpty(tokenBSelected) && tokenAInputVal !== '' && tokenBInputVal !== '') {
      return <AddLiquiditySubmitButton buttonStyle={style.confirmButton} buttonText={'Confirm'} />
    }
  }

  // checks if token selected object is empty
  const isTokenEmpty = (tokenToCheck: Token): boolean => {
    return Object.values(tokenToCheck).every((tokenProp) => tokenProp === '' || tokenProp === 18)
  }

  // every time token A or B selection changes,
  // render new token A/B contracts, wallet balance, output value
  useEffect(() => {
    const fetchedTokenContracts = getTokenContracts(
      process.env.NEXT_PUBLIC_TOKEN_A_ADDR as string,
      process.env.NEXT_PUBLIC_TOKEN_B_ADDR as string,
      provider as Provider
    )
    setTokenContracts(fetchedTokenContracts)
    console.log(tokenContracts)
    // validates and gets new esimated output only on tokenAInputVal
    handleTokenInput(tokenAInputVal, setTokenAInputVal, setTokenBInputVal)
  }, [tokenASelected, tokenBSelected])

  // if called on change of token A or B input vals, validate and update estimated output value
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

          const tokenAAddr = tokenContracts?.tokenAContract?.address as string
          const tokenBAddr = tokenContracts?.tokenBContract?.address as string
          handleEstimatedOutput(tokenInput, setCounterTokenInputVal, [tokenAAddr, tokenBAddr])
        }
      } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)

        notifyError(message)
      }
      return null
    },
    [validateTokenInput]
  )

  const handleEstimatedOutput = async (
    inputVal: string,
    setCounterTokenInputVal: Dispatch<SetStateAction<string>>,
    tokenAddrs: Array<string>
  ) => {
    const estimatedOutput = await getEstimatedOutput(tokenAddrs, inputVal, provider as Provider)
    if (estimatedOutput) {
      const output = Number(formatEther(estimatedOutput[1]))
      console.log(`1 TOKB = ${Number(output / Number(inputVal)).toFixed(4)} TOKA`)
      console.log(`1 TOKA = ${Number(Number(formatEther(estimatedOutput[0])) / Number(inputVal)).toFixed(4)} TOKB`)
      setCounterTokenInputVal(output.toFixed(4).toString())
    }
  }

  return {
    handleTokenInput,
    setTokenAInputVal,
    setTokenBInputVal,
    tokenAInputVal,
    handleTokenSelector,
    tokenASelected,
    tokenBInputVal,
    isTokenEmpty,
    tokenBSelected,
    isOpen,
    setIsOpen,
    tokenSelected,
    setTokenASelected,
    setTokenBSelected,
    validateSubmit,
  }
}
