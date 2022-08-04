import {useState} from 'react'

export const useRepayLoanHandler = () => {
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

  return {
    repayAmt,
    repayAmtChange,
    changeSliderPercentage,
    percentages,
    approveTransaction,
    repayTransaction,
    enableRepay,
  }
}
