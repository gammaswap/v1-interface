import type { NextPage } from 'next'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { BsArrowDownShort } from 'react-icons/bs'
import { useWithdrawLiquidityHandler } from '../../src/hooks/useWithdrawLiquidityHandler'

const WithdrawLiquidity: NextPage = () => {
  const {
    sliderPercentage,
    changeSliderPercentage,
    sliderPercentChange,
    approveTransaction,
    token0,
    token1,
    enableRemove,
    withdraw,
    enableApprove,
  } = useWithdrawLiquidityHandler()

  const style = {
    wrapper: 'w-full flex justify-center items-center mb-8',
    content: 'bg-gray-900 w-[30rem] rounded-2xl p-4',
    formHeader: 'px-2 justify-between items-center font-semibold text-xl text-gray-200 text-center',
    formLabel: ' flex justify-between pt-3 px-2',
    tokenContainer:
      'bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between',
    tokenInput: 'bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4',
    confirmButton:
      'w-full bg-blue-400 m-2 rounded-2xl py-3 px-5 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300',
    successButton:
      'w-full bg-green-400 m-2 rounded-2xl py-3 px-5 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-green-400 hover:border-green-300',
    invalidatedButton:
      'w-full my-2 rounded-2xl py-3 px-5 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 mx-2 border-2 border-gray-700',
    withdrawHeading: 'w-screen text-left',
    sliderStyle: 'border-2 border-gray-800 shadow-lg mt-2 p-4 rounded-2xl',
    sliderPercent: 'mb-5 text-6xl text-white rounded-xl',
    percentageBox: 'flex justify-between mt-4',
    percentages: 'bg-gray-800 text-white text-center py-3 px-6 cursor-pointer rounded-lg font-semibold',
    dropdownArrow: 'w-12 h-8',
    downIcon: 'flex justify-center my-2',
    buttonDiv: 'flex justify-center',
    amountDiv: 'border-2 border-gray-800 shadow-lg p-4 rounded-2xl text-white text-lg font-semibold',
    eachAmount: 'flex justify-between p-2',
    totalPriceContainer: 'flex flex-col items-end text-gray-500 text-sm mt-2',
    unitTokenConversion: 'font-semibold',
    sectionHeader: 'font-semibold text-gray-200 w-full',
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>Withdraw Liquidity</div>
        <div>
          <div className={style.formLabel}></div>
          <div className={style.sliderStyle}>
            <div className={style.sectionHeader}>Amount</div>
            <p className={style.sliderPercent}>{sliderPercentage}%</p>
            <Slider
              onChange={sliderPercentChange}
              value={sliderPercentage}
              handleStyle={{
                borderColor: 'white',
                borderWidth: '2px',
                backgroundColor: '#abe2fb',
                opacity: 1,
              }}
            />
            <div className={style.percentageBox}>
              <p
                className={style.percentages}
                onClick={() => {
                  changeSliderPercentage(25)
                }}
              >
                25%
              </p>
              <p
                className={style.percentages}
                onClick={() => {
                  changeSliderPercentage(50)
                }}
              >
                50%
              </p>
              <p
                className={style.percentages}
                onClick={() => {
                  changeSliderPercentage(75)
                }}
              >
                75%
              </p>
              <p
                className={style.percentages}
                onClick={() => {
                  changeSliderPercentage(100)
                }}
              >
                Max
              </p>
            </div>
          </div>
          <div className={style.downIcon}>
            <BsArrowDownShort className={style.dropdownArrow} style={{ color: 'white' }} />
          </div>

          <div className={style.amountDiv}>
            <div className={style.eachAmount}>
              <p>50</p>
              <p>{token0.symbol || '-'}</p>
            </div>
            <div className={style.eachAmount}>
              <p>50</p>
              <p>{token1.symbol || '-'}</p>
            </div>
          </div>

          <div className={style.totalPriceContainer}>
            <div className={style.unitTokenConversion}>
              {/* TODO: once factory contract is available it should be the price that comes from the uniswap pair. */}1{' '}
              {token1.symbol || '-'} = 1 {token0.symbol || '-'}
            </div>
            <div className={style.unitTokenConversion}>
              1 {token0.symbol || '-'} = 1 {token1.symbol || '-'}
            </div>
          </div>
        </div>
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
              Remove
            </div>
          ) : (
            <div className={style.invalidatedButton}>Remove</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WithdrawLiquidity
