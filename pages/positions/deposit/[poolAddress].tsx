import type { NextPage } from 'next'
import { Fragment } from 'react'
import TokenSelectorModal from '../../../src/components/TokenSelectorModal'
import { Tab } from '@headlessui/react'
import { useAddLiquidityHandler } from '../../../src/hooks/useAddLiquidityHandler'
import PairsSelector from '../../../src/components/PairsSelector'
import { LabeledUserInput } from '../../../src/components/Deposit/LabeledUserInput'

const AddLiquidityStyles = {
  common: {
    selectPairContainer: 'bg-neutrals-700 mt-3 p-4 drop-shadow-md rounded-lg',
    tokenInputContainer: 'flex flex-col space-y-3',
    tokenSelectorContainer: 'text-neutrals-100 mt-3',
    tokenInput: 'bg-transparent placeholder:text-neutrals-600 outline-none w-full text-3xl text-neutrals-200 mt-4',
    tokenBalance: 'font-semibold text-sm text-neutrals-600 tracking-wide text-right mt-2.5',
    invalidatedButton:
      'disabled rounded-xl py-4 px-6 text-xl font-semibold tracking-wide text-center mt-20 text-neutrals-700 border-2 border-neutrals-700',
    confirmButton:
      'bg-primary-blue rounded-xl py-4 px-6 text-xl font-semibold text-center cursor-pointer mt-20 text-white hover:bg-gradient-to-tr hover:from-accents-royalBlue hover:via-primary-blue hover:to-cyan-400',
    depositHeader: 'flex space-x-1 items-center',
    sectionHeading: 'font-semibold text-neutrals-400',
  },
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
    tokenContainer: 'bg-neutrals-700 mt-12 rounded-xl py-5 px-4 drop-shadow-lg',
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
            <div className={style.common.selectPairContainer}>
              <PairsSelector token0={tokenASelected} token1={tokenBSelected} setToken0={setTokenASelected} setToken1={setTokenBSelected} />
            </div>
            <Tab.Panels>
              {/* LP Token Pair TAB */}
              <Tab.Panel>
                <div className={style.lpToken.tokenContainer}>
                  <div className={style.common.depositHeader}>
                    <h2 className={style.common.sectionHeading}>Deposit</h2>
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
                <div>
                  {/* TODO: validation for LP tokens */}
                  {/* TODO: use ApproveConfirmButton */}
                  {isTokenEmpty(tokenASelected) ? (
                    <div className={style.common.invalidatedButton}>Select Token</div>
                  ) : tokenAInputVal === '' ? (
                    <div className={style.common.invalidatedButton}>Enter an Amount</div>
                  ) : !isTokenEmpty(tokenASelected) && tokenAInputVal !== '' ? (
                    <div className={style.common.confirmButton} onClick={addLpLiquidity}>
                      Confirm
                    </div>
                  ) : null}
                </div>
                {/* LP Token Pair TAB END */}
              </Tab.Panel>
              {/* Reserve Tokens TAB */}
              <Tab.Panel>
                <div className={style.lpToken.tokenContainer}>
                  <div className={style.common.depositHeader}>
                    <h2 className={style.common.sectionHeading}>Deposit</h2>
                  </div>
                  <LabeledUserInput
                    tokenBalance={tokenABalance}
                    inputType={'Token A'}
                    token0={tokenASelected}
                    token1={tokenBSelected}
                    inputValue={tokenAInputVal}
                    setTokenValue={setTokenAInputVal}
                  />
                  <LabeledUserInput
                    tokenBalance={tokenBBalance}
                    inputType={'Token B'}
                    token0={tokenASelected}
                    token1={tokenBSelected}
                    inputValue={tokenBInputVal}
                    setTokenValue={setTokenBInputVal}
                  />
                </div>
                {/* TODO: use ApproveConfirmButton */}
                <div>
                  {isTokenEmpty(tokenBSelected) ? (
                    <div className={style.common.invalidatedButton}>Select Token</div>
                  ) : tokenAInputVal === '' || tokenBInputVal === '' ? (
                    <div className={style.common.invalidatedButton}>Enter an Amount</div>
                  ) : !isTokenEmpty(tokenBSelected) && tokenAInputVal !== '' && tokenBInputVal !== '' ? (
                    <div className={style.common.confirmButton} onClick={addLiquidity}>
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

export default AddLiquidity
