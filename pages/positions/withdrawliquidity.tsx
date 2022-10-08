import type { NextPage } from 'next'
import { Fragment } from 'react'
import Slider from 'rc-slider'
import { Tab } from '@headlessui/react'
import 'rc-slider/assets/index.css'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useWithdrawLiquidityHandler } from '../../src/hooks/useWithdrawLiquidityHandler'
import { LPTokensTab } from '../../src/components/Withdraw/LPTokensTab'
import { ReserveTokensTab } from '../../src/components/Withdraw/ReserveTokensTab'

const WithdrawLiquidity: NextPage = () => {
  const {
    selectedIndex,
    setSelectedIndex,
    sliderPercentage,
    changeSliderPercentage,
    sliderPercentChange,
    approveTransaction,
    enableRemove,
    withdraw,
    enableApprove
  } = useWithdrawLiquidityHandler()

  const style = {
    wrapper: 'w-full h-full flex justify-center',
    container: 'mt-4 bg-neutrals-800 w-[30rem] rounded-xl p-4',
    headerContainer: 'flex text-xxs',
    backButton: 'w-7 h-7 mt-0.5 cursor-pointer hover:bg-neutrals-700 p-1 rounded-full',
    formHeader: 'font-semibold text-lg text-neutrals-100 ml-4',
    tabsContainer:
      'flex rounded-lg w-1/4 p-0.5 bg-neutrals-900 bg-opacity-40 drop-shadow-md space-x-2 font-normal ml-auto',
    tab: 'text-neutrals-600 w-1/2 rounded-md hover:bg-neutrals-800 hover:text-neutrals-300',
    activeTab: 'outline outline-2 outline-offset-2 outline-accents-royalBlue/50 bg-accents-royalBlue w-1/2 rounded-md',
    buttonDiv: 'flex space-x-5 mt-6',
    confirmButton:
      'w-1/2 bg-blue-400 rounded-lg py-3 px-5 text-xl font-semibold cursor-pointer text-white text-center border-2 border-blue-400 hover:border-blue-300',
    successButton:
      'w-1/2 bg-green-400 rounded-lg py-3 px-5 text-xl font-semibold cursor-pointer text-white text-center border-2 border-green-400 hover:border-green-300',
    invalidatedButton:
      'w-1/2 rounded-lg py-3 px-5 text-xl font-semibold text-gray-600 text-center border-2 border-gray-700',
    withdrawHeading: 'w-screen text-left',
    sliderContainer: 'bg-neutrals-700 drop-shadow-md mt-5 p-4 rounded-lg',
    sectionHeader: 'font-semibold text-neutrals-400 w-full',
    sliderPercent: 'text-6xl text-neutrals-100 mt-2',
    percentageBoxContainer: 'flex justify-center space-x-8 mt-5',
    percentageBox:
      'bg-neutrals-800 text-neutrals-100 py-2 px-5 cursor-pointer drop-shadow-sm rounded-lg hover:text-primary-blue',
  }

  return (
    <div className={style.wrapper}>
      <div className={`${style.container} ${selectedIndex ? 'h-[48.5rem]' : 'h-[46rem]'}`}>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className={style.headerContainer}>
            <ArrowLeftIcon className={style.backButton} />
            <div className={style.formHeader}>Withdraw Liquidity</div>
            <Tab.List className={style.tabsContainer}>
              <Tab as={Fragment}>
                {({ selected }) => <button className={selected ? style.activeTab : style.tab}>LP</button>}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => <button className={selected ? style.activeTab : style.tab}>Reserve</button>}
              </Tab>
            </Tab.List>
          </div>
          <div className={style.sliderContainer}>
            <div className={style.sectionHeader}>Amount</div>
            <h1 className={style.sliderPercent}>{sliderPercentage}%</h1>
            <Slider
              onChange={sliderPercentChange}
              value={sliderPercentage}
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
              <p className={style.percentageBox} onClick={() => changeSliderPercentage(25)}>
                25%
              </p>
              <p className={style.percentageBox} onClick={() => changeSliderPercentage(50)}>
                50%
              </p>
              <p className={style.percentageBox} onClick={() => changeSliderPercentage(75)}>
                75%
              </p>
              <p className={style.percentageBox} onClick={() => changeSliderPercentage(100)}>
                Max
              </p>
            </div>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <LPTokensTab />
            </Tab.Panel>
            <Tab.Panel>
              <ReserveTokensTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* TODO: separate approve and confirm buttons to component for reusability */}
        <div className={style.buttonDiv}>
          {enableApprove ? (
            <div className={style.confirmButton} onClick={approveTransaction}>
              Approve
            </div>
          ) : (
            <div className={style.invalidatedButton}>Approve</div>
          )}
          {enableRemove ? (
            <div
              className={style.successButton}
              onClick={() => {
                withdraw(sliderPercentage)
              }}
            >
              Confirm
            </div>
          ) : (
            <div className={style.invalidatedButton}>Confirm</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WithdrawLiquidity
