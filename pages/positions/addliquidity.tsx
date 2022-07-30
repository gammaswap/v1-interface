import { useState, useEffect, useContext, ChangeEvent, SetStateAction, Dispatch, useCallback } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TokenSelectorModal from '../../components/TokenSelectorModal'
import AddLiquiditySubmitButton from '../../components/AddLiquiditySubmitButton'
import Tokens, { Token } from '../../components/Tokens'
import { AccountInfo, WalletContext } from '../../context/WalletContext'
import { Provider } from '@ethersproject/providers'
import { BigNumber, Contract } from 'ethers'
import { getTokenContracts, getEstimatedOutput, TokenContracts, AmountsOut } from '../../utils/getSmartContract'
import { BasicContractContext } from '../../context/BasicContractContext'
import useNotification from '../../hooks/useNotification'
import { formatEther } from 'ethers/lib/utils'

const style = {
  wrapper: "w-screen flex justify-center items-center",
  content: "bg-gray-900 w-[30rem] rounded-2xl p-4",
  formHeader: "justify-between items-center font-semibold text-xl text-gray-200 text-center",
  tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
  tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4",
  nonSelectedTokenContainer: "flex items-center w-2/3 text-gray-200",
  nonSelectedTokenContent: "w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-2xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
  tokenSelectorContainer: "items-center w-1/ text-gray-200",
  tokenSelectorContent: "w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30",
  tokenSelectorIcon: "flex items-center",
  tokenSelectorTicker: "mx-2",
  tokenBalance: "self-end mt-2 text-sm text-gray-300 opacity-50 text-right",
  dropdownArrow: "w-12 h-8",
  invalidatedButton: "disabled my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700",
  confirmButton: "bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300"
}

