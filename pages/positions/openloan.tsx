import type { NextPage } from 'next'
import SelectCollateralModal from '../../src/components/OpenLoan/SelectCollateralModal'
import { ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/solid'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import PairsSelector from '../../src/components/PairsSelector'
import { useOpenLoanHandler } from '../../src/hooks/useOpenLoanHandler'
import { Tooltip } from '../../src/components/Tooltip'

export const OpenLoanStyles = {
  wrapper: 'w-full h-full flex justify-center',
  container: 'mt-4 bg-neutrals-800 w-[30rem] h-[38rem] rounded-xl p-4',
  headerContainer: 'flex text-xxs',
  backButton: 'w-7 h-7 mt-0.5 cursor-pointer hover:bg-neutrals-700 p-1 rounded-full',
  formHeader: 'font-semibold text-lg text-neutrals-100 ml-4',
  selectPairContainer: 'bg-neutrals-700 mt-3 p-4 drop-shadow-md rounded-lg',
  infoIcon: '',
  vStack: 'items-center flex-col',
  vStackItem: 'mt-3',
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
  loanInfoButton: 'bg-primaryV2-4 rounded-2xl text-slate-200 text-[8px] font-semibold inline-flex mr-2 px-2 py-1 items-center hover:bg-primaryV2-3 hover:shadow-primaryV2-3/30 tooltip',
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

const tips = {
  maxltv: 'The Maximum LTV ratio represents the maximum borrowing power of a ' +
  'specific collateral. For example, if a collateral has an LTV of 75%, the ' +
  'user can borrow up to 0.75 worth of ETH in the principal currency for ' +
  'every 1 ETH worth of collateral.',
  threshold: 'This represents the threshold at which a borrow position will ' +
  'be considered undercollateralized and subject to liquidation for each ' +
    'collateral. For example, if a collateral has a liquidation threshold of ' +
    '80%, it means that the position will be liquidated when the debt value is ' +
    'worth 80% of the collateral value.',
  penalty: 'When a liquidation occurs, liquidations repay up to 50% of the ' +
    'outstanding borrowed amount on behalf of the borrower. In return, they ' +
    'can buy the collateral at a discount and keep the difference (liquidation ' +
    'penalty) as a bonus.'
}

const OpenLoanPage: NextPage = () => {
  const style = OpenLoanStyles
  const {
    token0,
    token1,
    setToken0,
    setToken1,
    validateBeforeSubmit,
    handleNumberInput,
    handleSubmit,
    register,
    setIsOpen,
    loanAmtStr,
    setLoanAmtStr,
    setLoanAmt,
    collateralButtonText,
    isOpen,
    setCollateralType,
    collateralAmt0Str,
    setCollateralAmt0Str,
    setCollateralAmt0,
    collateral1Class,
    collateralAmt1Str,
    setCollateralAmt1Str,
    setCollateralAmt1,
    confirmStyle,
    buttonText,
    tooltipText,
    setTooltipText,
  } = useOpenLoanHandler()

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <ArrowLeftIcon className={style.backButton} />
          <div className={style.formHeader}>Open a Loan</div>
        </div>
        <div className={style.selectPairContainer}>
          <PairsSelector token0={token0} token1={token1} setToken0={setToken0} setToken1={setToken1} />
        </div>
        <div className={style.vStackItem}>
          <div className={style.sectionHeader}>Your Loan Amount</div>
        </div>
        <div className={style.vStackItem}>
          <div className={style.numberInputContainer}>
            <input
              type="text"
              value={loanAmtStr}
              placeholder="0.0"
              className={style.numberInput}
              {...register('loanAmt', {
                onChange: (e) => handleNumberInput(e, setLoanAmtStr, setLoanAmt),
              })}
            />
          </div>
        </div>
        <div className={style.vStackItem}>
          <div className={style.collateralHeader}>
            <div className={style.collateralHeaderText}>Your Collateral</div>
            <div className={style.selectCollateralButton} onClick={() => setIsOpen(true)}>
              {collateralButtonText}
              <ChevronDownIcon className={style.dropdownArrow} />
            </div>
            <SelectCollateralModal token0={token0} token1={token1} isOpen={isOpen} setIsOpen={setIsOpen} setCollateralType={setCollateralType} />
          </div>
        </div>
        <div className={style.vStackItem}>
          <div className={style.numberInputContainer}>
            <input
              type="text"
              value={collateralAmt0Str}
              placeholder="0.0"
              className={style.numberInput}
              {...register('collateralAmt0', {
                onChange: (e) => handleNumberInput(e, setCollateralAmt0Str, setCollateralAmt0),
              })}
            />
          </div>
        </div>
        <div className={style.vStackItem}>
          <div className={collateral1Class}>
            <input
              type="text"
              value={collateralAmt1Str}
              placeholder="0.0"
              className={style.numberInput}
              {...register('collateralAmt1', {
                onChange: (e) => handleNumberInput(e, setCollateralAmt1Str, setCollateralAmt1),
              })}
            />
          </div>
        </div>
        <div className={style.vStackItem}>
          <div className={style.interestRateText}>Interest Rate --%</div>
        </div>
        <div className={style.vStackItem}>
          <button className={confirmStyle} type="submit">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OpenLoanPage
