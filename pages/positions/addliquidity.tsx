import { useState, useEffect, useContext, ChangeEvent, SetStateAction, Dispatch } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TokenSelectorModal from '../../components/TokenSelectorModal'
import AddLiquiditySubmitButton from '../../components/AddLiquiditySubmitButton'
import Tokens, { Token } from '../../components/Tokens'
import getSmartContract from '../../utils/getSmartContract'
import { AccountInfo, WalletContext } from '../../context/WalletContext'
import { Provider } from '@ethersproject/providers'

// TO CHANGE WHEN v1-sdk ON NPM IS IMPROVED
const erc20ABI = require('erc-20-abi')
const { abi: IUniswapV2PairABI } = require('@uniswap/v2-core/build/IUniswapV2Pair.json')
const DEPOSIT_POOL_ADDR = "0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152"

const style = {
  wrapper: "w-screen flex justify-center items-center",
  content: "bg-gray-900 w-[30rem] rounded-2xl p-4",
  formHeader: "justify-between items-center font-semibold text-xl text-gray-200 text-center",
  tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
  tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4",
  nonSelectedTokenContainer: "flex items-center w-2/3 text-gray-200",
  nonSelectedTokenContent: "w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-2xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
  tokenSelectorContainer: "flex items-center w-1/ text-gray-200",
  tokenSelectorContent: "w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30",
  tokenSelectorIcon: "flex items-center",
  tokenSelectorTicker: "mx-2",
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
  })

  // holds state of what token input field was selected
  const [tokenSelected, setTokenSelected] = useState<string>("")

  // holds state of modal open and close
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // holds global state of user info and ethers provider for contract calls
  const { accountInfo, provider } = useContext(WalletContext)
  
  // checks for non-numeric value inputs
  const validateTokenInput = (
    e: ChangeEvent<HTMLInputElement>,
    setToken: Dispatch<SetStateAction<string>>
  ): void => {
    const tokenInput: string = (e.target as HTMLInputElement).value
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
    return Object.values(tokenToCheck).every(tokenProp => tokenProp === "")
  }

  /**
   * TESTING
   */
  useEffect(() => {
    getSmartContract(
      erc20ABI,
      process.env.ROPSTEN_TOKEN_A_ADDR as string,
      process.env.ROPSTEN_TOKEN_B_ADDR as string,
      accountInfo as AccountInfo,
      provider as Provider,
    )
  }, [tokenASelected, tokenBSelected])

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.formHeader}>
            <div>Add Liquidity</div>
          </div>
          {/* slot for token A */}
          <div className={style.tokenContainer}>
            <input type="text" onChange={e => validateTokenInput(e, setTokenAInputVal)} value={tokenAInputVal} placeholder="0.0" className={style.tokenInput} />
            <div className={style.tokenSelectorContainer}>
              <div
              className={style.tokenSelectorContent}
              onClick={() => handleTokenSelector("tokenA")}
              >
                <div className={style.tokenSelectorIcon}>
                  <Image src={tokenASelected.imgPath} alt="token logo" width={32} height={32}/>
                </div>
                <div className={style.tokenSelectorTicker}>{tokenASelected.symbol}</div>
                <ChevronDownIcon className={style.dropdownArrow}/>
              </div>
            </div>
          </div>
          {/* slot for token B */}
          <div className={style.tokenContainer}>
            <input type="text" onChange={e => validateTokenInput(e, setTokenBInputVal)} value={tokenBInputVal} placeholder="0.0" className={style.tokenInput} />
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
              )
              
              : (
                <div className={style.tokenSelectorContainer}>
                  <div
                  className={style.tokenSelectorContent}
                  onClick={() => handleTokenSelector("tokenB")}
                  >
                    <div className={style.tokenSelectorIcon}>
                      <Image src={tokenBSelected.imgPath} alt="token logo" width={32} height={32}/>
                    </div>
                    <div className={style.tokenSelectorTicker}>{tokenBSelected.symbol}</div>
                    <ChevronDownIcon className={style.dropdownArrow}/>
                  </div>
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
