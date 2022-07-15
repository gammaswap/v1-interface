import * as React from 'react'
import {useState} from 'react'
import RepayLoanView from './RepayLoanView'

const RepayLoanController = () => {
  const [repayAmt, setrepayAmt] = useState<number>(0)

  return <RepayLoanView repayAmt={repayAmt} setrepayAmt={setrepayAmt} />
}

export default RepayLoanController
