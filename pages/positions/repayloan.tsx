import type { NextPage } from 'next'
import Image from 'next/image'
import { Fragment } from 'react'
import { ArrowLeftIcon, ArrowDownIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { Tab } from '@headlessui/react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useRepayLoanHandler } from '../../src/hooks/useRepayLoanHandler'
import { TokenUserInput } from '../../src/components/Repay/TokenUserInput'

const Repayloan: NextPage = () => {
  const {
    token0,
    token1,
    repayAmt,
    repayAmtChange,
    changeSliderPercentage,
    percentages,
    approveTransaction,
    repayTransaction,
    enableRepay,
    outstandingLoanAmount,
    setOutstandingLoanAmount,
    enableApprove,
  } = useRepayLoanHandler()

  const style = {
    wrapper: 'w-full h-full flex justify-center',
    container: 'mt-4 bg-neutrals-800 w-[30rem] h-[51rem] rounded-xl p-4',
    headerContainer: 'flex text-xxs',
    backButton: 'w-7 h-7 mt-0.5 cursor-pointer hover:bg-neutrals-700 p-1 rounded-full',
    formHeader: 'font-semibold text-lg text-neutrals-100 ml-4',
    tabsContainer:
      'flex rounded-lg w-1/4 p-0.5 bg-neutrals-900 bg-opacity-40 drop-shadow-md space-x-2 font-normal ml-auto',
    tab: 'text-neutrals-600 w-1/2 rounded-md hover:bg-neutrals-800 hover:text-neutrals-300',
    activeTab: 'outline outline-2 outline-offset-2 outline-accents-royalBlue/50 bg-accents-royalBlue w-1/2 rounded-md',
    withdrawHeading: 'w-screen',
    formLabel: 'flex pt-3 px-2 font-regular text-sm text-gray-200',
    sliderContainer: 'bg-neutrals-700 drop-shadow-md mt-5 p-4 rounded-lg',
    sliderPercent: 'text-6xl text-neutrals-100 mt-2',
    percentageBoxContainer: 'flex justify-center space-x-8 mt-5',
    percentageBox:
      'bg-neutrals-800 text-neutrals-100 py-2 px-5 cursor-pointer drop-shadow-sm rounded-lg hover:text-primary-blue',
    buttonDiv: 'flex space-x-5 mt-3',
    confirmButton:
      'w-1/2 bg-blue-400 rounded-lg py-3 px-5 text-xl font-semibold cursor-pointer text-white text-center border-2 border-blue-400 hover:border-blue-300',
    successButton:
      'w-1/2 bg-green-400 rounded-lg py-3 px-5 text-xl font-semibold cursor-pointer text-white text-center border-2 border-green-400 hover:border-green-300',
    invalidatedButton:
      'w-1/2 rounded-lg py-3 px-5 text-xl font-semibold text-gray-600 text-center border-2 border-gray-700',
    dropDownIcon: 'w-5 h-5',
    sectionHeader: 'font-semibold text-neutrals-400',
    comingSoonPoster:
      'bg-neutrals-900 h-[46rem] mt-5 rounded-lg flex justify-center items-center text-neutrals-200/20 text-xl',

    lpTokensOutstandingLoanAmountContainer: 'bg-neutrals-700 rounded-lg drop-shadow-md mt-5 p-4',
    lpTokensOutstandingLoanAmountHeader: 'flex space-x-1 items-center',
    lpTokensRemainingAmountContainer: 'bg-neutrals-700 rounded-lg drop-shadow-md p-4',
    lpTokensRemainingAmountHeader: 'flex space-x-1 items-center',
    repayMetricsContainer: 'flex items-center mt-5',
    repayMetric: 'bg-neutrals-800 h-1/2 p-3 text-neutrals-100 drop-shadow-md rounded-lg',
    repayMetricHeader: 'flex justify-center items-center space-x-1 text-xxs',
    metricValue: 'text-center',
    PNLContainer:
      'w-72 h-32 bg-neutrals-800 rounded-md drop-shadow-md flex justify-center items-center text-neutrals-200/20 ml-auto',
    gasContainer: 'flex justify-end items-center space-x-1 font-normal text-neutrals-100 mt-4',

    lpTokensRemainingContainer: 'flex justify-between',
    lpTokensRemainingAmount: 'flex items-center',
    lpTokensRemainingPair: 'flex space-x-2',
    lpTokensRemainingIcons: 'relative w-[2rem] h-[1.5rem] self-center',
    lpTokenAIcon: 'mt-0.5',
    lpTokenBIcon: 'absolute top-0.5 right-0 -z-10',
    lpTokensRemainingSymbol: 'text-lg',

    arrowDownIconContainer: 'w-full flex justify-center my-2',
    arrowDownIcon: 'w-5 h-5',
    infoIcon: 'text-neutrals-400 w-4 h-4 cursor-pointer hover:text-neutrals-100',
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Tab.Group>
          <div className={style.headerContainer}>
            <ArrowLeftIcon className={style.backButton} />
            <div className={style.formHeader}>Repay Loan</div>
            <Tab.List className={style.tabsContainer}>
              <Tab as={Fragment}>
                {({ selected }) => <button className={selected ? style.activeTab : style.tab}>LP</button>}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => <button className={selected ? style.activeTab : style.tab}>Reserve</button>}
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <div className={style.sliderContainer}>
                <div className={style.sectionHeader}>Amount</div>
                <h1 className={style.sliderPercent}>{repayAmt}%</h1>
                <Slider
                  onChange={repayAmtChange}
                  value={repayAmt}
                  className="mt-5"
                  trackStyle={{
                    backgroundColor: '#549AF0',
                    height: '6px',
                  }}
                  railStyle={{ height: '6px' }}
                  handleStyle={{
                    borderColor: '#ECECED',
                    width: '16px',
                    height: '16px',
                    borderWidth: '2px',
                    backgroundColor: '#549AF0',
                    opacity: 1,
                  }}
                />
                <div className={style.percentageBoxContainer}>
                  {percentages && percentages.length > 0
                    ? percentages.map((percent) => (
                        <p
                          key={percent}
                          className={style.percentageBox}
                          onClick={() => changeSliderPercentage(percent)}
                        >
                          {percent === 100 ? 'Max' : `${percent}%`}
                        </p>
                      ))
                    : null}
                </div>
              </div>

              {/* Outstanding Loan Amount */}
              <div className={style.lpTokensOutstandingLoanAmountContainer}>
                <div className={style.lpTokensOutstandingLoanAmountHeader}>
                  <h2 className={style.sectionHeader}>Outstanding Loan Amount</h2>
                  <InformationCircleIcon className={style.infoIcon} />
                </div>
                {/* User Input */}
                <TokenUserInput
                  token0={token0}
                  token1={token1}
                  inputValue={outstandingLoanAmount}
                  setTokenValue={setOutstandingLoanAmount}
                  isDisabled={true}
                />
              </div>

              <div className={style.arrowDownIconContainer}>
                <ArrowDownIcon className={style.arrowDownIcon} />
              </div>

              {/* Remaining Amount */}
              <div className={style.lpTokensRemainingAmountContainer}>
                <div className={style.lpTokensRemainingAmountHeader}>
                  <h2 className={style.sectionHeader}>Remaining</h2>
                  <InformationCircleIcon className={style.infoIcon} />
                </div>
                {/* Read-Only Component - need to turn into reusable component */}
                <div className={style.lpTokensRemainingContainer}>
                  <h1 className={style.lpTokensRemainingAmount}>322.3422</h1>
                  <div className={style.lpTokensRemainingPair}>
                    <div className={style.lpTokensRemainingIcons}>
                      <div className={style.lpTokenAIcon}>
                        <Image src={'/crypto/eth.svg'} width={20} height={20} />
                      </div>
                      <div className={style.lpTokenBIcon}>
                        <Image src={'/crypto/uni.svg'} width={20} height={20} />
                      </div>
                    </div>
                    <div className={style.lpTokensRemainingSymbol}>ETH / UNI</div>
                  </div>
                </div>
                <div className={style.repayMetricsContainer}>
                  <div className={style.repayMetric}>
                    <div className={style.repayMetricHeader}>
                      <h2>Health Factor</h2>
                      {/* need to add popup for info */}
                      <InformationCircleIcon className={style.infoIcon} />
                    </div>
                    <p className={style.metricValue}>1.23</p>
                  </div>
                  <div className={style.PNLContainer}>Coming Soon</div>
                </div>
              </div>

              {/* Gas Container - need to turn into reusable component */}
              <div className={style.gasContainer}>
                <Image className={'opacity-50'} src={'/gasIcon.svg'} width={16} height={16} />
                <h2>$0.15</h2>
                <InformationCircleIcon className={style.infoIcon} />
              </div>

              <div className={style.buttonDiv}>
                {enableApprove ? (
                  <div className={style.confirmButton} onClick={approveTransaction}>
                    Approve
                  </div>
                ) : (
                  <div className={style.invalidatedButton}>Approve</div>
                )}
                {enableRepay ? (
                  <div className={style.successButton} onClick={repayTransaction}>
                    Confirm
                  </div>
                ) : (
                  <div className={style.invalidatedButton}>Confirm</div>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={style.comingSoonPoster}>Coming Soon</div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Repayloan
