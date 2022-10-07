import Image from 'next/image'
import { Dispatch } from 'react'
import { handleNumberInput } from '../../utils/validation'
import { Token } from '../Tokens'

const style = {
  UserInputContainer: 'flex justify-around mt-2',
  tokenAmountContainer: '',
  loanAmountInput: 'bg-transparent placeholder:text-neutrals-600 outline-none w-full text-2xl text-neutrals-200',
  maxButton:
    'w-[2rem] text-center bg-neutrals-900 bg-opacity-60 drop-shadow-lg cursor-pointer hover:bg-opacity-70 text-xxs font-normal p-0.5 rounded-sm text-accents-royalBlue text-opacity-50 hover:text-opacity-80 mt-1',
  tokenPairContainer: 'w-[12rem]',
  tokenPairContent: 'flex justify-end space-x-3',
  tokenPairIcons: 'relative w-[2rem] h-[2rem] self-center',
  tokenAIcon: 'mt-0.5',
  tokenBIcon: 'absolute top-0.5 -right-1 -z-10',
  tokenPairSymbol: 'text-lg',
  tokenPairBalance: 'font-semibold text-xxs text-neutrals-600 tracking-wide text-right mt-2',
}

interface LabeledUserInputProps {
  inputType: string
  token0: Token
  token1: Token
  tokenBalance: string
  inputValue: string
  setTokenValue: Dispatch<React.SetStateAction<string>>
}

export const LabeledUserInput = ({
  inputType,
  token0,
  token1,
  tokenBalance,
  inputValue,
  setTokenValue,
}: LabeledUserInputProps) => {
  return (
    <div className={style.UserInputContainer}>
      {/* input side w/ max */}
      <div className={style.tokenAmountContainer}>
        <input
          type="text"
          onChange={(e) => handleNumberInput(e, setTokenValue)}
          value={inputValue}
          placeholder="0.0"
          className={style.loanAmountInput}
        />
        <div
          className={style.maxButton}
          onClick={() => {
            setTokenValue(tokenBalance)
          }}
        >
          MAX
        </div>
      </div>
      {/* tokens side w/ balance */}
      <div className={style.tokenPairContainer}>
        <div className={style.tokenPairContent}>
          {inputType == 'Liquidity Pool Tokens' ? (
            <>
              <div className={style.tokenPairIcons}>
                <div className={style.tokenAIcon}>
                  <Image src={token0.imgPath} width={26} height={26} />
                </div>
                {token1.imgPath ? (
                  <div className={style.tokenBIcon}>
                    <Image src={token1.imgPath} width={26} height={26} />
                  </div>
                ) : null}
              </div>
              <div className={style.tokenPairSymbol}>
                {token0.symbol} / {token1.symbol ? token1.symbol : "Select"}
              </div>
            </>
          ) : inputType == 'Token A' ? (
            <>
              <div className={style.tokenPairIcons}>
                <div className={style.tokenBIcon}>
                  <Image src={token0.imgPath} width={26} height={26} />
                </div>
              </div>
              <div className={style.tokenPairSymbol}>{token0.symbol}</div>
            </>
          ) : (
            <>
              {/* Token B */}
              <div className={style.tokenPairIcons}>
                <div className={style.tokenBIcon}>
                  {token1.imgPath && <Image src={token1.imgPath} width={26} height={26} />}
                </div>
              </div>
              <div className={style.tokenPairSymbol}>{token1.symbol ? token1.symbol : "Select Token"}</div>
            </>
          )}
        </div>
        <div className={style.tokenPairBalance}>
          Balance: {tokenBalance}
        </div>
      </div>
    </div>
  )
}
