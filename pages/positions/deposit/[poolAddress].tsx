import type { NextPage } from 'next'
import { useState, Fragment } from 'react'
import TokenSelectorModal from '../../../src/components/TokenSelectorModal'
import { Tab } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { useDepositHandler } from '../../../src/hooks/useAddLiquidityHandler'
import PairsSelector from '../../../src/components/PairsSelector'
import { LabeledUserInput } from '../../../src/components/Deposit/LabeledUserInput'

const DepositStyles = {
  common: {
    wrapper: 'w-full h-full flex justify-center',
    container: 'mt-20 bg-neutrals-800 w-[30rem] rounded-lg p-4 drop-shadow-lg',
    headerContainer: 'flex text-xxs p-2',
    formHeader: 'font-semibold text-xl text-neutrals-100 tracking-wide text-center',
    tabsContainer:
      'flex rounded-lg w-1/4 p-0.5 bg-neutrals-900 bg-opacity-40 drop-shadow-md space-x-2 font-normal ml-auto',
    tab: 'text-neutrals-600 w-1/2 rounded-md hover:bg-neutrals-800 hover:text-neutrals-300',
    activeTab:
      'outline outline-2 outline-offset-2 outline-accents-royalBlue/50 bg-accents-royalBlue bg-text-lg w-1/2 rounded-md',
    selectPairContainer: 'bg-neutrals-700 mt-3 p-4 drop-shadow-md rounded-lg',
    tokenInputContainer: 'flex flex-col space-y-3',
    tokenSelectorContainer: 'text-neutrals-100 mt-3',
    tokenInput: 'bg-transparent placeholder:text-neutrals-600 outline-none w-full text-3xl text-neutrals-200 mt-4',
    tokenBalance: 'font-semibold text-sm text-neutrals-600 tracking-wide text-right mt-2.5',
    buttonContainer: 'text-xl font-semibold mt-9',
    invalidatedButton: 'disabled text-center py-3 px-5 rounded-lg text-gray-600 border-2 border-gray-700',
    confirmButton: 'bg-primary-blue text-center py-3 px-5 rounded-lg cursor-pointer',
    depositHeader: 'flex space-x-1 items-center',
    infoIcon: 'text-neutrals-400 w-4 h-4 cursor-pointer hover:text-neutrals-100',
    sectionHeading: 'font-semibold text-neutrals-400',
  },
  reserveToken: {
    tokensContainer: 'flex flex-col mt-5 space-y-5',
    tokenContainer: 'bg-neutrals-700 rounded-lg drop-shadow-md p-4',
    maxButton:
      'w-[2rem] text-center bg-neutrals-900 bg-opacity-60 cursor-pointer drop-shadow-lg hover:bg-opacity-70 text-xxs font-normal p-0.5 rounded-sm text-accents-royalBlue text-opacity-50 hover:text-opacity-80',
    tokenSelectorContent:
      'w-full flex items-center rounded-xl text-xl bg-neutrals-800 drop-shadow-lg cursor-pointer p-2 hover:bg-neutrals-600',
    tokenSelectorIcon: 'flex items-center',
    tokenSelectorTicker: 'mx-2',
    dropdownArrow: 'w-12 h-8',
    extraContainer: 'flex items-center mt-2',
    nonSelectedTokenContainer: 'flex items-center w-2/3 text-neutrals-200',
    nonSelectedTokenContent:
      'w-full h-min flex justify-center items-center bg-primary-blue rounded-xl text-xl font-medium cursor-pointer p-2 shadow-md shadow-blue-300/20 hover:bg-blue-400 hover:shadow-blue-400/20',
  },
  lpToken: {
    tokenContainer: 'bg-neutrals-700 rounded-lg drop-shadow-md mt-5 p-4',
    maxButton:
      'w-1/6 text-center bg-neutrals-900 bg-opacity-60 drop-shadow-lg cursor-pointer hover:bg-opacity-70 text-xxs font-normal p-0.5 rounded-sm text-accents-royalBlue text-opacity-50 hover:text-opacity-80',
    tokenSelectorContainer: 'text-neutrals-100 w-[18rem] mt-1',
    tokenSelectorContent:
      'flex justify-evenly items-center bg-neutrals-800 drop-shadow-lg rounded-lg text-2xl cursor-pointer hover:bg-neutrals-600',
    tokenSelectorIcons: 'flex p-2 relative',
    tokenAIcon: 'absolute top-1/4 left-0 z-10',
    tokenBIcon: 'mt-1.5 ml-1.5',
    lpTokenSymbol: 'text-xl',
  },
}

