import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TokenSelectorModal from '../components/TokenSelectorModal'

const style = {
  wrapper: "w-screen flex justify-center items-center",
  content: "bg-gray-900 w-[40rem] rounded-2xl p-4",
  formHeader: "px-2 flex justify-between items-center font-semibold text-xl text-gray-200",
  tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
  tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4",
  nonSelectedTokenContainer: "flex items-center w-1/2 text-gray-200",
  nonSelectedTokenContent: "w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-2xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
  tokenSelectorContainer: "flex items-center w-1/4 text-gray-200",
  tokenSelectorContent: "w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30",
  tokenSelectorIcon: "flex items-center",
  tokenSelectorTicker: "mx-2",
  dropdownArrow: "w-12 h-8",
  confirmButton: "bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300"
}


const Positions: NextPage = () => {
  // holds state of user amount inputted for each of the token input fields
  const [tokenAInputVal, setTokenAInputVal] = useState<string>("")
  const [tokenBInputVal, setTokenBInputVal] = useState<string>("")

  // holds state of token selected for both token A and B input fields
  const [tokenASelected, setTokenASelected] = useState<string>("ETH")
  const [tokenBSelected, setTokenBSelected] = useState<string>("")

  // holds state of what token input field was selected
  const [tokenSelected, setTokenSelected] = useState<string>("")

  // holds state of modal open and close
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // checks for non-numeric value inputs
  const validateTokenInput = (
    e: ChangeEvent<HTMLInputElement>,
    setToken: Dispatch<SetStateAction<string>>
  ): void => {
    const tokenInput: string = (e.target as HTMLInputElement).value
    setToken(tokenInput.replace(/\.\D/, ''))
  }

  // checks which tokenSelector element was selected and opens modal
  const handleTokenSelector = (tokenSelected: string) => {
    setTokenSelected(tokenSelected)
    setIsOpen(true)
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
          <input type="text" onChange={e => validateTokenInput(e, setTokenAInputVal)} value={tokenAInputVal} placeholder="0.0" className={style.tokenInput} />
          <div className={style.tokenSelectorContainer}>
            <div
            className={style.tokenSelectorContent}
            onClick={() => handleTokenSelector("tokenA")}
            >
              <div className={style.tokenSelectorIcon}>
                <Image src={`/crypto/${tokenASelected.toLowerCase()}.svg`} alt="token logo" width={32} height={32}/>
              </div>
              <div className={style.tokenSelectorTicker}>{tokenASelected}</div>
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
          {tokenBSelected === ""
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
                    <Image src={`/crypto/${tokenBSelected.toLowerCase()}.svg`} alt="token logo" width={32} height={32}/>
                  </div>
                  <div className={style.tokenSelectorTicker}>{tokenBSelected}</div>
                  <ChevronDownIcon className={style.dropdownArrow}/>
                </div>
              </div>
            )
          }
        </div>
        <div className={style.confirmButton}>
          Confirm
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

export default Positions
