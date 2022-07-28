import {ChevronDownIcon} from '@heroicons/react/solid'
import * as React from 'react'
import {FaInfoCircle} from 'react-icons/fa'
import PairsSelector from '../PairsSelector'

const RepayLoanView = () => {
  const style = {
    wrapper: 'w-screen flex justify-center items-center',
    formContent: 'bg-gray-900 w-[30rem] rounded-2xl p-4 max-w-lg',
    vStack: 'items-center flex-col',
    vStackItem: 'mt-3',
    formHeader: 'justify-between items-center font-semibold text-xl text-gray-200 text-center',
    numberInputContainer: 'bg-gray-800 rounded-2xl p-4 border-2 border-gray-800 hover:border-gray-600 flex justify-between w-full',
    numberInputHidden: 'p-4 border-2 invisible',
    numberInput: 'bg-transparent placeholder:text-gray-600 outline-none w-full text-3xl text-gray-300',
    nonSelectedTokenContainer: 'flex items-center text-gray-200',
    nonSelectedTokenContent:
      'w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30',
    tokenSelectorContainer: 'flex items-center text-gray-200',
    tokenSelectorContent:
      'w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30',
    tokenSelectorIcon: 'flex items-center',
    tokenSelectorTicker: 'mx-2',
    dropdownArrow: 'w-4 h-3',
    invalidatedButton: ' w-full disabled my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700',
    confirmButton: 'w-full bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300',
    infoGroup: 'inline-flex w-full place-content-center pt-1',
    loanInfoButton: 'bg-teal-900 rounded-2xl text-slate-200 text-[8px] font-semibold inline-flex mr-2 px-2 py-1 items-center',
    infoIcon: 'mr-1',
    sectionHeader: 'font-semibold text-gray-200 w-full',
    collateralHeader: 'inline-flex w-full place-content-start',
    collateralHeaderText: 'font-semibold text-gray-200',
    selectCollateralButton: 'bg-[#274060] rounded-2xl text-slate-200 text-[8px] font-semibold inline-flex px-2 py-1 items-center mx-4',
    chrevronIcon: 'ml-1',
    confirmGrey: 'bg-[#274060] w-full rounded-2xl text-gray-500 inline-flex place-content-center py-2 font-semibold',
    confirmInsuffBal: 'bg-red-400 w-full rounded-2xl text-slate-200 inline-flex place-content-center py-2 font-semibold',
    confirmGreen: 'bg-green-300 w-full rounded-2xl text-slate-200 inline-flex place-content-center py-2 font-semibold',
    confirmButtonContainer: 'pb-4 w-full',
    interestRateText: 'w-full text-right text-gray-200 pr-4',
    spacer: 'p-5',
  }

  return (
    <>
      <div className={style.wrapper}>
        <form className={style.formContent}>
          <div className={style.vStack}>
            <div className={style.formHeader}>Rebalance</div>
            <div className={style.vStackItem}>{/* <PairsSelector token0={token0} token1={token1} setToken0={setToken0} setToken1={setToken1} /> */}</div>
            <div className={style.vStackItem}>
              <div className={style.infoGroup}>
                <div className={style.loanInfoButton}>
                  <div className={style.infoIcon}>
                    <FaInfoCircle />
                  </div>
                  MaxLTV --%
                </div>
                <div className={style.loanInfoButton}>
                  <div className={style.infoIcon}>
                    <FaInfoCircle />
                  </div>
                  Liquidation Threshold --%
                </div>
                <div className={style.loanInfoButton}>
                  <div className={style.infoIcon}>
                    <FaInfoCircle />
                  </div>
                  Liquidation Penalty --%
                </div>
              </div>
            </div>
            <div className={style.vStackItem}>
              <div className={style.sectionHeader}>Your Loan Amount</div>
            </div>
            <div className={style.vStackItem}>
              <div className={style.numberInputContainer}>
                <input type="text" placeholder="0.0" className={style.numberInput} />
              </div>
            </div>
            <div className={style.vStackItem}>
              <div className={style.collateralHeader}>
                <div className={style.collateralHeaderText}>Your Collateral</div>
                <div className={style.selectCollateralButton}>
                  Select Collateral
                  <ChevronDownIcon className={style.dropdownArrow} />
                </div>
                {/* <SelectCollateralModal token0={token0} token1={token1} isOpen={isOpen} setIsOpen={setIsOpen} setCollateralType={setCollateralType} /> */}
              </div>
            </div>
            <div className={style.vStackItem}>
              <div className={style.numberInputContainer}>
                <input type="text" placeholder="0.0" className={style.numberInput} />
              </div>
            </div>
            <div className={style.vStackItem}>
              <div className={style.numberInputHidden}>
                <input type="text" placeholder="0.0" className={style.numberInput} />
              </div>
            </div>
            <div className={style.vStackItem}>
              <div className={style.interestRateText}>Interest Rate --%</div>
            </div>
            <div className={style.vStackItem}>
              <button className={style.invalidatedButton} type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default RepayLoanView
