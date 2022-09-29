import type { NextPage } from 'next'
import { Fragment } from 'react'
import { ArrowLeftIcon, ArrowDownIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { Tab } from '@headlessui/react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useRepayLoanHandler } from '../../src/hooks/useRepayLoanHandler'

const Repayloan: NextPage = () => {
  const {
    repayAmt,
    repayAmtChange,
    changeSliderPercentage,
    percentages,
    approveTransaction,
    repayTransaction,
    enableRepay,
    loanAmount,
    repayCal
  } = useRepayLoanHandler()

  const style = {
    wrapper: 'w-full h-full flex justify-center',
    container: 'mt-4 bg-neutrals-800 w-[30rem] h-[40rem] rounded-xl p-4',
    headerContainer: 'flex text-xxs',
    backButton: 'w-7 h-7 mt-0.5 cursor-pointer hover:bg-neutrals-700 p-1 rounded-full',
    formHeader: 'font-semibold text-lg text-neutrals-100 ml-4',
    tabsContainer: 'flex rounded-lg w-1/4 p-0.5 bg-neutrals-900 bg-opacity-40 drop-shadow-md space-x-2 font-normal ml-auto',
    tab: 'text-neutrals-600 w-1/2 rounded-md hover:bg-neutrals-800 hover:text-neutrals-300',
    activeTab: 'outline outline-2 outline-offset-2 outline-accents-royalBlue/50 bg-accents-royalBlue w-1/2 rounded-md',
    withdrawHeading: 'w-screen',
    formLabel: 'flex pt-3 px-2 font-regular text-sm text-gray-200',
    sliderContainer: 'bg-neutrals-700 drop-shadow-md mt-5 p-4 rounded-lg',
    sliderPercent: 'text-6xl text-neutrals-100 mt-2',
    percentageBoxContainer: 'flex justify-center space-x-8 mt-5',
    percentageBox: 'bg-neutrals-800 text-neutrals-100 py-2 px-5 cursor-pointer drop-shadow-sm rounded-lg hover:text-primary-blue',
    buttonDiv: 'flex space-x-5 mt-6',
    confirmButton: 'w-1/2 bg-blue-400 rounded-lg py-3 px-5 text-xl font-semibold cursor-pointer text-white text-center border-2 border-blue-400 hover:border-blue-300',
    successButton: 'w-1/2 bg-green-400 rounded-lg py-3 px-5 text-xl font-semibold cursor-pointer text-white text-center border-2 border-green-400 hover:border-green-300',
    invalidatedButton: 'w-1/2 rounded-lg py-3 px-5 text-xl font-semibold text-gray-600 text-center border-2 border-gray-700',
    downIcon: 'flex justify-center',
    dropDownIcon: 'w-5 h-5',
    sectionHeader: 'font-semibold text-neutrals-400 w-full',
    comingSoonPoster: 'bg-neutrals-900 h-[35rem] mt-5 rounded-lg flex justify-center items-center text-neutrals-200/20 text-xl',
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Tab.Group>
          <div className={style.headerContainer}>
            <ArrowLeftIcon className={style.backButton} />
            <div className={style.formHeader}>Open a Loan</div>
            <Tab.List className={style.tabsContainer}>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={selected ?  style.activeTab : style.tab}>
                    LP
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={selected ?  style.activeTab : style.tab}>
                    Reserve
                  </button>
                )}
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
                    ? percentages.map(percent => (
                        <p
                          key={percent}
                          className={style.percentageBox}
                          onClick={() => changeSliderPercentage(percent)}
                        >
                          {percent === 100 ? 'Max' : `${percent}%`}
                        </p>
                      )
                    ) : null
                  }
                </div>
              </div>

              <div className={style.buttonDiv}>
                <div className={style.confirmButton} onClick={approveTransaction}>
                  Approve
                </div>
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
