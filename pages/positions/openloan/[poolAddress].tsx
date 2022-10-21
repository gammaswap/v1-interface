import type { NextPage } from 'next'
import { ChevronDownIcon, ArrowLeftIcon, CheckIcon, InformationCircleIcon } from '@heroicons/react/outline'
import PairsSelector from '../../../src/components/PairsSelector'
import { useOpenLoanHandler } from '../../../src/hooks/useOpenLoanHandler'
import { CollateralUserInput } from '../../../src/components/OpenLoan/CollateralUserInput'
import { Listbox } from '@headlessui/react'
import { ApproveConfirmButton } from '../../../src/components/Positions/ApproveConfirmButton'
import { usePoolsData } from '../../../src/context/PoolsDataContext'

export const OpenLoanStyles = {
  wrapper: 'w-full h-full flex justify-center',
  container: 'mt-4 bg-neutrals-800 w-[30rem] rounded-xl p-4',
  headerContainer: 'flex text-xxs',
  backButton: 'w-7 h-7 mt-0.5 cursor-pointer hover:bg-neutrals-700 p-1 rounded-full',
  formHeader: 'font-semibold text-lg text-neutrals-100 ml-4',
  selectPairContainer: 'bg-neutrals-700 mt-3 p-4 drop-shadow-md rounded-lg',
  loanAmountContainer: 'bg-neutrals-700 rounded-lg drop-shadow-md mt-5 p-4',
  loanAmountHeader: 'flex space-x-1 items-center',
  sectionHeader: 'font-semibold text-neutrals-400',
  infoIcon: 'text-neutrals-400 w-4 h-4 cursor-pointer hover:text-neutrals-100',
  numberInputContainer:
    'bg-gray-800 rounded-2xl p-4 border-2 border-gray-800 hover:border-gray-600 flex justify-between w-full',
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
  dropdownArrow: 'w-4 h-4',
  infoGroup: 'inline-flex w-full place-content-center pt-1',
  loanInfoButton:
    'bg-primaryV2-4 rounded-2xl text-slate-200 text-[8px] font-semibold inline-flex mr-2 px-2 py-1 items-center hover:bg-primaryV2-3 hover:shadow-primaryV2-3/30 tooltip',
  collateralHeader: 'inline-flex w-full place-content-start',
  collateralHeaderText: 'font-semibold text-gray-200',
  selectCollateralButton:
    'bg-[#274060] rounded-2xl text-slate-200 text-[8px] font-semibold inline-flex px-2 py-1 items-center mx-4',
  chrevronIcon: 'ml-1',
  confirmGrey: 'bg-[#274060] w-full rounded-2xl text-gray-500 inline-flex place-content-center py-2 font-semibold',
  confirmInsuffBal: 'bg-red-400 w-full rounded-2xl text-slate-200 inline-flex place-content-center py-2 font-semibold',
  confirmGreen: 'bg-green-300 w-full rounded-2xl text-slate-200 inline-flex place-content-center py-2 font-semibold',
  confirmButtonContainer: 'w-full',
  interestRateText: 'w-full text-right text-gray-200 pr-4',
  spacer: 'p-5',

  collateralAmountContainer: 'bg-neutrals-700 rounded-lg drop-shadow-md mt-5 p-4',
  collateralTypeDropdownContainer: 'relative left-3 text-neutrals-100 text-sm',
  collateralTypeDropdownButton:
    'flex justify-around items-center bg-neutrals-800 py-2 rounded-lg cursor-pointer w-[12rem] drop-shadow-md hover:bg-neutrals-600',
  collateralTypeDropdownOptions: 'absolute top-0 right-30 w-full bg-neutrals-800 p-2 rounded-lg drop-shadow-md',
  collateralTypeDropdownOption: 'flex items-center space-x-1 cursor-pointer p-1.5 rounded-md',
  collateralTypeDropdownActiveOption: 'cursor-pointer p-1.5 rounded-md bg-accents-royalBlue',
  checkIcon: 'w-4 h-4',
  chosenCollateralTypeContainer: 'mt-4',

  loanMetricsContainer: 'flex space-x-5 mt-5 text-neutrals-100',
  loanMetric: 'bg-neutrals-700 w-1/3 py-3 drop-shadow-md rounded-lg',
  loanMetricHeader: 'flex justify-center items-center space-x-1 text-xxs',
  metricValue: 'text-center',
}

const tips = {
  maxltv:
    'The Maximum LTV ratio represents the maximum borrowing power of a ' +
    'specific collateral. For example, if a collateral has an LTV of 75%, the ' +
    'user can borrow up to 0.75 worth of ETH in the principal currency for ' +
    'every 1 ETH worth of collateral.',
  threshold:
    'This represents the threshold at which a borrow position will ' +
    'be considered undercollateralized and subject to liquidation for each ' +
    'collateral. For example, if a collateral has a liquidation threshold of ' +
    '80%, it means that the position will be liquidated when the debt value is ' +
    'worth 80% of the collateral value.',
  penalty:
    'When a liquidation occurs, liquidations repay up to 50% of the ' +
    'outstanding borrowed amount on behalf of the borrower. In return, they ' +
    'can buy the collateral at a discount and keep the difference (liquidation ' +
    'penalty) as a bonus.',
}

