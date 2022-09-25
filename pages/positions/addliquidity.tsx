import type { NextPage } from 'next'
import { Fragment } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TokenSelectorModal from '../../src/components/TokenSelectorModal'
import { Tab } from '@headlessui/react'
import { useAddLiquidityHandler } from '../../src/hooks/useAddLiquidityHandler'

const AddLiquidityStyles = {
  reserveToken: {
    wrapper: 'w-full h-full flex justify-center',
    container: 'mt-20 bg-neutrals-800 w-[30rem] h-3/5 rounded-lg p-4 drop-shadow-lg',
    headerContainer: 'flex text-xxs p-2',
    formHeader: 'font-semibold text-xl text-neutrals-100 tracking-wide text-center',
    tabsContainer:
      'flex rounded-lg w-1/4 p-0.5 bg-neutrals-900 bg-opacity-40 drop-shadow-md space-x-2 font-normal ml-auto',
    tab: 'text-neutrals-600 w-1/2 rounded-md hover:bg-neutrals-800 hover:text-neutrals-300',
    activeTab:
      'outline outline-2 outline-offset-2 outline-accents-royalBlue/50 bg-accents-royalBlue bg-text-lg w-1/2 rounded-md',
    tokenContainer: 'bg-neutrals-700 mt-4 rounded-xl p-4 drop-shadow-lg flex',
    tokenInputContainer: 'flex flex-col space-y-3',
    tokenInput: 'bg-transparent placeholder:text-neutrals-600 outline-none w-full text-3xl text-neutrals-200 mt-4',
    maxButton:
      'w-[2rem] text-center bg-neutrals-900 bg-opacity-60 cursor-pointer drop-shadow-lg hover:bg-opacity-70 text-xxs font-normal p-0.5 rounded-sm text-accents-royalBlue text-opacity-50 hover:text-opacity-80',
    tokenSelectorContainer: 'text-neutrals-100 mt-3',
    tokenSelectorContent:
      'w-full flex items-center rounded-xl text-xl bg-neutrals-800 drop-shadow-lg cursor-pointer p-2 hover:bg-neutrals-600',
    tokenSelectorIcon: 'flex items-center',
    tokenSelectorTicker: 'mx-2',
    dropdownArrow: 'w-12 h-8',
    extraContainer: 'flex items-center mt-2',
    tokenBalance: 'font-semibold text-sm text-neutrals-600 tracking-wide text-right mt-2.5',
    nonSelectedTokenContainer: 'flex items-center w-2/3 text-neutrals-200',
    nonSelectedTokenContent:
      'w-full h-min flex justify-center items-center bg-primary-blue rounded-xl text-xl font-medium cursor-pointer p-2 shadow-md shadow-blue-300/20 hover:bg-blue-400 hover:shadow-blue-400/20',
    invalidatedButton:
      'disabled rounded-xl py-4 px-6 text-xl font-semibold tracking-wide text-center mt-20 text-neutrals-700 border-2 border-neutrals-700',
    confirmButton:
      'bg-primary-blue rounded-xl py-4 px-6 text-xl font-semibold text-center cursor-pointer mt-20 text-white hover:bg-gradient-to-tr hover:from-accents-royalBlue hover:via-primary-blue hover:to-cyan-400',
  },
  lpToken: {
    tokenContainer: 'bg-neutrals-700 mt-12 rounded-xl py-5 px-4 drop-shadow-lg flex',
    tokenInputContainer: 'flex flex-col space-y-3',
    tokenInput: 'bg-transparent placeholder:text-neutrals-600 outline-none w-full text-3xl text-neutrals-200 mt-4',
    maxButton:
      'w-1/6 text-center bg-neutrals-900 bg-opacity-60 drop-shadow-lg cursor-pointer hover:bg-opacity-70 text-xxs font-normal p-0.5 rounded-sm text-accents-royalBlue text-opacity-50 hover:text-opacity-80',
    tokenSelectorContainer: 'text-neutrals-100 w-[18rem] mt-1',
    tokenSelectorContent:
      'flex justify-evenly items-center bg-neutrals-800 drop-shadow-lg rounded-lg text-2xl cursor-pointer hover:bg-neutrals-600',
    tokenSelectorIcons: 'flex p-2 relative',
    tokenAIcon: 'absolute top-1/4 left-0 z-10',
    tokenBIcon: 'mt-1.5 ml-1.5',
    lpTokenSymbol: 'text-xl',
    tokenBalance: 'font-semibold text-sm text-neutrals-600 tracking-wide text-right mt-2.5',
    invalidatedButton:
      'disabled rounded-xl py-4 px-6 text-xl font-semibold tracking-wide text-center mt-40 text-neutrals-700 border-2 border-neutrals-700',
    confirmButton:
      'bg-primary-blue rounded-xl py-4 px-6 text-xl font-semibold text-center cursor-pointer mt-40 text-white hover:bg-gradient-to-tr hover:from-accents-royalBlue hover:via-primary-blue hover:to-cyan-400',
  },
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
    addLpLiquidity,
    tokenABalance,
    tokenBBalance,
    maxTokenA,
    maxTokenB,
  } = useAddLiquidityHandler()

  return (
    <>
      <div className={style.reserveToken.wrapper}>
        <div className={style.reserveToken.container}>
          <Tab.Group>
            <div className={style.reserveToken.headerContainer}>
              <div className={style.reserveToken.formHeader}>Add Liquidity</div>
              <Tab.List className={style.reserveToken.tabsContainer}>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button className={selected ? style.reserveToken.activeTab : style.reserveToken.tab}>LP</button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button className={selected ? style.reserveToken.activeTab : style.reserveToken.tab}>
                      Reserve
                    </button>
                  )}
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels>
              {/* LP Token Pair TAB */}
              <Tab.Panel>
                <div className={style.lpToken.tokenContainer}>
                  <div className={style.lpToken.tokenInputContainer}>
                    <input
                      type="text"
                      onChange={(e) => handleTokenInput(e, setTokenAInputVal, setTokenBInputVal)}
                      value={tokenAInputVal}
                      placeholder="0.0"
                      className={style.lpToken.tokenInput}
                    />
                    <div className={style.lpToken.maxButton} onClick={maxTokenA}>
                      MAX
                    </div>
                  </div>
                  <div className={style.lpToken.tokenSelectorContainer}>
                    <div
                      className={style.reserveToken.tokenSelectorContent}
                      onClick={() => handleTokenSelector('tokenA')}
                    >
                      <div className={style.reserveToken.tokenSelectorIcon}>
                        <Image src={tokenASelected.imgPath} width={32} height={32} />
                      </div>
                      <div className={style.reserveToken.tokenSelectorTicker}>{tokenASelected.symbol}</div>
                      <ChevronDownIcon className={style.reserveToken.dropdownArrow} />
                    </div>
                    <div className={style.lpToken.tokenBalance}>Balance: {tokenABalance}</div>
                  </div>
                </div>
                <div>
                  {/* TODO: validation for LP tokens */}
                  {isTokenEmpty(tokenASelected) ? (
                    <div className={style.lpToken.invalidatedButton}>Select Token</div>
                  ) : tokenAInputVal === '' ? (
                    <div className={style.lpToken.invalidatedButton}>Enter an Amount</div>
                  ) : !isTokenEmpty(tokenASelected) && tokenAInputVal !== '' ? (
                    <div className={style.lpToken.confirmButton} onClick={addLpLiquidity}>
                      Confirm
                    </div>
                  ) : null}
                </div>
                {/* LP Token Pair TAB END */}
              </Tab.Panel>
              {/* Reserve Tokens TAB */}
              <Tab.Panel>
                {/* slot for token A */}
                <div className={style.reserveToken.tokenContainer}>
                  <div className={style.reserveToken.tokenInputContainer}>
                    <input
                      type="text"
                      onChange={(e) => handleTokenInput(e, setTokenAInputVal, setTokenBInputVal)}
                      value={tokenAInputVal}
                      placeholder="0.0"
                      className={style.reserveToken.tokenInput}
                    />
                    <div className={style.reserveToken.maxButton} onClick={maxTokenA}>
                      MAX
                    </div>
                  </div>
                  <div className={style.reserveToken.tokenSelectorContainer}>
                    <div
                      className={style.reserveToken.tokenSelectorContent}
                      onClick={() => handleTokenSelector('tokenA')}
                    >
                      <div className={style.reserveToken.tokenSelectorIcon}>
                        <Image src={tokenASelected.imgPath} width={32} height={32} />
                      </div>
                      <div className={style.reserveToken.tokenSelectorTicker}>{tokenASelected.symbol}</div>
                      <ChevronDownIcon className={style.reserveToken.dropdownArrow} />
                    </div>
                    <div className={style.reserveToken.tokenBalance}>Balance: {tokenABalance}</div>
                  </div>
                </div>
                {/* slot for token B */}
                <div className={style.reserveToken.tokenContainer}>
                  <div className={style.reserveToken.tokenInputContainer}>
                    <input
                      type="text"
                      onChange={(e) => handleTokenInput(e, setTokenBInputVal, setTokenAInputVal)}
                      value={tokenBInputVal}
                      placeholder="0.0"
                      className={style.reserveToken.tokenInput}
                    />
                    <div className={style.reserveToken.maxButton} onClick={maxTokenB}>
                      MAX
                    </div>
                  </div>
                  {/**
                   * renders "select token" button by default
                   * when a token is selected, renders dropdown with selected token displayed
                   */}
                  {isTokenEmpty(tokenBSelected) ? (
                    <div
                      className={style.reserveToken.nonSelectedTokenContainer}
                      onClick={() => handleTokenSelector('tokenB')}
                    >
                      <div className={style.reserveToken.nonSelectedTokenContent}>Select Token</div>
                    </div>
                  ) : (
                    <div className={style.reserveToken.tokenSelectorContainer}>
                      <div
                        className={style.reserveToken.tokenSelectorContent}
                        onClick={() => handleTokenSelector('tokenB')}
                      >
                        <div className={style.reserveToken.tokenSelectorIcon}>
                          <Image src={tokenBSelected.imgPath} width={32} height={32} />
                        </div>
                        <div className={style.reserveToken.tokenSelectorTicker}>{tokenBSelected.symbol}</div>
                        <ChevronDownIcon className={style.reserveToken.dropdownArrow} />
                      </div>
                      <div className={style.reserveToken.tokenBalance}>Balance: {tokenBBalance}</div>
                    </div>
                  )}
                </div>
                <div>
                  {isTokenEmpty(tokenBSelected) ? (
                    <div className={style.reserveToken.invalidatedButton}>Select Token</div>
                  ) : tokenAInputVal === '' || tokenBInputVal === '' ? (
                    <div className={style.reserveToken.invalidatedButton}>Enter an Amount</div>
                  ) : !isTokenEmpty(tokenBSelected) && tokenAInputVal !== '' && tokenBInputVal !== '' ? (
                    <div className={style.reserveToken.confirmButton} onClick={addLiquidity}>
                      Confirm
                    </div>
                  ) : null}
                </div>
                {/* Reserve Tokens TAB END */}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      {/* TODO: add lp token selector modal */}
      <TokenSelectorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setTokenSelected={tokenSelected === 'tokenA' ? setTokenASelected : setTokenBSelected}
        secondToken={tokenSelected === 'tokenA' ? tokenBSelected : tokenASelected}
      />
    </>
  )
}

export default AddLiquidity
