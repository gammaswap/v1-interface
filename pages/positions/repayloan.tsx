import type {NextPage} from 'next'
import {BsArrowDownShort} from 'react-icons/bs'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import {useRepayLoanHandler} from '../../src/hooks/useRepayLoanHandler'

const Repayloan: NextPage = () => {
  const {repayAmt, repayAmtChange, changeSliderPercentage, percentages, approveTransaction, repayTransaction, enableRepay, loanAmount, repayCal} = useRepayLoanHandler()

  const style = {
    wrapper: 'w-screen flex justify-center items-center',
    content: 'bg-gray-900 w-[30rem] rounded-2xl p-4',
    formHeader: 'flex justify-between items-center font-semibold text-xl text-gray-200 text-center',
    withdrawHeading: 'w-screen',
    formLabel: 'flex pt-3 px-2 font-regular text-sm text-gray-200',
    sliderStyle: 'border-2 border-gray-800 shadow-lg my-4 p-4 rounded-2xl',
    sliderPercent: 'mb-5 text-7xl text-white',
    percentageBox: 'flex justify-between p-4',
    percentages: 'bg-gray-800 text-white text-center py-3 px-6 cursor-pointer rounded-lg font-semibold',
    buttonDiv: 'flex justify-center',
    approveBtn: 'w-full bg-blue-400 m-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300',
    repayBtn: 'w-full bg-green-400 m-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-green-400 hover:border-green-300',
    invalidBtn: 'w-full my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700',
    allAmountsDiv: 'flex flex-col border-2 border-gray-800 shadow-lg p-4 rounded-2xl',
    amountsDiv: 'flex justify-between py-2 text-white',
    downIcon: 'flex justify-center',
    dropDownIcon: 'w-12 h-8',
    sectionHeader: 'font-semibold text-gray-200 w-full',
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div className={style.withdrawHeading}>Repay Loan</div>
        </div>

        <div>
          <div className={style.sliderStyle}>
            <div className={style.sectionHeader}>Amount</div>
            <p className={style.sliderPercent}>{repayAmt}%</p>
            <Slider
              onChange={repayAmtChange}
              value={repayAmt}
              handleStyle={{
                borderColor: 'white',
                borderWidth: '2px',
                backgroundColor: '#abe2fb',
                opacity: 1,
              }}
            />
            <div className={style.percentageBox}>
              {percentages && percentages.length > 0
                ? percentages.map((percent) => {
                    return (
                      <p
                        key={percent}
                        className={style.percentages}
                        onClick={() => {
                          changeSliderPercentage(percent)
                        }}
                      >
                        {percent === 100 ? 'Max' : `${percent}%`}
                      </p>
                    )
                  })
                : null}
            </div>
          </div>

          <div className={style.downIcon}>
            <BsArrowDownShort className={style.dropDownIcon} style={{color: 'white'}} />
          </div>

          <div className={style.allAmountsDiv}>
            <div className={style.amountsDiv}>
              <p>Loan Amount</p>
              <p>{loanAmount}</p>
            </div>
            <div className={style.amountsDiv}>
              <p>Repay Amount</p>
              <p>{repayCal}</p>
            </div>
            <div className={style.amountsDiv}>
              <p>Remaining Amount</p>
              <p>{loanAmount - repayCal}</p>
            </div>
          </div>
          <div className={style.buttonDiv}>
            <div className={style.approveBtn} onClick={approveTransaction}>
              Approve
            </div>
            {enableRepay ? (
              <div className={style.repayBtn} onClick={repayTransaction}>
                Repay
              </div>
            ) : (
              <div className={style.invalidBtn}>Repay</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Repayloan
