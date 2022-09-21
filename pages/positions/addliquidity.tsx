import type { NextPage } from 'next'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TokenSelectorModal from '../../src/components/TokenSelectorModal'
import { useAddLiquidityHandler } from '../../src/hooks/useAddLiquidityHandler'

const AddLiquidityStyles = {
  wrapper: 'w-full h-full flex justify-center',
  container: 'mt-20 bg-neutrals-800 w-[30rem] h-1/2 rounded-lg p-4 drop-shadow-lg',
  formHeader: 'font-semibold text-xl text-neutrals-100 tracking-wide text-center',
  tokenContainer: 'bg-neutrals-700 my-4 rounded-xl p-4 drop-shadow-lg flex',
  tokenInput: 'bg-transparent placeholder:text-neutrals-600 outline-none mb-6 w-full text-3xl text-neutrals-200 mt-4',
  tokenSelectorContainer: 'text-neutrals-100',
  tokenSelectorContent: 'w-full flex items-center rounded-xl text-xl bg-neutrals-800 drop-shadow-lg cursor-pointer p-2 hover:bg-neutrals-600',
  tokenSelectorIcon: 'flex items-center',
  tokenSelectorTicker: 'mx-2',
  dropdownArrow: 'w-12 h-8',
  tokenBalance: 'mt-2 font-semibold text-sm text-neutrals-600 tracking-wide text-right',
  nonSelectedTokenContainer: 'flex items-center w-2/3 text-neutrals-200',
  nonSelectedTokenContent: 'w-full h-min flex justify-center items-center bg-primary-blue rounded-xl text-xl font-medium cursor-pointer p-2 shadow-md shadow-blue-300/20 hover:bg-blue-400 hover:shadow-blue-400/20',
  invalidatedButton: 'disabled rounded-xl py-4 px-6 text-xl font-semibold tracking-wide text-center text-neutrals-700 mt-16 border-2 border-neutrals-700',
  confirmButton: 'bg-primary-blue rounded-xl py-4 px-6 text-xl font-semibold text-center cursor-pointer text-white mt-16 hover:bg-gradient-to-tr hover:from-accents-royalBlue hover:via-primary-blue hover:to-cyan-400',
}

const AddLiquidity: NextPage = () => {
  const style = AddLiquidityStyles
  const {
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
  } = useAddLiquidityHandler()

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.formHeader}>Add Liquidity</div>
          {/* slot for token A */}
          <div className={style.tokenContainer}>
            <input
              type="text"
              onChange={(e) => handleTokenInput(e, setTokenAInputVal, setTokenBInputVal)}
              value={tokenAInputVal}
              placeholder="0.0"
              className={style.tokenInput}
            />
            <div className={style.tokenSelectorContainer}>
              <div className={style.tokenSelectorContent} onClick={() => handleTokenSelector('tokenA')}>
                <div className={style.tokenSelectorIcon}>
                  <Image src={tokenASelected.imgPath} width={32} height={32} />
                </div>
                <div className={style.tokenSelectorTicker}>{tokenASelected.symbol}</div>
                <ChevronDownIcon className={style.dropdownArrow} />
              </div>
              <div className={style.tokenBalance}>Balance: {0}</div>
            </div>
          </div>
          {/* slot for token B */}
          <div className={style.tokenContainer}>
            <input
              type="text"
              onChange={(e) => handleTokenInput(e, setTokenBInputVal, setTokenAInputVal)}
              value={tokenBInputVal}
              placeholder="0.0"
              className={style.tokenInput}
            />
            {/**
             * renders "select token" button by default
             * when a token is selected, renders dropdown with selected token displayed
             */}
            {isTokenEmpty(tokenBSelected) ? (
              <div className={style.nonSelectedTokenContainer} onClick={() => handleTokenSelector('tokenB')}>
                <div className={style.nonSelectedTokenContent}>Select Token</div>
              </div>
            ) : (
              <div className={style.tokenSelectorContainer}>
                <div className={style.tokenSelectorContent} onClick={() => handleTokenSelector('tokenB')}>
                  <div className={style.tokenSelectorIcon}>
                    <Image src={tokenBSelected.imgPath} width={32} height={32} />
                  </div>
                  <div className={style.tokenSelectorTicker}>{tokenBSelected.symbol}</div>
                  <ChevronDownIcon className={style.dropdownArrow} />
                </div>
                <div className={style.tokenBalance}>Balance: {0}</div>
              </div>
            )}
          </div>
          <div>
            {isTokenEmpty(tokenBSelected) ? (
              <div className={style.invalidatedButton}>Select Token</div>
            ) : tokenAInputVal === '' || tokenBInputVal === '' ? (
              <div className={style.invalidatedButton}>Enter an Amount</div>
            ) : !isTokenEmpty(tokenBSelected) && tokenAInputVal !== '' && tokenBInputVal !== '' ? (
              <div className={style.confirmButton} onClick={addLiquidity}>
                Confirm
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <TokenSelectorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setTokenSelected={tokenSelected === 'tokenA' ? setTokenASelected : setTokenBSelected}
      />
    </>
  )
}

export default AddLiquidity
