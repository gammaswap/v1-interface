import * as React from 'react'

type RepayLoanProps = {
  repayAmt: number
  setrepayAmt: any
}

const RepayLoanView = ({repayAmt, setrepayAmt}: RepayLoanProps) => {
  const style = {
    wrapper: 'w-screen flex justify-center items-center',
    content: 'bg-gray-900 w-[40rem] rounded-2xl py-4',
    formHeader: 'flex justify-between items-center font-semibold text-xl text-gray-200 text-center',
    inputMainDiv: 'flex mt-5 mx-5',
    withdrawHeading: 'w-screen',
    horizontalLine: 'mt-2',
    inputBox: 'w-full border-2 border-gray-800 bg-transparent mt-1 rounded-md py-2 pl-2 pr-20 text-white outline-none',
    inputHeading: 'text-md text-white p-0 m-0',
    inputBoxSpan: 'absolute right-0 text-white bg-gray-100/[.2] py-1 px-2 mr-3 mt-1 rounded-sm cursor-pointer',
    inputSpanMainDiv: 'flex items-center relative',
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div className={style.withdrawHeading}>Repay Loan</div>
        </div>
        <hr className={style.horizontalLine} />

        <div className={style.inputMainDiv}>
          <div className={style.withdrawHeading}>
            <p className={style.inputHeading}>Repay Amount</p>
            <div className={style.inputSpanMainDiv}>
              <input
                type="text"
                onKeyPress={(event) => {
                  if (!/^(\d*)\.{0,1}(\d){0,1}$/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
                onChange={(e) => setrepayAmt(e.target.value)}
                value={repayAmt}
                className={style.inputBox}
              />
              <span className={style.inputBoxSpan}>Max</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepayLoanView
