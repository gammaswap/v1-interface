type ButtonSubmitProps = {
    buttonStyle: string
    buttonText: string
}

const AddLiquiditySubmitValidator = ({ buttonStyle, buttonText }: ButtonSubmitProps): JSX.Element => {
    return (
        <div className={buttonStyle}>
            {buttonText}
        </div>
    )
}

export default AddLiquiditySubmitValidator