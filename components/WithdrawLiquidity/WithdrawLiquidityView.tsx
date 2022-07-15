import * as React from 'react'
import {RangerHandle, useRanger} from 'react-ranger'
import {BsArrowDownShort} from 'react-icons/bs'

type WithdrawLiquidityProps = {
  sliderPercentage: number[]
  changeSliderPercentage: (data: number) => Promise<void>
  sliderPercentChange: (values: number[]) => void
  withdrawLiquidity: (value: number) => Promise<void>
  approveTransaction: () => Promise<void>
  token0: any
  token1: any
  liquidityAmt: number
  liqInTokB: number
  enableRemove: Boolean
}

const WithdrawLiquidity = ({
  sliderPercentage,
  changeSliderPercentage,
  sliderPercentChange,
  withdrawLiquidity,
  approveTransaction,
  token0,
  token1,
  liquidityAmt,
  liqInTokB,
  enableRemove,
}: WithdrawLiquidityProps) => {
  const style = {
    wrapper: 'w-screen flex justify-center items-center',
    content: 'bg-gray-900 w-[40rem] rounded-2xl p-4',
    formHeader: 'px-2 flex justify-between items-center font-semibold text-xl text-gray-200 text-center',
    formLabel: ' flex justify-between pt-3 px-2 font-regular text-sm text-gray-200',
    tokenContainer: 'bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between',
    tokenInput: 'bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4',
    confirmButton: 'w-full bg-blue-400 m-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300',
    successButton:
      'w-full bg-green-400 m-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-green-400 hover:border-green-300',
    invalidatedButton: 'w-full my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700',
    withdrawHeading: 'w-screen text-center',
    sliderStyle: 'border-2 border-gray-800 shadow-lg my-4 p-4 rounded-2xl',
    sliderPercent: 'mb-5 text-7xl text-white',
    percentageBox: 'flex justify-between p-4',
    percentages: 'bg-gray-800 text-white text-center w-full mx-5 py-2 cursor-pointer rounded-sm font-semibold',
    dropdownArrow: 'w-12 h-8',
    downIcon: 'flex justify-center',
    buttonDiv: 'flex justify-center',
    amountDiv: 'border-2 border-gray-800 my-2 shadow-lg p-4 rounded-2xl text-white text-2xl font-semibold',
    eachAmount: 'flex justify-between p-2',
    totalPriceDiv: 'flex justify-between px-6 py-4 text-white text-2xl',
    priceTag: '',
    totalPrice: 'text-right',
  }

  const {getTrackProps, handles} = useRanger({
    values: sliderPercentage,
    onChange: sliderPercentChange,
    min: 0,
    max: 100,
    stepSize: 1,
  })

  const withdraw = (amount: number) => {
    withdrawLiquidity(amount)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div className={style.withdrawHeading}>Withdraw Liquidity</div>
        </div>
        <div>
          <div className={style.formLabel}>
            <p>Amount</p>
            <p>Detailed</p>
          </div>
          <div className={style.sliderStyle}>
            <p className={style.sliderPercent}>{sliderPercentage}%</p>
            <div
              {...getTrackProps({
                style: {
                  height: '4px',
                  background: '#ddd',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,.6)',
                  borderRadius: '2px',
                },
              })}
            >
              {handles.map(({getHandleProps}: RangerHandle) => (
                <div
                  {...getHandleProps({
                    style: {
                      width: '12px',
                      height: '12px',
                      borderRadius: '100%',
                      background: 'linear-gradient(to bottom, #eee 45%, #ddd 55%)',
                      border: 'solid 1px #888',
                    },
                  })}
                />
              ))}
            </div>
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
            <BsArrowDownShort className={style.dropdownArrow} style={{color: 'white'}} />
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

          <div className={style.totalPriceDiv}>
            <div className={style.priceTag}>
              <p>Price</p>
            </div>
            <div className={style.totalPrice}>
              <p>
                1 {token0.symbol || '-'} = 4295.45 {token1.symbol || '-'}
              </p>
              <p>
                1 {token0.symbol || '-'} = 0.000232804 {token1.symbol || '-'}
              </p>
            </div>
          </div>

          <div className={style.totalPriceDiv}>
            <div className={style.priceTag}>
              <p>Balance in Liquidity</p>
              <p>Balance in {token1 ? token1.symbol : ''}</p>
            </div>
            <div className={style.totalPrice}>
              <p>{liquidityAmt}</p>
              <p>{liqInTokB}</p>
            </div>
          </div>
        </div>
        <div className={style.buttonDiv}>
          <div
            className={style.confirmButton}
            onClick={() => {
              approveTransaction()
            }}
          >
            Approve
          </div>
          {enableRemove ? (
            <div
              className={style.successButton}
              onClick={() => {
                withdraw(sliderPercentage[0])
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
