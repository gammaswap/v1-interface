import type { NextPage } from 'next'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TokenSelectorModal from '../../components/TokenSelectorModal'
import AddLiquiditySubmitButton from '../../components/AddLiquiditySubmitButton'
import { useAddLiquidityHandlers } from '../../hooks/useAddLiquidityHandlers'

const style = {
  wrapper: "w-screen flex justify-center items-center",
  content: "bg-gray-900 w-[40rem] rounded-2xl p-4",
  formHeader: "px-2 flex justify-between items-center font-semibold text-xl text-gray-200",
  tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
  tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4",
  nonSelectedTokenContainer: "flex items-center w-1/2 text-gray-200",
  nonSelectedTokenContent: "w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-2xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
  tokenSelectorContainer: "flex flex-col items-center w-1/3 text-gray-200",
  tokenSelectorContent: "w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30",
  tokenSelectorIcon: "flex items-center",
  tokenSelectorTicker: "mx-2",
  tokenBalance: "self-end mt-2 text-sm text-gray-300 opacity-50",
  dropdownArrow: "w-12 h-8",
  invalidatedButton: "disabled my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700",
  confirmButton: "bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300"
}

const AddLiquidity: NextPage = () => {
  const { 
    tokenAInputVal,
    setTokenAInputVal,
    tokenBInputVal,
    setTokenBInputVal,
    tokenASelected,
    setTokenASelected,
    tokenBSelected,
    setTokenBSelected,
    tokenSelected,
    isOpen,
    setIsOpen,
    handleTokenSelector,
    isTokenEmpty,
    handleTokenInput
  } = useAddLiquidityHandlers()

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
          {validateSubmit()}
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
