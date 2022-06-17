import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import eth from '../assets/eth.svg'
import { ChevronDownIcon } from '@heroicons/react/solid'

const style = {
  wrapper: "w-screen flex justify-center items-center",
  content: "bg-gray-900 w-[40rem] rounded-2xl p-4",
  formHeader: "px-2 flex justify-between items-center font-semibold text-xl text-gray-200",
  tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
  tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300",
  tokenSelectorContainer: "flex w-1/4 text-gray-200",
  tokenSelectorContent: "w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900",
  tokenSelectorIcon: "flex items-center",
  tokenSelectorTicker: "mx-2",
  dropdownArrow: "w-12 h-8",
  confirmButton: "bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300"
}


const Positions: NextPage = () => {
  const [tokenAInputVal, setTokenAInputVal] = useState<string>("")
  const [tokenBInputVal, setTokenBInputVal] = useState<string>("")

  // checks for non-numeric value inputs
  const validateTokenInput = (
    e: ChangeEvent<HTMLInputElement>,
    setToken: Dispatch<SetStateAction<string>>
  ): void => {
    const tokenInput: string = (e.target as HTMLInputElement).value
    setToken(tokenInput.replace(/\D/, ''))
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Add Liquidity</div>
        </div>
        {/* slot for token A */}
        <div className={style.tokenContainer}>
          <input type="text" onChange={e => validateTokenInput(e, setTokenAInputVal)} value={tokenAInputVal} placeholder="0.0" className={style.tokenInput} />
          <div className={style.tokenSelectorContainer}>
            <div className={style.tokenSelectorContent}>
              <div className={style.tokenSelectorIcon}>
                <Image src={eth} alt="token logo" width={32} height={32}/>
              </div>
              <div className={style.tokenSelectorTicker}>ETH</div>
              <ChevronDownIcon className={style.dropdownArrow}/>
            </div>
          </div>
        </div>
        {/* slot for token B */}
        <div className={style.tokenContainer}>
          <input type="text" onChange={e => validateTokenInput(e, setTokenBInputVal)} value={tokenBInputVal} placeholder="0.0" className={style.tokenInput} />
          <div className={style.tokenSelectorContainer}>
            <div className={style.tokenSelectorContent}>
              <div className={style.tokenSelectorIcon}>
                <Image src={eth} alt="token logo" width={32} height={32}/>
              </div>
              <div className={style.tokenSelectorTicker}>ETH</div>
              <ChevronDownIcon className={style.dropdownArrow}/>
            </div>
          </div>
        </div>
        <div className={style.confirmButton}>
          Confirm
        </div>
      </div>
    </div>
  )
}

export default Positions
