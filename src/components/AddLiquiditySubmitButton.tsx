import { useAddLiquidityHandler } from '../hooks/useAddLiquidityHandler'

type ButtonSubmitProps = {
  canClick: Boolean
  buttonStyle: string
  buttonText: string
}

const AddLiquiditySubmitValidator = ({ canClick, buttonStyle, buttonText }: ButtonSubmitProps): JSX.Element => {
  const { addLiquidity } = useAddLiquidityHandler()
  return (
    <div className={buttonStyle} onClick={canClick ? addLiquidity : undefined}>
      {buttonText}
    </div>
  )
}

export default AddLiquiditySubmitValidator
