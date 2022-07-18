import * as React from 'react'
import {useState} from 'react'
import RepayLoanView from './RepayLoanView'

const RepayLoanController = () => {
  const [repayAmt, setrepayAmt] = useState<number[]>([0])
  const [enableRepay, setenableRepay] = useState<Boolean>(false)
  let percentages = [25, 50, 75, 100]

  function changeSliderPercentage(value: number) {
    setrepayAmt([value])
  }

  function repayAmtChange(values: number[]) {
    setrepayAmt(values)
  }

  function approveTransaction() {
    setenableRepay(true)
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
