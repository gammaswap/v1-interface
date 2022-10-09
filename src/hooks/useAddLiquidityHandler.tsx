import { useState, useEffect, useContext, ChangeEvent, SetStateAction, Dispatch, useCallback } from 'react'
import Tokens, { Token } from '../../src/components/Tokens'
import { WalletContext } from '../../src/context/WalletContext'
import { BigNumber, Contract, ethers } from 'ethers'
import { getTokenBalance, getTokensFromPoolAddress } from '../utils/getSmartContract'
import PosManager from '@gammaswap/v1-periphery/artifacts/contracts/PositionManager.sol/PositionManager.json'
import { notifyDismiss, notifyError, notifyLoading, notifySuccess, notifyInfo } from './useNotification'
import { handleNumberInput, validateAllowance } from '../utils/validation'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import { useRouter } from 'next/router'

export const useAddLiquidityHandler = () => {
  const POSITION_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS
  // holds state of user amount inputted for each of the token input fields
  const [tokenAInputVal, setTokenAInputVal] = useState<string>('')
  const [tokenBInputVal, setTokenBInputVal] = useState<string>('')

  // holds state of token selected for both token A and B input fields
  const [tokenASelected, setTokenASelected] = useState<Token>(Tokens[0])
  const [tokenBSelected, setTokenBSelected] = useState<Token>({
    imgPath: '',
    symbol: '',
    address: '',
    decimals: 0,
  })
  const [tokenABalance, setTokenABalance] = useState<string>('0')
  const [tokenBBalance, setTokenBBalance] = useState<string>('0')

  const [posManager, setPosManager] = useState<Contract | null>(null)

  // holds state of what token input field was selected for modal opening
  const [tokenSelected, setTokenSelected] = useState<string>('')

  // holds state of modal open and close
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // holds global state of user info and ethers provider for contract calls
  const { accountInfo, provider } = useContext(WalletContext)
  const router = useRouter()

  useEffect(() => {
    if (!provider) {
      return
    }

    let poolAddress = router.query.poolAddress
    if (!poolAddress || poolAddress.length == 0 || poolAddress == "0") {
      return
    }

    getTokensFromPoolAddress(
      router.query.poolAddress as string,
      provider,
      setTokenASelected,
      setTokenBSelected
    )
  }, [])

  // checks which tokenSelector element was selected and opens modal
  const handleTokenSelector = (tokenSelected: string): void => {
    setTokenSelected(tokenSelected)
    setIsOpen(true)
  }

  // checks if token selected object is empty
  const isTokenEmpty = (tokenToCheck: Token): boolean => {
    return Object.values(tokenToCheck).every((tokenProp) => tokenProp === '' || tokenProp === 18)
  }

  useEffect(() => {
    setTokenAInputVal("")
    setTokenBInputVal("")
  }, [tokenASelected, tokenBSelected])

  useEffect(() => {
    async function loadPosMgr() {
      if (!provider) {
        notifyError('Please connect wallet.')
        return
      }

      let address = POSITION_MANAGER_ADDRESS || ''
      let _posManager = new ethers.Contract(
        address,
        PosManager.abi,
        accountInfo && accountInfo.address ?
          provider.getSigner(accountInfo.address) :
          provider
      )
      if (_posManager) {
        setPosManager(_posManager)
      }
    }
    loadPosMgr()
  }, [provider])

  useEffect(() => {
    let accountAddress = accountInfo?.address || ''
    if (provider && tokenASelected.address) {
      getTokenBalance(accountAddress, tokenASelected.address, tokenASelected.symbol, provider, setTokenABalance)
    }
  }, [provider, tokenASelected])

  useEffect(() => {
    let accountAddress = accountInfo?.address || ''
    if (provider && tokenBSelected.address) {
      getTokenBalance(accountAddress, tokenBSelected.address, tokenBSelected.symbol, provider, setTokenBBalance)
    }
  }, [provider, tokenBSelected])

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

          handleNumberInput(e, setTokenInputVal)

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
    [handleNumberInput]
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
      if (posManager && accountInfo?.address && provider) {
        let tokenAContract = new ethers.Contract(
          tokenASelected.address,
          IERC20.abi,
          accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
        )

        let approvalA = await validateAllowance(
          accountInfo.address,
          tokenAContract,
          BigNumber.from(parseFloat(tokenAInputVal)),
          POSITION_MANAGER_ADDRESS || ''
        )

        let tokenBContract = new ethers.Contract(
          tokenBSelected.address,
          IERC20.abi,
          accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
        )

        let approvalB = await validateAllowance(
          accountInfo.address,
          tokenBContract,
          BigNumber.from(parseFloat(tokenBInputVal)),
          POSITION_MANAGER_ADDRESS || ''
        )

        let loading = notifyLoading('Waiting for transaction to complete')
        try {
          if (approvalA && approvalB) {
            const DepositReservesParams = {
              cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
              amountsDesired: [BigNumber.from(parseFloat(tokenAInputVal)), BigNumber.from(parseFloat(tokenBInputVal))],
              amountsMin: [0, 0],
              to: accountInfo.address,
              protocol: 1,
              deadline: ethers.constants.MaxUint256,
            }
            let tx = await posManager.depositReserves(DepositReservesParams, {
              gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT,
            })
            let res = await tx.wait()
            const { args } = res.events[0]
            let message = 'Add Liquidity Success: ' + args.pool + args.reservesLen.toNumber() + args.shares.toNumber()
            notifyDismiss(loading)
            notifySuccess(message)
          } else {
            notifyDismiss('Waiting for transaction to complete')
          }
        } catch (e: any) {
          notifyDismiss(loading)
          if (e?.code === 'ACTION_REJECTED') {
            notifyError('User rejected the transaction')
          } else {
            notifyError('An error occurred while adding LP Token Liquidity. Please try again')
          }
        }
      }
    }
  }

  const addLpLiquidity = async () => {
    if (posManager && accountInfo?.address && provider) {
      let tokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CFMM_ADDRESS || '',
        IERC20.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )

      let approval = await validateAllowance(
        accountInfo.address,
        tokenContract,
        BigNumber.from(parseFloat(tokenAInputVal)),
        POSITION_MANAGER_ADDRESS || ''
      )
      let loading = notifyLoading('Waiting for transaction to complete')
      try {
        if (approval) {
          const DepositNoPullParams = {
            cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
            protocol: 1,
            lpTokens: parseFloat(tokenAInputVal),
            to: accountInfo.address,
            deadline: ethers.constants.MaxUint256,
          }
          let tx = await posManager.depositNoPull(DepositNoPullParams, { gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT })
          let res = await tx.wait()
          const { args } = res.events[0]
          let message = 'Add Liquidity Success: ' + args.pool + args.reservesLen.toNumber() + args.shares.toNumber()
          notifyDismiss(loading)
          notifySuccess(message)
        } else {
          notifyDismiss(loading)
        }
      } catch (e: any) {
        notifyDismiss(loading)
        if (e?.code === 'ACTION_REJECTED') {
          notifyError('User rejected the transaction')
        } else {
          notifyError('An error occurred while adding LP Token Liquidity. Please try again')
        }
      }
    }
  }

  const maxTokenA = () => {
    setTokenAInputVal(tokenABalance)
  }
  const maxTokenB = () => {
    setTokenBInputVal(tokenBBalance)
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
    addLpLiquidity,
    tokenABalance,
    tokenBBalance,
    maxTokenA,
    maxTokenB,
    provider
  }
}