const Deposit: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const style = DepositStyles
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
    depositReserves,
    depositLpTokens,
    tokenABalance,
    tokenBBalance,
    maxTokenA,
    maxTokenB,
    provider
  } = useDepositHandler()

  return (
    <>
      <div className={style.common.wrapper}>
        <div className={`${style.common.container} ${selectedIndex ? "h-[33rem]" : "h-[27rem]"}`}>
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <div className={style.common.headerContainer}>
              <div className={style.common.formHeader}>Deposit Reserves</div>
              <Tab.List className={style.common.tabsContainer}>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button className={selected ? style.common.activeTab : style.common.tab}>LP</button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button className={selected ? style.common.activeTab : style.common.tab}>
                      Reserve
                    </button>
                  )}
                </Tab>
              </Tab.List>
            </div>
            <div className={style.common.selectPairContainer}>
              <PairsSelector
                token0={tokenASelected}
                token1={tokenBSelected}
                setToken0={setTokenASelected}
                setToken1={setTokenBSelected}
              />
            </div>
            <Tab.Panels>
              {/* LP Token Pair TAB */}
              <Tab.Panel>
                <div className={style.lpToken.tokenContainer}>
                  <div className={style.common.depositHeader}>
                    <h2 className={style.common.sectionHeading}>Deposit LP Tokens</h2>
                    {/* need to add popup for info */}
                    <InformationCircleIcon className={style.common.infoIcon} />
                  </div>
                  <LabeledUserInput
                    tokenBalance={tokenABalance}
                    inputType='Liquidity Pool Tokens'
                    token0={tokenASelected}
                    token1={tokenBSelected}
                    inputValue={tokenAInputVal}
                    setTokenValue={setTokenAInputVal}
                  />
                </div>
                <div className={style.common.buttonContainer}>
                  {/* TODO: validation for LP tokens */}
                  {/* TODO: use ApproveConfirmButton */}
                  {isTokenEmpty(tokenASelected) ? (
                    <div className={style.common.invalidatedButton}>Select Token</div>
                  ) : tokenAInputVal === '' ? (
                    <div className={style.common.invalidatedButton}>Enter an Amount</div>
                  ) : !isTokenEmpty(tokenASelected) && tokenAInputVal !== '' ? (
                    <div className={style.common.confirmButton} onClick={depositLpTokens}>
                      Confirm
                    </div>
                  ) : null}
                </div>
                {/* LP Token Pair TAB END */}
              </Tab.Panel>
              {/* Reserve Tokens TAB */}
              <Tab.Panel>
                <div className={style.reserveToken.tokensContainer}>
                  <div className={style.reserveToken.tokenContainer}>
                    <LabeledUserInput
                      tokenBalance={tokenABalance}
                      inputType={'Token A'}
                      token0={tokenASelected}
                      token1={tokenBSelected}
                      inputValue={tokenAInputVal}
                      setTokenValue={setTokenAInputVal}
                    />
                  </div>
                  <div className={style.reserveToken.tokenContainer}>
                    <LabeledUserInput
                      tokenBalance={tokenBBalance}
                      inputType={'Token B'}
                      token0={tokenASelected}
                      token1={tokenBSelected}
                      inputValue={tokenBInputVal}
                      setTokenValue={setTokenBInputVal}
                    />
                  </div>
                </div>
                {/* TODO: use ApproveConfirmButton */}
                <div className={style.common.buttonContainer}>
                  {!provider ? (
                    <div className={style.common.invalidatedButton}>Connect Wallet</div>
                  ) : isTokenEmpty(tokenBSelected) ? (
                    <div className={style.common.invalidatedButton}>Select Token</div>
                  ) : tokenAInputVal === '' || tokenBInputVal === '' ? (
                    <div className={style.common.invalidatedButton}>Enter an Amount</div>
                  ) : !isTokenEmpty(tokenBSelected) && tokenAInputVal !== '' && tokenBInputVal !== '' ? (
                    <div className={style.common.confirmButton} onClick={depositReserves}>
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
        otherToken={tokenSelected === 'tokenA' ? tokenBSelected : tokenASelected}
      />
    </>
  )
}

export default Deposit