const AddLiquidity: NextPage = () => {
  // holds state of user amount inputted for each of the token input fields
  const [tokenAInputVal, setTokenAInputVal] = useState<string>("")
  const [tokenBInputVal, setTokenBInputVal] = useState<string>("")

  // holds state of token selected for both token A and B input fields
  const [tokenASelected, setTokenASelected] = useState<Token>(Tokens[0])
  const [tokenBSelected, setTokenBSelected] = useState<Token>({
    imgPath: "",
    symbol: "",
    address: "",
    decimals: 18
  })

  // holds state of what token input field was selected for modal opening
  const [tokenSelected, setTokenSelected] = useState<string>("")

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
    if (typeof e !== "string") tokenInput = (e.target as HTMLInputElement).value
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
      return (
        <AddLiquiditySubmitButton buttonStyle={style.invalidatedButton} buttonText={"Select Token"}/>
      )
    }
    if (tokenAInputVal === "" || tokenBInputVal === "") {
      return (
        <AddLiquiditySubmitButton buttonStyle={style.invalidatedButton} buttonText={"Enter an Amount"}/>
      )
    }
    if (!isTokenEmpty(tokenBSelected) && tokenAInputVal !== "" && tokenBInputVal !== "") {
      return (
        <AddLiquiditySubmitButton buttonStyle={style.confirmButton} buttonText={"Confirm"}/>
      )
    }
  }

  // checks if token selected object is empty
  const isTokenEmpty = (tokenToCheck: Token): boolean => {

    return Object.values(tokenToCheck).every(tokenProp => tokenProp === "" || tokenProp === 18)
  }

  // every time token A or B selection changes,
  // render new token A/B contracts, wallet balance, output value
  useEffect(() => {
    const fetchedTokenContracts = getTokenContracts(
      process.env.ROPSTEN_TOKEN_A_ADDR as string,
      process.env.ROPSTEN_TOKEN_B_ADDR as string,
      provider as Provider,
    )
    setTokenContracts(fetchedTokenContracts)
    console.log(tokenContracts)
    // validates and gets new esimated output only on tokenAInputVal
    handleTokenInput(tokenAInputVal, setTokenAInputVal, setTokenBInputVal)
  }, [tokenASelected, tokenBSelected])

  // if called on change of token A or B input vals, validate and update estimated output value
  const handleTokenInput = useCallback((
    e: ChangeEvent<HTMLInputElement> | string,
    setTokenInputVal: Dispatch<SetStateAction<string>>,
    setCounterTokenInputVal: Dispatch<SetStateAction<string>>
  ) => {
    try {
      if (e) {
        const tokenInput = typeof e !== "string" ? e.target.value : e
        if (tokenInput === "") {
          setTokenInputVal("")
          setCounterTokenInputVal("")
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
  }, [validateTokenInput])

  const handleEstimatedOutput = async (
    inputVal: string,
    setCounterTokenInputVal: Dispatch<SetStateAction<string>>,
    tokenAddrs: Array<string>
  ) => {
    const estimatedOutput = await getEstimatedOutput(
      tokenAddrs,
      inputVal,
      provider as Provider,
    )
    if (estimatedOutput) {
      const output = Number(formatEther(estimatedOutput[1]))
      console.log(`1 TOKB = ${Number(output / Number(inputVal)).toFixed(4)} TOKA`)
      console.log(`1 TOKA = ${Number(Number(formatEther(estimatedOutput[0])) / Number(inputVal)).toFixed(4)} TOKB`)
      setCounterTokenInputVal(output.toFixed(4).toString())
    }
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.formHeader}>
            <div>Add Liquidity</div>
          </div>
          {/* slot for token A */}
          <div className={style.tokenContainer}>
            <input type="text" onChange={e => handleTokenInput(e, setTokenAInputVal, setTokenBInputVal)} value={tokenAInputVal} placeholder="0.0" className={style.tokenInput} />
            <div className={style.tokenSelectorContainer}>
              <div
              className={style.tokenSelectorContent}
              onClick={() => handleTokenSelector("tokenA")}
              >
                <div className={style.tokenSelectorIcon}>
                  <Image src={tokenASelected.imgPath} width={32} height={32}/>
                </div>
                <div className={style.tokenSelectorTicker}>{tokenASelected.symbol}</div>
                <ChevronDownIcon className={style.dropdownArrow}/>
              </div>
              <div className={style.tokenBalance}>Balance: {0}</div>
            </div>
          </div>
          {/* slot for token B */}
          <div className={style.tokenContainer}>
            <input type="text" onChange={e => handleTokenInput(e, setTokenBInputVal, setTokenAInputVal)} value={tokenBInputVal} placeholder="0.0" className={style.tokenInput} />
            { /**
             * renders "select token" button by default 
             * when a token is selected, renders dropdown with selected token displayed
            */}
            {isTokenEmpty(tokenBSelected)
              ? (
                <div
                className={style.nonSelectedTokenContainer}
                onClick={() => handleTokenSelector("tokenB")}
                >
                  <div className={style.nonSelectedTokenContent}>
                    Select Token
                  </div>
                </div>
              ) : (
                <div className={style.tokenSelectorContainer}>
                  <div
                  className={style.tokenSelectorContent}
                  onClick={() => handleTokenSelector("tokenB")}
                  >
                    <div className={style.tokenSelectorIcon}>
                      <Image src={tokenBSelected.imgPath} width={32} height={32}/>
                    </div>
                    <div className={style.tokenSelectorTicker}>{tokenBSelected.symbol}</div>
                    <ChevronDownIcon className={style.dropdownArrow}/>
                  </div>
                  <div className={style.tokenBalance}>Balance: {0}</div>
                </div>
              )
            }
          </div>
          <div>
            {validateSubmit()}
          </div>
        </div>
      </div>
      <TokenSelectorModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setTokenSelected={
        tokenSelected === "tokenA"
        ? setTokenASelected
        : setTokenBSelected
      }
      />
    </>
  )
}

export default AddLiquidity
