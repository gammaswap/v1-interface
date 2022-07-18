export type ButtonSubmitProps = {
    buttonStyle: string
    buttonText: string
}

const AddLiquiditySubmitButton = ({ buttonStyle, buttonText }: ButtonSubmitProps): JSX.Element => {
    return (
        <div className={buttonStyle}>
            {buttonText}
        </div>
    )
}

export default AddLiquiditySubmitButton