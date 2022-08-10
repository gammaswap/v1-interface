import type { NextPage } from 'next'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TokenSelectorModal from '../../src/components/TokenSelectorModal'
import { AddLiquidityStyles } from '../../styles/AddLiquidityStyles'
import { useAddLiquidityHandler } from '../../src/hooks/useAddLiquidityHandler'

const AddLiquidity: NextPage = () => {
  const style = AddLiquidityStyles()
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
    validateSubmit
  } = useAddLiquidityHandler()

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.formHeader}>
            <div>Add Liquidity</div>
          </div>
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
          <div>{validateSubmit()}</div>
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
