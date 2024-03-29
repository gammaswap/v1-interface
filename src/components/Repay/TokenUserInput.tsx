import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { handleNumberInput } from '../../utils/validation'
import { Token } from '../Tokens'

const style = {
  tokenUserInputContainer: 'flex justify-around mt-2',
  tokenAmountContainer: '',
  loanAmountInput: 'bg-transparent placeholder:text-neutrals-600 outline-none w-full text-2xl text-neutrals-200',
  maxButton:
    'w-[2rem] text-center bg-neutrals-900 bg-opacity-60 drop-shadow-lg cursor-pointer hover:bg-opacity-70 text-xxs font-normal p-0.5 rounded-sm text-accents-royalBlue text-opacity-50 hover:text-opacity-80 mt-1',
  tokenPairContainer: 'w-[12rem]',
  tokenPairContent: 'flex justify-end space-x-3',
  tokenPairIcons: 'relative w-[2rem] h-[2rem] self-center',
  tokenAIcon: 'mt-0.5',
  tokenBIcon: 'absolute top-0.5 right-0 -z-10',
  tokenPairSymbol: 'text-lg',
  tokenPairBalance: 'font-semibold text-xxs text-neutrals-600 tracking-wide text-right mt-2',
}

interface TokenUserInputProps {
  token0: Token
  token1: Token
  inputValue: string
  setTokenValue: Dispatch<SetStateAction<string>>
  isDisabled: boolean
}

export const TokenUserInput = ({ token0, token1, inputValue, setTokenValue, isDisabled }: TokenUserInputProps) => {
  return (
    <div className={style.tokenUserInputContainer}>
      {/* input side w/ max */}
      <div className={style.tokenAmountContainer}>
        <input
          type="text"
          onChange={(e) => handleNumberInput(e, setTokenValue)}
          value={inputValue}
          placeholder="0.0"
          className={style.loanAmountInput}
          disabled={isDisabled}
        />
        <div className={style.maxButton}>MAX</div>
      </div>
      {/* tokens side w/ balance */}
      <div className={style.tokenPairContainer}>
        <div className={style.tokenPairContent}>
          <div className={style.tokenPairIcons}>
            <div className={style.tokenAIcon}>
              <Image src={token0.imgPath} width={20} height={20} />
            </div>
            <div className={style.tokenBIcon}>
              <Image src={token1.imgPath} width={20} height={20} />
            </div>
          </div>
          <div className={style.tokenPairSymbol}>
            {token0.symbol} / {token1.symbol}
          </div>
        </div>
        <div className={style.tokenPairBalance}>Balance: {0}</div>
      </div>
    </div>
  )
}