const OpenLoan: NextPage = () => {
  const { selectedPoolData } = usePoolsData()

  const style = OpenLoanStyles
  const {
    token0,
    token1,
    setToken0,
    setToken1,
    loanAmtStr,
    setLoanAmtStr,
    collateralType,
    setCollateralType,
    approveTransaction,
    isApproved,
    collateralTypes,
    openLoanHandler,
    lpTokenBalance,
    token0Balance,
    token1Balance,
    collateralAmt0Str,
    setCollateralAmt0Str,
    collateralAmt1Str,
    setCollateralAmt1Str,
  } = useOpenLoanHandler()

  // TODO: needs to be updated and moved into handler

  return (
    <div className={style.wrapper}>
      <div className={`${style.container} ${collateralType.type == 'Both Tokens' ? 'h-[45rem]' : 'h-[41rem]'}`}>
        <div className={style.headerContainer}>
          <ArrowLeftIcon className={style.backButton} />
          <div className={style.formHeader}>Open a Loan</div>
        </div>
        <div className={style.selectPairContainer}>
          <PairsSelector token0={token0} token1={token1} setToken0={setToken0} setToken1={setToken1} />
        </div>
        <div className={style.loanAmountContainer}>
          <div className={style.loanAmountHeader}>
            <h2 className={style.sectionHeader}>Loan Amount</h2>
            {/* need to add popup for info */}
            <InformationCircleIcon className={style.infoIcon} />
          </div>
          <CollateralUserInput
            token0Balance={lpTokenBalance}
            token1Balance={''}
            collateralType={collateralTypes[0].type}
            token0={token0}
            token1={token1}
            inputValue={loanAmtStr}
            setTokenValue={setLoanAmtStr}
          />
        </div>
        <div className={style.collateralAmountContainer}>
          <div className={style.loanAmountHeader}>
            <h2 className={style.sectionHeader}>Collateral</h2>
            {/* need to add popup for info */}
            <InformationCircleIcon className={style.infoIcon} />
            {/* Collateral Type Dropdown */}
            <Listbox
              as="div"
              className={style.collateralTypeDropdownContainer}
              value={collateralType}
              onChange={setCollateralType}
              disabled={token0.address === '' || token1.address === ''}
            >
              <Listbox.Button className={style.collateralTypeDropdownButton}>
                <h1>{collateralType.type}</h1>
                <ChevronDownIcon className={style.dropdownArrow} />
              </Listbox.Button>
              <Listbox.Options className={style.collateralTypeDropdownOptions}>
                {collateralTypes.map((type) => (
                  <Listbox.Option key={type.id} value={type} disabled={type.unavailable}>
                    {({ active, selected }) => (
                      <div
                        className={`${style.collateralTypeDropdownOption} ${
                          active && style.collateralTypeDropdownActiveOption
                        }`}
                      >
                        {selected && <CheckIcon className={style.checkIcon} />}
                        <h1>{type.type}</h1>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <div className={style.chosenCollateralTypeContainer}>
            {collateralType.type === 'Liquidity Pool Tokens' ? (
              <CollateralUserInput
                token0Balance={lpTokenBalance}
                token1Balance={''}
                collateralType={collateralType.type}
                token0={token0}
                token1={token1}
                inputValue={collateralAmt0Str}
                setTokenValue={setCollateralAmt0Str}
              />
            ) : collateralType.type === 'Token A' ? (
              <CollateralUserInput
                token0Balance={token0Balance}
                token1Balance={''}
                collateralType={collateralType.type}
                token0={token0}
                token1={token1}
                inputValue={collateralAmt0Str}
                setTokenValue={setCollateralAmt0Str}
              />
            ) : collateralType.type === 'Token B' ? (
              <CollateralUserInput
                token0Balance={''}
                token1Balance={token1Balance}
                collateralType={collateralType.type}
                token0={token0}
                token1={token1}
                inputValue={collateralAmt1Str}
                setTokenValue={setCollateralAmt1Str}
              />
            ) : collateralType.type === 'Both Tokens' ? (
              <>
                <CollateralUserInput
                  token0Balance={token0Balance}
                  token1Balance={''}
                  collateralType={'Token A'}
                  token0={token0}
                  token1={token1}
                  inputValue={collateralAmt0Str}
                  setTokenValue={setCollateralAmt0Str}
                />
                <CollateralUserInput
                  token0Balance={''}
                  token1Balance={token1Balance}
                  collateralType={'Token B'}
                  token0={token0}
                  token1={token1}
                  inputValue={collateralAmt1Str}
                  setTokenValue={setCollateralAmt1Str}
                />
              </>
            ) : null}
          </div>
        </div>
        <div className={style.loanMetricsContainer}>
          <div className={style.loanMetric}>
            <div className={style.loanMetricHeader}>
              <h2>Interest Rate</h2>
              {/* need to add popup for info */}
              <InformationCircleIcon className={style.infoIcon} />
            </div>
            <p className={style.metricValue}>11.32%</p>
          </div>
          <div className={style.loanMetric}>
            <div className={style.loanMetricHeader}>
              <h2>Health Rate</h2>
              {/* need to add popup for info */}
              <InformationCircleIcon className={style.infoIcon} />
            </div>
            <p className={style.metricValue}>2.44</p>
          </div>
          <div className={style.loanMetric}>
            <div className={style.loanMetricHeader}>
              <h2>Calculated Gains</h2>
              {/* need to add popup for info */}
              <InformationCircleIcon className={style.infoIcon} />
            </div>
            <p className={`${style.metricValue} text-secondary-jungleGreen`}>+ $29.1030</p>
          </div>
        </div>
        <ApproveConfirmButton 
          isApproveEnabled={(token0.address && token1.address && !isApproved) as boolean}
          isConfirmEnabled={isApproved}
          approveHandler={approveTransaction}
          actionHandler={openLoanHandler}
        />
      </div>
    </div>
  )
}

export default OpenLoan
