import * as React from 'react'
import {useState} from 'react'
import RepayLoanView from './RepayLoanView'

const RepayLoanController = () => {
  const [repayAmt, setRepayAmt] = useState<number>(0)
  const [enableRepay, setEnableRepay] = useState<Boolean>(false)
  let percentages = [25, 50, 75, 100]

  function changeSliderPercentage(value: number) {
    setRepayAmt(value)
  }
  function repayAmtChange(values: number | number[]) {
    if (typeof values === 'number') {
      setRepayAmt(values)
    }
  }

  function approveTransaction() {
    setEnableRepay(true)
  }

  function repayTransaction() {}

  return (
    <RepayLoanView
      repayAmt={repayAmt}
      repayAmtChange={repayAmtChange}
      changeSliderPercentage={changeSliderPercentage}
      percentages={percentages}
      approveTransaction={approveTransaction}
      repayTransaction={repayTransaction}
      enableRepay={enableRepay}
    />
  )
}

export default RepayLoanController
