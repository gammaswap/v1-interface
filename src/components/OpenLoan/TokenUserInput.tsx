import Image from 'next/image'

const style = {
  tokenUserInputContainer: 'flex justify-around mt-2',
  tokenAmountContainer: '',
  loanAmountInput: 'bg-transparent placeholder:text-neutrals-600 outline-none w-full text-2xl text-neutrals-200',
  maxButton: 'w-[2rem] text-center bg-neutrals-900 bg-opacity-60 drop-shadow-lg cursor-pointer hover:bg-opacity-70 text-xxs font-normal p-0.5 rounded-sm text-accents-royalBlue text-opacity-50 hover:text-opacity-80 mt-1',
  tokenPairContainer: '',
  tokenPairContent: 'flex space-x-3',
  tokenPairIcons: 'relative w-[2rem] h-[2rem] self-center',
  tokenAIcon: 'mt-0.5',
  tokenBIcon: 'absolute top-0.5 -right-1 -z-10',
  tokenPairSymbol: 'text-lg',
  tokenPairBalance: 'font-semibold text-xxs text-neutrals-600 tracking-wide text-right mt-2',
}

export const TokenUserInput = () => {
  return (
    <div className={style.tokenUserInputContainer}>
      {/* input side w/ max */}
      <div className={style.tokenAmountContainer}>
        <input
          type="text"
          // onChange={(e) => handleTokenInput(e, setTokenAInputVal, setTokenBInputVal)}
          // value={tokenAInputVal}
          placeholder="0.0"
          className={style.loanAmountInput}
        />
        <div className={style.maxButton}>MAX</div>
      </div>
      {/* tokens side w/ balance */}
      <div className={style.tokenPairContainer}>
        <div className={style.tokenPairContent}>
          <div className={style.tokenPairIcons}>
            <div className={style.tokenAIcon}>
              <Image src={'/crypto/eth.svg'} width={26} height={26} />
            </div>
            <div className={style.tokenBIcon}>
              <Image src={'/crypto/uni.svg'} width={26} height={26} />
            </div>
          </div>
          <div className={style.tokenPairSymbol}>ETH / UNI</div>
        </div>
        <div className={style.tokenPairBalance}>Balance: {0}</div>
      </div>
    </div>
  )
}
