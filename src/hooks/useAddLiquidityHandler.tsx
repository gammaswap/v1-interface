import { useState, useEffect, useContext, ChangeEvent, SetStateAction, Dispatch, useCallback } from 'react'
import Tokens, { Token } from '../../src/components/Tokens'
import { WalletContext } from '../../src/context/WalletContext'
import { Provider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers } from 'ethers'
import { getTokenContracts, getEstimatedOutput, TokenContracts, AmountsOut } from '../../src/utils/getSmartContract'
import { BasicContractContext } from '../../src/context/BasicContractContext'
import { getTokenBalance } from '../utils/getSmartContract'

import PosManager from '../../abis/v1-periphery/PositionManager.sol/PositionManager.json'
import { notifyError, notifySuccess } from './useNotification'

export const useAddLiquidityHandler = () => {
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
  const [tokenABalance, setTokenABalance] = useState<string>('0')
  const [tokenBBalance, setTokenBBalance] = useState<string>('0')

  const [posManager, setPosManager] = useState<Contract | null>(null)

  // holds state of what token input field was selected for modal opening
  const [tokenSelected, setTokenSelected] = useState<string>('')

  // holds state of token contracts from selected tokens
  const [tokenContracts, setTokenContracts] = useState<TokenContracts | null>(null)

  // holds state of modal open and close
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // holds global state of user info and ethers provider for contract calls
  const { accountInfo, provider } = useContext(WalletContext)

  // checks for non-numeric value inputs
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

  // checks which tokenSelector element was selected and opens modal
  const handleTokenSelector = (tokenSelected: string): void => {
    setTokenSelected(tokenSelected)
    setIsOpen(true)
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
    // validates and gets new esimated output only on tokenAInputVal
    handleTokenInput(tokenAInputVal, setTokenAInputVal, setTokenBInputVal)
  }, [tokenASelected, tokenBSelected])

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        notifyError('Please connect wallet.')
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
    const getTokenABalances = async () => {
      if (provider) {
        let accountAddress = accountInfo?.address || ''
        if (tokenASelected.address) {
          let balance = await getTokenBalance(accountAddress, tokenASelected.address, tokenASelected.symbol, provider)
          setTokenABalance(balance || '0')
        }
      }
    }
    getTokenABalances()
  }, [tokenASelected, provider])

  useEffect(() => {
    const getTokenBBalances = async () => {
      if (provider) {
        let accountAddress = accountInfo?.address || ''
        if (tokenBSelected.address) {
          let balance = await getTokenBalance(accountAddress, tokenBSelected.address, tokenBSelected.symbol, provider)
          setTokenBBalance(balance || '0')
        }
      }
    }
    getTokenBBalances()
  }, [tokenBSelected, provider])

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

          // const tokenAAddr = tokenContracts?.tokenAContract?.address as string
          // const tokenBAddr = tokenContracts?.tokenBContract?.address as string
          // handleEstimatedOutput(tokenInput, setCounterTokenInputVal, [tokenAAddr, tokenBAddr])
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

  // TODO: We need an environment that has uni contracts deployed
  // const handleEstimatedOutput = async (
  //   inputVal: string,
  //   setCounterTokenInputVal: Dispatch<SetStateAction<string>>,
  //   tokenAddrs: Array<string>
  // ) => {
  //   const estimatedOutput = await getEstimatedOutput(tokenAddrs, inputVal, provider as Provider)
  //   if (estimatedOutput) {
  //     const output = Number(formatEther(estimatedOutput[1]))
  //     console.log(`1 TOKB = ${Number(output / Number(inputVal)).toFixed(4)} TOKA`)
  //     console.log(`1 TOKA = ${Number(Number(formatEther(estimatedOutput[0])) / Number(inputVal)).toFixed(4)} TOKB`)
  //     setCounterTokenInputVal(output.toFixed(4).toString())
  //   }
  // }

  const addLiquidity = async () => {
    if (posManager && accountInfo) {
      try {
        const DepositReservesParams = {
          cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
          amountsDesired: [BigNumber.from(parseFloat(tokenAInputVal)), BigNumber.from(parseFloat(tokenBInputVal))],
          amountsMin: [0, 0],
          to: accountInfo.address,
          protocol: 1,
          deadline: ethers.constants.MaxUint256,
        }
        let tx = await posManager.depositReserves(DepositReservesParams)
        let res = await tx.wait()
        const { args } = res.events[0]
        let message = 'Add Liquidity Success: ' + args.pool + args.reservesLen.toNumber() + args.shares.toNumber()
        notifySuccess(message)
      } catch (e) {
        notifyError('An error occurred while adding liquidity. Please try again:' + e)
        return e
      }
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
    addLiquidity,
    tokenABalance,
    tokenBBalance,
  }
}
