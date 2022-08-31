import { MouseEventHandler } from 'react'
import { useAddLiquidityHandler } from '../hooks/useAddLiquidityHandler'

type ButtonSubmitProps = {
  clickFunction: MouseEventHandler<HTMLDivElement>
  buttonStyle: string
  buttonText: string
}

const AddLiquiditySubmitValidator = ({ clickFunction, buttonStyle, buttonText }: ButtonSubmitProps): JSX.Element => {
  return (
    <div className={buttonStyle} onClick={clickFunction}>
      {buttonText}
    </div>
  )
}

export default AddLiquiditySubmitValidator
